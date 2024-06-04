import { obtenerUsuarioEnSesion, logout } from './session.js';

document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = obtenerUsuarioEnSesion();

    // Si no hay un usuario activo, redirige a la página de inicio
    if (!usuarioActivo) {
        window.location.href = "./index.html";
        return;
    }

    // Mostrar un mensaje de bienvenida
    const usuarioActivoNombre = document.querySelector("body");
    usuarioActivoNombre.insertAdjacentHTML('afterbegin', `<p>Bienvenido ${usuarioActivo.correo}</p>`);

    // Configurar el botón de cerrar sesión
    const cerrarSesion = document.querySelector("#cerrarSesion");
    cerrarSesion.addEventListener("click", () => {
        alert("se clickea");
        logout();
        window.location.href = "./login.html";
    });

    // Mostrar información del usuario en la página
    document.getElementById("username").textContent = usuarioActivo.nombre;
    document.getElementById("fullname").textContent = usuarioActivo.nombre; // Asumiendo que el nombre completo es el mismo que el nombre de usuario
    document.getElementById("email").textContent = usuarioActivo.correo;
    document.getElementById("password").textContent = "********"; // No se muestra la contraseña real
    document.getElementById("subscription").textContent = "Standard"; // Puedes cambiar esto según la lógica de suscripción
});

