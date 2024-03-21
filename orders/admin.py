from django.contrib import admin
from .models import Order, NewOrder

# 선택한 order 데이터를 삭제하는 사용자 정의 동작
def delete_selected_orders(modeladmin, request, queryset):
    queryset.delete()

delete_selected_orders.short_description = '선택한 주문들을 삭제'

class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'ordererName', 'affiliation', 'contact', 'address', 'spouseName',
        'spouseContact', 'spouseAffiliation', 'orderStatus', 'orderNumber',
        'creator', 'creationTime', 'modifier', 'lastModifiedTime', 
        'deliveryMethod', 'tuxedoType', 'jacketSize', 'pantsSize',
        'shirtSize', 'dressType', 'dressSize', 'ringSizeMen', 'ringSizeWomen',
        # 모든 필드를 여기에 나열합니다...
    ]
    actions = [delete_selected_orders]

admin.site.register(Order, OrderAdmin)

class NewOrderAdmin(admin.ModelAdmin):
    list_display = [
        'ordererName', 'affiliation', 'contact', 'address', 'spouseName',
        'spouseContact', 'spouseAffiliation', 'orderStatus', 'orderNumber',
        'creator', 'creationTime', 'modifier', 'lastModifiedTime', 
        'deliveryMethod', 'tuxedoType', 'jacketSize', 'pantsSize',
        'shirtSize', 'dressType', 'dressSize', 'ringSizeMen', 'ringSizeWomen',
        # 모든 필드를 여기에 나열합니다...
    ]
    actions = [delete_selected_orders]
    
admin.site.register(NewOrder, OrderAdmin)
