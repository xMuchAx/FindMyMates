from django.urls import path
from .views import EventFavoriViewSet, EventHistoryViewSet, EventViewSet

app_name = 'events'

urlpatterns = [
    path('<str:pk>/', EventViewSet.as_view({'get': 'retrieve'}), name='event-detail'),
    path('create/', EventViewSet.as_view({'post': 'create_event'}), name='create-event'),
    path('update/<str:pk>/', EventViewSet.as_view({'put': 'update_event'}), name='update-event'),
    path('update-partially/<str:pk>/', EventViewSet.as_view({'patch': 'partial_update'}), name='partial-update-event'),
    path('delete/<str:pk>/', EventViewSet.as_view({'delete': 'destroy'}), name='delete-event'),
    path('search/', EventViewSet.as_view({'post': 'search_event'}), name='search-event'),
    path('add-to-favorite/', EventFavoriViewSet.as_view({'post': 'create'}), name='add-favorite'),
    path('favorites/', EventFavoriViewSet.as_view({'post': 'event_favorites',}), name='event-favoris-detail'),
    path('list/', EventViewSet.as_view({'get': 'list'}), name='list-event'),
    path('joined-event/', EventHistoryViewSet.as_view(), name='joined-event'),
]
