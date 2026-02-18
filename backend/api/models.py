from django.db import models

# Create your models here.
class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    age = models.IntegerField()
    # MEDIA FIELD
    photo = models.ImageField(upload_to="students/", null=True, blank=True)

    def __str__(self):
        return self.name