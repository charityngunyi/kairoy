# urls.py
from django.urls import path
from .views import CheckEmailView, CheckDidAvailabilityView, UserDetailView
from .views import CustomUserAPIView, CustomUserCreateView, CustomUserUpdateView


urlpatterns = [
    path('users/check-did/<str:did>/', CheckDidAvailabilityView.as_view(), name='check-did-availability'),
    path('users/check-email/<str:email>/', CheckEmailView.as_view(), name='check-email'),
    path('users/<str:did>/', UserDetailView.as_view(), name='user-detail'),
    # List view for all users
    path('users/', CustomUserAPIView.as_view(), name='user-list'),

    # Create view for user registration
    path('users/create/', CustomUserCreateView.as_view(), name='user-create'),

    # Retrieve and update view for individual user
    path('users/update/<str:did>/', CustomUserUpdateView.as_view(), name='user-update'),
    # Add other URL patterns as needed
]
