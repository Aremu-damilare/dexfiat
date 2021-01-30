# Generated by Django 3.1.5 on 2021-01-29 22:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dexfiat_user', '0005_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='email_address',
            field=models.EmailField(help_text='Required. Inform a valid email address.', max_length=50),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='first_name',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='last_name',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='phone_number',
            field=models.IntegerField(),
        ),
    ]
