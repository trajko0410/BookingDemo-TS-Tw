from django.forms import ModelForm
from .models import User


class AvatarForm(ModelForm):
    class Meta:
        model = User
        fields = ['avatar']  # Include the avatar field
