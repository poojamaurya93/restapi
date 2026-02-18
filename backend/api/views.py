from django.shortcuts import render
# Create your views here.
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Student
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from .serializer import RegisterSerializer, StudentSerializer
@api_view(['get', 'post', 'put', 'delete'])
@permission_classes([AllowAny])
def student(request, pk=None):
    request.parsers = [MultiPartParser(), FormParser()]
    if request.method == 'GET':
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = StudentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        #  THIS LINE SHOWS THE REAL ERROR
        print(serializer.errors)
        return Response(serializer.errors, status=400)
    if request.method == 'PUT':
        try:
            student = Student.objects.get(id=pk)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=404)

        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    if request.method == 'DELETE':
        try:
            student_obj = Student.objects.get(id=pk)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=404)

        student_obj.delete()
        return Response(
            {"message": "Student deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )