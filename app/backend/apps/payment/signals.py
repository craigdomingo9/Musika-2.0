# signals.py
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Purchase
from business.models import ProductVariant  # Adjust the import based on your project structure
# from apps.analytics.models_trash import AgentAnalytics, BusinessAnalytics, ProductAnalytics

# @receiver(post_save, sender=Purchase)
# def update_product_stock_on_purchase(sender, instance, created, **kwargs):
#     """Update product stock when a purchase is made."""
#     if created:
#         # Decrease stock by the purchased quantity
#         product = ProductVariant.objects.get(id=instance.product)
#         product.stock -= instance.stock_quantity
#         product.save(update_fields=['stock'])
        
#         # Increase the sales field in Product Analytics
#         product_analytics = ProductAnalytics.objects.get(product_id=instance.product)
#         product_analytics.sales += 1
#         product_analytics.save(update_fields=['sales'])
        
#         # Increase revenue field in Business Analytics
#         business_analytics = BusinessAnalytics.objects.get(business_code=instance.business_code)
#         business_analytics.revenue += instance.amount
#         business_analytics.save(update_fields=['revenue'])
        
#         # Increase the total sales and total revenue fields in Agent Analytics
#         agent_analytics = AgentAnalytics.objects.get(agent_code=instance.agent_code)
#         agent_analytics.total_sales += 1
#         agent_analytics.total_revenue += instance.amount
#         agent_analytics.save(update_fields=['total_sales', 'total_revenue'])
        

