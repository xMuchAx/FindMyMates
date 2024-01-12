from django.shortcuts import render
from events.models import Event, EventHistory
from events.serializer import EventSerializer, EventHistorySerializer, EventHistoryDetailSerializer
from rest_framework import viewsets


# Create your views here.
#
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
      
class EventHistoryViewSet(viewsets.ModelViewSet):
    queryset = EventHistory.objects.all()
    def get_serializer_class(self):
        if self.action in  ['create', 'update']:
            return EventHistorySerializer
        return EventHistoryDetailSerializer
    
   
    
    
