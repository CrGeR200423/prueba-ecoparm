document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.image');
    const overlay = document.getElementById('image-overlay'); // Usamos el nuevo id
    const expandedImage = document.getElementById('expanded-image');
    const closeBtn = document.getElementById('close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;

    // Función para abrir la imagen en tamaño completo
    function openImage(index) {
        expandedImage.src = images[index].src;
        currentIndex = index;
        overlay.style.display = 'flex';
    }

    // Cerrar la vista expandida
    closeBtn.addEventListener('click', function() {
        overlay.style.display = 'none';
    });

    // Navegar a la imagen anterior
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        expandedImage.src = images[currentIndex].src;
    });

    // Navegar a la siguiente imagen
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        expandedImage.src = images[currentIndex].src;
    });

    // Agregar event listener a cada imagen para abrirla en vista expandida
    images.forEach((img, index) => {
        img.addEventListener('click', () => openImage(index));
    });

    // Cerrar la vista expandida al hacer clic fuera de la imagen
    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
    });
});
