import pygeohash as gh
from .models import Destination


def compute_best_route(current_geohash, destination_geohash):
    bus_route_1 = [
        "sx5r7n0zjwzz",
        "sx5r7pfp6pzz",
        "sx5r7xj8j0zz",
        "sx5r7z2gjwzz"
    ]
    bus_route_2 = [
        "swpt2wwzd6tq",
        "swpt2q4pgreg",
        "swpmrvzt6y93",
        "swpmrtc3xy7g",
        "swpmrmm3u45f"
    ]

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
