from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('register', RegisterViewset, basename='register')
router.register('login', LoginViewset, basename='login')
router.register('users', UserViewset, basename='users')
router.register('transactions', TransactionViewset, basename='transaction')
router.register('request', RequestTransactionViewset, basename='request')

urlpatterns = router.urls
