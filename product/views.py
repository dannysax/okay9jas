from datetime import datetime
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from .models import Product, Order 
from .serializers import *
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage




@api_view(["GET",])
def endpoints(request):
    endpoints = [
        "api/products",
        "api/products/details",
        "api/products/delete",
        "api/products/update"
    ]
    return Response(endpoints)

@api_view(["GET"])
def products(request):
    
    query = request.query_params.get('keyword')
    if query == None:
        query = ""
    print("query:", query)
    
    products = Product.objects.filter(name__icontains=query)
    
    page = request.query_params.get('page')
    paginator = Paginator(products, 5)
    
    try:
        products = paginator.page('page')
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
        
    if page == None:
        page = 1
    page = int(page)
    print("page:", page)
      
    serializers = ProductSerializer(products, many=True)
    return Response({"products" : serializers.data, "page" : page, "pages" : paginator.num_pages})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getTopProducts(requests):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:3]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET",])
def productDetail(request, id):
    product = Product.objects.get(pk=id)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
    

@api_view(["POST",])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    
    data = request.data
    
    if data['orderItems'] and len(data['orderItems']) == 0:
        return Response({"detail": "There are no items in your cart"}, status = status.HTTP_400_BAD_REQUEST)
    else:
        #create order
        #create shipping Address
        #create relation bw orderItems and product
        #update countInstock
        
        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            totalPrice = data['totalPrice'],
            shippingPrice = data['shippingPrice']
        )
        
        shipping = shippingAddress.objects.create(
            order = order,
            country = data['shippingAddress']['country'],
            postalCode = data['shippingAddress']['postalCode'],
            city = data['shippingAddress']['city'],
            address = data['shippingAddress']['address'],
        )
        
        for i in data['orderItems']:
            product = Product.objects.get(id=i['product'])
            item = OrderItem.objects.create(
                order = order,
                product = product,
                price = product.price,
                qty = i['qty'],
            )
            
            product.countInstock -= item.qty
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
    
 
@api_view(["GET",])
@permission_classes([IsAuthenticated])   
def getOrderById(request, id):
    user = request.user
    try:
        order = Order.objects.get(pk=id)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many = False)
            return Response(serializer.data)
        else:
            return Response({"detail":"Not authorized to perform this action"}, status = status.HTTP_400_BAD_REQUEST)
    except:
        return Response({"detail":"Order does not exist"}, status = status.HTTP_400_BAD_REQUEST)
 
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateToPaid(request, id):
    user = request.user
    order = Order.objects.get(pk=id)
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    serializer = OrderSerializer(order, many = False)
    return Response(serializer.data)
        

@api_view(['GET',])
@permission_classes([IsAuthenticated])
def getUserOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['POST',])
@permission_classes([IsAuthenticated])
def createProductReview(request, id):
    """
        1. if review exists already then user should be unable to create review
        2. if no rating then rating must be added
        3. create review
        4. update product numReviews
    """
    user = request.user
    data = request.data
 
    product = Product.objects.get(pk=id)
    
    reviewExist = product.review_set.filter(user=user).exists()
    
    if reviewExist:
        return Response({"detail":"Review already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    elif data['rating'] == '':
        return Response({"detail":"please add product rating"}, status=status.HTTP_400_BAD_REQUEST)
    
    else:
    
        review = Review.objects.create(
            user = user,
            name = user.first_name,
            product = product,
            rating = data['rating'],
            comment = data['comment']
        )
        
        allReviews = product.review_set.all()
        product.numReviews = len(allReviews)
        
        total = 0
        
        for i in allReviews:
            total += i.rating 
            
        product.rating = total / len(allReviews)        
        
        product.save()
        return Response('review created')