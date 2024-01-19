from django.shortcuts import render
from users.models import User
from rest_framework import viewsets
from users.serializer import UserSerializer

# Create your views here.

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
      