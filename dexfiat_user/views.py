from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from dexfiat_user.forms import SignUpForm
from django.contrib.auth.models import Group

from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm

from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse, HttpResponseRedirect
from .forms import Kyc_Form, UserForm, ProfileForm, ProfileForm2
from django.contrib import messages


@login_required
def myprofile(request):
    if request.method == 'POST':
        user_form = UserForm(request.POST, instance=request.user)
        profile_form = ProfileForm(request.POST, instance=request.user.profile)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, 'Your profile was successfully updated!')
            return redirect('success')
        else:
            messages.error(request, 'Please correct the error below.')
    else:
        user_form = UserForm(instance=request.user)
        profile_form = ProfileForm(instance=request.user.profile)
    return render(request, 'account.html', {
        'user_form': user_form,
        'profile_form': profile_form
    })

@login_required
def myprofile2(request):
    if request.method == 'POST':
        profile_form2 = ProfileForm2(request.POST, instance=request.user.profile)
        if profile_form2.is_valid():
            profile_form2.save()
            messages.success(request, 'Your profile was successfully updated!')
            return redirect('success')
        else:
            messages.error(request, 'Please correct the error below.')
    else:
        profile_form2 = ProfileForm2(instance=request.user.profile)
    return render(request, 'account2.html', {
        'profile_form2': profile_form2
    })


def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important!
            messages.success(request, 'Your password was successfully updated!')
            return redirect('change_password')
        else:
            messages.error(request, 'Please correct the error below.')
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'security.html', {
        'form': form
    })

def Kyc_form_View(request):
    if request.method == 'GET':
        form = Kyc_Form()
    else:
        form = Kyc_Form(request.POST, request.FILES)
        if form.is_valid():
            first_name = form.cleaned_data['first_name']
            last_name =  form.cleaned_data['last_name']
            email_address = form.cleaned_data['email_address']

            user = request.user
            group = Group.objects.get(name='working_on_id')
            user.groups.add(group)
            form.save()
            try:
                send_mail(first_name, last_name, email_address, ['a.damilare@gmail.com'])
            except BadHeaderError:
                return HttpResponse('Invalid header found.')
            return redirect('success')
    return render(request, "kyc-application.html", {'form': form})

def successView(request):
    return HttpResponse('Success! Thank you.')

# Create your views here.
@login_required
def home(request):
    return render(request, 'index.html')

def kyc_status(request):
    return render(request, 'kyc-status.html')

def policy(request):
    return render(request, 'policy.html')

def contributions(request):
    return render(request, 'tokens.html')

def kyc_application(request):
    return render(request, 'kyc-application.html')

def transactions(request):
    return render(request, 'transactions.html')

def how_to_buy(request):
    return render(request, 'how-to.html')

def faqs(request):
    return render(request, 'faq.html')

def kyc(request):
    return render(request, 'kyc.html')

def referral(request):
    return render(request, 'referral.html')


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = SignUpForm()
    return render(request, 'registration/signup.html', {'form': form})
