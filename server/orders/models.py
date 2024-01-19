from django.db import models
from django.utils import timezone

class Order(models.Model):
    # 주문자정보
    ordererName = models.CharField(max_length=100)
    affiliation = models.CharField(max_length=100)
    contact = models.CharField(max_length=100)
    address = models.TextField()

    # 주문정보 
    orderStatus = models.CharField(max_length=50)
    orderNumber = models.CharField(max_length=50)
    creator = models.CharField(max_length=100)
    creationTime = models.DateTimeField(default=timezone.now)
    modifier = models.CharField(max_length=100)
    lastModifiedTime = models.DateTimeField(default=timezone.now)
    deliveryMethod = models.CharField(max_length=50)
    
    # 제품정보
    tuxedoType = models.CharField(max_length=100, blank=True)
    jacketSize = models.CharField(max_length=50, blank=True)
    pantsSize = models.CharField(max_length=50, blank=True)
    shirtSize = models.CharField(max_length=50, blank=True)
    dressType = models.CharField(max_length=100, blank=True)
    dressSize = models.CharField(max_length=50, blank=True)
    ringSizeMen = models.CharField(max_length=50, blank=True)
    ringSizeWomen = models.CharField(max_length=50, blank=True)
    necklaceSize = models.CharField(max_length=50, blank=True)
    earringType = models.CharField(max_length=50, blank=True)
    bowtie = models.CharField(max_length=50, blank=True)
    
    # 결제정보
    payerName = models.CharField(max_length=100)
    relationToOrderer = models.CharField(max_length=100)
    paymentMethod = models.CharField(max_length=50)
    currency = models.CharField(max_length=50)
    totalPayment = models.DecimalField(max_digits=10, decimal_places=2)
    deposit = models.DecimalField(max_digits=10, decimal_places=2)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    
    # 수선정보
    dressBackWidth = models.CharField(max_length=50, blank=True)
    dressLength = models.CharField(max_length=50, blank=True)
    jacketSleeveLength = models.CharField(max_length=50, blank=True)
    jacketLength = models.CharField(max_length=50, blank=True)
    pantsWaistLength = models.CharField(max_length=50, blank=True)
    pantsLength = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.orderNumber
