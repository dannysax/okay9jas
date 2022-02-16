from django.urls import path
from . import views



urlpatterns = [
    path("", views.endpoints, name='endpoints'),
    path("products/", views.products, name='products'),
     path('create/', views.createProduct, name="product-create"),
    path("products/top", views.getTopProducts, name='top-products'),
    path("userorders/", views.getUserOrders, name='user-orders'),
    path("products/<id>", views.productDetail, name='details'),
    path("product/<id>/reviews", views.createProductReview, name='reviews'),
    path("product/order", views.addOrderItems, name = "create-order"),
    path("product/order/<id>", views.getOrderById, name = "order-details"),
    path("product/order/<id>/pay", views.updateToPaid, name = "order-pay"),
]