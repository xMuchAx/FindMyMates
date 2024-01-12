from django.shortcuts import render
from requests import Response
from events.models import Event, EventHistory
from events.serializer import EventSerializer, EventHistorySerializer, EventHistoryDetailSerializer
from rest_framework import viewsets


# Create your views here.
# crud pour enregistrer une équipe
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
#ws pour rejoindre un équipe
class EventHistoryViewSet(viewsets.ModelViewSet):
    queryset = EventHistory.objects.all()
    def get_serializer_class(self):
        if self.action in  ['create', 'update']:
            return EventHistorySerializer
        return EventHistoryDetailSerializer
    
    # def create(self, request, *args, **kwargs):
    #     event_member = EventHistory.objects.filter(user = request.data['user'], event = request.data['event']).first()
    #     if event_member:  
    #             raise ValueError('Vous avez deja rejoindre cet évenement')
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    
    
