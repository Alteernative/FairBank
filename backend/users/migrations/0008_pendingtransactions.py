# Generated by Django 5.0.6 on 2024-07-09 20:07

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_transaction'),
    ]

    operations = [
        migrations.CreateModel(
            name='PendingTransactions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('pending', 'pending'), ('accepted', 'accepted'), ('rejected', 'rejected')], default='pending', max_length=20)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pending_received_transactions', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pending_sender_transactions', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]