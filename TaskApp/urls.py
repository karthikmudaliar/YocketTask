from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^login/', views.Login),
	url(r'^authentication/', views.LoginSubmit),  # Authentication
]