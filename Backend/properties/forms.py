from django import forms
from .models import Properties, PropertyImage


class PropertyForm(forms.ModelForm):
    class Meta:
        model = Properties
        fields = {
            "title",
            "category",
            "description",
            "price_per_night",
            "guests",
            "country",
            "country_code",
        }
