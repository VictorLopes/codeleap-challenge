from rest_framework import serializers
from .models import Career

class CareerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = ['id', 'username', 'created_datetime', 'title', 'content', 'author_ip']
        read_only_fields = ['id', 'created_datetime']

    def create(self, validated_data):
        request = self.context.get('request')
        if not validated_data.get('author_ip') and request:
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0]
            else:
                ip = request.META.get('REMOTE_ADDR')
            validated_data['author_ip'] = ip
        return super().create(validated_data)
