from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("users/",include("account.urls")),
    path("notifications/",include("notifications.urls")),
    path("subscriptions/",include("subscription.urls")),
    path("communications/",include("communications.urls")),
    path("business/",include("business.urls")),
    path("agents/",include("agents.urls")),
    path("relationships/",include("relationships.urls")),
]
