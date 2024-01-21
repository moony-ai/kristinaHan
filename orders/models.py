from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator

class Order(models.Model):
    # 주문자 정보
    ordererName = models.CharField(max_length=100, blank=False)
    affiliation = models.CharField(max_length=100, blank=False)
    contact = models.CharField(max_length=100, blank=False)
    address = models.TextField(blank=True, null=True)

    # 주문 정보
    ORDER_STATUS_CHOICES = [
        ('상담', '상담'),
        ('주문', '주문'),
        ('수선', '수선'),
        ('수선입고', '수선입고'),
        ('배송중', '배송중'),
        ('배송완료', '배송완료'),
        ('수령완료', '수령완료'),
    ]
    orderStatus = models.CharField(max_length=50, choices=ORDER_STATUS_CHOICES, blank=False)
    orderNumber = models.CharField(max_length=50, blank=False)
    creator = models.CharField(max_length=100, blank=False)
    creationTime = models.DateTimeField(default=timezone.now, blank=False)
    modifier = models.CharField(max_length=100, blank=True, null=True)
    lastModifiedTime = models.DateTimeField(default=timezone.now, blank=True, null=True)
    DELIVERY_METHOD_CHOICES = [
        ('배송', '배송'),
        ('직접수령', '직접수령'),
        ('방문수령', '방문수령'),
    ]
    deliveryMethod = models.CharField(max_length=50, choices=DELIVERY_METHOD_CHOICES, blank=False)

    # 제품 정보
    TUXEDO_TYPE_CHOICES = [
        ('자켓 (R-Peaked)', '자켓 (R-Peaked)'),
        ('자켓 (R-Shawl)', '자켓 (R-Shawl)'),
        ('자켓 (S-Peaked)', '자켓 (S-Peaked)'),
    ]
    tuxedoType = models.CharField(max_length=100, choices=TUXEDO_TYPE_CHOICES, blank=True, null=True)
    jacketSize = models.CharField(max_length=50, blank=True, null=True)
    pantsSize = models.CharField(max_length=50, blank=True, null=True)
    shirtSize = models.CharField(max_length=50, blank=True, null=True)
    DRESS_TYPE_CHOICES = [
        ('드레스 (R)', '드레스 (R)'),
        ('드레스 (S)', '드레스 (S)'),
        ('드레스 (RM)', '드레스 (RM)'),
    ]
    dressType = models.CharField(max_length=100, choices=DRESS_TYPE_CHOICES, blank=True, null=True)
    dressSize = models.CharField(max_length=50, blank=True, null=True)
    ringSizeMen = models.CharField(max_length=50, blank=True, null=True)
    ringSizeWomen = models.CharField(max_length=50, blank=True, null=True)
    NECKLACE_SIZE_CHOICES = [
        ('S', 'S'),
        ('M', 'M'),
    ]
    necklaceSize = models.CharField(max_length=50, choices=NECKLACE_SIZE_CHOICES, blank=True, null=True)
    EARRING_TYPE_CHOICES = [
        ('귀찌', '귀찌'),
        ('귀걸이', '귀걸이'),
    ]
    earringType = models.CharField(max_length=50, choices=EARRING_TYPE_CHOICES, blank=True, null=True)
    bowtie = models.BooleanField(default=False, blank=True, null=True)

    # 결제 정보
    payerName = models.CharField(max_length=100, blank=False)
    RELATION_TO_ORDERER_CHOICES = [
        ('본인', '본인'),
        ('부', '부'),
        ('모', '모'),
        ('형제', '형제'),
        ('배우자', '배우자'),
        ('기타', '기타'),
    ]
    relationToOrderer = models.CharField(max_length=50, choices=RELATION_TO_ORDERER_CHOICES, blank=False)
    totalAmount = models.DecimalField(
        max_digits=10, 
        decimal_places=0, 
        blank=False,
        validators=[MinValueValidator(0)]
    )
    depositKRW = models.DecimalField(
        max_digits=10, 
        decimal_places=0, 
        blank=True,
        null=True,
        validators=[MinValueValidator(0)]
    )
    depositJPY = models.DecimalField(
        max_digits=10, 
        decimal_places=0, 
        blank=True,
        null=True,
        validators=[MinValueValidator(0)]
    )
    depositUSD = models.DecimalField(
        max_digits=10, 
        decimal_places=0, 
        blank=True,
        null=True,
        validators=[MinValueValidator(0)]
    )
    totalDeposit = models.DecimalField(
        max_digits=10, 
        decimal_places=0, 
        blank=True,
        null=True,
        validators=[MinValueValidator(0)]
    )
    balance = models.DecimalField(
        max_digits=10, 
        decimal_places=0, 
        blank=False,
        validators=[MinValueValidator(0)]
    )
    depositDate = models.DateField(blank=True, null=True)
    balanceDate = models.DateField(blank=True, null=True)

    # 수선 정보
    dressBackWidth = models.CharField(max_length=50, blank=True, null=True)
    dressLength = models.CharField(max_length=50, blank=True,null=True)
    jacketSleeveLength = models.CharField(max_length=50, blank=True, null=True)
    jacketLength = models.CharField(max_length=50, blank=True, null=True)
    pantsWaistLength = models.CharField(max_length=50, blank=True, null=True)
    pantsLength = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.orderNumber
