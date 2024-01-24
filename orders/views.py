from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order
from .serializers import OrderListSerializer, OrderDetailSerializer

# 구글스프레드에 접근하기 위한 코드
import gspread
from django.conf import settings
import json

sheet_url = "https://docs.google.com/spreadsheets/d/1JWVhe0TBAt024VKabqTXZX7VMDAESReu1GonVGJMVGU/edit?usp=drive_link"
credentials = json.loads(settings.GOOGLE_SHEETS_CREDENTIALS_FILE)

def update_sheet_with_db(sheet_url=sheet_url, credentials=credentials):
    # Google Sheets API 인증
    gc = gspread.service_account_from_dict(credentials)
    sh = gc.open_by_url(sheet_url)
    worksheet = sh.sheet1

    # 스프레드시트의 모든 내용 삭제
    worksheet.clear()

    # 데이터베이스에서 Order 모델의 모든 데이터 가져오기
    orders = Order.objects.all()
    
    # 열 이름 추출
    if orders:
        first_order = orders[0]
        serializer = OrderDetailSerializer(first_order)
        column_names = list(serializer.data.keys())

        # 스프레드시트에 열 이름 추가
        worksheet.append_row(column_names)

    # 스프레드시트 업데이트를 위한 데이터 준비
    all_data = []
    for order in orders:
        serializer = OrderDetailSerializer(order)
        all_data.append(list(serializer.data.values()))

    # 스프레드시트 업데이트
    worksheet.append_rows(all_data)

        
# 구글 sheet 데이터 추가
def append_to_sheet(data, sheet_url=sheet_url, credentials=credentials):
    gc = gspread.service_account_from_dict(credentials)
    sh = gc.open_by_url(sheet_url)
    worksheet = sh.sheet1
    worksheet.append_row(data)

class OrderList(APIView):
    def get(self, request, format=None):
        orders = Order.objects.filter(is_deleted=False) # 소프트 삭제된 객체를 제외하고 쿼리
        serializer = OrderListSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = OrderDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            append_to_sheet(serializer.data.values()) # Google Sheets에 데이터 추가
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderDetail(APIView):
    def get_object(self, pk):
        try:
            return Order.objects.get(pk=pk, is_deleted=False)
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
        order.is_deleted = True # 소프트 삭제 
        order.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class DeletedList(APIView):
    def get(self, request, format=None):
        orders = Order.objects.filter(is_deleted=True) # 소프트 삭제된 객체를 제외하고 쿼리
        serializer = OrderListSerializer(orders, many=True)
        return Response(serializer.data)

class DeletedDetail(APIView):
    def get_object(self, pk):
        try:
            return Order.objects.get(pk=pk, is_deleted=True)
        except Order.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND
    
    def get(self, request, pk, format=None):
        order = self.get_object(pk) 
        serializer = OrderDetailSerializer(order)
        return Response(serializer.data)
    
    def delete(self, request, pk, format=None):
        order = self.get_object(pk)
        order.is_deleted = False # 소프트 삭제 
        order.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# 구글 sheet를 DB와 연동
class UpdateSheetView(APIView):
    def get(self, request, format=None):
        try:
            update_sheet_with_db()
            return Response({"message": "Sheet updated successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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

