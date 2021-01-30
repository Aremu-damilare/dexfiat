from django.db import models

# Create your models here.


from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

COUNTRY_CHOICES = (
    ('UK','United KingDom'),
    ('US', 'UNITED STATE'),
    ('france','FRANCE'),
    ('china','CHINA'),
    ('czech republic','Czech Republic'),
    ('columbia','COLOMBIA'),
)

WALLET_CHOICES = (
    ('eth','ETHEREUM'),
    ('btc', 'BITCOIN'),
    ('dac','DASHCOIN'),
)

class kyc_application(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email_address = models.EmailField(max_length=50)
    phone_number = models.IntegerField()
    date_of_birth = models.CharField(max_length=30)
    front_image = models.ImageField(upload_to="images",null=True)
    back_image = models.ImageField(upload_to="images",null=True)
    Nationality = models.CharField(max_length=20, choices=COUNTRY_CHOICES, default='UK')
    address_line_1 = models.CharField(max_length=30)
    address_line_2 = models.CharField(max_length=30)
    city_of_residence = models.CharField(max_length=30)
    zip_code = models.CharField(max_length=10)
    telegram_username = models.CharField(max_length=30)
    wallet = models.CharField(max_length=20, choices=WALLET_CHOICES, default='eth')
    wallet_address = models.CharField(max_length=50, null=True)

    def __str__(self): 
         return self.email_address

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    middle_name = models.CharField(max_length=50, null=True)
    phone_number = models.IntegerField(null=True)
    date_of_birth = models.CharField(max_length=30, null=True)
    Nationality = models.CharField(max_length=20, choices=COUNTRY_CHOICES, default='UK')
    wallet = models.CharField(max_length=20, choices=WALLET_CHOICES, default='eth')
    wallet_address = models.CharField(max_length=50, null=True)

    def __str__(self): 
        return self.user


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

