from django.contrib import admin

# Register your models here.
from .models import kyc_application, Profile

admin.site.register(kyc_application)
admin.site.register(Profile)