from rest_framework import viewsets, filters
from .models import Career
from .serializers import CareerSerializer

class CareerViewSet(viewsets.ModelViewSet):
    queryset = Career.objects.all()
    serializer_class = CareerSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['username', 'created_datetime', 'title']
    ordering = ['-created_datetime']
