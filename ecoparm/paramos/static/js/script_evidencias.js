let latitud, longitud;

// Función para obtener la ubicación
function obtenerUbicacion() {
    console.log("Obteniendo ubicación...");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarUbicacion, mostrarError, {
            enableHighAccuracy: true,  // Para obtener la ubicación más precisa
            timeout: 5000,  // Tiempo de espera antes de que se considere un error
            maximumAge: 0  // No usar ubicaciones guardadas
        });
    } else {
        alert("La geolocalización no es compatible con este navegador.");
    }
}

// Función para mostrar la ubicación en el campo del formulario
function mostrarUbicacion(position) {
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;
    console.log("Ubicación obtenida: Latitud: " + latitud + ", Longitud: " + longitud); // Esto debería aparecer en la consola
    const ubicacion = `Lat: ${latitud}, Long: ${longitud}`;
    document.getElementById('ubicacion').value = ubicacion;
}

// Función para manejar errores en la geolocalización
function mostrarError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("El usuario ha denegado la solicitud de geolocalización.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("La ubicación no está disponible.");
            break;
        case error.TIMEOUT:
            alert("La solicitud de geolocalización ha caducado.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Ha ocurrido un error desconocido.");
            break;
    }
}

// Función para enviar el formulario y agregar los datos a la tabla
function enviarFormulario() {
    console.log("Enviando formulario...");
    const actividad = document.getElementById('actividad').value;
    const imagen = document.getElementById('imagen').files[0];
    const ubicacion = document.getElementById('ubicacion').value;

    // Verificar si algún campo está vacío
    if (!actividad || !ubicacion || !imagen) {
        alert("Por favor, complete todos los campos: actividad, ubicación y evidencia (imagen).");
        return; // Detener el envío del formulario si algún campo está vacío
    }

    // Obtener la fecha actual
    const fecha = new Date().toLocaleString();

    // Crear una fila para la tabla
    const tabla = document.getElementById('tablaInforme').getElementsByTagName('tbody')[0];
    const nuevaFila = tabla.insertRow();

    // Crear celdas para la fila
    const celdaFecha = nuevaFila.insertCell(0);
    const celdaActividad = nuevaFila.insertCell(1);
    const celdaUbicacion = nuevaFila.insertCell(2);
    const celdaEvidencia = nuevaFila.insertCell(3);

    // Llenar las celdas con los datos
    celdaFecha.innerText = fecha;
    celdaActividad.innerText = actividad;
    celdaUbicacion.innerText = ubicacion;

    // Agregar la imagen de evidencia si existe
    if (imagen) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(imagen);
        img.alt = 'Evidencia';
        celdaEvidencia.appendChild(img);
    } else {
        celdaEvidencia.innerText = 'No se ha subido imagen';
    }

    // Limpiar los campos del formulario
    document.getElementById('formulario').reset();
    document.getElementById('ubicacion').value = '';
}