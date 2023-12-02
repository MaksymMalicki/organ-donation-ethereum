from rest_framework import serializers
from .models import EthereumInfo, Hospital, Proposal

class EthereumInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EthereumInfo
        fields = ('ethereum_address', 'nonce')

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ('name', 'rpc_address')

class ProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proposal
        fields = ['donor_address', 'doctor_address', 'patient_address', 'order']