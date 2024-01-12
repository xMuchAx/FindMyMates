from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login.login, name='login'),
    path('register/', views.register.register, name='register'),
    path('update-profile/', views.update.update_profile, name='update_profile'),
    path('delete-user/', views.delete.delete_user, name='delete_user')
]