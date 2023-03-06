from json import JSONDecodeError
from django.http import JsonResponse, Http404
from .models import Entry, AccEntry, Address, ACC_OPTIONS, ACC_TYPE, ENTRY_TYPE
from .serializers import AccEntrySerializer, EntrySerializer, AllSerializer, AddressSerializer
from rest_framework import status
from rest_framework import mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from numpy import argmax


class AllMarkers(APIView):
    """
    Called by the front-end when displaying all the icons
    GET -> (_pid, types) where types are the result of the majority vote
    """

    def get(self, request, format=None):
        entries = AccEntry.objects.all()
        serializer = AllSerializer(entries, many=True)
        return Response(serializer.data)


class MarkerAccEntry(APIView):
    """
    Get a specific Accumulative Entry with primary key (pid)
    Called by the front-end when a specific building is selected and additional data is required
    GET -> (_pid, accumulation of votes, result of votes)
    """

    def get_object(self, pk):
        try:
            return AccEntry.objects.get(pk=pk)
        except AccEntry.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        entry = self.get_object(pk)
        serializer = AccEntrySerializer(entry)
        return Response(serializer.data)


class MarkerEntries(APIView):
    """
    Get all entries with primary key (pid)
    Called by the front-end when a specific building is selected and additional data is required
    """

    def get(self, request, pk, format=None):
        entries = Entry.objects.filter(pid=pk).order_by('-pinned', '-created')
        serializer = EntrySerializer(entries, many=True)
        return Response(serializer.data)


# Called whenever an entry is made and updates the Accumulator table
def updateacc(data):
    print(data)
    try:
        # Reference to the object in the table
        acc_entry = AccEntry.objects.get(pk=data['pid'])

        # Gives a queryset that contains all entries with pid which will be one as it is a primary key in the table
        # The queryset is in the form of a dictionary with keys corresponding to table entries
        acc_entry_values = AccEntry.objects.filter(
            pid__exact=data['pid']).values()[0]

        # Iterate through all the field types and increments the corresponding field
        for type in ENTRY_TYPE:
            if data[type] == Entry.Type.FALSE:
                acc_entry_values[type+"0"] = acc_entry_values[type+"0"] + 1

            if data[type] == Entry.Type.TRUE:
                acc_entry_values[type+"1"] = acc_entry_values[type+"1"] + 1

        # Updates the entry using the object reference with the new values after all the incrementations
        # and saves the entries to the table
        serializer = AccEntrySerializer(acc_entry, data=acc_entry_values)
        if serializer.is_valid():
            serializer.save()

    # If there is no existing entry, the code creates a new entry and calls the function again
    except AccEntry.DoesNotExist:
        acc_serializer = AccEntrySerializer(
            data={'pid': data['pid'], 'lat': data['lat'], 'lng': data['lng'], 'name': data['name'], 'address': data['address']})
        if acc_serializer.is_valid():
            acc_serializer.save()
            updateacc(data)

# Called whenever an entry is made and updates the Accumulator table types


def updatetype(data):
    try:
        acc_entry = AccEntry.objects.get(pk=data['pid'])
        acc_entry_values = AccEntry.objects.filter(
            pid__exact=data['pid']).values()[0]

        # Iterate through all the field types and finds which field has the majority
        # It then compares if it is the same as the current type and ensures that it only changes
        # when one group is larger than the other
        for type in ENTRY_TYPE:
            values = [acc_entry_values[type+"0"], acc_entry_values[type+"1"]]
            max = argmax(values)
            if values[max] > values[acc_entry_values[type+"_type"]]:
                acc_entry_values[type+"_type"] = max

        # Updates entry with new value and saves it to the table
        serializer = AccEntrySerializer(acc_entry, data=acc_entry_values)
        if serializer.is_valid():
            serializer.save()

    except AccEntry.DoesNotExist:
        acc_serializer = AccEntrySerializer(
            data={'pid': data['pid'], 'lat': data['lat'], 'lng': data['lng'], 'name': data['name'], 'address': data['address']})
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


class EntryDetail(mixins.UpdateModelMixin, APIView):
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
        serializer = EntrySerializer(entry, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def put(self, request, pk, format=None):
    #     return self.update(request, pk, format)

    def delete(self, request, pk, format=None):
        entry = self.get_object(pk)
        entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AccEntryList(APIView):
    """
    List all Accumulative Entries
    GET -> ()
    """

    def get(self, request, format=None):
        entries = AccEntry.objects.all()
        serializer = AccEntrySerializer(entries, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def getcomments(request, pid):
    if request.method == 'GET':
        entries = Entry.objects.filter(pid=pid)
        serializer = EntrySerializer(entries, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def getaddress(request, pid):
    if request.method == 'GET':
        try:
            address = Address.objects.get(pid=pid)
        except Address.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = AddressSerializer(address, many=False)
        return Response(serializer.data)
