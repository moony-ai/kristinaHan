# Generated by Django 5.0.1 on 2024-01-20 06:29

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("orders", "0001_initial"),
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
            name="depositJPY",
            field=models.DecimalField(
                blank=True,
                decimal_places=0,
                max_digits=10,
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
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
    ]
