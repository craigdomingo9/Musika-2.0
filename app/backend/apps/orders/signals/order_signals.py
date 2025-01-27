from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

from orders.models import Order
from notifications.actions import send_notification
from relationships.models import BusinessAgentRelationship
from agents.models import Agent


User = get_user_model()


@receiver(post_save, sender=Order)
def order_placed(sender, instance, created, **kwargs):
    if created:
        
        # Collect recipients
        recipients = [
            instance.product.product.business.user,
            *User.objects.filter(is_admin=True)
        ]

        message = f"New order placed: {instance.product.__str__()}"
        send_notification(recipients, message)
        
        total_price = (instance.product.on_sale and instance.product.sale_price or instance.product.price) * instance.quantity
        if instance.product.product and instance.agent:
            commission_rate = BusinessAgentRelationship.objects.get(agent=instance.agent, business=instance.product.product.business).commission_rate
            
            if commission_rate:
                instance.agent_earning = total_price * commission_rate
                instance.business_earning = total_price - instance.agent_earning
                instance.save() 

        if not instance.agent:
            instance.business_earning = total_price
            instance.save()
    
    if not instance.business:
        instance.business = instance.product.product.business
        instance.save()
