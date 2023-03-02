from json import JSONDecodeError
from django.http import JsonResponse, Http404
from .models import Entry, AccEntry
from .serializers import ContactSerializer, AccEntrySerializer, EntrySerializer, AllSerializer
from rest_framework.parsers import JSONParser
from rest_framework import views, status
from rest_framework.views import APIView
from rest_framework.response import Response
from numpy import argmax


class ContactAPIView(views.APIView):
    """
    A simple APIView for creating contact entires.
    """
    serializer_class = ContactSerializer

    def get_serializer_context(self):
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }

    def get_serializer(self, *args, **kwargs):
        kwargs['context'] = self.get_serializer_context()
        return self.serializer_class(*args, **kwargs)

    def post(self, request):
        try:
            data = JSONParser().parse(request)
            serializer = ContactSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except JSONDecodeError:
            return JsonResponse({"result": "error", "message": "Json decoding error"}, status=400)


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
        if data['open']== Entry.Type.TRUE:
            serializer = AccEntrySerializer(acc_entry, data={'open' : (acc_entry.open + 1)}, partial=True)
            if serializer.is_valid():
                serializer.save()
        if data['open'] == Entry.Type.FALSE:
            serializer = AccEntrySerializer(acc_entry, data={'closed' : (acc_entry.closed + 1)}, partial=True)
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
        values = [acc_entry.closed, acc_entry.open]
        max = argmax(values)
        if values[max] > values[acc_entry.open_type]:
            serializer = AccEntrySerializer(acc_entry, data={'open_type' : max}, partial=True)
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
