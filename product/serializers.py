from dataclasses import fields
from rest_framework import serializers
from .models import *
from account.serializers import UserSerializer


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = Product
        fields = '__all__'
        
    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data
        

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = shippingAddress
        fields = "__all__"
        
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"
        
class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only = True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Order
        fields = "__all__"
        
    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data
    
    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    
    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
        
        