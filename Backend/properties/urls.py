from django.urls import path
from . import api

urlpatterns = [
    path("", api.property_list, name="api_property_list"),
    path("<uuid:pk>", api.property_detail, name="api_properties_detail"),
    path("<uuid:pk>/toogle_favorite/",
         api.toggle_favorite, name="api_toggle_favorite"),
    path("create/", api.create_property,
         name="api_create_porperty"),  # create property
    path("<uuid:pk>/book/", api.book_property,
         name="api_book_property"),  # book
    path("<uuid:pk>/reservations/", api.property_reservations,
         name="api_propertie_reservations"),  # geet reservations

    path('<uuid:property_id>/comments/add/',
         api.add_comment, name='comment-add'),
    path('<uuid:property_id>/comments/get/',
         api.property_comments, name="comments-get"),
    path('<uuid:comment_id>/comments/edit/',
         api.update_comment, name="comment-edit"),
    path('<uuid:comment_id>/comments/delete/',
         api.delete_comment, name="comment-delete"),
]
