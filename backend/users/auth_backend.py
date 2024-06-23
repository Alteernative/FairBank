from django.contrib.auth import get_user_model

User = get_user_model()


class EmailAuthBackend:
    def authenticate(self, request, email={None}, password={None}):
        try:
            # email inside db and email requested
            user = User.objects.get(email=email)
            print("we entred authenticate")
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            print("Not working")
            return None

    def get_user(self, user_id):
        print("we entred get_user")
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
