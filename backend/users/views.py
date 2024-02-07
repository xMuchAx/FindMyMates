from django.shortcuts import get_object_or_404, render
from users.models import User
from events.models import Event
from rest_framework import viewsets, status
from users.serializer import UserSerializer, UserUpdateSerializer
from events.serializer import EventSerializer
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
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q

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
            refresh = RefreshToken.for_user(user)
           # token = Token.objects.get(user=user)
            return Response({"token": str(refresh.access_token),"user_id": user.id, "message": "User logged in successfully"}, status=200)
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

            return Response({"user_id": user.id, "message": "User created successfully"}, status=201)
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
        required=['user','tags'],
    )
)
    @renderer_classes([JSONRenderer])
    @action(detail=False, methods=['post'])
    def add_tags(self, request):
        user_id = request.data.get('user')
        tags = request.data.get('tags', [])

        user = get_object_or_404(User, id=user_id)

        current_tags = user.tags.split(',') if user.tags else []

        current_tags.extend(tags)

        user.tags = ','.join(current_tags)
        user.save()

        return Response({"message": "Tags added successfully"}, status=200)

    def get_tags(self, request, user):
        user = get_object_or_404(User, id=user)

        user_tags = user.tags.split(',') if user.tags else []

        return Response({"tags": user_tags}, status=200)
    
    
    @swagger_auto_schema(
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'user': openapi.Schema(type=openapi.TYPE_STRING),
            'tag': openapi.Schema(type=openapi.TYPE_STRING),
        },
        required=['user'],
    )
)
    @renderer_classes([JSONRenderer])
    @action(detail=False, methods=['post'])
    def remove_tag(request):
        user_id = request.data.get('user')
        tag_to_remove = request.data.get('tag')

        user = get_object_or_404(User, id=user_id)

        current_tags = user.tags.split(',') if user.tags else []

        if tag_to_remove in current_tags:
            current_tags.remove(tag_to_remove)

            user.tags = ','.join(current_tags)
            user.save()

            return Response({"message": "Tag removed successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Tag not found"}, status=status.HTTP_404_NOT_FOUND)
        
        
     
    @action(detail=False, methods=['get'])
    def user_recommendation(self, request,user):
        userFound = get_object_or_404(User, id=user)
        if userFound.tags is None or not userFound.tags:
           return Response([])

        current_tags = userFound.tags.split(',')
        query_all_conditions = Q()
        query_game_location = Q()
        query_game_any_location = Q()
        query_location = Q()
        for tag in current_tags :
            query_all_conditions &= (Q(game=tag) | Q(location__iexact='HOME'))
            query_game_location |= (Q(game=tag) | Q(location=tag))
            query_game_any_location |= Q(game=tag)
            query_location |= (Q(location=tag))

        queryset_all_conditions = Event.objects.filter(query_all_conditions)
        queryset_game_location = Event.objects.filter(query_game_location | query_game_any_location)
        queryset_location = Event.objects.filter(query_location)

        result_all_conditions = EventSerializer(queryset_all_conditions, many=True).data
        result_game_location = EventSerializer(queryset_game_location, many=True).data
        result_location = EventSerializer(queryset_location, many=True).data

        response_data = {
            "result_all_conditions": result_all_conditions,
            "result_game_location": result_game_location,
            "result_location": result_location,
        }

        return Response(response_data)

        
        



