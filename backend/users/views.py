from decimal import Decimal

from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action

from .serializers import *
from .models import *
from rest_framework.response import Response
from django.contrib.auth import get_user_model, authenticate
from knox.models import AuthToken
from rest_framework import status
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser

User = get_user_model()


class LoginViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email'].lower()
            password = serializer.validated_data['password']
            image_url = serializer.validated_data.get('image_url')

            user = authenticate(request, email=email, password=password, is_active=True)
            if user:
                if image_url:
                    user.image_url = image_url
                    user.save()

                _, token = AuthToken.objects.create(user)

                sent_transactions = Transaction.objects.filter(sender=user)
                received_transactions = Transaction.objects.filter(receiver=user)
                pending_transactions_sender = PendingTransactions.objects.filter(sender=user, status='pending')
                pending_transactions_receiver = PendingTransactions.objects.filter(receiver=user, status='pending')
                currencies = UserCurrency.objects.filter(user=user)

                sent_serializer = TransactionSerializer(sent_transactions, many=True)
                received_serializer = TransactionSerializer(received_transactions, many=True)
                sender_pending_serializer = PendingTransactionSerializer(pending_transactions_sender, many=True)
                receiver_pending_serializer = PendingTransactionSerializer(pending_transactions_receiver, many=True)
                currencies_serializer = UserCurrencySerializer(currencies, many=True)

                user_data = {
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "plan": user.plan,
                    "balance": user.balance,
                    "sent_transactions": sent_serializer.data,
                    "received_transactions": received_serializer.data,
                    "pending_sender_transactions": sender_pending_serializer.data,
                    "pending_received_transactions": receiver_pending_serializer.data,
                    "currencies": currencies_serializer.data,
                }

                return Response(
                    {
                        "user": user_data,
                        "token": token,
                    }
                )
            else:
                return Response({"error": "Invalid credentials or User is not active"}, status=401)
        else:
            return Response(serializer.errors, status=400)


class RegisterViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request):
        data = request.data.copy()
        if 'image' in request.FILES:
            data['image_url'] = request.FILES['image']
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            user = serializer.save()
            UserCurrency.objects.create(user=user)
            user_data = {
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "balance": user.balance,
                "plan": user.plan,
                "image_url": user.image_url.url if user.image_url else None,
            }
            return Response(user_data)
        else:
            return Response(serializer.errors, status=400)


class UserViewset(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RegisterSerializer
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']
    parser_classes = (MultiPartParser, FormParser)

    def list(self, request):
        user = request.user

        sent_transactions = Transaction.objects.filter(sender=user)
        received_transactions = Transaction.objects.filter(receiver=user)
        pending_transactions_sender = PendingTransactions.objects.filter(sender=user, status='pending')
        pending_transactions_receiver = PendingTransactions.objects.filter(receiver=user, status='pending')
        currencies = UserCurrency.objects.filter(user=user).first()

        sent_serializer = TransactionSerializer(sent_transactions, many=True)
        received_serializer = TransactionSerializer(received_transactions, many=True)
        sender_pending_serializer = PendingTransactionSerializer(pending_transactions_sender, many=True)
        receiver_pending_serializer = PendingTransactionSerializer(pending_transactions_receiver, many=True)
        currencies_serializer = UserCurrencySerializer(currencies)

        user_data = {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "plan": user.plan,
            "balance": user.balance,
            "sent_transactions": sent_serializer.data,
            "received_transactions": received_serializer.data,
            "pending_sender_transactions": sender_pending_serializer.data,
            "pending_received_transactions": receiver_pending_serializer.data,
            "image_url": user.image_url.url if user.image_url else None,
            "currencies": currencies_serializer.data if currencies else None,
        }

        return Response(user_data)

    def update(self, request, pk=None):
        try:
            user = CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = RegisterSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            user = CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        user.is_active = False
        user.save()
        return Response({"success": "User deactivated"}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def add_balance(self, request):
        user = request.user
        amount = request.data.get('amount')

        if amount is None:
            return Response({'error': 'Amount is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            amount = float(amount)
            if amount <= 0:
                return Response({'error': 'Amount must be positive'}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({'error': 'Invalid amount value'}, status=status.HTTP_400_BAD_REQUEST)

        user.balance += amount
        user.save()

        return Response(
            {'success': 'Balance updated successfully', 'balance': user.balance},
            status=status.HTTP_200_OK
        )


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


class CurrencyViewset(viewsets.ModelViewSet):
    queryset = UserCurrency.objects.all()
    serializer_class = UserCurrencySerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['get', 'put']

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    @action(detail=False, methods=['put'], url_path='update_balance')
    def update_balance(self, request):
        user = request.user
        currency = request.data.get('currency')
        original_amount = request.data.get('original_amount')
        converted_amount = request.data.get('converted_amount')

        print("Received currency:", currency)
        print("Received original amount:", original_amount)
        print("Received converted amount:", converted_amount)

        if not currency or original_amount is None or converted_amount is None:
            return Response({'error': 'Currency, original amount, and converted amount are required'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            original_amount = Decimal(original_amount)
            converted_amount = Decimal(converted_amount)
            if original_amount < 0 or converted_amount < 0:
                return Response({'error': 'Amounts must be positive'}, status=status.HTTP_400_BAD_REQUEST)
        except (ValueError, TypeError, Decimal.InvalidOperation):
            return Response({'error': 'Invalid amount values'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            currency_instance = UserCurrency.objects.get(user=user)
        except UserCurrency.DoesNotExist:
            return Response({'error': 'Currency balances not found for this user'}, status=status.HTTP_404_NOT_FOUND)

        if currency == 'USD':
            currency_instance.balance_usd += converted_amount
        elif currency == 'JPY':
            currency_instance.balance_jpy += converted_amount
        elif currency == 'EUR':
            currency_instance.balance_eur += converted_amount
        elif currency == 'GBP':
            currency_instance.balance_gbp += converted_amount
        elif currency == 'CNY':
            currency_instance.balance_cny += converted_amount
        elif currency == 'INR':
            currency_instance.balance_inr += converted_amount
        else:
            return Response({'error': 'Invalid currency type'}, status=status.HTTP_400_BAD_REQUEST)

        user.balance -= original_amount
        user.save()

        currency_instance.save()
        return Response(
            {'success': 'Balance updated successfully', 'balances': UserCurrencySerializer(currency_instance).data},
            status=status.HTTP_200_OK
        )


class ContactUsViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = ContactUsSerializer
    queryset = ContactUsMessages.objects.all()

    def create(self, request, *args, **kwargs):

        nom = request.data.get('nom').strip()
        prenom = request.data.get('prenom').strip()
        email = request.data.get('email').strip()
        message = request.data.get('message').strip()

        existing_entries = ContactUsMessages.objects.filter(nom=nom, prenom=prenom, email=email, message=message)

        if existing_entries.exists():
            return Response({"error": "Duplicate entry detected."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        print(f"Invalid data: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = AdminUsersSerializer

    queryset = User.objects.all()

    @action(detail=False, methods=['get'])
    def list_all_users(self, request):
        users = User.objects.all()
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def list_all_contactUs(self, request):
        contactus_messages = ContactUsMessages.objects.all()

        messages_serialized = ContactUsSerializer(contactus_messages, many=True)
        print(messages_serialized.data)
        return Response(messages_serialized.data)
