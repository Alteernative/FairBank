from django.contrib import admin
from django.urls import path, include
from knox import views as knox_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('users.urls')),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
