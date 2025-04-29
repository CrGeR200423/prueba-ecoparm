from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('administrador/', views.admin_page, name='administrador'),
    path('galeria/', views.galeria, name='galeria'),
    path('guardaparamo/', views.guardaparamo, name='guardaparamo'),
    path('login/', views.login_page, name='login'),
    path('nosotros/', views.nosotros, name='nosotros'),
    path('recuperar_contraseña/', views.recuperar_contraseña, name='recuperar_contraseña'),

]
