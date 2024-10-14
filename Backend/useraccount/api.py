import os
from django.conf import settings

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.http import JsonResponse

from .models import User
from .serializers import UserDetailSerializer
from properties.serializers import ReservationsListSerializer


from .form import AvatarForm


@api_view(['GET'])
@authentication_classes([])  # EVVRYONE CAN SEE
@permission_classes([])
def landlord_details(request, pk):
    user = User.objects.get(pk=pk)
    print(user, pk, "userr")
    serializer = UserDetailSerializer(user, many=False)
    print(serializer.data, "Sre")

    return JsonResponse(serializer.data, safe=False)


@api_view(["GET"])
def reservation_list(request):
    # user je povezan preko primary keya i ima name reservations
    reservations = request.user.reservations.all()
    serializer = ReservationsListSerializer(
        # context za slike nece raditi bez toga
        reservations, many=True, context={'request': request})

    return JsonResponse(serializer.data, safe=False)


@api_view(["POST"])
def upload_avatar(request):

    form = AvatarForm(request.POST, request.FILES)

    if form.is_valid():
        user = request.user  # Get the currently logged-in user

        if user.avatar and hasattr(user.avatar, 'path'):
            old_avatar_path = user.avatar.path  # Get the path to the old avatar

            # Check if the old avatar is not the default avatar
            if old_avatar_path != os.path.join(settings.MEDIA_ROOT, 'uploads/avatar/default-avatar.png'):
                if os.path.isfile(old_avatar_path):  # Check if the old file exists
                    os.remove(old_avatar_path)  # Delete the old avatar file

        user.avatar = form.cleaned_data['avatar']  # Set the new avatar
        user.save()  # Save the user instance

        return JsonResponse({
            "success": True,
            "avatar_url": user.avatar.url  # Return the new avatar URL
        })
    else:
        print("error", form.errors)  # Print form errors for debugging
        return JsonResponse({
            "errors": form.errors.as_json()  # Return errors in JSON format
        }, status=400)
