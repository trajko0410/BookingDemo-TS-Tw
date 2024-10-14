from django.contrib import admin
from .models import Properties, PropertyImage

# Register your models here.


class PropertyImageInline(admin.TabularInline):  # You can also use StackedInline
    model = PropertyImage
    extra = 1  # Number of empty forms to display for adding new images


class PropertiesAdmin(admin.ModelAdmin):
    inlines = [PropertyImageInline]


# Register your models
admin.site.register(Properties, PropertiesAdmin)

admin.site.register(PropertyImage)
