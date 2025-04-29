const apiKey = "d4ddfc4bc2a5af2d893c5ad9c9553fd8"; 
const city = "Sogamoso"; 
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

async function obtenerClima() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error en la petición");
        }
        const data = await response.json();

        document.getElementById("ciudad").textContent = data.name;
        document.getElementById("temperatura").textContent = `🌡️ ${data.main.temp}°C`;
        document.getElementById("humedad").textContent = `💧 Humedad: ${data.main.humidity}%`;
        document.getElementById("descripcion").textContent = `☁️ ${data.weather[0].description}`;
    } catch (error) {
        console.error("Error al obtener los datos del clima", error);
        document.getElementById("clima").textContent = "No se pudo obtener el clima.";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    obtenerClima(); // Obtener clima al cargar la página
    setInterval(obtenerClima, 300000); // Actualiza el clima cada 5 minutos

    const btnToggle = document.getElementById("toggleClima");
    const textoClima = document.getElementById("textoClima");
    const divClima = document.getElementById("clima");

    // Lógica para mostrar/ocultar el clima
    btnToggle.addEventListener("click", () => {
        if (divClima.style.display === "none" || divClima.style.display === "") {
            divClima.style.display = "block"; // Mostrar clima
            textoClima.style.display = "inline"; // Mostrar "Clima Actual"
            obtenerClima(); // Asegurar que se actualicen los datos al mostrar
        } else {
            divClima.style.display = "none"; // Ocultar clima
            textoClima.style.display = "none"; // Ocultar "Clima Actual"
        }
    });
});
