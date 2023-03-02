from json import JSONDecodeError
from django.http import JsonResponse, Http404
from .models import Entry, AccEntry, ACC_OPTIONS, ACC_TYPE, ENTRY_TYPE
from .serializers import AccEntrySerializer, EntrySerializer, AllSerializer
from rest_framework.parsers import JSONParser
from rest_framework import views, status
from rest_framework.views import APIView
from rest_framework.response import Response
from numpy import argmax

class AllList(APIView):
    def get(self, request, format=None):
        entries = AccEntry.objects.all()
        serializer = AllSerializer(entries, many=True)
        return Response(serializer.data)

class AccEntryList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        entries = AccEntry.objects.all()
        serializer = AccEntrySerializer(entries, many=True)
        return Response(serializer.data)

    
def updateacc(data):
    try:
        acc_entry = AccEntry.objects.get(pk=data['pid'])
        acc_entry_values = AccEntry.objects.filter(pid__exact=data['pid']).values()[0]
        updates = acc_entry_values.copy()
        for type in ENTRY_TYPE:
            if data[type]== Entry.Type.FALSE:
                updates[type+"0"] = updates[type+"0"] + 1

            if data[type] == Entry.Type.TRUE:
                updates[type+"1"] = updates[type+"1"] + 1
        
        serializer = AccEntrySerializer(acc_entry, data=updates)
        if serializer.is_valid():
            serializer.save()

    except AccEntry.DoesNotExist:
        acc_serializer = AccEntrySerializer(data={'pid' : data['pid']})
        if acc_serializer.is_valid():
            acc_serializer.save()
            updateacc(data)

def updatetype(data):
    try:
        acc_entry = AccEntry.objects.get(pk=data['pid'])
        acc_entry_values = AccEntry.objects.filter(pid__exact=data['pid']).values()[0]
        updates = acc_entry_values.copy()
        for type in ENTRY_TYPE:
            values = [acc_entry_values[type+"0"], acc_entry_values[type+"1"]]
            max = argmax(values)
            if values[max] > values[acc_entry_values[type+"_type"]]:
                updates[type+"_type"] = max

        serializer = AccEntrySerializer(acc_entry, data=updates)
        if serializer.is_valid():
            serializer.save()
        
    except AccEntry.DoesNotExist:
        acc_serializer = AccEntrySerializer(data={'pid' : data['pid']})
        if acc_serializer.is_valid():
            acc_serializer.save()
            updatetype(data)



class EntryList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        entries = Entry.objects.all()
        serializer = EntrySerializer(entries, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = EntrySerializer(data=request.data)
        if serializer.is_valid():
            print(serializer)
            serializer.save()
            updateacc(serializer.data)
            updatetype(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EntryDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return Entry.objects.get(pk=pk)
        except Entry.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        entry = self.get_object(pk)
        serializer = EntrySerializer(entry)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        entry = self.get_object(pk)
        serializer = EntrySerializer(entry, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        entry = self.get_object(pk)
        entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
