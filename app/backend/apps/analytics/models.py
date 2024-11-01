from django.db import models
from django.contrib.auth import get_user_model
from analytics.services.analytics_service import AnalyticsService  # Import your service
from analytics.utils.choices import BROWSER_CHOICES,DEVICE_CHOICES,INTERACTION_TYPE_CHOICES,OS_CHOICES

User = get_user_model()




# Create your models here.
# Acquisition Model
class Acquisition(models.Model):
    ACQUISITION_SOURCE_CHOICES = [
        ('organic', 'Organic'),
        ('referral', 'Referral')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    source = models.CharField(max_length=100, choices=ACQUISITION_SOURCE_CHOICES)
    medium = models.CharField(max_length=50, blank=True)
    referring_agent_code = models.CharField(max_length=100, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    device = models.CharField(default="mobile", max_length=100, blank=True)
    browser = models.CharField(default="chrome", max_length=100, blank=True)
    os = models.CharField(default="Android", max_length=100, blank=True)

    def __str__(self):
        return f"Acquisition {self.id}"
    
    class Meta:
        verbose_name = "Acquisition"
        verbose_name_plural = "Acquisitions"
        ordering = ['-timestamp']  # Order by timestamp descending


class Interaction(models.Model):
    """
    Model to track user interactions with products.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='interactions')
    product = models.ForeignKey('ProductAnalytics', on_delete=models.CASCADE, related_name='interactions')
    interaction_type = models.CharField(max_length=20, choices=INTERACTION_TYPE_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)
    device = models.CharField(max_length=20, choices=DEVICE_CHOICES, blank=True)
    browser = models.CharField(max_length=20, choices=BROWSER_CHOICES, blank=True)
    os = models.CharField(max_length=20, choices=OS_CHOICES, blank=True)

    def __str__(self):
        return f"Interaction {self.id}"

    class Meta:
        verbose_name = "Interaction"
        verbose_name_plural = "Interactions"
        ordering = ['-timestamp']  # Order by timestamp descending
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['product']),
            models.Index(fields=['timestamp']),
        ]

class ProductAnalytics(models.Model):
    """
    Model to track analytics for various types of products.
    """


    title = models.CharField(max_length=100)
    description = models.TextField()
    product_id = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    sales = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    cart_adds = models.IntegerField(default=0)
    shares = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)
    published_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} (ID: {self.id})"

    class Meta:
        verbose_name = "Product Analytics"
        verbose_name_plural = "Product Analytics"
        ordering = ['-published_date']



class AgentAnalytics(models.Model):
    """
    Model to capture analytics related to agents promoting products on the platform.
    """
    agent_code = models.CharField(max_length=100)
    total_sales = models.IntegerField(default=0)
    total_revenue = models.IntegerField(default=0)
    customer_acquisition = models.IntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    @property
    def conversion_rate(self):
        """Calculate conversion rate using the analytics service."""
        return AnalyticsService.calculate_conversion_rate(self)

    @property
    def customer_retention(self):
        """Calculate customer retention using the analytics service."""
        return AnalyticsService.customer_retention(self)

    def __str__(self):
        return f"Agent {self.user.username} in {self.location}"

    class Meta:
        verbose_name = "Agent Analytics"
        verbose_name_plural = "Agent Analytics"
        ordering = ['-timestamp']  # Order by the most recent timestamp


# BusinessAnalytics Model
class BusinessAnalytics(models.Model):
    business_code = models.CharField(max_length=100)
    revenue = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    customer_count = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)

    @property
    def growth_rate(self):
        """Calculate growth rate using the analytics service."""
        return AnalyticsService.calculate_growth_rate(self)


    @property
    def customer_lifetime_value(self):
        """Calculate customer lifetime value using the analytics service."""
        return AnalyticsService.calculate_customer_lifetime_value(self)

    def __str__(self):
        return f"Business {self.business_id}"

