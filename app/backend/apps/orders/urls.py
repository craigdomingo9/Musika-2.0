from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import (
  OrderViewSet,
)

router = DefaultRouter()
router.register(r'orders', OrderViewSet)

urlpatterns = [

] + router.urls