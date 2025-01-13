# services/analytics_service.py


# class AnalyticsService:
#     @staticmethod
#     def calculate_conversion_rate(agent_analytics):
#         """Calculate the customer conversion rate."""
#         if agent_analytics.total_sales > 0:
#             return round(agent_analytics.customer_acquisition / agent_analytics.total_sales, 2)
#         return 0.00
    
#     @staticmethod
#     def customer_retention(agent_analytics):
#         """Calculate the customer retention rate."""
#         from django.utils import timezone
#         from datetime import timedelta
#         from django.db.models import Count
#         from payment.models import Purchase
#         # Define the time frame for retention (e.g., last year)
#         retention_period = timezone.now() - timedelta(days=365)
#         total_customers = agent_analytics.customer_acquisition
        
#         # Get the number of customers who made repeat purchases in the last year
#         repeat_customers = Purchase.objects.filter(
#             agent_code=agent_analytics.agent_code,
#             purchase_date__gte=retention_period
#         ).values('user').annotate(count=Count('id')).filter(count__gt=1).count()

#         # Calculate the retention rate
#         if total_customers > 0:
#             return round((repeat_customers / total_customers) * 100, 2)  # Return as a percentage
#         return 0.00  # Return 0 if no customers have been acquired

#     @staticmethod
#     def calculate_customer_lifetime_value(business_analytics):
#         """Calculate customer lifetime value."""
#         # Fetch or calculate average revenue per user and average customer lifespan
#         average_revenue_per_user = business_analytics.revenue / business_analytics.customer_count if business_analytics.customer_count > 0 else 0
#         average_customer_lifespan = 3  # Assume an average lifespan of 3 years, adjust as needed

#         return round(average_revenue_per_user * average_customer_lifespan, 2)
    
#     @staticmethod
#     def calculate_growth_rate(business_analytics):
#         from apps.analytics.models_trash import BusinessAnalytics
#         """Calculate the growth rate for the business."""
#         # Fetch previous revenue data; this could vary based on your data structure
#         previous_revenue = BusinessAnalytics.objects.filter(
#             business_code=business_analytics.business_code
#         ).exclude(timestamp=business_analytics.timestamp).order_by('-timestamp').first()

#         previous_revenue_value = previous_revenue.revenue if previous_revenue else 0

#         if previous_revenue_value > 0:
#             return round(((business_analytics.revenue - previous_revenue_value) / previous_revenue_value) * 100, 2)
#         return 0.00  # If there was no previous revenue, return 0%
