import uuid
from django.db import models

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=32)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=128)

    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.png',null=True)
    about_me = models.CharField(max_length=255, null=True)

    class Meta:
        db_table='users'
