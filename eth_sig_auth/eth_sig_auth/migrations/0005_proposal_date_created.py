# Generated by Django 4.2.7 on 2023-12-04 11:36

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('eth_sig_auth', '0004_remove_proposal_pairs_proposal_doctor_address_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='proposal',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
