import uuid
from users.models import User
from django.db import models

class Event(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=32)
    description = models.CharField(max_length=255)
    date_start = models.DateTimeField(null=True)
    date_end = models.DateTimeField(null=True)
    duration = models.DurationField(blank=True)
    location = models.CharField(max_length=255, null=True)
    game = models.CharField(max_length=255, null=True)
    maximum_place = models.IntegerField(null=True)
    vacant_places = models.IntegerField()
    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.png')

    class Meta:
        db_table='events'
    def get_members(self):
        return EventHistory.objects.filter(event=self)
    def save(self, *args, **kwargs):
        if self.date_start and self.date_end:
            self.duration = self.date_end - self.date_start
        super().save(*args, **kwargs)
   

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
    event_number = models.IntegerField()
    avatar = models.CharField(max_length=500)
    class Meta:
        db_table='game'
