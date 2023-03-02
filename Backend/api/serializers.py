from . import models 
from rest_framework import serializers


class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Entry
        fields = ['id', 'created', 'pid', 'long', 'lat', 'comment', 'reported', 'pinned'] + models.ENTRY_TYPE

class AccEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AccEntry
        fields = ['pid', 'long', 'lat'] + models.ACC_OPTIONS + models.ACC_TYPE

class AllSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AccEntry
        fields = ['pid', 'long', 'lat'] + models.ACC_TYPE
