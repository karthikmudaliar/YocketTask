from django.conf.urls import url
from . import views

urlpatterns = [
	# Login, SignUp and Authenication
	url(r'^login/', views.Login),
	url(r'^authentication/', views.LoginSubmit),  # Authentication
	url(r'^sign-up/', views.SignUp),
	url(r'^create-user/', views.CreateUser),

	# Task CRUD APIs
	url(r'^home/', views.Home),
	url(r'^add-task/', views.AddTask),
	url(r'^edit-task/', views.EditTask),
	url(r'^delete-task/', views.DeleteTask),

	# Bucket
	url(r'^create-bucket/', views.CreateBucket),

	#logout
	url(r'^logout/', views.Logout),
]