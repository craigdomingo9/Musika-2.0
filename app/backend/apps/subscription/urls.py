from django.urls import path, include
from rest_framework.routers import DefaultRouter


from .views import FeatureViewSet, PlanViewSet, SubscriptionViewSet, SubscriptionPaymentViewSet


router = DefaultRouter()
router.register(r'features', FeatureViewSet)
router.register(r'plans', PlanViewSet)
router.register(r'subscriptions', SubscriptionViewSet)
router.register(r'payments', SubscriptionPaymentViewSet)

urlpatterns = [
    
] + router.urls