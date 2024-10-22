from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('register', RegisterViewset, basename='register')
router.register('login', LoginViewset, basename='login')
router.register('users', UserViewset, basename='users')
router.register('transactions', TransactionViewset, basename='transaction')
router.register('request', RequestTransactionViewset, basename='request')
router.register('currencies', CurrencyViewset, basename='currency')
router.register('contactus', ContactUsViewset, basename='contactus')
router.register('dashboard_admin', AdminViewset, basename='dashboard_admin')
router.register('unsubscribe', UnsubscribeUsers, basename='unsubscribe')
router.register('admin_login', AdminLoginViewset, basename='admin-login')

urlpatterns = router.urls
