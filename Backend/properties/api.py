from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework import status

from .serializers import PropertieDetailSerializer, PropertyListSerializer, ReservationsListSerializer, CommentSerializer


from django.http import JsonResponse
from .models import Properties, PropertyImage, Reservation, Comment

from useraccount.models import User

from .forms import PropertyForm


@api_view(["GET"])
@authentication_classes([])  # GOVORIMODA NE MORAMO BITI AUTH ZA OVAJ VIEW
@permission_classes([])
def property_list(request):
    user = None
    try:
        token = request.headers.get('Authorization').split("Bearer ")[1]
        token = AccessToken(token)
        user_id = token.payload['user_id']
        user = User.objects.get(pk=user_id)
    except Exception as e:
        user: None

    # print(user, "user")
    properties = Properties.objects.all()  # svi properti
    favorite = []  # favorite items

    landlord_id = request.GET.get("landlord_id", "")
    if landlord_id:
        properties = properties.filter(
            landlord_id=landlord_id)  # samo sa landlord id

    is_favorite = request.GET.get("is_favorites", "")
    if is_favorite == "true" and user:  # Ensure user is defined before filtering
        properties = properties.filter(favorite__in=[user])

    # FILTER COUNTRY
    country = request.GET.get("country", "")
    if country:
        properties = properties.filter(country=country)

    # FILTER CATEGORY
    category = request.GET.get('category', '')
    if category and category != 'undefined':
        properties = properties.filter(category=category)

    # FILTER GUESTS
    guests = request.GET.get('numGuests', '')
    if guests:
        properties = properties.filter(guests__gte=guests)

    # FILTER CHECKIN CHECKOUT
    checkin_date = request.GET.get('checkIn', '')
    checkout_date = request.GET.get('checkOut', '')
    if checkin_date and checkout_date:
        exact_match = Reservation.objects.filter(
            start_date=checkin_date) | Reservation.objects.filter(
                end_date=checkout_date)
        overlap_matches = Reservation.objects.filter(
            start_data__lte=checkout_date, end_date__gte=checkin_date)
        all_matches = []

        for reservation in exact_match | overlap_matches:
            all_matches.append(reservation.property_id)

        # vrati mi sve koje se ne poklapaju
        properties = properties.exclude(id__in=all_matches)

    serializer = PropertyListSerializer(
        properties, many=True,  context={'request': request})
    # print(serializer.data, "serializer in api")

    if user:
        for property in properties:
            if user in property.favorite.all():
                favorite.append(property.id)

    # print(favorite, "fav")

    return JsonResponse({
        "data": serializer.data,
        "favorites": favorite
    })


@api_view(["GET"])
@authentication_classes([])  # GOVORIMODA NE MORAMO BITI AUTH ZA OVAJ VIEW
@permission_classes([])
def property_detail(request, pk):
    propertie = Properties.objects.get(pk=pk)
    serializer = PropertieDetailSerializer(
        propertie, many=False,  context={'request': request})
    # print(serializer.data, "serializer in api")
    return JsonResponse(serializer.data)


@api_view(['POST'])
def toggle_favorite(request, pk):
    property = Properties.objects.get(pk=pk)

    # print(request.user, "rea")
    # ako je user nalazi u favoritilma all svim onda ga promeni na fals
    if request.user in property.favorite.all():
        property.favorite.remove(request.user)
        # ovo koristim samo za trenutno updatujem ui da ne ref stranu
        return JsonResponse({"is_favorite": False}, safe=False)
    else:
        property.favorite.add(request.user)
        return JsonResponse({"is_favorite": True})


@api_view(["POST", "FILES"])
def create_property(request):
    form = PropertyForm(request.POST, request.FILES)

    if form.is_valid():
        property = form.save(commit=False)  # nemoj savovati jos unve
        # print(property, "api adding")
        property.landlord = request.user  # Assign the landlord or other necessary fields
        property.save()

        images = request.FILES.getlist('images')
        for image in images:
            PropertyImage.objects.create(property=property, image=image)

        return JsonResponse({
            "success": True
        })
    else:
        print("error", form.errors, form.non_field_errors)
        return JsonResponse({
            "errors": form.errors.as_json()}, status=400
        )


@api_view(["POST"])
def book_property(request, pk):
    try:
        start_date = request.POST.get("start_date", "")
        end_date = request.POST.get('end_date', '')
        number_of_nights = request.POST.get('number_of_nights', '')
        total_price = request.POST.get('total_price', '')
        guests = request.POST.get('guests', '')

        property = Properties.objects.get(pk=pk)
        Reservation.objects.create(
            property=property,
            start_date=start_date,
            end_date=end_date,
            number_of_nights=number_of_nights,
            total_price=total_price,
            guests=guests,
            created_by=request.user
        )
        return JsonResponse({"success": True})

    except Exception as e:
        print(e, "Error")
        return JsonResponse({"success": False})


@api_view(["GET"])
@authentication_classes([])  # GOVORIMODA NE MORAMO BITI AUTH ZA OVAJ VIEW
@permission_classes([])
def property_reservations(reques, pk):
    property = Properties.objects.get(pk=pk)
    reservations = property.reservations.all()

    serializer = ReservationsListSerializer(reservations, many=True)
    return JsonResponse(serializer.data, safe=False)


# add new comment
@api_view(['POST'])
def add_comment(request, property_id):
    try:
        property = Properties.objects.get(id=property_id)
    except Properties.DoesNotExist:
        return JsonResponse({"error": "Property not found"}, status=404)

    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user, property=property)
        return JsonResponse({"data": serializer.data, "success": True}, status=status.HTTP_201_CREATED)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@authentication_classes([])  # GOVORIMODA NE MORAMO BITI AUTH ZA OVAJ VIEW
@permission_classes([])
def property_comments(request, property_id):
    try:
        property = Properties.objects.get(id=property_id)
    except Properties.DoesNotExist:
        return JsonResponse({"error": "Property not found"}, status=status.HTTP_404_NOT_FOUND)

    comments = property.comments.all()
    serializer = CommentSerializer(comments, many=True)
    return JsonResponse({"data": serializer.data}, safe=False)

# eddit comment


@api_view(['PUT'])
def update_comment(request, comment_id):
    try:
        # Ensure the user owns the comment
        comment = Comment.objects.get(id=comment_id, user=request.user)
    except Comment.DoesNotExist:
        return JsonResponse({"error": "Comment not found or not allowed to edit"}, status=404)

    serializer = CommentSerializer(comment, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"success": True})
    return JsonResponse(serializer.errors, status=400)


@api_view(['DELETE'])
def delete_comment(request, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id, user=request.user)
    except Comment.DoesNotExist:
        return JsonResponse({"error": "Comment not found or not allowed to delete"}, status=404)

    comment.delete()
    return JsonResponse({"success": True}, status=204)
