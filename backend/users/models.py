from django.db import models

class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=32)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=128)

    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.png')
    about_me = models.CharField(max_length=255, null=True)

    class Meta:
        db_table='users'
