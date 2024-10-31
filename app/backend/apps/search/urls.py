from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import ProductSearchView
from .views import SearchHistoryViewSet

router = DefaultRouter()
router.register(r'search-history', SearchHistoryViewSet)

urlpatterns = [
    path('q=<str:query>/', ProductSearchView.as_view(), name='product_search')
] + router.urls
