from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView
)
from . import views
urlpatterns = [
     path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('profile/', views.get_user_profile, name = 'profile'),
    path('users/', views.getUsers, name = 'users'),
    path('users/<id>/edit', views.editUserDetails, name = 'admin-user-edit'),
    path('register/', views.registerUser, name='register'),
    path('profile/update/', views.updateUserProfile, name='profile-update')
]
