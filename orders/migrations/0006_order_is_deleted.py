# Generated by Django 5.0.1 on 2024-01-23 11:49

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("orders", "0005_order_paymentmethodjpy_order_paymentmethodkrw_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="is_deleted",
            field=models.BooleanField(default=False),
        ),
    ]
