# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from user_app.models import Location , UserModel , ActivityRecord
from user_app.serializers import LocationSerializer , UserModelSerializer , ActivityRecordSerializer
from rest_framework import viewsets


# Create your views here.

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class UserModelViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer

class ActivityRecordViewSet(viewsets.ModelViewSet):
    queryset = ActivityRecord.objects.all()
    serializer_class = ActivityRecordSerializer

