# Generated by Django 4.1.3 on 2023-02-23 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_entry'),
    ]

    operations = [
        migrations.AddField(
            model_name='entry',
            name='comment',
            field=models.TextField(default='Default'),
            preserve_default=False,
        ),
    ]