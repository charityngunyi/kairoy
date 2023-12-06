# serializers.py
from rest_framework import serializers
from users.models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['did', 'username', 'email', 'is_active', 'is_staff']
