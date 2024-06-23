from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.contrib.auth import get_user_model, authenticate
from knox.models import AuthToken

User = get_user_model()


class LoginViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # check info to authenticate if the email exists
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            # check if user is inside Db using function authenticate
            # User returned
            user = authenticate(request, email=email, password=password)

            if user:
                # generate tupple first part is empty second part is token
                _, token = AuthToken.objects.create(user)

                # receive all transactions sent and received
                sent_transactions = Transaction.objects.filter(sender=user)
                received_transactions = Transaction.objects.filter(receiver=user)

                sent_serializer = TransactionSerializer(sent_transactions, many=True)
                received_serializer = TransactionSerializer(received_transactions, many=True)

                user_data = {
                    "email": user.email,
                    "balance": user.balance,
                    "sent_transactions": sent_serializer.data,
                    "received_transactions": received_serializer.data,
                }
                return Response(

                    {
                        "user": user_data,
                        "token": token,

                    }
                )
            else:
                return Response({"error": "Invalid credentials"}, status=401)
        else:
            return Response(serializer.errors, status=400)


class RegisterViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user_data = {
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "balance": user.balance,
            }
            return Response(user_data)
        else:
            return Response(serializer.errors, status=400)


class UserViewset(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def list(self, request):
        queryset = User.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        print("Serialized User Data:", serializer.data)

        return Response(serializer.data)

