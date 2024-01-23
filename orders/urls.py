# orders/urls.py
from django.urls import path
from .views import OrderList, OrderDetail, export_orders_to_excel

urlpatterns = [
    path('', OrderList.as_view(), name='order-list'),
    path('<int:pk>/', OrderDetail.as_view(), name='order-detail'),
    path('downloads/', export_orders_to_excel, name='export_orders_to_excel'),
]
