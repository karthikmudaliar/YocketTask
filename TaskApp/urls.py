from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^login/', views.Login),
	url(r'^authentication/', views.LoginSubmit),  # Authentication
	url(r'^sign-up/', views.SignUp),
	url(r'^create-user/', views.CreateUser),
]