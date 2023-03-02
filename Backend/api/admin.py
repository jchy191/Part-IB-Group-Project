from django.contrib import admin
from .models import Entry

@admin.register(Entry)
class EntryAdmin(admin.ModelAdmin):
    admin.site.site_header = 'Just Maps Admin Page'
    admin.site.site_title = 'Just Maps Admin'
    list_display = ('id', 'created', 'pid', 'long', 'lat', 'open', 'comment', 'reported', 'pinned')
    search_fields = ['id', 'created', 'pid', 'long', 'lat', 'open', 'comment', 'reported', 'pinned']
    list_filter = ('reported', 'pinned', 'pid')
