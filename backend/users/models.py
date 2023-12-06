# models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, did, **extra_fields):
        user = self.model(did=did, **extra_fields)
        user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, did, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(did, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    did = models.CharField(max_length=255, unique=True)
    username = models.CharField(max_length=30, blank=True)
    email = models.EmailField(blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'did'
    REQUIRED_FIELDS = []

     # password-related fields
    password = None
    has_usable_password = False

    def __str__(self):
        return self.did
