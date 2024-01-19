from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from rest_framework.renderers import JSONRenderer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


from ..models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "avatar", "bio", "password"]


@swagger_auto_schema(method='post', request_body=UserSerializer, responses={201: 'Created', 422: 'Unprocessable Entity'})
@renderer_classes([JSONRenderer])
@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if(serializer.is_valid()):
        userdata = serializer.validated_data.copy()
        userdata["password"] = make_password(userdata["password"])

        user = User.objects.create(**userdata)
        token = Token.objects.create(user=user)

        return Response({"token": token.key, "user": user.id, "message": "User created successfully"}, status=201)
    else:
        return Response(serializer.errors, status=422)
