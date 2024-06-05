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
    document.getElementById("nombre").textContent = usuarioActivo.nombre;
    
    document.getElementById("correo").textContent = usuarioActivo.correo;
    document.getElementById("contraseña").textContent = "********"; // No se muestra la contraseña real
    
});

document.getElementById("logout").addEventListener("click", logout);