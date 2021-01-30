from django.urls import path
from dexfiat_user import views
from django.contrib.auth import views as auth_views
from dexfiat_user import views as core_views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', auth_views.LoginView.as_view(), {'template_name': 'login'}, name='login'),
    path('logout/', auth_views.LogoutView.as_view(), {'next_page': 'home'}, name='logout'),
    path('signup/', core_views.signup, name='signup'),
    path('kyc-status/', core_views.kyc_status, name='kyc-status'),
    path('kyc-application/', core_views.Kyc_form_View, name='kyc-application'),
    path('policy/', core_views.policy, name='policy'),
    path('token/', core_views.contributions, name='contribution'),
    path('transactions/', core_views.transactions, name='transactions'),
    path('how-to/', core_views.how_to_buy, name='how-to'),
    path('faq/', core_views.faqs, name='faqs'),
    path('kyc/', core_views.kyc, name='kyc'),
    path('referral/', core_views.referral, name='referral'),

    path('profile/', core_views.myprofile, name='myprofile'),
    path('profile2/', core_views.myprofile2, name='myprofile2'),
    path('change-password/', core_views.change_password, name='change-password'),
    
    path('contact/', core_views.Kyc_form_View, name='contact'),
    path('success/', core_views.successView, name='success'),
]

