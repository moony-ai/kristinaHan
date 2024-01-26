# Generated by Django 5.0.1 on 2024-01-26 04:24

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("orders", "0012_alter_order_balance_alter_order_balancejpy_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="balance",
            field=models.DecimalField(
                decimal_places=0,
                max_digits=10,
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="balanceJPY",
            field=models.DecimalField(
                blank=True,
                decimal_places=0,
                max_digits=10,
                null=True,
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="balanceKRW",
            field=models.DecimalField(
                blank=True,
                decimal_places=0,
                max_digits=10,
                null=True,
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="balanceUSD",
            field=models.DecimalField(
                blank=True,
                decimal_places=0,
                max_digits=10,
                null=True,
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="depositJPY",
            field=models.DecimalField(
                blank=True,
                decimal_places=0,
                max_digits=10,
                null=True,
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="depositKRW",
            field=models.DecimalField(
                blank=True,
                decimal_places=0,
                max_digits=10,
                null=True,
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="depositUSD",
            field=models.DecimalField(
                blank=True,
                decimal_places=0,
                max_digits=10,
                null=True,
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="totalAmount",
            field=models.DecimalField(
                decimal_places=0,
                max_digits=10,
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="totalDeposit",
            field=models.DecimalField(
                blank=True,
                decimal_places=0,
                max_digits=10,
                null=True,
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
    ]
