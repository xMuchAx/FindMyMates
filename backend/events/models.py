from users.models import User
from django.db import models
import uuid

class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=32)
    description = models.CharField(max_length=255)
    # date_start = models.DateTimeField()
    # date_end = models.DateTimeField()
    # duration = models.TimeField()
    date = models.DateField()
    time = models.TimeField()
    duration = models.DurationField()
    location = models.CharField(max_length=255, null=True)
    game = models.CharField(max_length=255, null=True)
    vacant_places = models.IntegerField()
    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.png')

    class Meta:
        db_table='events'
    def get_members(self):
        return EventHistory.objects.filter(event=self)


class EventHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table='event_history'

class EventUserFavori(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table='favoris'

class Game(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=32)
    url = models.CharField(max_length=500)

    class Meta:
        db_table='game'
