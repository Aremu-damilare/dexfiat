from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import kyc_application, Profile


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name' )
        widgets = {
        'email': forms.TextInput(attrs={'class': 'input-bordered', }),
        'last_name': forms.TextInput(attrs={'class': 'input-bordered'}),
        'first_name': forms.TextInput(attrs={'class': 'input-bordered'}),
        }

class ProfileForm(forms.ModelForm):
    
    class Meta:
        model = Profile
        fields = ('middle_name', 'phone_number', 'date_of_birth', 'Nationality')
        widgets = {
        'middle_name': forms.TextInput(attrs={'class': 'input-bordered', }),
        'phone_number': forms.TextInput(attrs={'class': 'input-bordered'}),
        'date_of_birth': forms.TextInput(attrs={'class': 'input-bordered'}),
        # 'Nationality': forms.TextInput(attrs={'class': 'input-bordered'}),
        }

class ProfileForm2(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('wallet',  'wallet_address')
        widgets = {
        # 'wallet': forms.TextInput(attrs={'class': 'input-bordered', }),
        'wallet_address': forms.TextInput(attrs={'class': 'input-bordered'}),
        }


class SignUpForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=True, help_text='firstname.')
    last_name = forms.CharField(max_length=30, required=True, help_text='lastname.')
    email = forms.EmailField(max_length=254, help_text='Required. Inform a valid email address.')
    
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2', )
        widgets = {
            'first_name': forms.TextInput(attrs={'placeholder': 'firstname'}),
            'last_name': forms.TextInput(attrs={'placeholder': 'lastname'}),
        }


class Kyc_Form(forms.ModelForm): 
    class Meta:
        model= kyc_application
        fields = ["first_name", "last_name", "email_address", "phone_number", "date_of_birth", \
            "Nationality", "address_line_1", "address_line_2", "city_of_residence", "zip_code", "telegram_username", \
                "front_image", "back_image", "wallet_address", "wallet"]
        widgets = {
            'date_of_birth': forms.TextInput(attrs={'placeholder': 'dd/mm/yyyy', 'class': 'input-bordered', }),
            'first_name': forms.TextInput(attrs={'placeholder': 'first name', 'class': 'input-bordered', }),
            'last_name': forms.TextInput(attrs={'placeholder': 'last name', 'class': 'input-bordered', }),
            'email_address': forms.TextInput(attrs={'placeholder': 'email', 'class': 'input-bordered', }),
            'address_line_1': forms.TextInput(attrs={'placeholder': 'address line 1', 'class': 'input-bordered', }),
            'address_line_2': forms.TextInput(attrs={'placeholder': 'address line 2', 'class': 'input-bordered', }),
            'wallet_address': forms.TextInput(attrs={'placeholder': '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'}),
            'telegram_username': forms.TextInput(attrs={'placeholder': 'telegram username', 'class': 'input-bordered', }),
            'city_of_residence': forms.TextInput(attrs={'placeholder': 'city of residence', 'class': 'input-bordered', }),
            'zip_code': forms.TextInput(attrs={'placeholder': 'zip code', 'class': 'input-bordered', }),
            'phone_number': forms.TextInput(attrs={'placeholder': 'phone_number', 'class': 'input-bordered', }),
            
            'wallet_address': forms.TextInput(attrs={'placeholder': 'wallet address', 'class': 'input-bordered', }),
        }