from django.shortcuts import get_object_or_404, render
from users.models import User
from rest_framework import viewsets
from users.serializer import UserSerializer, UserUpdateSerializer
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from django.contrib.auth.hashers import make_password
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.decorators import action


# Create your views here.

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['email', 'password'],
        properties={
            'email': openapi.Schema(type=openapi.TYPE_STRING),
            'password': openapi.Schema(type=openapi.TYPE_STRING),
        }
    ),
    responses={200: 'User logged in successfully', 401: 'Wrong password', 404: 'User not found'}
)

    @renderer_classes([JSONRenderer])
    @action(detail=False, methods=['post'])
    def login(self,request):
        try:
            user = User.objects.get(email=request.data.get("email"))
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=404)

        if(user.check_password(request.data.get("password"))):
            token = Token.objects.get(user=user)
            return Response({"token": token.key,"user_id": user.id, "message": "User logged in successfully"}, status=200)
        else:
            return Response({"message": "Wrong password"}, status=401)


    @swagger_auto_schema(method='post', request_body=UserSerializer, responses={201: 'Created', 422: 'Unprocessable Entity'})
    @renderer_classes([JSONRenderer])
    @action(detail=False, methods=['post'])
   
    def register(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            # Hasher le mot de passe
            userdata = serializer.validated_data.copy()
            userdata["password"] = make_password(userdata["password"])
            # Créer l'utilisateur avec les données traitées
            user = User.objects.create(**userdata)

            # Créer le token
            token = Token.objects.create(user=user)

            return Response({"token": token.key, "user_id": user.id, "message": "User created successfully"}, status=201)
        else:
            return Response(serializer.errors, status=422)


    @action(detail=False, methods=['put'])
    @authentication_classes([TokenAuthentication])
    def update_profile(self,request):
            if(request.user.is_authenticated):
                serializer = UserUpdateSerializer(request.user, data=request.data, partial=True)
                if(serializer.is_valid()):
                    serializer.save()
                    return Response({"message": "Profile updated successfully"}, status=200)
            else:
                return Response({"message": "Invalid credentials"}, status=401)

    @action(detail=False, methods=['delete'])
    @authentication_classes([TokenAuthentication])
    def delete_user(self,request):
        if(request.user.is_authenticated):
            request.user.delete()
            return Response({"message": "Profile deleted successfully"}, status=200)
        else:
            return Response({"message": "Invalid credentials"}, status=401)

    @swagger_auto_schema(
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'user': openapi.Schema(type=openapi.TYPE_STRING),
            'tags': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_STRING)),
        },
        required=['user'],
    )
)
    @renderer_classes([JSONRenderer])
    @action(detail=False, methods=['post'])
    def add_tags(self, request):
        user_id = request.data.get('user')
        tags = request.data.get('tags', [])

        user = get_object_or_404(User, id=user_id)

        # Récupérer les tags actuels de l'utilisateur
        current_tags = user.tags.split(',') if user.tags else []

        # Ajouter les nouveaux tags à la liste existante
        current_tags.extend(tags)

        # Mettre à jour le champ tags dans la base de données
        user.tags = ','.join(current_tags)
        user.save()

        return Response({"message": "Tags added successfully"}, status=200)

    def get_tags(self, request, user):
        user = get_object_or_404(User, id=user)

        # Récupérer les tags de l'utilisateur
        user_tags = user.tags.split(',') if user.tags else []

        return Response({"tags": user_tags}, status=200)
       



