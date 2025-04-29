document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("video-ubicacion");

    if (video) {
        // Crear el Intersection Observer
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play(); // Reproducir si está visible
                } else {
                    video.pause(); // Pausar si ya no está visible
                }
            });
        }, { threshold: 0.5 }); // Se activará cuando el 50% del video sea visible

        // Observar el video
        observer.observe(video);
    }
});
