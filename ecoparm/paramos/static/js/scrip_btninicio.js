// Mostrar el botón cuando el usuario hace scroll
window.onscroll = function() {
    let button = document.getElementById("backToTop");

    // Si el scroll ha bajado más de 100px, mostrar el botón
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        button.style.display = "block"; // Muestra el botón
    } else {
        button.style.display = "none"; // Oculta el botón
    }
};

// Función para hacer scroll hacia arriba con animación
function scrollToTop() {
    let start = window.scrollY; // Posición actual del scroll
    let distance = start; // Distancia que debe recorrer
    let duration = 700; // Duración de la animación en milisegundos

    let startTime = null;

    // Función de animación
    function animation(currentTime) {
        if (!startTime) startTime = currentTime; // Guardar el primer tiempo

        let timeElapsed = currentTime - startTime; // El tiempo que ha pasado
        let run = ease(timeElapsed, start, -distance, duration); // Interpolación del movimiento

        window.scrollTo(0, run); // Realiza el desplazamiento

        if (timeElapsed < duration) {
            requestAnimationFrame(animation); // Si no se ha alcanzado la duración, seguir animando
        }
    }

    // Función de easing para suavizar la animación (cuadrática)
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // Inicia la animación
    requestAnimationFrame(animation);
}
