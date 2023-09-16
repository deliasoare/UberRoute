import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def index(request): 
    return render(request, 'app/hello_webpack.html')  
