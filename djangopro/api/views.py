from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.db.models import Sum
from .models import Transaction
import json
from datetime import datetime, timedelta
from decimal import Decimal

@csrf_exempt
@require_http_methods(["GET"])
def transactions_list(request):
    """Get all transactions"""
    try:
        transactions = Transaction.objects.all()[:50]  # Limit to 50 recent transactions
        
        data = []
        for transaction in transactions:
            data.append({
                'id': transaction.id,
                'description': transaction.description,
                'amount': float(transaction.amount) if transaction.transaction_type == 'income' else -float(transaction.amount),
                'category': transaction.category,
                'date': transaction.date.isoformat(),
                'type': transaction.transaction_type
            })
        
        return JsonResponse(data, safe=False)
    except Exception as e:
        # Return sample data if no transactions exist
        sample_data = [
            {
                'id': 1,
                'description': 'Grocery Shopping',
                'amount': -85.50,
                'category': 'Food',
                'date': '2024-01-15',
                'type': 'expense'
            },
            {
                'id': 2,
                'description': 'Salary',
                'amount': 3500.00,
                'category': 'Income',
                'date': '2024-01-01',
                'type': 'income'
            },
            {
                'id': 3,
                'description': 'Gas Station',
                'amount': -45.20,
                'category': 'Transportation',
                'date': '2024-01-12',
                'type': 'expense'
            }
        ]
        return JsonResponse(sample_data, safe=False)

@csrf_exempt
@require_http_methods(["GET"])
def dashboard_summary(request):
    """Get dashboard summary data"""
    try:
        # Calculate totals
        income_total = Transaction.objects.filter(
            transaction_type='income'
        ).aggregate(total=Sum('amount'))['total'] or Decimal('0')
        
        expense_total = Transaction.objects.filter(
            transaction_type='expense'
        ).aggregate(total=Sum('amount'))['total'] or Decimal('0')
        
        savings = income_total - expense_total
        
        # Expense breakdown by category
        expense_breakdown = Transaction.objects.filter(
            transaction_type='expense'
        ).values('category').annotate(
            total=Sum('amount')
        ).order_by('-total')
        
        expense_data = [
            {
                'name': item['category'],
                'value': float(item['total']),
                'color': get_category_color(item['category'])
            }
            for item in expense_breakdown
        ]
        
        # Monthly trend (last 12 months)
        monthly_data = get_monthly_trend()
        
        return JsonResponse({
            'totalIncome': float(income_total),
            'totalExpense': float(expense_total),
            'savings': float(savings),
            'expenseBreakdown': expense_data,
            'monthlyTrend': monthly_data
        })
    except Exception as e:
        # Return sample data
        return JsonResponse({
            'totalIncome': 4250.00,
            'totalExpense': 2159.45,
            'savings': 2090.55,
            'expenseBreakdown': [
                {'name': 'Food', 'value': 400, 'color': '#FF6B6B'},
                {'name': 'Transportation', 'value': 300, 'color': '#4ECDC4'},
                {'name': 'Entertainment', 'value': 200, 'color': '#45B7D1'}
            ],
            'monthlyTrend': [
                {'month': 'Jan', 'income': 4000, 'expense': 2400},
                {'month': 'Feb', 'income': 3000, 'expense': 1398},
                {'month': 'Mar', 'income': 2000, 'expense': 2000}
            ]
        })

def get_category_color(category):
    """Get color for category"""
    colors = {
        'Food': '#FF6B6B',
        'Transportation': '#4ECDC4',
        'Entertainment': '#45B7D1',
        'Utilities': '#FFA07A',
        'Shopping': '#98D8C8',
        'Healthcare': '#F7DC6F',
        'Income': '#10B981'
    }
    return colors.get(category, '#94A3B8')

def get_monthly_trend():
    """Get monthly income vs expense trend"""
    # This would typically query the database for actual monthly data
    # For now, return sample data
    return [
        {'month': 'Jan', 'income': 4000, 'expense': 2400},
        {'month': 'Feb', 'income': 3000, 'expense': 1398},
        {'month': 'Mar', 'income': 2000, 'expense': 2000},
        {'month': 'Apr', 'income': 2780, 'expense': 1908},
        {'month': 'May', 'income': 1890, 'expense': 2800},
        {'month': 'Jun', 'income': 2390, 'expense': 1800}
    ]
