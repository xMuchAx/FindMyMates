from django.db import models
from django.contrib.auth.models import AbstractBaseUser

import uuid



class User(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=32)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    tags = models.CharField(max_length=255, null=True)
    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.png')
    bio = models.CharField(max_length=255, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table='users'




    