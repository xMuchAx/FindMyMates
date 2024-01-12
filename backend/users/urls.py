from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login.login, name='login'),
    path('register/', views.register.register, name='register'),
]