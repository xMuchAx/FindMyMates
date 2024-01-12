import uuid
from users.models import User
from django.db import models

class Event(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4(), editable=False)
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=32)
    description = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    duration = models.DurationField()
    location = models.CharField(max_length=255, null=True)
    vacant_places = models.IntegerField()

    class Meta:
        db_table='events'

class EventHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table='event_history'
