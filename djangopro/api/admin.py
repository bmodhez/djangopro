from django.contrib import admin
from .models import Transaction

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('description', 'amount', 'category', 'transaction_type', 'date', 'created_at')
    list_filter = ('transaction_type', 'category', 'date')
    search_fields = ('description', 'category')
    ordering = ('-date', '-created_at')
    date_hierarchy = 'date'
    
    fieldsets = (
        (None, {
            'fields': ('description', 'amount', 'category', 'transaction_type', 'date')
        }),
    )
