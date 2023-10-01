from django.http import JsonResponse
from django.shortcuts import render

from django.conf import settings

def index(request):
    return render(request, 'app/hello_webpack.html')

def getApiKey(request):
    return JsonResponse({"key": settings.GOOGLE_MAPS_API_KEY}, status=200)
