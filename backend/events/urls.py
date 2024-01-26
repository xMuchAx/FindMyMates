from django.urls import path
from .views import EventFavoriViewSet, EventHistoryViewSet, EventViewSet, GameViewSet

app_name = 'events'

urlpatterns = [
    
 path('create-event/', EventViewSet.as_view({'post': 'create'}), name='create-event'),
    path('update-event/<str:pk>/', EventViewSet.as_view({'put': 'update'}), name='update-event'),
    path('delete-event/<str:pk>/', EventViewSet.as_view({'delete': 'destroy'}), name='delete-event'),
    path('list/', EventViewSet.as_view({'get': 'list'}), name='list'),
    path('partial-update-event/<str:pk>/', EventViewSet.as_view({'patch': 'partial_update'}), name='partial-update-event'),
    path('event-detail/<str:pk>/', EventViewSet.as_view({'get': 'retrieve'}), name='event-detail'), 
    path('joined-event/', EventHistoryViewSet.as_view({'post': 'create'}), name='joined-event'),
    path('event-history/list/<str:iduser>/', EventHistoryViewSet.as_view({'get': 'user_history'}), name='user-history'),
    path('history/', EventHistoryViewSet.as_view({'post': 'user_event_history'}), name='event-user-history'),
    path('search-event_by-game/<str:game>/', EventViewSet.as_view({'get': 'search_event'}), name='search-event'),
    path('delete-user-history', EventHistoryViewSet.as_view({'post': 'delete_user_history'}), name='delete_user_history'),
    path('favorites/', EventFavoriViewSet.as_view({'post': 'event_favorites',}), name='event-favoris-detail'),
    path('add-favorite/', EventFavoriViewSet.as_view({'post': 'create'}), name='add-favorite'),
    path('game_created/', GameViewSet.as_view({'post': 'create'}), name='create_game'),
    path('games/', GameViewSet.as_view({'get': 'list'}), name='list-game'),
    


 

]
