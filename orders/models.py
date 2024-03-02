from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator


class Order(models.Model):
    # 소프트 삭제 기능 구현
    is_deleted = models.BooleanField(default=False)
    
    # 주문 정보
    orderStatus = models.CharField(max_length=50, blank=False)
    orderNumber = models.CharField(max_length=50, blank=False)
    creator = models.CharField(max_length=100, blank=False)
    creationTime = models.DateTimeField(default=timezone.now, blank=False)
    modifier = models.CharField(max_length=100, blank=True, null=True)
    lastModifiedTime = models.DateTimeField(default=timezone.now, blank=True, null=True)
    deliveryMethod = models.CharField(max_length=50, blank=False)
    
    # 주문자 정보
    ordererName = models.CharField(max_length=100, blank=False)
    affiliation = models.CharField(max_length=100, blank=False)
    contact = models.CharField(max_length=100, blank=False)
    address = models.TextField(blank=True, null=True)
    spouseName = models.CharField(max_length=100, blank=True, null=True)
    spouseContact = models.CharField(max_length=100, blank=True, null=True)
    spouseAffiliation = models.CharField(max_length=100, blank=True, null=True)

    # 제품 정보
    tuxedoType = models.CharField(max_length=100, blank=True, null=True)
    jacketSize = models.CharField(max_length=50, blank=True, null=True)
    pantsSize = models.CharField(max_length=50, blank=True, null=True)
    shirtSize = models.CharField(max_length=50, blank=True, null=True)
    dressType = models.CharField(max_length=100, blank=True, null=True)
    dressSize = models.CharField(max_length=50, blank=True, null=True)
    ringSizeMen = models.CharField(max_length=50, blank=True, null=True)
    ringSizeWomen = models.CharField(max_length=50, blank=True, null=True)
    necklaceSize = models.CharField(max_length=50, blank=True, null=True)
    earringType = models.CharField(max_length=50, blank=True, null=True)
    bowtie = models.BooleanField(default=False, blank=True, null=True)

    # 결제 정보
    payerName = models.CharField(max_length=100, blank=False)
    relationToOrderer = models.CharField(max_length=50, blank=False)
    totalAmount = models.DecimalField(max_digits=10, decimal_places=0, blank=False, validators=[MinValueValidator(0)])
    depositKRW = models.DecimalField(
        max_digits=10,
        decimal_places=0,
        blank=True,
        null=True,
        validators=[MinValueValidator(0)],
    )
    depositJPY = models.DecimalField(
        max_digits=10,
        decimal_places=0,
        blank=True,
        null=True,
        validators=[MinValueValidator(0)],
    )
    depositUSD = models.DecimalField(
        max_digits=10,
        decimal_places=0,
        blank=True,
        null=True,
        validators=[MinValueValidator(0)],
    )
    totalDeposit = models.DecimalField(
        max_digits=10,
        decimal_places=0,
        blank=True,
        null=True,
        validators=[MinValueValidator(0)],
    )
    balanceKRW = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True, validators=[MinValueValidator(0)])
    balanceJPY = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True, validators=[MinValueValidator(0)])
    balanceUSD = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True, validators=[MinValueValidator(0)])
    balance = models.DecimalField(max_digits=10, decimal_places=0, blank=False, validators=[MinValueValidator(0)])
    
    depositDate = models.DateField(blank=True, null=True)
    balanceDate = models.DateField(blank=True, null=True)
    
    paymentMethodDepositKRW = models.CharField(max_length=50, blank=True, null=True)
    paymentMethodDepositJPY = models.CharField(max_length=50, blank=True, null=True)
    paymentMethodDepositUSD = models.CharField(max_length=50, blank=True, null=True)
    paymentMethodBalanceKRW = models.CharField(max_length=50, blank=True, null=True)
    paymentMethodBalanceJPY = models.CharField(max_length=50, blank=True, null=True)
    paymentMethodBalanceUSD = models.CharField(max_length=50, blank=True, null=True)

    # 수선 정보
    dressBackWidth = models.CharField(max_length=50, blank=True, null=True)
    dressLength = models.CharField(max_length=50, blank=True, null=True)
    jacketSleeveLength = models.CharField(max_length=50, blank=True, null=True)
    jacketLength = models.CharField(max_length=50, blank=True, null=True)
    pantsWaistLength = models.CharField(max_length=50, blank=True, null=True)
    pantsLength = models.CharField(max_length=50, blank=True, null=True)
    alterationMemo = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.orderNumber

class NewOrder(models.Model):
    # 소프트 삭제 기능 구현
    is_deleted = models.BooleanField(default=False)
    
    # 주문 정보
    orderStatus = models.CharField(max_length=50, blank=False)
    orderNumber = models.CharField(max_length=50, blank=False)
    creator = models.CharField(max_length=100, blank=False)
    creationTime = models.DateTimeField(default=timezone.now, blank=False)
    modifier = models.CharField(max_length=100, blank=True, null=True)
    lastModifiedTime = models.DateTimeField(default=timezone.now, blank=True, null=True)
    deliveryMethod = models.CharField(max_length=50, blank=False)
    
    # 주문자 정보
    ordererName = models.CharField(max_length=100, blank=False)
    affiliation = models.CharField(max_length=100, blank=False)
    contact = models.CharField(max_length=100, blank=False)
    address = models.TextField(blank=True, null=True)
    spouseName = models.CharField(max_length=100, blank=True, null=True)
    spouseContact = models.CharField(max_length=100, blank=True, null=True)
    spouseAffiliation = models.CharField(max_length=100, blank=True, null=True)

    # 제품 정보
    tuxedoType = models.CharField(max_length=100, blank=True, null=True)
    jacketSize = models.CharField(max_length=50, blank=True, null=True)
    pantsSize = models.CharField(max_length=50, blank=True, null=True)
    shirtSize = models.CharField(max_length=50, blank=True, null=True)
    dressType = models.CharField(max_length=100, blank=True, null=True)
    dressSize = models.CharField(max_length=50, blank=True, null=True)
    ringSizeMen = models.CharField(max_length=50, blank=True, null=True)
    ringSizeWomen = models.CharField(max_length=50, blank=True, null=True)
    necklaceSize = models.CharField(max_length=50, blank=True, null=True)
    earringType = models.CharField(max_length=50, blank=True, null=True)
    bowtie = models.BooleanField(default=False, blank=True, null=True)

    # 결제 정보
    payerName = models.CharField(max_length=100, blank=False)
    relationToOrderer = models.CharField(max_length=50, blank=False)
    totalAmount = models.DecimalField(max_digits=10, decimal_places=0, blank=False, validators=[MinValueValidator(0)])
    depositKRW = models.DecimalField(
        max_digits=10,
        decimal_places=0,
        blank=True,
        null=True,
        validators=[MinValueValidator(0)],
    )
    depositJPY = models.DecimalField(
        max_digits=10,
        decimal_places=0,
        blank=True,
        null=True,
        validators=[MinValueValidator(0)],
    )
    depositUSD = models.DecimalField(
        max_digits=10,
        decimal_places=0,
        blank=True,
        null=True,
        validators=[MinValueValidator(0)],
    )
    totalDeposit = models.DecimalField(
        max_digits=10,
        decimal_places=0,
        blank=True,
        null=True,
        validators=[MinValueValidator(0)],
    )
    balanceKRW = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True, validators=[MinValueValidator(0)])
    balanceJPY = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True, validators=[MinValueValidator(0)])
    balanceUSD = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True, validators=[MinValueValidator(0)])
    balance = models.DecimalField(max_digits=10, decimal_places=0, blank=False, validators=[MinValueValidator(0)])
    
    depositDate = models.DateField(blank=True, null=True)
    balanceDate = models.DateField(blank=True, null=True)
    
    paymentMethodDepositKRW = models.CharField(max_length=50, blank=True, null=True)
    paymentMethodDepositJPY = models.CharField(max_length=50, blank=True, null=True)
    paymentMethodDepositUSD = models.CharField(max_length=50, blank=True, null=True)
    paymentMethodBalanceKRW = models.CharField(max_length=50, blank=True, null=True)
    paymentMethodBalanceJPY = models.CharField(max_length=50, blank=True, null=True)
    paymentMethodBalanceUSD = models.CharField(max_length=50, blank=True, null=True)

    # 수선 정보
    alteration1 = models.CharField(max_length=50, blank=True, null=True)
    alteration2 = models.CharField(max_length=50, blank=True, null=True)
    alteration3 = models.CharField(max_length=50, blank=True, null=True)
    alteration4 = models.CharField(max_length=50, blank=True, null=True)
    alteration5 = models.CharField(max_length=50, blank=True, null=True)
    alteration6 = models.CharField(max_length=50, blank=True, null=True)
    alteration7 = models.CharField(max_length=50, blank=True, null=True)
    alterationMemo = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.orderNumber
