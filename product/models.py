from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE



class Product(models.Model):
    Category = (
    ("men", "MEN"),
    ("women", "WOMEN"),
    ("both", "BOTH")
    )
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    brand = models.CharField(max_length=30, blank=True, null=True)
    description = models.CharField(max_length=350, null=True, blank=True)
    price = models.DecimalField(decimal_places=2, max_digits=7, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    category = models.CharField(max_length=50, choices=Category, null=True, blank=True)
    countInstock = models.IntegerField(blank=True, null=True)
    rating =models.DecimalField(decimal_places=2, max_digits=7, null=True, blank=True)
    numReviews = models.IntegerField(default=0, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    #name = models.CharField(max_length=200, blank=True, null=True)
    paymentMethod = models.CharField(max_length=50, null=True, blank=True)
    taxPrice = models.IntegerField(blank=True, null=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    totalPrice = models.IntegerField(null=True, blank=True)
    shippingPrice = models.IntegerField(blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.createdAt)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    qty = models.IntegerField(default=0, blank=True, null=True)
    addToCart = models.BooleanField(default=False)

    def __Str__(self):
        return self.name
     

class shippingAddress(models.Model):
    countries = (
        ("LAGOS", "Lagos"),
        ("ABUJA", "Abuja")
    )


    states = (
            ("NIGERIA", "Nigeria"),
            ("GHANA", "Ghana")
        )

    order = models.OneToOneField(Order, on_delete=models.SET_NULL, null=True, blank=True)
    country = models.CharField(max_length=50, default="Nigeria", choices=countries)
    state = models.CharField(max_length=50, choices=states)
    postalCode = models.CharField(max_length=50, blank=True, null=True)
    city = models.CharField(max_length=50, null=True, blank=True)
    address = models.CharField(max_length=50, blank=True, null=True)
    shippingPrice = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.address

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, default="")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    comment = models.TextField(max_length=200)
    rating = models.IntegerField(default=0, blank=True, null=True)

    def __str__(self):
        return str(self.rating)