from rest_framework import serializers
from .models import Order, NewOrder

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'  # 모든 필드를 포함합니다.

class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'id',
            'ordererName',     # 필수 필드
            'affiliation',     # 필수 필드
            'contact',         # 필수 필드
            'orderStatus',     # 필수 필드
            'orderNumber',     # 필수 필드
            'creator',         # 필수 필드
            'creationTime',    # 필수 필드
            'totalAmount',     # 필수 필드
            'balance',         # 필수 필드
            # 추가적으로 필요한 필수 필드가 있다면 여기에 포함시킵니다.
            # 선택적 필드(예: 'address', 'modifier', 'lastModifiedTime', 등)도 필요에 따라 추가할 수 있습니다.
        ]
        
class NewOrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewOrder
        fields = '__all__'  # 모든 필드를 포함합니다.

class NewOrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewOrder
        fields = [
            'id',
            'ordererName',     # 필수 필드
            'affiliation',     # 필수 필드
            'contact',         # 필수 필드
            'orderStatus',     # 필수 필드
            'orderNumber',     # 필수 필드
            'creator',         # 필수 필드
            'creationTime',    # 필수 필드
            'totalAmount',     # 필수 필드
            'balance',         # 필수 필드
            # 추가적으로 필요한 필수 필드가 있다면 여기에 포함시킵니다.
            # 선택적 필드(예: 'address', 'modifier', 'lastModifiedTime', 등)도 필요에 따라 추가할 수 있습니다.
        ]