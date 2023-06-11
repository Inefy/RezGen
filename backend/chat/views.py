# chat/views.py

from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import openai

openai.api_key = 'your-openai-key'  # Replace 'your-openai-key' with your actual OpenAI key

def index(request):
    return render(request, 'index.html')

class ChatView(APIView):
    def post(self, request):
        text = request.data.get('text')
        if text is not None:
            try:
                response = openai.Completion.create(
                    engine="text-davinci-002",
                    prompt=text,
                    max_tokens=60
                )
                return Response({ 'response': response.choices[0].text.strip() }, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({ 'error': str(e) }, status=status.HTTP_400_BAD_REQUEST)
        return Response({ 'error': 'Invalid input' }, status=status.HTTP_400_BAD_REQUEST)
