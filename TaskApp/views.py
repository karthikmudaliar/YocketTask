import sys
import logging
from django.shortcuts import render
from django.conf import settings
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from TaskApp.utils import *
from TaskApp.utils_validation import InputValidation
from django.contrib.auth.models import User 

logger = logging.getLogger(__name__)


# Create your views here.

class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return


def Login(request):
	return render(request, 'TaskApp/login.html')


def SignUp(request):
    return render(request, 'TaskApp/sign_up.html')


class LoginSubmitAPI(APIView):

    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):

        response = {}
        response['status'] = 500
        response["message"] = "Internal Server Error"
        temp_user = None
        try:
            import urllib.parse
            data = urllib.parse.unquote(request.data['json_string'])

            data = DecryptVariable(data)
            data = json.loads(data)

            validation_obj = InputValidation()

            username = data['username']
            username = DecryptVariable(username)

            password = data['password']
            password = DecryptVariable(password)

            if username.strip() == "" or not validation_obj.is_valid_email(username):
                response["status"] = 400
                response["message"] = "Please enter valid username"
                custom_encrypt_obj = CustomEncrypt()
                response = custom_encrypt_obj.encrypt(json.dumps(response))
                return Response(data=response)

            if password.strip() == "":
                response["status"] = 400
                response["message"] = "Please enter valid password"
                custom_encrypt_obj = CustomEncrypt()
                response = custom_encrypt_obj.encrypt(json.dumps(response))
                return Response(data=response)

            user = authenticate(username=username, password=password)

            if user is not None:
                response["status"] = 200
                response["username"] = username
                response["message"] = "Success"
            else:
                response["status"] = 401
                response["message"] = "Invalid Credentials"

        except Exception as e:  # noqa: F841
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("LoginSubmitAPI %s at %s",
                         str(e), str(exc_tb.tb_lineno), extra={'AppName': 'TaskApp'})

        custom_encrypt_obj = CustomEncrypt()
        response = custom_encrypt_obj.encrypt(json.dumps(response))
        return Response(data=response)


LoginSubmit = LoginSubmitAPI.as_view()


class CreateUserAPI(APIView):

    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):

        response = {}
        response['status'] = 500
        response["message"] = "Internal Server Error"
        temp_user = None
        try:
            import urllib.parse
            data = urllib.parse.unquote(request.data['json_string'])

            data = DecryptVariable(data)
            data = json.loads(data)

            validation_obj = InputValidation()

            username = data['username']
            username = DecryptVariable(username)

            password = data['password']
            password = DecryptVariable(password)

            confirm_password = data['confirm_password']
            confirm_password = DecryptVariable(confirm_password)

            if username.strip() == "" or not validation_obj.is_valid_email(username):
                response["status"] = 400
                response["message"] = "Please enter valid username"
                custom_encrypt_obj = CustomEncrypt()
                response = custom_encrypt_obj.encrypt(json.dumps(response))
                return Response(data=response)

            if password.strip() == "" or confirm_password.strip() == "":
                response["status"] = 400
                response["message"] = "Please enter valid password"
                custom_encrypt_obj = CustomEncrypt()
                response = custom_encrypt_obj.encrypt(json.dumps(response))
                return Response(data=response)

            if password != confirm_password:
                response["status"] = 400
                response["message"] = "Password not matching"
                custom_encrypt_obj = CustomEncrypt()
                response = custom_encrypt_obj.encrypt(json.dumps(response))
                return Response(data=response)

            User.objects.create_user(username=username, email=username, password=password)

            response["status"] = 200
            response["message"] = "Success"

        except Exception as e:  # noqa: F841
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("CreateUserAPI %s at %s",
                         str(e), str(exc_tb.tb_lineno), extra={'AppName': 'TaskApp'})

        custom_encrypt_obj = CustomEncrypt()
        response = custom_encrypt_obj.encrypt(json.dumps(response))
        return Response(data=response)


CreateUser = CreateUserAPI.as_view()