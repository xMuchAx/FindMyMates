from rest_framework import serializers
from users.views.register import UserSerializer
from events.models import Event, EventUserFavori
from events.models import EventHistory


class EventSerializer(serializers.ModelSerializer):
    event_members = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = '__all__'

    def get_event_members(self, obj):
        event_history = EventHistory.objects.filter(event=obj)
        serializer = EventHistoryDetailSerializer(event_history, many=True)
        return serializer.data
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        event_members = representation.pop('event_members', [])
        representation['event_members'] = [
            {'user': member['user']} for member in event_members
        ]
        
        return representation


        

class EventHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EventHistory
        fields = '__all__'
        
class EventHistoryDetailSerializer(serializers.ModelSerializer):
     # event = EventSerializer(many = True, read_only = True)
    user = UserSerializer(read_only = True)
    
    class Meta:
        model = EventHistory
        fields = ['user']
        
class EventUserDetailFavoriSerializer(serializers.ModelSerializer):
    event = EventSerializer(read_only = True)

    class Meta:
        model = EventUserFavori
        fields = ['event']
        
class EventUserFavoriSerializer(serializers.ModelSerializer):

    class Meta:
        model = EventUserFavori
        fields = '__all__'

               