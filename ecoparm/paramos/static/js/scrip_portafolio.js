document.addEventListener('DOMContentLoaded', function () {
    let images = []; // Array para almacenar las imágenes
    let currentIndex = 0; // Índice de la imagen actual

    // Función para expandir la imagen
    function expandImage(img) {
        images = Array.from(document.querySelectorAll('.image')); // Obtiene todas las imágenes
        currentIndex = images.indexOf(img); // Establece el índice de la imagen clicada

        const expandedImage = document.getElementById('expanded-image');
        expandedImage.src = img.src; // Muestra la imagen clicada en el contenedor expandido

        // Muestra el contenedor expandido y oculta las imágenes pequeñas
        document.getElementById('expanded-container').style.display = 'flex';
    }

    // Función para cerrar la imagen expandida
    function closeExpandedImage() {
        // Oculta el contenedor expandido
        document.getElementById('expanded-container').style.display = 'none';
    }

    // Función para mostrar la imagen anterior
    function prevImage(event) {
        event.stopPropagation(); // Detiene la propagación del clic para no cerrar el contenedor
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        document.getElementById('expanded-image').src = images[currentIndex].src;
    }

    // Función para mostrar la siguiente imagen
    function nextImage(event) {
        event.stopPropagation(); // Detiene la propagación del clic para no cerrar el contenedor
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        document.getElementById('expanded-image').src = images[currentIndex].src;
    }

    // Cierra la imagen ampliada al hacer clic fuera de ella
    window.addEventListener('click', (event) => {
        if (event.target === document.getElementById('expanded-container')) {
            closeExpandedImage();
        }
    });

    // Añadir el evento de clic a cada imagen
    const imageElements = document.querySelectorAll('.image');
    imageElements.forEach(img => {
        img.addEventListener('click', () => expandImage(img));
    });
});
