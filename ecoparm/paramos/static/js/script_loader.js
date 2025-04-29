window.onload = function() {
    setTimeout(function() {
        // 1. Oculta el loader
        document.getElementById('overlay').style.display = 'none';
        
        // 2. Muestra el botón de accesibilidad (si existe)
        const accessibilityBtn = document.querySelector('.asw-menu-btn');
        if (accessibilityBtn) {
            accessibilityBtn.style.display = 'flex'; // o 'block' según tus estilos
        }
    }, 1000); // Ajusta el tiempo si necesitas
};

document.addEventListener('DOMContentLoaded', function() {
    const observer = new MutationObserver(function() {
        const body = document.body;
        const menu = document.querySelector('.asw-menu');
        
        if (menu) {
            // Aplica estilos manualmente si es necesario
            if (body.getAttribute('data-asw-filter') === 'dark-contrast') {
                menu.style.backgroundColor = '#1e1e1e';
                menu.style.color = '#ffffff';
            }
            // ... otros modos
        }
    });

    observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true
    });
});

/* ESTO ES LO NUEVO */

document.addEventListener('DOMContentLoaded', function() {
    const observer = new MutationObserver(function() {
        const body = document.body;
        const menu = document.querySelector('.asw-menu');
        
        if (menu) {
            // Aplica estilos manualmente si es necesario
            if (body.getAttribute('data-asw-filter') === 'dark-contrast') {
                menu.style.backgroundColor = '#1e1e1e';
                menu.style.color = '#ffffff';
            }
            // ... otros modos
        }
    });

    observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true
    });
});