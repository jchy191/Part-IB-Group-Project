# Generated by Django 4.1.3 on 2023-02-13 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="contact",
            name="verified",
            field=models.BooleanField(default=False, verbose_name="Verified"),
        ),
    ]
