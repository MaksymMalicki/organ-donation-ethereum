from django.contrib import admin
from .models import EthereumInfo, Hospital, Proposal

admin.site.register(EthereumInfo)
admin.site.register(Hospital)
admin.site.register(Proposal)