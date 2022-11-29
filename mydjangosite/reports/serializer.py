from .models import Report
from rest_framework import serializers


class ReportSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'report', 'format', 'mail', 'schedule', 'date', 'time', 'weekday']
