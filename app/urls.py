from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('getAllDestinations/', views.get_all_destinations, name='get_all_destinations'),
    # path('computeBestRoute/', views.get_best_route, name='get_best_route'),
]
