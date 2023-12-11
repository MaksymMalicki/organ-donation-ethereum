from django.contrib import admin
from django.urls import path
from .views import GetNonce, ValidateSignature, Hospitals, ProposalView, QueryProposalView, AcceptProposalView, RejectProposalView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Your API",
        default_version='v1',
        description="Your API description",
        terms_of_service="https://yourapp.com/terms/",
        contact=openapi.Contact(email="contact@yourapp.com"),
        license=openapi.License(name="Your License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path("admin/", admin.site.urls),
    path('get-nonce/', GetNonce.as_view(), name='get-nonce'),
    path('validate-signature/', ValidateSignature.as_view(), name='validate-signature'),
    path('hospitals/', Hospitals.as_view(), name='hospitals'),
    path('proposal/', ProposalView.as_view(), name='proposal'),
    path('query-proposal/<str:doctor_address>/', QueryProposalView.as_view(), name='query-proposal'),
    path('accept-proposal/', AcceptProposalView.as_view(), name='accept-proposal'),
    path('reject-proposal/', RejectProposalView.as_view(), name='reject-proposal'),
]
