from django.http import HttpResponseBadRequest


@csrf_exempt
def get_transit_suggestions(request):
    if request.method == "POST":
        data = extract_data_from_post_request(request)
    elif request.method == "GET":
        data = extract_data_from_get_request(request)
    else:
        return HttpResponseBadRequest("Invalid request method")

    if not data:
        return HttpResponseBadRequest("Invalid or missing parameters")

    suggestion = suggest_transit_options(data['start_geohash'], data['end_geohash'])

    return JsonResponse({'suggestion': suggestion})


def extract_data_from_post_request(request):
    try:
        data = json.loads(request.body)
        return {
            'start_geohash': data.get('start_geohash'),
            'end_geohash': data.get('end_geohash')
        }
    except (ValueError, KeyError, TypeError):
        return None


def extract_data_from_get_request(request):
    try:
        # Parsing the JSON string from the query parameter
        data = json.loads(request.GET.get('data', '{}'))
        return {
            'start_geohash': data.get('start_geohash'),
            'end_geohash': data.get('end_geohash')
        }
    except (ValueError, KeyError, TypeError):
        return None

