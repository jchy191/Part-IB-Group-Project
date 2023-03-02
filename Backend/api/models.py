from django.db import models
from utils.model_abstracts import Model
from django_extensions.db.models import (
    TimeStampedModel,
    ActivatorModel,
    TitleDescriptionModel
)


class Contact(
        TimeStampedModel,
        ActivatorModel,
        TitleDescriptionModel,
        Model
):

    class Meta:
        verbose_name_plural = "Contacts"

    email = models.EmailField(verbose_name="Email")
    verified = models.BooleanField(default=False, verbose_name="Verified")

    def __str__(self):
        return f'{self.title}'

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
    long = models.FloatField(default=0)
    lat = models.FloatField(default=0)
    open = models.IntegerField(default=0)
    closed = models.IntegerField(default=0)

    class Meta:
        ordering = ['pid']

    def __str__(self):
        return self.coords