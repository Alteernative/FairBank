from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

from django_rest_passwordreset.signals import reset_password_token_created
from django.dispatch import receiver
from django.urls import reverse
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags


def upload_to(instance, filename):
    return '{filename}'.format(filename=filename)


class CustomUserManager(BaseUserManager):
    """
     Custom manager for CustomUser.
     """

    def create_user(self, email, password=None, **extra_fields):
        """
              Create and return a regular user with an email and password.
              """
        if not email:
            raise ValueError('Email is a required field')

        email = self.normalize_email(email).lower()
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
             Create and return a superuser with an email and password.
             """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    """
       Custom user model extending the AbstractUser.
       """

    email = models.EmailField(max_length=200, unique=True)
    birthday = models.DateField(null=True, blank=True)
    username = models.CharField(max_length=200, null=True, blank=True)
    balance = models.IntegerField(default=0)
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)
    objects = CustomUserManager()

    Plan = [
        ('tier1', 'regular'),
        ('tier2', 'premium'),
        ('tier3', 'ultimate')
    ]
    plan = models.CharField(max_length=20, choices=Plan, default='regular')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


@receiver(reset_password_token_created)
def password_reset_token_created(reset_password_token, *args, **kwargs):
    """
      Signal to handle the creation of a password reset token.
      Sends an email to the user with the token link.
      """

    sitelink = "http://localhost:5173/"
    token = "{}".format(reset_password_token.key)
    full_link = str(sitelink) + str("password-reset/") + str(token)

    print(token)
    print(full_link)

    context = {
        'full_link': full_link,
        'email_adress': reset_password_token.user.email,
    }
    # print(context)
    html_message = render_to_string("backend/email.html", context=context)
    plain_message = strip_tags(html_message)

    msg = EmailMultiAlternatives(
        subject="Request for resetting password for {title}".format(title=reset_password_token.user.email),
        body=plain_message,
        from_email="alteernative@gmail.com",
        to=[reset_password_token.user.email]
    )

    msg.attach_alternative(html_message, "text/html")
    try:
        msg.send()
    except Exception as e:
        print(f"Failed to send email: {e}")


class Transaction(models.Model):
    sender = models.ForeignKey(CustomUser, related_name='sent_transactions', on_delete=models.CASCADE)
    receiver = models.ForeignKey(CustomUser, related_name='received_transactions', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Transaction from {self.sender} to {self.receiver} for {self.amount} on {self.date}'

    def save(self, *args, **kwargs):
        if self.pk is None:  # Ensure it's a new transaction
            self.sender.balance -= self.amount
            self.receiver.balance += self.amount
            self.sender.save()
            self.receiver.save()
        super().save(*args, **kwargs)


class PendingTransactions(models.Model):
    sender = models.ForeignKey(CustomUser, related_name='pending_sender_transactions', on_delete=models.CASCADE)
    receiver = models.ForeignKey(CustomUser, related_name='pending_received_transactions', on_delete=models.CASCADE)
    STATUS_CHOICES = [
        ('pending', 'pending'),
        ('accepted', 'accepted'),
        ('rejected', 'rejected')
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (f'Transaction from {self.sender} to {self.receiver} for {self.amount} on {self.date} with status '
                f'{self.status}')


class UserCurrency(models.Model):
    user = models.ForeignKey(CustomUser, related_name='currency_balances', on_delete=models.CASCADE)
    balance_usd = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    balance_jpy = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    balance_eur = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    balance_gbp = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    balance_cny = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    balance_inr = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)

    def __str__(self):
        return f'{self.user.email} currency balances'


class ContactUsMessages(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField(max_length=200, unique=False)
    message = models.TextField(max_length=500)

    def __str__(self):
        return f'{self.nom} {self.prenom} {self.email} {self.message}'


class PendingUsersUpdates(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField(max_length=200, unique=True)

    def __str__(self):
        return f'{self.nom} {self.prenom} {self.email} '
