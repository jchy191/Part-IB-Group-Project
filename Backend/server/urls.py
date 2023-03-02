"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, re_path, include
from django.contrib import admin
from rest_framework import routers
from django.shortcuts import render
from django.conf.urls import handler404
from api import views as core_views

router = routers.DefaultRouter()

urlpatterns = router.urls


def render_react(request):
    return render(request, "index.html")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls')),

    re_path(r"^$", render_react),
    re_path(r'^.*/$', render_react)
]

#urlpatterns = format_suffix_patterns(urlpatterns)