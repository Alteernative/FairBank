from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop('password', None)
        return ret


# Data from backend to be sent to front
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password', 'balance')
        extra_kwargs = {'password': {'write_only': True, 'required': False}}

    def create(self, validated_data):
        validated_data['balance'] = 0  # Set balance to 0 upon creation
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class TransactionSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all())
    receiver = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all())

    class Meta:
        model = Transaction
        fields = ('id', 'sender', 'receiver', 'amount', 'date')


class UserWithTransactionsSerializer(serializers.ModelSerializer):
    sent_transactions = TransactionSerializer(many=True, read_only=True)
    received_transactions = TransactionSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'balance', 'id', 'sent_transactions', 'received_transactions']


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


class PendingTransactionSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all())
    receiver = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all())

    class Meta:
        model = Transaction
        fields = ('id', 'sender', 'receiver', 'amount', 'date', 'status')

