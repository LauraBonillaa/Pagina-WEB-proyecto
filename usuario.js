
const USUARIOS_KEY = "usuarios";
const USUARIOS_ACTIVO_KEY = "usuario-activo";

const obtenerUsuarios = () => {
    const usuarios = localStorage.getItem(USUARIOS_KEY);
    if (!usuarios) {
        return [];
    }
    return JSON.parse(usuarios);
};

const obtenerUsuarioEnSesion = () => {
    const usuarioActivoId = localStorage.getItem(USUARIOS_ACTIVO_KEY);
    if (!usuarioActivoId) {
        return null;
    }

    const usuarios = obtenerUsuarios();
    return usuarios.find(usuario => usuario.id === parseInt(usuarioActivoId));
};

const logout = () => {
    localStorage.removeItem(USUARIOS_ACTIVO_KEY);
};

const render = () => {
    const usuarioActivo = obtenerUsuarioEnSesion();

    if (!usuarioActivo) {
        window.location.href = "./Login.html";
        return;
    }

    document.getElementById("username").textContent = usuarioActivo.name;
   
    document.getElementById("email").textContent = usuarioActivo.correo;
    document.getElementById("password").textContent = usuarioActivo.contraseña; // Hide the actual password
    document.getElementById("subscription").textContent = usuarioActivo.favoritos.length > 0 ? "Active" : "Inactive"; // Example subscription status

    const cerrarSesion = document.getElementById("cerrarSesion");
    cerrarSesion.addEventListener("click", () => {
        logout();
        window.location.href = "./Login.html";
    });
};

document.addEventListener("DOMContentLoaded", render);
