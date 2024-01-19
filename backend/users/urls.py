from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login.login, name='login'),
    path('register/', views.register.register, name='register'),
    path('update/', views.update.update_profile, name='update_profile'),
    path('delete/', views.delete.delete_user, name='delete_user')
]