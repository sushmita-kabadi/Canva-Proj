# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2020-06-04 14:48
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='activityrecord',
            name='name',
        ),
    ]
