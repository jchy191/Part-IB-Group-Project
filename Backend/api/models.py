from django.db import models
from utils.model_abstracts import Model

ENTRY_TYPE = ['open', 'friendly', 'quiet', 'groups', 'spend']

ACC_OPTIONS = ['open0', 'open1', 'friendly0', 'friendly1',
               'quiet0', 'quiet1', 'groups0', 'groups1', 'spend0', 'spend1']
ACC_TYPE = ['open_type', 'friendly_type',
            'quiet_type', 'groups_type', 'spend_type']


class Entry(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    pid = models.CharField(max_length=100, blank=True, default='')
    lng = models.FloatField(default=0)
    lat = models.FloatField(default=0)
    open = models.BooleanField(default=None, null=True)
    friendly = models.BooleanField(default=None, null=True)
    quiet = models.BooleanField(default=None, null=True)
    groups = models.BooleanField(default=None, null=True)
    spend = models.BooleanField(default=None, null=True)
    comment = models.TextField(default='', blank=True)
    title = models.TextField(default='', blank=True)
    reported = models.IntegerField(default=0)
    pinned = models.BooleanField(default=False)
    name = models.TextField(default='')
    address = models.TextField(default='')

    class Meta:
        ordering = ['created']

    def __str__(self):
        return self.comment


class AccEntry(models.Model):
    pid = models.CharField(max_length=100, blank=True,
                           default='', primary_key=True)
    open_type = models.BooleanField(default=None, null=True)
    friendly_type = models.BooleanField(default=None, null=True)
    quiet_type = models.BooleanField(default=None, null=True)
    groups_type = models.BooleanField(default=None, null=True)
    spend_type = models.BooleanField(default=None, null=True)
    lng = models.FloatField(default=0)
    lat = models.FloatField(default=0)
    name = models.TextField(default='')
    address = models.TextField(default='')
    open0 = models.IntegerField(default=0)
    open1 = models.IntegerField(default=0)
    friendly0 = models.IntegerField(default=0)
    friendly1 = models.IntegerField(default=0)
    quiet0 = models.IntegerField(default=0)
    quiet1 = models.IntegerField(default=0)
    groups0 = models.IntegerField(default=0)
    groups1 = models.IntegerField(default=0)
    spend0 = models.IntegerField(default=0)
    spend1 = models.IntegerField(default=0)

    class Meta:
        ordering = ['pid']

    def __str__(self):
        return self.coords


class Address(models.Model):
    pid = models.CharField(max_length=100, blank=True,
                           default='', primary_key=True)
    lng = models.FloatField(default=0)
    lat = models.FloatField(default=0)
    name = models.TextField(default='')
    address = models.CharField(default='', max_length=200)
