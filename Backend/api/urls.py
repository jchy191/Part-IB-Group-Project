from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = [
    # Debuggin Urls
    # path('api/acc/', views.AccEntryList.as_view()),
    # path('api/comments/<int:pid>/', views.getcomments),

    # Front-End
    path('api/entries/', views.EntryList.as_view()),
    path('api/entries/<int:pk>/', views.EntryDetail.as_view()),
    path('api/markers/overview/', views.AllMarkers.as_view()),
    path('api/markers/overview/<str:pk>/', views.MarkerAccEntry.as_view()),
    path('api/markers/<str:pk>/', views.MarkerEntries.as_view()),
    # path('api/locations/', views.Location.as_view()),
    # path('api/locations/<str:pk>/', views.LocationEntry.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
