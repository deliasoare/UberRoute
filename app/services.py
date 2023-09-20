import pygeohash as gh
from .models import Destination


def compute_best_route(current_location, desired_destination):
    current_geohash = gh.encode(current_location['latitude'], current_location['longitude'])
    destination_geohash = gh.encode(desired_destination['latitude'], desired_destination['longitude'])

    # For simplicity, let's say you have two predefined bus routes as lists of geohashes
    bus_route_1 = [
        "sx5r7n0zjwzz",
        "sx5r7pfp6pzz",
        "sx5r7xj8j0zz",
        "sx5r7z2gjwzz"
    ]
    # List of geohashes
    bus_route_2 = [...]  # List of geohashes

    # Check proximity to bus routes
    proximity_to_route_1 = min([gh.distance(current_geohash, stop) for stop in bus_route_1]) + \
                           min([gh.distance(destination_geohash, stop) for stop in bus_route_1])

    proximity_to_route_2 = min([gh.distance(current_geohash, stop) for stop in bus_route_2]) + \
                           min([gh.distance(destination_geohash, stop) for stop in bus_route_2])

    threshold = 0.05  

    if proximity_to_route_1 < threshold and proximity_to_route_1 <= proximity_to_route_2:
        return "Take Bus Route 1"
    elif proximity_to_route_2 < threshold:
        return "Take Bus Route 2"
    else:
        return "Recommend ridesharing"
