# users/views.py
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from rest_framework.views import exception_handler
from rest_framework.response import Response

def custom_exception_handler(exc, context):
  response = exception_handler(exc, context)

  if isinstance(exc, serializers.ValidationError):
    # Extract error details
    errors = {}
    for field, error_list in exc.detail.items():
      errors[field] = error_list[0] # Assuming only one error per field

    response.data = {'detail': errors}

  return response