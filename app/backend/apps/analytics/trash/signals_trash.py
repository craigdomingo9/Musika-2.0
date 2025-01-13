# # signals.py
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from .models_trash import Interaction

# @receiver(post_save, sender=Interaction)
# def update_product_analytics(sender, instance, created, **kwargs):
#     """Update ProductAnalytics fields based on the Interaction type."""
#     product = instance.product

#     if created:
#         # Update views
#         # Update likes, cart_adds, shares, and comments based on interaction type
#         if instance.interaction_type == 'view':
#             product.views += 1
#         if instance.interaction_type == 'like':
#             product.likes += 1
#         elif instance.interaction_type == 'cart_add':
#             product.cart_adds += 1
#         elif instance.interaction_type == 'share':
#             product.shares += 1
#         elif instance.interaction_type == 'comment':
#             product.comments += 1

#         # Save the updated product analytics
#         product.save()