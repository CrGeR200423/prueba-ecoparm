document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registroForm");
    if (!form) {
        console.error("Formulario no encontrado");
        return;
    }

    const submitBtn = form.querySelector('input[type="submit"]');
    const campos = {
        nombre: document.getElementById("nombre"),
        apellido: document.getElementById("apellido"),
        identificacion: document.getElementById("identificacion"),
        rol: document.getElementById("rol"),
        zona: document.getElementById("zona"),
        genero: document.getElementById("genero"),
        email: document.getElementById("email"),
        telefono: document.getElementById("telefono"),
        password: document.getElementById("password"),
        confirmPassword: document.getElementById("confirmPassword"),
        errorMensaje: document.getElementById("error-message"),
        mensaje: document.getElementById("mensaje")
    };

    // Verificar que todos los campos requeridos existan
    for (const [key, element] of Object.entries(campos)) {
        if (!element && key !== 'errorMensaje' && key !== 'mensaje') {
            console.error(`Elemento ${key} no encontrado`);
            return;
        }
    }

    // Función para mostrar notificaciones tipo toast
    function mostrarToast(mensaje, tipo = "error") {
        const toast = document.getElementById("toast");
        if (!toast) return;

        toast.className = "toast";
        toast.textContent = mensaje;

        // Estilos según el tipo de mensaje
        if (tipo === "success") {
            toast.classList.add("success");
            toast.style.backgroundColor = "#4CAF50"; // Verde
        } else if (tipo === "info") {
            toast.classList.add("info");
            toast.style.backgroundColor = "#2196F3"; // Azul
        } else if (tipo === "warning") {
            toast.classList.add("warning");
            toast.style.backgroundColor = "#ff9800"; // Naranja
        } else {
            toast.classList.add("error"); // Por defecto
            toast.style.backgroundColor = "#f44336"; // Rojo
        }

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 5000); // Aumenté el tiempo a 5 segundos
    }

    // Limitar entrada a números en campos numéricos
    campos.identificacion.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    
    campos.telefono.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Validar contraseña (mínimo 8 caracteres, 1 mayúscula, 1 número)
    function validarContraseña(contraseña) {
        const errores = [];
        if (contraseña.length < 8) errores.push("mínimo 8 caracteres");
        if (!/[A-Z]/.test(contraseña)) errores.push("1 mayúscula");
        if (!/[0-9]/.test(contraseña)) errores.push("1 número");
        return errores;
    }

    // Evento principal al enviar el formulario
    form.addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevenir el envío tradicional
        
        let hayErrores = false;
        if (campos.errorMensaje) campos.errorMensaje.textContent = "";
        if (campos.mensaje) campos.mensaje.textContent = "";

        // Obtener valores
        const valores = {
            nombre: campos.nombre.value.trim(),
            apellido: campos.apellido.value.trim(),
            identificacion: campos.identificacion.value.trim(),
            rol: campos.rol.value,
            zona: campos.zona.value,
            genero: campos.genero.value,
            email: campos.email.value.trim().toLowerCase(),
            telefono: campos.telefono.value.trim(),
            password: campos.password.value,
            confirmPassword: campos.confirmPassword.value
        };

        // Validar campos obligatorios
        for (const [key, val] of Object.entries(valores)) {
            if (!val && key !== 'genero') { // Género es opcional
                mostrarToast(`El campo ${key} es obligatorio`, "error");
                if (campos[key]) campos[key].focus();
                hayErrores = true;
                break;
            }
        }

        // Validaciones específicas
        if (!hayErrores) {
            // Identificación (6-12 dígitos)
            if (valores.identificacion.length < 6 || valores.identificacion.length > 12) {
                mostrarToast("La identificación debe tener entre 6 y 12 dígitos", "error");
                campos.identificacion.focus();
                hayErrores = true;
            }
            // Teléfono (10 dígitos)
            else if (valores.telefono.length !== 10) {
                mostrarToast("El teléfono debe tener 10 dígitos", "error");
                campos.telefono.focus();
                hayErrores = true;
            }
            // Email válido
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valores.email)) {
                mostrarToast("Ingrese un correo electrónico válido", "error");
                campos.email.focus();
                hayErrores = true;
            }
            // Contraseña segura
            else {
                const erroresContraseña = validarContraseña(valores.password);
                if (erroresContraseña.length > 0) {
                    mostrarToast(`Contraseña débil: Debe incluir ${erroresContraseña.join(", ")}`, "warning");
                    campos.password.focus();
                    hayErrores = true;
                }
                // Confirmar contraseña
                else if (valores.password !== valores.confirmPassword) {
                    mostrarToast("Las contraseñas no coinciden", "error");
                    campos.confirmPassword.focus();
                    hayErrores = true;
                }
            }
        }

        // Prevenir envío si hay errores
        if (hayErrores) {
            submitBtn.disabled = false;
            submitBtn.value = "Crear Usuario";
            return;
        }

        // Deshabilitar botón para evitar doble envío
        submitBtn.disabled = true;
        submitBtn.value = "Enviando...";
        mostrarToast("Registrando usuario...", "info");

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'  
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                mostrarToast(data.message || "Usuario creado exitosamente", "success");
                
                // Mostrar mensaje en el elemento específico
                if (campos.mensaje) {
                    campos.mensaje.textContent = data.message || "Usuario creado exitosamente";
                    campos.mensaje.style.color = "#4CAF50";
                    campos.mensaje.style.fontWeight = "bold";
                }
                
                // Limpiar el formulario
                form.reset();
                
                // Si hay redirección en la respuesta
                if (data.redirect) {
                    setTimeout(() => {
                        window.location.href = data.redirect;
                    }, 2000);
                }
            } else {
                mostrarToast(data.error || "Error al crear usuario", "error");
                if (campos.mensaje) {
                    campos.mensaje.textContent = data.error || "Error al crear usuario";
                    campos.mensaje.style.color = "#f44336";
                }
            }
        } catch (error) {
            mostrarToast("Error de conexión: " + error.message, "error");
            console.error("Error:", error);
            if (campos.mensaje) {
                campos.mensaje.textContent = "Error de conexión";
                campos.mensaje.style.color = "#f44336";
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.value = "Crear Usuario";
        }
    });

    // Opcional: Limpiar mensajes cuando el usuario comienza a editar
    Object.values(campos).forEach(campo => {
        if (campo && campo.addEventListener) {
            campo.addEventListener('input', () => {
                if (campos.mensaje) campos.mensaje.textContent = "";
                if (campos.errorMensaje) campos.errorMensaje.textContent = "";
            });
        }
    });
});