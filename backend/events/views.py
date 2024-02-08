from events.models import Event, EventHistory, EventUserFavori, Game
from events.serializer import  EventSerializer, EventHistorySerializer, GameSerializer, EventUserFavoriSerializer, UserEventHistoryDetailSerializer, EventCreateSerializer, EventUserDetailFavoriSerializer
from rest_framework import viewsets,  generics, status
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import renderer_classes
from rest_framework.decorators import action
from rest_framework.decorators import authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions
from datetime import datetime
from django.utils import timezone

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    def get_serializer_class(self):
        if self.action == 'create':
            return EventCreateSerializer
        return EventSerializer
 
    # permission_classes = [IsAuthenticated]
    
    @swagger_auto_schema(
    method='get',
    responses={200: EventSerializer(many=True)},)
    @renderer_classes([JSONRenderer])
    @action(detail=False, methods=['get'])
    def search_event(self, request, game=None):
        events = Event.objects.filter(game=game)
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)
    
    
    @swagger_auto_schema(
    method='get',
    responses={200: EventSerializer(many=True)},)
    @renderer_classes([JSONRenderer])
    @action(detail=False, methods=['get'])
    def search_event_by_name(self, request, name):
        events = Event.objects.filter(title__icontains=name)
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)
    
    
    @swagger_auto_schema(
    method='get',
    responses={200: EventSerializer(many=True)},)
    @renderer_classes([JSONRenderer])
    @action(detail=False, methods=['get'])
    def search_event_by_host(self, request, host):
        events = Event.objects.filter(host=host)
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)
    
    
    @swagger_auto_schema(
    method='get',
    responses={200: EventSerializer(many=True)},)
    @renderer_classes([JSONRenderer])
    @action(detail=False, methods=['get'])
    def get_events_in_progress(self, request):
        current_time = timezone.now()
        
        events_in_progress = []
        events = Event.objects.all()
        for event in events:
            
            start_time = event.date_start
            end_time = event.date_end

            if start_time <= current_time <= end_time:
                events_in_progress.append(event)
        serializer = self.get_serializer(events_in_progress, many=True)     
        return  Response(serializer.data)
    
    
    # @swagger_auto_schema(
    # method='get',
    # responses={200: EventSerializer(many=True)},)
    # @renderer_classes([JSONRenderer])
    # @action(detail=False, methods=['get'])
    
    # # def get_events_in_progress_for_user(self, request, user):
    # #     current_time = timezone.now()
        
    # #     events_in_progress = []
    # #     events_history = EventHistory.objects.filter(user=user)
        
      
        
    # #     for event_history in events_history: 
    # #         print('aaa')

    # #         event_id = event_history.event
    # #         print(event_id.id)

    # #     return Response('ok')

         

class EventHistoryViewSet(viewsets.ModelViewSet):
    queryset = EventHistory.objects.all()
    serializer_class = EventHistorySerializer
    # permission_classes = [IsAuthenticated]
    

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        user_id = request.data.get('user')
        event_id = request.data.get('event')
        # Vérifiez si l'utilisateur est déjà membre de cet événement
        existing_membership = EventHistory.objects.filter(user=user_id, event=event_id).first()
        host_event = Event.objects.filter(host = user_id, id = event_id ).first()
        event = Event.objects.filter(id = event_id ).first()
        if host_event:
            return Response({"message": "Vous êtes l'organisateur de cet événement."}, status=status.HTTP_400_BAD_REQUEST)

        if existing_membership:
            return Response({"message": "Vous êtes déjà membre de cet événement."}, status=status.HTTP_400_BAD_REQUEST)
        
        # if event.vacant_places == 0:
        #     return Response({"message": "L'équipe est complete."}, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            event.vacant_places -= 1
            event.save()
            
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        
    
    @swagger_auto_schema(
        method='get',
        responses={200: EventHistorySerializer(many=True)}
    )
    @action(detail=False, methods=['get'])
    def user_history(self, request, iduser=None):
        try:
            events = EventHistory.objects.filter(user=iduser)
            serializer = UserEventHistoryDetailSerializer(events, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except EventHistory.DoesNotExist:
            return Response([], status=status.HTTP_404_NOT_FOUND)
    
    
    @swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['user','event'],
        properties={
            'user': openapi.Schema(type=openapi.TYPE_STRING),
            'event': openapi.Schema(type=openapi.TYPE_STRING),
        }
    ),
)
    @renderer_classes([JSONRenderer])     
    @action(detail=False, methods=['post'])
    def user_event_history(self, request, *args, **kwargs):
       try:
          user =  request.data.get('user')
          event =  request.data.get('event')
          eventFound = EventHistory.objects.filter(user = user, event = event).first()
          if eventFound:
            serializer = UserEventHistoryDetailSerializer(eventFound, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
          else:
            return Response([])

       except Event.DoesNotExist:
          return Response([])
      
       
    @swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['user','event'],
        properties={
            'user': openapi.Schema(type=openapi.TYPE_STRING),
            'event': openapi.Schema(type=openapi.TYPE_STRING),
        }
    ),
)
    @action(detail=False, methods=['post'])
    def delete_user_history(self, request):
        user = request.data.get('user')
        event = request.data.get('event')

        if not user or not event:
            return Response({"message": "Données utilisateur ou événement manquantes"}, status=status.HTTP_400_BAD_REQUEST)

        eventHistoryFound = EventHistory.objects.filter(user=user, event=event).first()

        # Vérification si l'historique d'événements a été trouvé
        if not eventHistoryFound:
            return Response({"message": "Historique d'événements non trouvé"}, status=status.HTTP_404_NOT_FOUND)

        # Utilisation de la méthode delete() pour supprimer l'entrée de l'historique d'événements
        eventHistoryFound.delete()

        # Mise à jour du nombre de places disponibles pour l'événement
        eventFound = Event.objects.filter(id=event).first()

        # Vérification si l'événement a été trouvé
        if eventFound:
            eventFound.vacant_places += 1
            eventFound.save()
            return Response({"message": "Vous n'êtes plus membre de l'équipe"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Événement non trouvé"}, status=status.HTTP_404_NOT_FOUND)
        


class EventFavoriViewSet(viewsets.ModelViewSet):
    queryset = EventUserFavori.objects.all()
    serializer_class = EventUserFavoriSerializer
    # permission_classes = [IsAuthenticated]

    lookup_field = 'user'
    def get_serializer_class(self):
        if self.action in  ['create', 'update']:
            return EventUserFavoriSerializer
        return EventUserDetailFavoriSerializer


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        user_id = request.data.get('user')
        event_id = request.data.get('event')

        existing_membership = EventUserFavori.objects.filter(user=user_id, event=event_id).first()

        if existing_membership:
            return Response({"message": "Vous avez déja cet évenement dans votre liste de favoris."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


    @swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['user'],
        properties={
            'user': openapi.Schema(type=openapi.TYPE_STRING),
        }
    ),
)
    
    @renderer_classes([JSONRenderer])
    @action(detail=False, methods=['post'])
    def event_favorites(self, request):
       try:
          user =  request.data.get('user')
          event = EventUserFavori.objects.filter(user = user)
          serializer = self.get_serializer(event, many=True)

          return Response(serializer.data)
       except Event.DoesNotExist:
          return Response([])
       

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticated]
    

    

  
