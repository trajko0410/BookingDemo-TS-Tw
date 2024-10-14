from rest_framework import serializers

from .models import Properties, PropertyImage, Reservation, Comment
from useraccount.serializers import UserDetailSerializer


class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = PropertyImage
        fields = ["image_url"]

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request is None:  # Check if request is None
            return None
        return request.build_absolute_uri(obj.image.url)


class PropertyListSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Properties
        fields = (
            "id", "title", "price_per_night", "images",
        )


class PropertieDetailSerializer(serializers.ModelSerializer):
    landlord = UserDetailSerializer(read_only=True, many=False)
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Properties
        fields = (
            "id",
            "title",
            "description",
            "price_per_night",
            "guests",
            "landlord",
            "images",
        )


class ReservationsListSerializer(serializers.ModelSerializer):
    property = PropertyListSerializer(read_only=True, many=False)
    # images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Reservation
        fields = (
            'id', 'start_date', 'end_date', 'number_of_nights', 'total_price', 'property',
        )


class CommentSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'user', 'content', "title", 'created_at')
