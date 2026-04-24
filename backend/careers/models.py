from django.db import models

class Career(models.Model):
    username = models.CharField(max_length=100)
    created_datetime = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    author_ip = models.GenericIPAddressField(null=True, blank=True)

    def __str__(self):
        return f"{self.title} by {self.username}"

    class Meta:
        ordering = ['-created_datetime']
