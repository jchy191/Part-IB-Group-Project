# Generated by Django 4.1.3 on 2023-03-02 19:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0008_rename_bad_group_accentry_friendly0_and_more"),
    ]

    operations = [
        migrations.RenameField(model_name="accentry", old_name="long", new_name="lng",),
        migrations.RenameField(model_name="entry", old_name="long", new_name="lng",),
    ]
