# Generated by Django 5.0.1 on 2024-03-02 07:49

import django.core.validators
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("orders", "0013_alter_order_balance_alter_order_balancejpy_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="NewOrder",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("is_deleted", models.BooleanField(default=False)),
                ("orderStatus", models.CharField(max_length=50)),
                ("orderNumber", models.CharField(max_length=50)),
                ("creator", models.CharField(max_length=100)),
                (
                    "creationTime",
                    models.DateTimeField(default=django.utils.timezone.now),
                ),
                ("modifier", models.CharField(blank=True, max_length=100, null=True)),
                (
                    "lastModifiedTime",
                    models.DateTimeField(
                        blank=True, default=django.utils.timezone.now, null=True
                    ),
                ),
                ("deliveryMethod", models.CharField(max_length=50)),
                ("ordererName", models.CharField(max_length=100)),
                ("affiliation", models.CharField(max_length=100)),
                ("contact", models.CharField(max_length=100)),
                ("address", models.TextField(blank=True, null=True)),
                ("spouseName", models.CharField(blank=True, max_length=100, null=True)),
                (
                    "spouseContact",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "spouseAffiliation",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                ("tuxedoType", models.CharField(blank=True, max_length=100, null=True)),
                ("jacketSize", models.CharField(blank=True, max_length=50, null=True)),
                ("pantsSize", models.CharField(blank=True, max_length=50, null=True)),
                ("shirtSize", models.CharField(blank=True, max_length=50, null=True)),
                ("dressType", models.CharField(blank=True, max_length=100, null=True)),
                ("dressSize", models.CharField(blank=True, max_length=50, null=True)),
                ("ringSizeMen", models.CharField(blank=True, max_length=50, null=True)),
                (
                    "ringSizeWomen",
                    models.CharField(blank=True, max_length=50, null=True),
                ),
                (
                    "necklaceSize",
                    models.CharField(blank=True, max_length=50, null=True),
                ),
                ("earringType", models.CharField(blank=True, max_length=50, null=True)),
                ("bowtie", models.BooleanField(blank=True, default=False, null=True)),
                ("payerName", models.CharField(max_length=100)),
                ("relationToOrderer", models.CharField(max_length=50)),
                (
                    "totalAmount",
                    models.DecimalField(
                        decimal_places=0,
                        max_digits=10,
                        validators=[django.core.validators.MinValueValidator(0)],
                    ),
                ),
                (
                    "depositKRW",
                    models.DecimalField(
                        blank=True,
                        decimal_places=0,
                        max_digits=10,
                        null=True,
                        validators=[django.core.validators.MinValueValidator(0)],
                    ),
                ),
                (
                    "depositJPY",
                    models.DecimalField(
                        blank=True,
                        decimal_places=0,
                        max_digits=10,
                        null=True,
                        validators=[django.core.validators.MinValueValidator(0)],
                    ),
                ),
                (
                    "depositUSD",
                    models.DecimalField(
                        blank=True,
                        decimal_places=0,
                        max_digits=10,
                        null=True,
                        validators=[django.core.validators.MinValueValidator(0)],
                    ),
                ),
                (
                    "totalDeposit",
                    models.DecimalField(
                        blank=True,
                        decimal_places=0,
                        max_digits=10,
                        null=True,
                        validators=[django.core.validators.MinValueValidator(0)],
                    ),
                ),
                (
                    "balanceKRW",
                    models.DecimalField(
                        blank=True,
                        decimal_places=0,
                        max_digits=10,
                        null=True,
                        validators=[django.core.validators.MinValueValidator(0)],
                    ),
                ),
                (
                    "balanceJPY",
                    models.DecimalField(
                        blank=True,
                        decimal_places=0,
                        max_digits=10,
                        null=True,
                        validators=[django.core.validators.MinValueValidator(0)],
                    ),
                ),
                (
                    "balanceUSD",
                    models.DecimalField(
                        blank=True,
                        decimal_places=0,
                        max_digits=10,
                        null=True,
                        validators=[django.core.validators.MinValueValidator(0)],
                    ),
                ),
                (
                    "balance",
                    models.DecimalField(
                        decimal_places=0,
                        max_digits=10,
                        validators=[django.core.validators.MinValueValidator(0)],
                    ),
                ),
                ("depositDate", models.DateField(blank=True, null=True)),
                ("balanceDate", models.DateField(blank=True, null=True)),
                (
                    "paymentMethodDepositKRW",
                    models.CharField(blank=True, max_length=50, null=True),
                ),
                (
                    "paymentMethodDepositJPY",
                    models.CharField(blank=True, max_length=50, null=True),
                ),
                (
                    "paymentMethodDepositUSD",
                    models.CharField(blank=True, max_length=50, null=True),
                ),
                (
                    "paymentMethodBalanceKRW",
                    models.CharField(blank=True, max_length=50, null=True),
                ),
                (
                    "paymentMethodBalanceJPY",
                    models.CharField(blank=True, max_length=50, null=True),
                ),
                (
                    "paymentMethodBalanceUSD",
                    models.CharField(blank=True, max_length=50, null=True),
                ),
                ("alteration1", models.CharField(blank=True, max_length=50, null=True)),
                ("alteration2", models.CharField(blank=True, max_length=50, null=True)),
                ("alteration3", models.CharField(blank=True, max_length=50, null=True)),
                ("alteration4", models.CharField(blank=True, max_length=50, null=True)),
                ("alteration5", models.CharField(blank=True, max_length=50, null=True)),
                ("alteration6", models.CharField(blank=True, max_length=50, null=True)),
                ("alteration7", models.CharField(blank=True, max_length=50, null=True)),
                ("alterationMemo", models.TextField(blank=True, null=True)),
            ],
        ),
    ]