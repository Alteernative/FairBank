# Generated by Django 5.0.6 on 2024-07-26 02:44

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0014_rename_email_contactusmessages_email_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='PendingUsersUpdates',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(blank=True, max_length=255, null=True)),
                ('prenom', models.CharField(blank=True, max_length=255, null=True)),
                ('tmp_nom', models.CharField(blank=True, max_length=255, null=True)),
                ('tmp_prenom', models.CharField(blank=True, max_length=255, null=True)),
                ('email', models.EmailField(max_length=254)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pending_updates', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
