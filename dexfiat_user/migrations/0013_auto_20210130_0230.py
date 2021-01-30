# Generated by Django 3.1.5 on 2021-01-30 01:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dexfiat_user', '0012_auto_20210130_0104'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='bio',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='birth_date',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='location',
        ),
        migrations.AddField(
            model_name='profile',
            name='Nationality',
            field=models.CharField(choices=[('UK', 'United KingDom'), ('US', 'UNITED STATE'), ('france', 'FRANCE'), ('china', 'CHINA'), ('czech republic', 'Czech Republic'), ('columbia', 'COLOMBIA')], default='UK', max_length=20),
        ),
        migrations.AddField(
            model_name='profile',
            name='date_of_birth',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='phone_number',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='wallet',
            field=models.CharField(choices=[('eth', 'ETHEREUM'), ('btc', 'BITCOIN'), ('dac', 'DASHCOIN')], default='eth', max_length=20),
        ),
        migrations.AddField(
            model_name='profile',
            name='wallet_address',
            field=models.CharField(max_length=50, null=True),
        ),
    ]