from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes

from ..models import User

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password", "avatar", "bio"]

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def update_profile(request):
    if(request.user.is_authenticated):
        serializer = UserUpdateSerializer(request.user, data=request.data, partial=True)
        if(serializer.is_valid()):
            serializer.save()
            return Response({"message": "Profile updated successfully"}, status=200)
    else:
        return Response({"message": "Invalid credentials"}, status=401)
