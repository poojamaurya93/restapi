from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Student

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, data):
        return User.objects.create_user(**data)


class StudentSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(use_url=True)
    class Meta:
        model = Student
        fields = '__all__'


