from rest_framework import serializers
from users.models import User

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id',"username", "email", "avatar", "bio", "password",]
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id',"username", "email", "avatar", "bio", "tags", "password",]

        
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "tags","password", "avatar", "bio"]
        




