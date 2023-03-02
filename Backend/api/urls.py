from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = [
    #Debuggin Urls
    path('entries/', views.EntryList.as_view()),
    path('entries/<int:pk>/', views.EntryDetail.as_view()),
    path('acc/', views.AccEntryList.as_view()),
    
    #Front-End
    path('all/<str:pk>/', views.AccEntryDetail.as_view()),
    path('all/', views.AllList.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)