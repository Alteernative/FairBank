from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()


class TransactionSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField()
    receiver = serializers.StringRelatedField()

    class Meta:
        model = Transaction
        fields = ['id', 'sender', 'receiver', 'amount', 'date']


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
        fields = ('id', 'email', 'password', 'balance')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserWithTransactionsSerializer(serializers.ModelSerializer):
    sent_transactions = TransactionSerializer(many=True, read_only=True)
    received_transactions = TransactionSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'balance', 'sent_transactions', 'received_transactions']