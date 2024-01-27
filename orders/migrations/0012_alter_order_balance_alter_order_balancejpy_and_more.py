# Generated by Django 5.0.1 on 2024-01-26 03:58

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("orders", "0011_remove_order_paymentmethodjpy_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="balance",
            field=models.CharField(
                max_length=10, validators=[django.core.validators.MinValueValidator(0)]
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="balanceJPY",
            field=models.CharField(
                blank=True,
                max_length=10,
                null=True,
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="balanceKRW",
            field=models.CharField(
                blank=True,
                max_length=10,
                null=True,
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="balanceUSD",
            field=models.CharField(
                blank=True,
                max_length=10,
                null=True,
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="depositJPY",
            field=models.CharField(
                blank=True,
                max_length=10,
                null=True,
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="depositKRW",
            field=models.CharField(
                blank=True,
                max_length=10,
                null=True,
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="depositUSD",
            field=models.CharField(
                blank=True,
                max_length=10,
                null=True,
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="totalAmount",
            field=models.CharField(
                max_length=10, validators=[django.core.validators.MinValueValidator(0)]
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="totalDeposit",
            field=models.CharField(
                blank=True,
                max_length=10,
                null=True,
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
    ]