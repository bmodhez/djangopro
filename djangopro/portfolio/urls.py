from django.urls import path
from .views import (
    SkillListView, ExperienceListView, ProjectListView, 
    ContactInfoView, AboutInfoView, submit_contact_message
)

urlpatterns = [
    path('skills/', SkillListView.as_view(), name='skills-list'),
    path('experiences/', ExperienceListView.as_view(), name='experiences-list'),
    path('projects/', ProjectListView.as_view(), name='projects-list'),
    path('contact-info/', ContactInfoView.as_view(), name='contact-info'),
    path('about-info/', AboutInfoView.as_view(), name='about-info'),
    path('contact-message/', submit_contact_message, name='contact-message'),
]
