from django.db import models
import pygeohash as pgh


class Destination(models.Model):
    name = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    geohash = models.CharField(max_length=12)  # Store the geohash of the destination

    def save(self, *args, **kwargs):
        self.geohash = self.compute_geohash()
        super(Destination, self).save(*args, **kwargs)

    def compute_geohash(self):
        return pgh.encode(self.latitude, self.longitude)

    @staticmethod
    def get_nearest_destination(geohash):
        distances = [(destination, gh.distance(geohash, destination.geohash)) for destination in Destination.objects.all()]
        return min(distances, key=lambda x: x[1])[0]

    def __str__(self):
        return self.name


class BusStop(models.Model):
    name = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    geohash = models.CharField(max_length=12)  # Store the geohash of the bus stop

    def save(self, *args, **kwargs):
        self.geohash = pgh.encode(self.latitude, self.longitude)
        super(BusStop, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
