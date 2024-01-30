# orders/urls.py
from django.urls import path
from . import views 

urlpatterns = [
    path('', views.OrderList.as_view(), name='order-list'),
    path('<int:pk>/', views.OrderDetail.as_view(), name='order-detail'),
    path('downloads/', views.export_orders_to_excel, name='export_orders_to_excel'),
    path('deleted/', views.DeletedList.as_view(), name='deleted-list'),
    path('deleted/<int:pk>', views.DeletedDetail.as_view(), name='deleted-detail'),
    path('updategs/', views.UpdateSheetView.as_view(), name='update-sheet'),
    path('latest/', views.LatestOrderView.as_view(), name='latest-order'),
]
