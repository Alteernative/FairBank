# Generated by Django 5.0.6 on 2024-07-11 00:23

import users.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_pendingtransactions_delete_pendingtrasactions'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='image_url',
            field=models.ImageField(blank=True, null=True, upload_to=users.models.upload_to),
        ),
    ]