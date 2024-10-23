from django.urls import path
from rest_framework.routers import DefaultRouter


from .views import AccountViewSet,PasswordChangeView


router = DefaultRouter()
router.register(r'accounts', AccountViewSet, basename="User Accounts")


urlpatterns = [
    path('auth/password/change/', PasswordChangeView.as_view()),
    
] + router.urls
