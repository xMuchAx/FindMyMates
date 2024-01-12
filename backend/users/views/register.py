from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password

from ..models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password", "avatar_path", "bio"]

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if(serializer.is_valid()):
        userdata = serializer.validated_data.copy()
        userdata["password"] = make_password(userdata["password"])

        user = User.objects.create(**userdata)
        token = Token.objects.create(user=user)

        return Response({"token": token.key, "message": "User created successfully"}, status=201)
    else:
        return Response(serializer.errors, status=422)
