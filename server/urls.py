from django.contrib import admin
from django.urls import include, path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/orders/', include('orders.urls')),
    path('sentry-debug', views.trigger_error),
]
