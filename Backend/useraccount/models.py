import uuid
from django.db import models

from django.conf import settings

from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin

# Create your models here.


class UserManager(UserManager):
    def _create_user(self, username, email, password,  **extra_fields):
        if not email:
            raise ValueError("Please entere valid e-mail address!")

        email = self.normalize_email(email)
        user = self.model(username=username, email=email,
                          **extra_fields)
        user.set_password(password)  # hasshing
        user.save(using=self.db)

        return user

    def create_user(self, username=None, email=None, password=None,  **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_active", True)  # Set verified by default
        return self._create_user(username, email, password, **extra_fields)

    def create_superuser(self, username=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        return self._create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False
    )
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, blank=True, null=True)
    avatar = models.ImageField(
        upload_to="uploads/avatar", default="/uploads/avatar/default-avatar.png")

    is_active = models.BooleanField(default=True)  # baseuser
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)  # permision

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def avatar_url(self):
        if self.avatar and hasattr(self.avatar, 'url'):
            return f'{settings.WEBSITE_URL}{self.avatar.url}'
        # URL for default avatar
        return f'{settings.WEBSITE_URL}/media/uploads/avatar/default-avatar.png'
