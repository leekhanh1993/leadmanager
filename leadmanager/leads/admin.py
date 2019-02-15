from django.contrib import admin
from .models import Lead

# Register your models here.
@admin.register(Lead)
class AdminLead(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'created_at')
