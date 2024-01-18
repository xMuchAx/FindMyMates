from django.urls import path
from .views import EventFavoriViewSet, EventHistoryViewSet, EventViewSet

app_name = 'events'

urlpatterns = [
    path('create-event/', EventViewSet.as_view({'post': 'create_event'}), name='create-event'),
    path('update-event/<str:pk>/', EventViewSet.as_view({'put': 'update_event'}), name='update-event'),
    path('delete-event/<str:pk>/', EventViewSet.as_view({'delete': 'destroy'}), name='delete-event'),
    path('list-event/', EventViewSet.as_view({'get': 'list'}), name='list-event'),
    path('partial-update-event/<str:pk>/', EventViewSet.as_view({'patch': 'partial_update'}), name='partial-update-event'),
    path('event-detail/<str:pk>/', EventViewSet.as_view({'get': 'retrieve'}), name='event-detail'), 
    path('joined-event/', EventHistoryViewSet.as_view(), name='joined-event'),
    path('search-event/', EventViewSet.as_view({'post': 'search_event'}), name='search-event'),
    path('favorites/', EventFavoriViewSet.as_view({'post': 'event_favorites',}), name='event-favoris-detail'),
    path('add-favorite/', EventFavoriViewSet.as_view({'post': 'create'}), name='add-favorite'),


    


]
