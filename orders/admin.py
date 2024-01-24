from django.contrib import admin
from .models import Order

def delete_selected_orders(modeladmin, request, queryset):
    queryset.delete()

delete_selected_orders.short_description = '선택한 주문들을 삭제'

class OrderAdmin(admin.ModelAdmin):
    list_display = ['ordererName', 'affiliation', 'contact', ...]  # 원하는 필드 나열
    actions = [delete_selected_orders]

admin.site.register(Order, OrderAdmin)
