from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class SearchResults(models.Model):
    query = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    product_ids = models.JSONField()
    total_results = models.IntegerField()

    def __str__(self):
        return f"SearchResults(query={self.query}, user={self.user}, created_at={self.created_at})"