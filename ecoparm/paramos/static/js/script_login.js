const fakeDatabase = [
    {
        username: "admin",
        password: "12345",
        userType: "administrador"
    },
    {
        username: "guarda",
        password: "abcd",
        userType: "guardaparamo"
    }
];

function validateUserType(event) {
    event.preventDefault();

    const inputUsername = document.getElementById('username').value;
    const inputPassword = document.getElementById('password').value;

    // Buscar el usuario en la "base de datos"
    const user = fakeDatabase.find(u => u.username === inputUsername && u.password === inputPassword);

    if (!user) {
        alert("Usuario o contraseña incorrectos.");
        return;
    }

    // Guardar sesión
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userType', user.userType);
    sessionStorage.setItem('username', user.username);

    // Redirección según tipo de usuario
    if (user.userType === "administrador") {
        window.location.href = "/administrador/";
    } else if (user.userType === "guardaparamo") {
        window.location.href = "/guardaparamo/";
    } else {
        alert("Tipo de usuario no reconocido.");
    }
}

// Asociar evento al formulario
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', validateUserType);
    }
});

function validateUserType(event) {
    event.preventDefault(); // Evitar el envío del formulario

    var tipoUsuario = document.getElementById('tipo-usuario')?.value;

    if (!tipoUsuario) {
        alert("Por favor, seleccione un tipo de usuario.");
        return;
    }

    // Guardar sesión en sessionStorage
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userType', tipoUsuario);

    // Redirigir según el tipo de usuario
    if (tipoUsuario === "administrador") {
        window.location.href = "/administrador/";  // URL correcta en Django
    } else if (tipoUsuario === "guardaparamo") {
        window.location.href = "/guardaparamo/";  // URL correcta en Django
    } else {
        alert("Tipo de usuario no válido.");
    }
}

// Agregar el evento al formulario si existe
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', validateUserType);
    }
});
