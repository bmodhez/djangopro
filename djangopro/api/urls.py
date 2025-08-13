from django.urls import path
from . import views

urlpatterns = [
    path('transactions/', views.transactions_list, name='transactions_list'),
    path('dashboard/', views.dashboard_summary, name='dashboard_summary'),
]
