from django.urls import path
from . import views


urlpatterns = [
    
    path('login/', views.UserViewSet.as_view({'post': 'login'}), name='login'), 
    path('register/', views.UserViewSet.as_view({'post': 'register'}), name='register'), 
    path('update/', views.UserViewSet.as_view({'put': 'update_profile'}), name='update_profile'), 
    path('user-delete/', views.UserViewSet.as_view({'delete': 'delete_user'}), name='delete'), 
    path('user-detail/<str:pk>/', views.UserViewSet.as_view({'get': 'retrieve'}), name='event-detail'), 
    path('add-tags/', views.UserViewSet.as_view({'post': 'add_tags'}), name='add_tags'), 
    path('list-tag/<str:user>/', views.UserViewSet.as_view({'get': 'get_tags'}), name='list'), 

]