from django.db import models
from django.utils import timezone

class EthereumInfo(models.Model):
    ethereum_address = models.CharField(max_length=64, unique=True)
    nonce = models.PositiveIntegerField(default=0)
    def __str__(self):
        return f"{self.ethereum_address} - Nonce: {self.nonce}"
    
class Hospital(models.Model):
    name = models.CharField(max_length=64)
    rpc_address = models.CharField(max_length=64)
    def __str__(self):
        return f"{self.name} - {self.rpc_address}"
    
class Proposal(models.Model): 
    donor_address = models.CharField(max_length=64, default="")
    doctor_address = models.CharField(max_length=64, default="")
    patient_address = models.CharField(max_length=64, default="")
    order = models.PositiveIntegerField(default=1)
    date_created = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return f"{self.donor_address} - {self.order}"
