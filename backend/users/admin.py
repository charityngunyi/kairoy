# admin.py
from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import AuthenticationForm
from django import forms

class MyAuthenticationForm(AuthenticationForm):
    did = forms.CharField(label="DID", max_length=255)

class MyUserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'did', 'is_active', 'is_staff')
    # Override the authentication form
    authentication_form = MyAuthenticationForm

admin.site.register(get_user_model(), MyUserAdmin)
