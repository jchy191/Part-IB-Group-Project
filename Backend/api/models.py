from django.db import models
from utils.model_abstracts import Model

ENTRY_TYPE = ['open', 'friendly', 'quiet', 'groups', 'spend']

ACC_OPTIONS = ['closed','open', 'hostile','friendly', 'busy','quiet', 'bad_group','good_group', 'no_spend_pressure', 'spend_pressure']
ACC_TYPE = ['open_type', 'friendly_type', 'quiet_type', 'good_group_type', 'spend_pressure_type']



class Entry(models.Model):
    class Type(models.IntegerChoices):
        TRUE = 0
        FALSE = 1
        NONE = 2
    created = models.DateTimeField(auto_now_add=True)
    pid = models.CharField(max_length=100, blank=True, default='')
    long = models.FloatField(default=0)
    lat = models.FloatField(default=0)
    open = models.IntegerField(choices=Type.choices, default=Type.NONE)
    friendly = models.IntegerField(choices=Type.choices, default=Type.NONE)
    quiet = models.IntegerField(choices=Type.choices, default=Type.NONE)
    groups = models.IntegerField(choices=Type.choices, default=Type.NONE)
    spend = models.IntegerField(choices=Type.choices, default=Type.NONE)
    comment= models.TextField()
    reported = models.BooleanField(default=False)
    pinned = models.BooleanField(default=False)

    class Meta:
        ordering = ['created']

    def __str__(self):
        return self.comment
    
class AccEntry(models.Model):
    pid = models.CharField(max_length=100, blank=True, default='', primary_key=True)
    open_type = models.BooleanField(default=False)
    friendly_type = models.BooleanField(default=False)
    quiet_type = models.BooleanField(default=False)
    good_group_type = models.BooleanField(default=False)
    spend_pressure_type = models.BooleanField(default=False)
    long = models.FloatField(default=0)
    lat = models.FloatField(default=0)
    open = models.IntegerField(default=0)
    closed = models.IntegerField(default=0)
    friendly = models.IntegerField(default=0)
    hostile = models.IntegerField(default=0)
    quiet = models.IntegerField(default=0)
    busy = models.IntegerField(default=0)
    good_group = models.IntegerField(default=0)
    bad_group = models.IntegerField(default=0)
    spend_pressure = models.IntegerField(default=0)
    no_spend_pressure = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['pid']

    def __str__(self):
        return self.coords