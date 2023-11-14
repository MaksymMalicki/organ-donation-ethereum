from django.contrib import admin
from django.urls import path

from .views import GetNonce, ValidateSignature

urlpatterns = [
    path("admin/", admin.site.urls),
    path('get-nonce/', GetNonce.as_view(), name='get-nonce'),
    path('validate-signature/', ValidateSignature.as_view(), name='validate-signature'),
]
