# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import EthereumInfo
from .serializers import EthereumInfoSerializer
from django.shortcuts import get_object_or_404
import random
from web3 import Web3
from eth_account.messages import encode_defunct

class GetNonce(APIView):
    def get(self, request):
        ethereum_address = request.query_params.get('ethereum_address', None)
        if len(ethereum_address)!=42:
            return Response({"error": "ethereum_address is not valid"}, status=status.HTTP_400_BAD_REQUEST)
        if not ethereum_address:
            return Response({"error": "ethereum_address parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        ethereum_info, created = EthereumInfo.objects.get_or_create(ethereum_address=ethereum_address)

        if created:
            ethereum_info.nonce = random.randint(1, 1000)  # You can adjust the range of nonce as needed
            ethereum_info.save()

        serializer = EthereumInfoSerializer(ethereum_info)
        return Response(serializer.data)

class ValidateSignature(APIView):
    def post(self, request):
        print("yoooooooooo")
        web3 = Web3()
        ethereum_address = request.query_params.get('ethereum_address', None)
        signature = request.query_params.get('signature', None)
        if len(ethereum_address)!=42:
            return Response({"error": "ethereum_address is not valid"}, status=status.HTTP_400_BAD_REQUEST)

        if not ethereum_address or not signature:
            return Response({"error": "ethereum_address and signature parameters are required"}, status=status.HTTP_400_BAD_REQUEST)
        ethereum_info = get_object_or_404(EthereumInfo, ethereum_address=ethereum_address)
        if not ethereum_info:
            return Response({"error": "ethereum_address is not found"}, status=status.HTTP_404_NOT_FOUND)
        message = f"Nonce: {ethereum_info.nonce}"

        # Convert the signature string to bytes
        signature_bytes = bytes.fromhex(signature[2:])

        # Pass the original message and signature to recover_message
        decoded_address = web3.eth.account.recover_message(encode_defunct(text=message), signature=signature_bytes)
        is_valid_signature = decoded_address.lower() == ethereum_address.lower()

        if is_valid_signature:
            ethereum_info.nonce = random.randint(1, 1000)
            ethereum_info.save()
            return Response({"result": True})
        else:
            return Response({"result": False})