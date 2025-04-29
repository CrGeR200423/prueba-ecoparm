document.addEventListener("DOMContentLoaded", function() {
    function toggleTexto(idTexto, idBoton) {
        let texto = document.getElementById(idTexto);
        let boton = document.getElementById(idBoton);

        if (texto.style.display === "none" || texto.style.display === "") {
            texto.style.display = "block";
            boton.textContent = "Ver menos...";
        } else {
            texto.style.display = "none";
            boton.textContent = "Ver mas...";
        }
    }

    document.getElementById("mostrarTexto1").addEventListener("click", function() {
        toggleTexto("textoOculto1", "mostrarTexto1");
    });

    document.getElementById("mostrarTexto2").addEventListener("click", function() {
        toggleTexto("textoOculto2", "mostrarTexto2");
    });
});