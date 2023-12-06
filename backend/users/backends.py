from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class DidAuthBackend(ModelBackend):
    def authenticate(self, request, did=None, **kwargs):
        UserModel = get_user_model()

        try:
            user = UserModel._default_manager.get(did=did)
        except UserModel.DoesNotExist:
            return None

        return user if self.user_can_authenticate(user) else None

    def get_user(self, user_id):
        UserModel = get_user_model()
        try:
            return UserModel._default_manager.get(did=user_id)
        except UserModel.DoesNotExist:
            return None
