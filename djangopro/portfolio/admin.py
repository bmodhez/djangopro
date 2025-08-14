from django.contrib import admin
from .models import Skill, Experience, Project, ContactInfo, ContactMessage, AboutInfo

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'level', 'category', 'created_at']
    list_filter = ['category']
    search_fields = ['name']

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['title', 'company', 'period', 'order']
    list_editable = ['order']
    ordering = ['-order', '-created_at']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'image_emoji', 'order', 'created_at']
    list_editable = ['order']
    ordering = ['-order', '-created_at']

@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ['email', 'phone', 'location', 'is_active']
    list_filter = ['is_active']

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    readonly_fields = ['created_at']

@admin.register(AboutInfo)
class AboutInfoAdmin(admin.ModelAdmin):
    list_display = ['years_experience', 'projects_completed', 'client_satisfaction', 'is_active']
    list_filter = ['is_active']
