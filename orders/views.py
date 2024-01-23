from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order
from .serializers import OrderListSerializer, OrderDetailSerializer

class OrderList(APIView):
    def get(self, request, format=None):
        orders = Order.objects.all()
        serializer = OrderListSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = OrderDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderDetail(APIView):
    def get_object(self, pk):
        try:
            return Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, pk, format=None):
        order = self.get_object(pk)
        serializer = OrderDetailSerializer(order)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        order = self.get_object(pk)
        serializer = OrderDetailSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        order = self.get_object(pk)
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# 필요한 패키지 임포트
from openpyxl import Workbook
from django.http import HttpResponse
from .models import Order

from openpyxl import Workbook
from django.http import HttpResponse
from .models import Order
from datetime import datetime

def export_orders_to_excel(request):
    # 엑셀 파일과 시트 생성
    wb = Workbook()
    ws = wb.active

    # 열 제목 설정
    columns = [
        'Order Number', 'Orderer Name', 'Affiliation', 'Contact', 'Address',
        'Order Status', 'Creator', 'Creation Time', 'Modifier', 'Last Modified Time',
        'Delivery Method', 'Tuxedo Type', 'Jacket Size', 'Pants Size', 'Shirt Size',
        'Dress Type', 'Dress Size', 'Ring Size Men', 'Ring Size Women', 'Necklace Size',
        'Earring Type', 'Bowtie', 'Payer Name', 'Relation To Orderer', 'Total Amount',
        'Deposit KRW', 'Deposit JPY', 'Deposit USD', 'Total Deposit', 'Balance',
        'Deposit Date', 'Balance Date', 'Dress Back Width', 'Dress Length',
        'Jacket Sleeve Length', 'Jacket Length', 'Pants Waist Length', 'Pants Length',
        'Alteration Memo'
    ]
    ws.append(columns)

    # 데이터베이스에서 데이터 쿼리
    orders = Order.objects.all()

    # 데이터를 엑셀 파일에 작성
    for order in orders:
        creation_time = order.creationTime.replace(tzinfo=None) if order.creationTime else None
        last_modified_time = order.lastModifiedTime.replace(tzinfo=None) if order.lastModifiedTime else None
        deposit_date = order.depositDate if isinstance(order.depositDate, datetime) else None
        balance_date = order.balanceDate if isinstance(order.balanceDate, datetime) else None
        
        ws.append([
            order.orderNumber, order.ordererName, order.affiliation, order.contact, order.address,
            order.orderStatus, order.creator, creation_time, order.modifier, last_modified_time,
            order.deliveryMethod, order.tuxedoType, order.jacketSize, order.pantsSize, order.shirtSize,
            order.dressType, order.dressSize, order.ringSizeMen, order.ringSizeWomen, order.necklaceSize,
            order.earringType, order.bowtie, order.payerName, order.relationToOrderer, order.totalAmount,
            order.depositKRW, order.depositJPY, order.depositUSD, order.totalDeposit, order.balance,
            deposit_date, balance_date, order.dressBackWidth, order.dressLength,
            order.jacketSleeveLength, order.jacketLength, order.pantsWaistLength, order.pantsLength,
            order.alterationMemo
        ])

    # 엑셀 파일을 응답으로 변환
    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename="orders.xlsx"'

    # 파일 쓰기
    wb.save(response)

    return response