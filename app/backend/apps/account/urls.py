from django.urls import path
from rest_framework.routers import DefaultRouter


from .views import AccountViewSet,PasswordChangeView,LoginView,LogoutView


router = DefaultRouter()
router.register(r'accounts', AccountViewSet, basename="User Accounts")


urlpatterns = [
    path('auth/password/change/', PasswordChangeView.as_view(),name="change-password"),
    path('auth/login/',LoginView.as_view(),name="login"),
    path('auth/logout/',LogoutView.as_view(),name="logout")
    
] + router.urls
