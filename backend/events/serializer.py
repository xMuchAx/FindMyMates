from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['host', 'title', 'description', 'date', 'time', 'duration', 'location', 'vacant_places']