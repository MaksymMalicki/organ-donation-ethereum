# Generated by Django 4.2.7 on 2023-12-01 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eth_sig_auth', '0003_alter_proposal_pairs'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='proposal',
            name='pairs',
        ),
        migrations.AddField(
            model_name='proposal',
            name='doctor_address',
            field=models.CharField(default='', max_length=64),
        ),
        migrations.AddField(
            model_name='proposal',
            name='order',
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AddField(
            model_name='proposal',
            name='patient_address',
            field=models.CharField(default='', max_length=64),
        ),
        migrations.AlterField(
            model_name='proposal',
            name='donor_address',
            field=models.CharField(default='', max_length=64),
        ),
    ]