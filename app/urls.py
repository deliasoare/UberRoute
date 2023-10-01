from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path("", views.index, name="index"),

    # API
    path("getApiKey", views.getApiKey, name="getApiKey"),

]
