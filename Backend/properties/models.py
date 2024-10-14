import uuid
from django.conf import settings

from useraccount.models import User
from django.db import models
from django.template.defaultfilters import slugify

# Create your models here.


class Properties(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    price_per_night = models.IntegerField()
    guests = models.IntegerField()
    country = models.CharField(max_length=255)
    country_code = models.CharField(max_length=10)
    category = models.CharField(max_length=255)
    favorite = models.ManyToManyField(
        User, related_name="favorites", blank=True)
    landlord = models.ForeignKey(
        User, related_name="properties", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.country})"


def image_urls(instance, filename):
    title_slug = slugify(instance.property.title)
    return "post_images/%s-%s" % (title_slug, str(uuid.uuid4())[:8] + "-" + filename)


class PropertyImage(models.Model):
    property = models.ForeignKey(
        Properties, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to="uploads/properties", null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Image for {self.property.title} uploaded on {self.uploaded_at}"


class Reservation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    property = models.ForeignKey(
        Properties, related_name="reservations", on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    number_of_nights = models.IntegerField()
    guests = models.IntegerField()
    total_price = models.FloatField()
    created_by = models.ForeignKey(
        User, related_name="reservations", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    property = models.ForeignKey(
        Properties, related_name="comments", on_delete=models.CASCADE)
    user = models.ForeignKey(
        User, related_name="comments", on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.property.title}"
