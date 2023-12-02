from django.contrib import admin
from django.urls import path

from .views import GetNonce, ValidateSignature, Hospitals, ProposalView, QueryProposalView, AcceptProposalView, RejectProposalView

urlpatterns = [
    path("admin/", admin.site.urls),
    path('get-nonce/', GetNonce.as_view(), name='get-nonce'),
    path('validate-signature/', ValidateSignature.as_view(), name='validate-signature'),
    path('hospitals/', Hospitals.as_view(), name='hospitals'),
    path('proposal/', ProposalView.as_view(), name='proposal'),
    path('query-proposal/<str:doctor_address>/', QueryProposalView.as_view(), name='query-proposal'),
    path('accept-proposal/', AcceptProposalView.as_view(), name='accept-proposal'),
    path('reject-proposal/', RejectProposalView.as_view(), name='reject-proposal'),
]
