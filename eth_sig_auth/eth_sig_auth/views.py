# views.py
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import EthereumInfo, Hospital, Proposal
from .serializers import EthereumInfoSerializer, HospitalSerializer, ProposalSerializer
from django.shortcuts import get_object_or_404
import random
from web3 import Web3
from eth_account.messages import encode_defunct
from django.db.models import Subquery, OuterRef, Min, Q

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
        
class Hospitals(APIView):
    def get(self, request):
        hospitals = Hospital.objects.all()
        serializer = HospitalSerializer(hospitals, many=True)
        return Response(serializer.data)
    


class ProposalView(APIView):
    def post(self, request, format=None):
        donor_address = request.data.get('donor_address')
        if donor_address is not None:
            Proposal.objects.filter(donor_address=donor_address).delete()
            pairs = request.data.get('pairs')
            generated_pairs = [
                {'donor_address': donor_address, 'doctor_address': pair['doctor_address'], 'patient_address': pair['patient_address'], 'order': i}
                for i, pair in enumerate(pairs) 
            ]
            print(generated_pairs)
            Proposal.objects.bulk_create([Proposal(**pair) for pair in generated_pairs])

            return Response({'status': 'Records deleted and regenerated successfully'})

        return Response({'detail': 'Missing donor_address in the request.'}, status=status.HTTP_400_BAD_REQUEST)

class QueryProposalView(APIView):
    def get(self, request, doctor_address):
        subquery = Proposal.objects.filter(donor_address=OuterRef('donor_address')).values('donor_address').annotate(min_order=Min('order')).values('min_order')[:1]
        pairs = Proposal.objects.filter(Q(doctor_address=doctor_address, order=Subquery(subquery))).order_by('donor_address', 'order')
        serializer = ProposalSerializer(pairs, many=True)
        return JsonResponse(serializer.data, safe=False)

class AcceptProposalView(APIView):
    def post(self, request):
        donor_address = request.data.get('donor_address')
        doctor_address = request.data.get('doctor_address')
        if donor_address is not None and doctor_address is not None:
            Proposal.objects.filter(donor_address=donor_address, doctor_address=doctor_address).delete()
            return Response({'status': 'Proposal deleted successfully'})

        return Response({'detail': 'Missing donor_address or doctor_address or patient_address in the request.'}, status=status.HTTP_400_BAD_REQUEST)
    
class RejectProposalView(APIView):
    def post(self, request):
        donor_address = request.data.get('donor_address')
        doctor_address = request.data.get('doctor_address')
        print(donor_address, doctor_address)
        if donor_address is not None and doctor_address is not None:
            Proposal.objects.filter(donor_address=donor_address, doctor_address=doctor_address).delete()
            return Response({'status': 'Proposal deleted successfully'})

        return Response({'detail': 'Missing donor_address or doctor_address or patient_address in the request.'}, status=status.HTTP_400_BAD_REQUEST)