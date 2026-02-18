from django.urls import path
from .views import student

urlpatterns = [
    # path('register/', register),
    path('students/', student),
    path('students/<int:pk>/', student),
    
]
