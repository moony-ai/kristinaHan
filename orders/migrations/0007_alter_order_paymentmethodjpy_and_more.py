# Generated by Django 5.0.1 on 2024-01-23 12:09

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("orders", "0006_order_is_deleted"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="paymentMethodJPY",
            field=models.CharField(
                default="현금", max_length=10, verbose_name="선수금 결제 방법 (엔화)"
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="paymentMethodKRW",
            field=models.CharField(
                default="현금", max_length=10, verbose_name="선수금 결제 방법 (원화)"
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="paymentMethodUSD",
            field=models.CharField(
                default="현금", max_length=10, verbose_name="선수금 결제 방법 (달러)"
            ),
        ),
    ]
