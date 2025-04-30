from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# ------------------------------
# Rol de usuario
# ------------------------------
class Rol(models.Model):
    rol = models.CharField(max_length=80)

    def __str__(self):
        return self.rol

# ------------------------------
# Zona supervisada
# ------------------------------
class Zona(models.Model):
    nombre = models.CharField(max_length=80)
    responsable = models.CharField(max_length=80)
    ubicacion = models.CharField(max_length=150)

    def __str__(self):
        return self.nombre

# ------------------------------
# Manager personalizado para el usuario
# ------------------------------
class CustomUserManager(BaseUserManager):
    def create_user(self, cedula, nombre, apellido, telefono, email, genero, password=None, **extra_fields):
        if not cedula:
            raise ValueError("El usuario debe tener una cédula")
        email = self.normalize_email(email)
        user = self.model(
            cedula=cedula,
            nombre=nombre,
            apellido=apellido,
            telefono=telefono,
            email=email,
            genero=genero,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, cedula, nombre, apellido, telefono, email, genero, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(cedula, nombre, apellido, telefono, email, genero, password, **extra_fields)
    
    def get_full_name(self):
        """
        Devuelve el nombre completo del usuario.
        """
        return f"{self.nombre} {self.apellido}"
    
    def get_short_name(self):
        """
        Devuelve el nombre corto del usuario (solo el nombre).
        """
        return self.nombre

# ------------------------------
# Modelo de usuario personalizado
# ------------------------------
class CustomUser(AbstractBaseUser, PermissionsMixin):
    GENERO_CHOICES = [
        ('masculino', 'Masculino'),
        ('femenino', 'Femenino'),
        ('otro', 'Otro'),
    ]

    nombre = models.CharField(max_length=80)
    apellido = models.CharField(max_length=80)
    cedula = models.CharField(max_length=12, unique=True)
    telefono = models.CharField(max_length=13)
    email = models.EmailField(max_length=100, unique=True)
    rol = models.ForeignKey(Rol, on_delete=models.SET_NULL, null=True)
    zona = models.ForeignKey(Zona, on_delete=models.SET_NULL, null=True)
    genero = models.CharField(max_length=10, choices=GENERO_CHOICES)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'cedula'
    REQUIRED_FIELDS = ['nombre', 'apellido', 'telefono', 'email', 'genero']

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

# ------------------------------
# Ubicación asociada a evidencias o emergencias
# ------------------------------
class Ubicacion(models.Model):
    ubicacion = models.CharField(max_length=150)

    def __str__(self):
        return self.ubicacion

# ------------------------------
# Evidencias recopiladas por el usuario
# ------------------------------
class Evidencia(models.Model):
    caracteristicas = models.CharField(max_length=450)
    direccion = models.CharField(max_length=200)
    fecha = models.DateField()
    usuario = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    ubicacion = models.ForeignKey(Ubicacion, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Evidencia {self.id}"

# ------------------------------
# Fauna o flora reportada
# ------------------------------
class FaunaFlora(models.Model):
    ESPECIE_CHOICES = (
        ('Fauna', 'Fauna'),
        ('Flora', 'Flora'),
    )

    nombre = models.CharField(max_length=80)
    especie = models.CharField(max_length=10, choices=ESPECIE_CHOICES)
    estado = models.CharField(max_length=250)
    caracteristicas = models.CharField(max_length=300)
    evidencia = models.ForeignKey(Evidencia, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

# ------------------------------
# Imágenes asociadas a una evidencia
# ------------------------------
class Imagen(models.Model):
    nombre = models.CharField(max_length=40)
    descripcion = models.CharField(max_length=250)
    link_imagen = models.CharField(max_length=250)
    fecha = models.DateTimeField()
    evidencia = models.ForeignKey(Evidencia, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

# ------------------------------
# Emergencias reportadas por usuarios
# ------------------------------
class Emergencia(models.Model):
    tipo = models.CharField(max_length=200)
    ubicacion = models.CharField(max_length=150)
    gravedad = models.CharField(max_length=250)
    fecha = models.DateTimeField()
    usuario = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.tipo} - {self.gravedad}"
