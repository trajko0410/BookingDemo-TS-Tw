# Generated by Django 5.1.1 on 2024-10-03 22:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0002_remove_properties_image_propertyimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='propertyimage',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/properties'),
        ),
    ]
