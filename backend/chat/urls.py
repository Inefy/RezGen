# chat/urls.py

from django.urls import path
from .views import index, ChatView

urlpatterns = [
    path('', index, name='index'),
    path('api/chat/', ChatView.as_view(), name='api-chat'),
]
