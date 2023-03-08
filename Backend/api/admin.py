from django.contrib import admin
from .models import Entry
from .views import updateacc, updatetype


@admin.register(Entry)
class EntryAdmin(admin.ModelAdmin):
    admin.site.site_header = 'Just Maps Admin Page'
    admin.site.site_title = 'Just Maps Admin'
    list_display = ('id', 'name', 'created', 'pid', 'open', 'friendly', 'quiet', 'groups', 'spend', 'comment', 'reported', 'pinned', 'address')
    search_fields = ['id', 'created', 'pid', 'lng',
                     'lat', 'open', 'comment', 'reported', 'pinned']
    list_filter = ('reported', 'pinned', 'name')

    def delete_queryset(self, request, queryset):
        
        for entry_values in queryset.values():
            updateacc(entry_values, -1)
            updatetype(entry_values)

        queryset.delete()

