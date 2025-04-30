from urllib import response
from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.shortcuts import render
from django.shortcuts import render, redirect
from django.contrib import messages
from django.urls import reverse
from .models import CustomUser, Rol, Zona
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

def index(request):
    return render(request, 'index.html')

def admin_pages(request):
    return render(request, 'admin.html')

def galeria(request):
    return render(request, 'galeria.html')

def guardaparamo(request):
    return render(request, 'guardaparamo.html')

def login_page(request):
    return render(request, 'login.html')

def nosotros(request):
    return render(request, 'nosotros.html')

def recuperar_contraseña(request):
    return render(request, 'recuperar_contrasena.html')


def admin_page(request):
    if request.method == 'POST':
        try:
            # 1. Obtener datos del formulario
            form_data = {
                'nombre': request.POST.get('nombre').strip(),
                'apellido': request.POST.get('apellido').strip(),
                'cedula': request.POST.get('identificacion').strip(),
                'telefono': request.POST.get('telefono').strip(),
                'email': request.POST.get('email').strip().lower(),  # Cambiado de 'correo' a 'email'
                'genero': request.POST.get('genero'),
                'password': request.POST.get('password'),
                'rol_nombre': request.POST.get('rol').capitalize(),
                'zona_nombre': request.POST.get('zona').capitalize()
            }

            # 2. Validaciones básicas
            if not all(form_data.values()):
                if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                    return JsonResponse({'error': 'Todos los campos son obligatorios'}, status=400)
                messages.error(request, 'Todos los campos son obligatorios')
                return redirect('administrador')

            if form_data['password'] != request.POST.get('confirmPassword'):
                if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                    return JsonResponse({'error': 'Las contraseñas no coinciden'}, status=400)
                messages.error(request, 'Las contraseñas no coinciden')
                return redirect('administrador')

            # 3. Manejo de Rol y Zona
            rol, _ = Rol.objects.get_or_create(rol=form_data['rol_nombre'])
            zona, _ = Zona.objects.get_or_create(nombre=form_data['zona_nombre'])

            # 4. Creación del usuario
            user = CustomUser.objects.create_user(
                cedula=form_data['cedula'],
                nombre=form_data['nombre'],
                apellido=form_data['apellido'],
                telefono=form_data['telefono'],
                email=form_data['email'],  # Asegúrate que coincida con el modelo
                genero=form_data['genero'],
                password=form_data['password'],
                rol=rol,
                zona=zona
            )

            # 5. Respuesta según tipo de solicitud
            success_message = f'Usuario {user.nombre} {user.apellido} creado exitosamente!'
            
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({
                    'message': success_message,
                    'redirect': reverse('administrador')
                }, status=200)
            
            messages.success(request, success_message)
            return redirect('administrador')

        except Exception as e:
            error_message = f'Error al crear usuario: {str(e)}'
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({'error': error_message}, status=500)
            
            messages.error(request, error_message)
            return redirect('administrador')

    # GET request
    return render(request, 'admin.html')