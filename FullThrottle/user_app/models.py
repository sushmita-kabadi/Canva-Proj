# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

class UserModel(models.Model):
    name = models.CharField(max_length = 200)

    def __str__(self):
        return self.name

class Location(models.Model):
    name = models.CharField(max_length = 200)
    location = models.ForeignKey(UserModel , on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class ActivityRecord(models.Model):
    name = models.CharField(max_length = 50)
    locations = models.ManyToManyField(Location)
    start_time = models.DateTimeField(default = timezone.now)
    end_time = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return self.name

