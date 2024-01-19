from rest_framework import serializers
from .models import Order

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'  # 모든 필드를 포함합니다.

class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['orderNumber', 'ordererName', 'orderStatus', 'creationTime']