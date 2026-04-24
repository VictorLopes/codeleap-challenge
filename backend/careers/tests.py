from django.test import TestCase, Client
from django.urls import reverse
from .models import Career
import json

class CareerAPITest(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = reverse('career-list')

    def test_create_career(self):
        data = {
            "username": "victor",
            "title": "My first career post",
            "content": "Hello world!",
            "author_ip": "127.0.0.1"
        }
        response = self.client.post(
            self.url,
            data=json.dumps(data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Career.objects.count(), 1)
        career = Career.objects.first()
        self.assertEqual(career.username, "victor")
        self.assertEqual(career.author_ip, "127.0.0.1")

    def test_create_career_auto_ip(self):
        data = {
            "username": "auto_ip_user",
            "title": "Title",
            "content": "Content"
        }
        response = self.client.post(
            self.url,
            data=json.dumps(data),
            content_type='application/json',
            REMOTE_ADDR='192.168.1.1'
        )
        self.assertEqual(response.status_code, 201)
        Career = Career.objects.get(username="auto_ip_user")
        self.assertEqual(Career.author_ip, "192.168.1.1")
