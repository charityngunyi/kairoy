from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['did'] = user.did
        # ...

        return token

    def validate(self, attrs):
        did = attrs.get('did', None)

        # Perform any custom validation here

        # Check if a user with the provided did exists
        user_model = get_user_model()
        user = user_model.objects.filter(did=did).first()

        if user:
            refresh = self.get_token(user)
            data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
            return data

        raise serializers.ValidationError("Invalid did or user does not exist.")

    def to_internal_value(self, data):
        try:
            return super().to_internal_value(data)
        except serializers.ValidationError as exc:
            return {"detail": str(exc)}

# Optionally, you can customize the error message further by modifying the detail key in the response.
