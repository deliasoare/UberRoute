import pygeohash as pgh
from .models import Destination


def compute_best_route(current_location, desired_destination):
    current_geohash = pgh.encode(current_location['latitude'], current_location['longitude'])
    destination_geohash = pgh.encode(desired_destination['latitude'], desired_destination['longitude'])

    # For simplicity, let's say you have two predefined bus routes as lists of geohashes
    bus_route_1 = [
        'sx5r7n0zjwzy',
        'sx5r7pfp6pzs',
        'sx5r7xj8j0zs',
        'sx5r7z2gjwzz',
        'swpmpzb9cyku'
    ]
    bus_route_2 = [
        'swpt2wwzd6tm',
        'swpt2q4pgrsj',
        'swpmrvzt6y95',
        'swpmrtc3xykh',
        'swpmrmm3u4h1'
    ]

    # Calculate proximity to bus routes
    proximity_to_route_1 = get_route_proximity(current_geohash, destination_geohash, bus_route_1)
    proximity_to_route_2 = get_route_proximity(current_geohash, destination_geohash, bus_route_2)

    threshold = 0.05  # Adjust based on your needs

    if proximity_to_route_1 < threshold and proximity_to_route_1 <= proximity_to_route_2:
        return "Take Bus Route 1"
    elif proximity_to_route_2 < threshold:
        return "Take Bus Route 2"
    else:
        return "Recommend ridesharing"


def get_route_proximity(current_geohash, destination_geohash, route):
    """Calculate the proximity of a location to a bus route."""
    return min([pgh.distance(current_geohash, stop) for stop in route]) + \
           min([pgh.distance(destination_geohash, stop) for stop in route])
