from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    # image_url = serializers.ImageField(required=False)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop('password', None)
        return ret


# Data from backend to be sent to front
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password', 'plan', 'balance', 'image_url')
        extra_kwargs = {'password': {'write_only': True, 'required': False}}

    def create(self, validated_data):
        validated_data['balance'] = 0  # Set balance to 0 upon creation
        validated_data['email'] = validated_data['email'].lower()
        plan = validated_data['plan']
        image_url = validated_data.pop('image_url', None)
        user = User.objects.create_user(**validated_data)
        if image_url:
            user.image_url = image_url
            user.save()
        user.plan = plan
        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.plan = validated_data.get('plan', instance.plan)
        image_url = validated_data.get('image_url', None)
        if image_url:
            instance.image_url = image_url
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

    def destroy(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.is_active = False
        instance.save()
        return instance


class TransactionSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all())
    receiver = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all())

    class Meta:
        model = Transaction
        fields = ('id', 'sender', 'receiver', 'amount', 'date')


class PendingTransactionSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all())
    receiver = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all())

    class Meta:
        model = PendingTransactions
        fields = ('id', 'sender', 'receiver', 'amount', 'date', 'status')

    def validate(self, data):
        sender = data.get('sender')
        receiver = data.get('receiver')
        amount = data.get('amount')
        status = data.get('status')

        if self.instance:
            current_status = self.instance.status
            if current_status == 'rejected' and status == 'rejected':
                raise serializers.ValidationError("Can't reject an already rejected transaction.")
            if current_status == 'accepted' and status == 'accepted':
                raise serializers.ValidationError("Can't accepte an already accepted transaction.")

        if sender == receiver:
            raise serializers.ValidationError("Sender and receiver must be different users.")

        if not User.objects.filter(email=sender.email).exists():
            raise serializers.ValidationError("Receiver does not exist.")

        if amount < 0:
            raise serializers.ValidationError("Can't send negative amount.")

        if sender.balance < amount:
            raise serializers.ValidationError("Insufficient balance.")

        return data

    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance


class UserWithTransactionsSerializer(serializers.ModelSerializer):
    sent_transactions = TransactionSerializer(many=True, read_only=True)
    received_transactions = TransactionSerializer(many=True, read_only=True)
    pending_received_transactions = PendingTransactionSerializer(many=True, read_only=True)
    pending_sender_transactions = PendingTransactionSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name',
                  'balance', 'id', 'sent_transactions',
                  'received_transactions', 'pending_received_transactions',
                  'pending_sender_transactions']


class CreateTransactionSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all())
    receiver = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all())

    class Meta:
        model = Transaction
        fields = ['sender', 'receiver', 'amount']

    def validate(self, data):
        sender = data.get('sender')
        receiver = data.get('receiver')
        amount = data.get('amount')

        if sender == receiver:
            raise serializers.ValidationError("Sender and receiver must be different users.")

        if not User.objects.filter(email=receiver.email).exists():
            raise serializers.ValidationError("Receiver does not exist.")

        if amount < 0:
            raise serializers.ValidationError("Can't send negative amount.")

        if sender.balance < amount:
            raise serializers.ValidationError("Insufficient balance.")

        return data


class UserCurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCurrency
        fields = ('balance_usd', 'balance_jpy', 'balance_eur', 'balance_gbp', 'balance_cny', 'balance_inr')


class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUsMessages
        fields = ('id', 'nom', 'prenom', 'email', 'message')


class SimpleTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['amount']


class SimplePendingTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PendingTransactions
        fields = ['amount']


class AdminUsersSerializer(serializers.ModelSerializer):
    sent_transactions = SimpleTransactionSerializer(many=True, read_only=True)
    received_transactions = SimpleTransactionSerializer(many=True, read_only=True)
    pending_received_transactions = SimplePendingTransactionSerializer(many=True, read_only=True)
    pending_sender_transactions = SimplePendingTransactionSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            'sent_transactions', 'received_transactions',
            'pending_sender_transactions', 'pending_received_transactions']
