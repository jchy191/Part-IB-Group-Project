# Generated by Django 4.1.3 on 2023-03-03 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0011_accentry_address_accentry_name_entry_title"),
    ]

    operations = [
        migrations.AddField(
            model_name="entry", name="address", field=models.TextField(default=""),
        ),
        migrations.AddField(
            model_name="entry", name="name", field=models.TextField(default=""),
        ),
    ]
