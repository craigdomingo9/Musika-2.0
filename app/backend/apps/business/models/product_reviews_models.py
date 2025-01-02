from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()





"""   Product Reviews   """
class ProductReview(models.Model):
    product = models.ForeignKey("Product", on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    rating = models.IntegerField()  # Rating out of 5
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}"


