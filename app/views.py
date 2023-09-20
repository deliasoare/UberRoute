from django.http import JsonResponse

def get_all_destinations(request):
    destinations = Destination.objects.all()

    return JsonResponse([destination.serialize() for destination in destinations])


def suggest_transit_options(start_geohash, end_geohash, distance_threshold=0.5):
    # Identify the closest bus stops for starting and ending points.
    start_stop = get_nearest_stop(start_geohash)
    end_stop = get_nearest_stop(end_geohash)

    suggested_routes = []
    if start_stop and end_stop:
        # Identify routes that pass through both the start and end stops.
        common_routes = start_stop.routes.filter(stops=end_stop)
        for route in common_routes:
            suggested_routes.append(route.name)

    if suggested_routes:
        return json.dumps({'type': 'bus', 'routes': suggested_routes})
    else:
        return json.dumps({'type': 'ridesharing'})


def get_nearest_stop(geohash, distance_threshold=0.5):
    nearest_distance = float('inf')
    nearest_stop = None
    for stop in BusStop.objects.all():
        distance = pgh.distance(geohash, stop.geohash) / 1000.0  # Convert to kilometers
        if distance < distance_threshold and distance < nearest_distance:
            nearest_distance = distance
            nearest_stop = stop
    return nearest_stop

def get_best_route(request, start_location, end_location):
    # suggestions = []
    # n = 1
    # start_destination = Destination.objects.filter(name=start_location)
    # end_destination = Destination.objects.filter(name=end_location)
    # current_location = start_destination
    
    # while (current_location != end_location) {
    #     suggestions = suggest_transit_options(current_location, end_destination)

    #     current_location = suggestion

    #     suggestions[n] = suggestion
    #     n += 1
    # }

    # return JsonResponse(['suggestion': suggestion for suggestion in suggestions], safe=False)

    if (start_location === 'Limassol')
        if (end_location === 'Starbucks')
            return JsonResponse({'response': 'Ridesharing'})
        else if (end_location === 'Agios Georgios Havouzas Church')
            return JsonResponse({'response': 'Ridesharing'})
        else if (end_location === 'Mesa Geitonia')
            return JsonResponse({'response': 'Ridesharing'})
        else if (end_location === 'Mesa Geitonia')
            return JsonResponse({})