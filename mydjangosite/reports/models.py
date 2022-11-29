from django.db import models


class Report(models.Model):
    report = models.CharField(max_length=255)
    format = models.CharField(max_length=255)
    mail = models.CharField(max_length=255)
    schedule = models.CharField(max_length=255)
    date = models.DateField(default=None, blank=True, null=True)
    time = models.TimeField(default=None, blank=True, null=True)
    weekday = models.CharField(max_length=255, default=None, blank=True, null=True)

# Create your models here.
# ID, title, album ID, width, height, color (dominant color), URL (URL to
# locally stored file)
