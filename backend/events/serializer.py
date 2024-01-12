from rest_framework import serializers
from users.serializer import UserSerializer
from events.models import Event
from events.models import EventHistory


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        

class EventHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EventHistory
        fields = '__all__'
        
class EventHistoryDetailSerializer(serializers.ModelSerializer):
    event = EventSerializer(many = True, read_only = True)
    user = UserSerializer(many = True, read_only = True)
    
    class Meta:
        model = EventHistory
        fields = ['id','event', 'user']
