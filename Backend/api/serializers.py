from . import models
from rest_framework import serializers


class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Entry
        fields = ['id', 'created', 'pid', 'lng', 'lat', 'title',
                  'comment', 'reported', 'pinned', 'name', 'address'] + models.ENTRY_TYPE


class AccEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AccEntry
        fields = ['pid', 'lng', 'lat', 'name', 'address'] + \
            models.ACC_OPTIONS + models.ACC_TYPE


class AllSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AccEntry
        fields = ['pid', 'lng', 'lat', 'name', 'address'] + models.ACC_TYPE
