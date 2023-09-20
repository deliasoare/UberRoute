import pygeohash as pgh
from .models import Destination

def compute_best_route(start_geohash, end_geohash):
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
    proximity_to_route_1 = get_route_proximity(start_geohash, end_geohash, bus_route_1)
    proximity_to_route_2 = get_route_proximity(start_geohash, end_geohash, bus_route_2)

    threshold = 0.05  # Adjust based on your needs

    if proximity_to_route_1 < threshold and proximity_to_route_1 <= proximity_to_route_2:
        return {"suggestion": "Take Bus Route 1"}
    elif proximity_to_route_2 < threshold:
        return {"suggestion": "Take Bus Route 2"}
    else:
        return {"suggestion": "Recommend ridesharing"}

def get_route_proximity(start_geohash, end_geohash, route):
    """Calculate the proximity of a location to a bus route."""
    return min([pgh.distance(start_geohash, stop) for stop in route]) + \
           min([pgh.distance(end_geohash, stop) for stop in route])

