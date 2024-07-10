from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.contrib.auth import get_user_model, authenticate
from knox.models import AuthToken
from rest_framework import status

User = get_user_model()


class LoginViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # check info to authenticate if the email exists
            email = serializer.validated_data['email'].lower()
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
                pending_transactions_sender = PendingTransactions.objects.filter(sender=user, status='pending')
                pending_transactions_receiver = PendingTransactions.objects.filter(receiver=user, status='pending')

                sent_serializer = TransactionSerializer(sent_transactions, many=True)
                received_serializer = TransactionSerializer(received_transactions, many=True)
                sender_pending_serializer = PendingTransactionSerializer(pending_transactions_sender, many=True)
                receiver_pending_serializer = PendingTransactionSerializer(pending_transactions_receiver, many=True)

                user_data = {
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "balance": user.balance,
                    "sent_transactions": sent_serializer.data,
                    "received_transactions": received_serializer.data,
                    "pending_sender_transactions": sender_pending_serializer.data,
                    "pending_received_transactions": receiver_pending_serializer.data
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
            user = serializer.save(email=serializer.validated_data['email'].lower())
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
    serializer_class = RegisterSerializer
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def list(self, request):
        user = request.user

        sent_transactions = Transaction.objects.filter(sender=user)
        received_transactions = Transaction.objects.filter(receiver=user)
        pending_transactions_sender = PendingTransactions.objects.filter(sender=user, status='pending')
        pending_transactions_receiver = PendingTransactions.objects.filter(receiver=user, status='pending')

        sent_serializer = TransactionSerializer(sent_transactions, many=True)
        received_serializer = TransactionSerializer(received_transactions, many=True)
        sender_pending_serializer = PendingTransactionSerializer(pending_transactions_sender, many=True)
        receiver_pending_serializer = PendingTransactionSerializer(pending_transactions_receiver, many=True)

        user_data = {
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "balance": user.balance,
            "sent_transactions": sent_serializer.data,
            "received_transactions": received_serializer.data,
            "pending_sender_transactions": sender_pending_serializer.data,
            "pending_received_transactions": receiver_pending_serializer.data
        }

        return Response(user_data)

    def update(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = RegisterSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TransactionViewset(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateTransactionSerializer
        return TransactionSerializer

    def create(self, request, *args, **kwargs):
        print("Received data:", request.data)
        serializer = self.get_serializer_class()(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            print("Validation errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RequestTransactionViewset(viewsets.ModelViewSet):
    queryset = PendingTransactions.objects.filter(status='pending')
    permission_classes = [permissions.AllowAny]
    serializer_class = PendingTransactionSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Validation errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        print("The primary key is : ", pk)
        try:
            pending_transaction = PendingTransactions.objects.get(pk=pk)
        except PendingTransactions.DoesNotExist:
            return Response({'error': 'Transaction not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(pending_transaction, data=request.data, partial=True)
        if serializer.is_valid():
            updated_status = serializer.validated_data.get('status')
            if updated_status == 'accepted':
                # Create a new transaction
                transaction = Transaction(
                    sender=pending_transaction.sender,
                    receiver=pending_transaction.receiver,
                    amount=pending_transaction.amount,
                )
                transaction.save()
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
