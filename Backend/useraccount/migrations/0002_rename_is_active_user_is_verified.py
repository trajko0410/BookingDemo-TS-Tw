# Generated by Django 5.1.1 on 2024-09-29 21:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('useraccount', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='is_active',
            new_name='is_verified',
        ),
    ]