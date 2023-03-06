from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = [
    # Debuggin Urls
    path('api/entries/', views.EntryList.as_view()),
    path('api/entries/<int:pk>/', views.EntryDetail.as_view()),
    path('api/acc/', views.AccEntryList.as_view()),

    # Front-End
    path('api/markers/overview/', views.AllMarkers.as_view()),
    path('api/markers/overview/<str:pk>/', views.MarkerAccEntry.as_view()),
    path('api/markers/<str:pk>/', views.MarkerEntries.as_view()),
    path('comments/<int:pid>/', views.getcomments),
]

urlpatterns = format_suffix_patterns(urlpatterns)
