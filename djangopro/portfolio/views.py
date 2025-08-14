from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Skill, Experience, Project, ContactInfo, ContactMessage, AboutInfo
from .serializers import (
    SkillSerializer, ExperienceSerializer, ProjectSerializer, 
    ContactInfoSerializer, ContactMessageSerializer, AboutInfoSerializer
)

class SkillListView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class ExperienceListView(generics.ListAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ContactInfoView(generics.ListAPIView):
    serializer_class = ContactInfoSerializer
    
    def get_queryset(self):
        return ContactInfo.objects.filter(is_active=True).first()
    
    def list(self, request, *args, **kwargs):
        contact_info = ContactInfo.objects.filter(is_active=True).first()
        if contact_info:
            serializer = self.get_serializer(contact_info)
            return Response(serializer.data)
        return Response({})

class AboutInfoView(generics.ListAPIView):
    serializer_class = AboutInfoSerializer
    
    def list(self, request, *args, **kwargs):
        about_info = AboutInfo.objects.filter(is_active=True).first()
        if about_info:
            serializer = self.get_serializer(about_info)
            return Response(serializer.data)
        return Response({})

@api_view(['POST'])
def submit_contact_message(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Thank you for your message!'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
