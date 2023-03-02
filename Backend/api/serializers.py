from . import models 
from rest_framework import serializers
from rest_framework.fields import CharField, EmailField, BooleanField


class ContactSerializer(serializers.ModelSerializer):

    name = CharField(source="title", required=True)
    message = CharField(source="description", required=True)
    email = EmailField(required=True)
    verified = BooleanField(required=True)

    class Meta:
        model = models.Contact
        fields = (
            'name',
            'email',
            'message',
            'verified'
        )

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Entry
        fields = ['id', 'created', 'pid', 'long', 'lat', 'open', 'comment', 'reported', 'pinned']

class AccEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AccEntry
        fields = ['pid', 'open_type', 'open', 'closed', 'long', 'lat']

class AllSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AccEntry
        fields = ['pid', 'open_type', 'long', 'lat']
