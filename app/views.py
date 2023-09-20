import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utils import suggest_transit_options
from django.http import JsonResponse
from .models import Destination


def get_all_destinations(request):
    destinations = Destination.objects.all()
    data = [{"name": dest.name, "latitude": dest.latitude, "longitude": dest.longitude, "geohash": dest.geohash} for dest in destinations]
    return JsonResponse(data, safe=False)


def index(request):
    return render(request, 'app/hello_webpack.html')


@csrf_exempt
def get_transit_suggestions(request):
    if request.method == "POST":
        data = json.loads(request.body)
        start_latitude = float(data.get('start_latitude', 0))
        start_longitude = float(data.get('start_longitude', 0))
        end_latitude = float(data.get('end_latitude', 0))
        end_longitude = float(data.get('end_longitude', 0))
    else:  # If it's a GET request
        start_latitude = float(request.GET.get('start_latitude', 0))
        start_longitude = float(request.GET.get('start_longitude', 0))
        end_latitude = float(request.GET.get('end_latitude', 0))
        end_longitude = float(request.GET.get('end_longitude', 0))

    suggestion = suggest_transit_options(start_latitude, start_longitude, end_latitude, end_longitude)

    return JsonResponse({'suggestion': suggestion})
