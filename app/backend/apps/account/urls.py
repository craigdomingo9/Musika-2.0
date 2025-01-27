from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
  AccountViewSet,
  AccountPreferencesViewSet,
  PasswordChangeView,
  LoginView,
  LogoutView,
  ExposeAccount
)


router = DefaultRouter()
router.register(r'accounts', AccountViewSet, basename="User Accounts")
router.register(r'preferences', AccountPreferencesViewSet, basename="User Preferences")


urlpatterns = [
    path('auth/password/change/', PasswordChangeView.as_view(),name="change-password"),
    path('auth/login/',LoginView.as_view(),name="login"),
    path('auth/logout/',LogoutView.as_view(),name="logout"),
    path('auth/expose-account/',ExposeAccount.as_view(), name='expose-uuid')
    
] + router.urls
