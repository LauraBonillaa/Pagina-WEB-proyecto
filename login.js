import { login } from "./session.js";
const USUARIOS_KEY = "usuarios";
const USUARIOS_ACTIVO_KEY = "usuario-activo";





const render = () => {
    const loginForm= document.querySelector("#login");

    loginForm.addEventListener("login", (e) => {
        e.preventDefault(); 

        const correo = e.target.correo.value;
        const contraseña = e.target.contraseña.value;

        try {
            login (correo, contraseña);
//ahora nos redirigimos a la landing             
            window.location.href = "./landing.html";
        } catch (error) {
            alert (error.message);
        }

    });
};

document.addEventListener("DOMContentLoaded", render);


