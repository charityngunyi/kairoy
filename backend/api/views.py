from django.shortcuts import render
# views.py
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from users.models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.generics import (ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView,
	RetrieveUpdateAPIView, UpdateAPIView)
from rest_framework.permissions import IsAuthenticated, AllowAny

# checks if email exists
class CheckEmailView(APIView):
    def get(self, request, email):
        try:
            user = CustomUser.objects.get(email=email)
            return Response({'did': user.did}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({'message': 'Email does not exist'}, status=status.HTTP_404_NOT_FOUND)

# checks id Did exists
class CheckDidAvailabilityView(APIView):
    def get(self, request, did):
        # Check if the provided did is available
        user_exists = CustomUser.objects.filter(did=did).exists()

        # Return a response based on whether the did is available or not
        if user_exists:
            return Response({'message': 'DID is not available'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'DID is available'}, status=status.HTTP_200_OK)

# Get user data
class UserDetailView(APIView):
    def get(self, request, did):
        user = CustomUser.objects.get(did=did)
        serializer = CustomUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


# User edit details
# 
class CustomUserAPIView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]




class CustomUserCreateView(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]


class CustomUserUpdateView(RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]