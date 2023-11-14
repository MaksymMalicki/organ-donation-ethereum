from django.db import models
from django.contrib.auth.models import User

class EthereumInfo(models.Model):
    ethereum_address = models.CharField(max_length=64, unique=True)
    nonce = models.PositiveIntegerField(default=0)
    def __str__(self):
        return f"{self.ethereum_address} - Nonce: {self.nonce}"