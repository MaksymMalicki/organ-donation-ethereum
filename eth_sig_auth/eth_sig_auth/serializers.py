# serializers.py
from rest_framework import serializers
from .models import EthereumInfo

class EthereumInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EthereumInfo
        fields = ('ethereum_address', 'nonce')