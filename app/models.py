from django.db import models

# Create your models here.
from django.db import models
import pygeohash as gh


class Destination(models.Model):
    name = models.CharField(max_length=255)
    geohash = models.CharField(max_length=12) 

    def save(self, *args, **kwargs):
        super(Destination, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class BusStop(models.Model):
    name = models.CharField(max_length=255)
    geohash = models.CharField(max_length=12)  # Store the geohash of the bus stop

    def save(self, *args, **kwargs):
        super(BusStop, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    
