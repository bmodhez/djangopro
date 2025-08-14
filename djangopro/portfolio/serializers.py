from rest_framework import serializers
from .models import Skill, Experience, Project, ContactInfo, ContactMessage, AboutInfo

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'level', 'category']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'title', 'company', 'period', 'description', 'technologies']

class ProjectSerializer(serializers.ModelSerializer):
    image = serializers.CharField(source='image_emoji', read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'technologies', 'image', 'link', 'demo_link']

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = ['id', 'email', 'phone', 'location']

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message']

class AboutInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutInfo
        fields = ['id', 'intro_text', 'years_experience', 'projects_completed', 'client_satisfaction']
