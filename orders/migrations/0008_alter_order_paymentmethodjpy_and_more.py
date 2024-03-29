# Generated by Django 5.0.1 on 2024-01-23 12:10

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("orders", "0007_alter_order_paymentmethodjpy_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="paymentMethodJPY",
            field=models.CharField(
                blank=True,
                choices=[("현금", "현금"), ("신용카드", "신용카드")],
                default="현금",
                max_length=10,
                null=True,
                verbose_name="선수금 결제 방법 (엔화)",
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="paymentMethodKRW",
            field=models.CharField(
                blank=True,
                choices=[("현금", "현금"), ("신용카드", "신용카드")],
                default="현금",
                max_length=10,
                null=True,
                verbose_name="선수금 결제 방법 (원화)",
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="paymentMethodUSD",
            field=models.CharField(
                blank=True,
                choices=[("현금", "현금"), ("신용카드", "신용카드")],
                default="현금",
                max_length=10,
                null=True,
                verbose_name="선수금 결제 방법 (달러)",
            ),
        ),
    ]
