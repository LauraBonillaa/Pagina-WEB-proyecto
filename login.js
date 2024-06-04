const render = () => {
    const loginForm = document.querySelector("#login");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); 

        const correo = e.target.email.value;
        const contraseña = e.target.password.value;

        try {
            login(correo, contraseña);
            // Ahora nos redirigimos a la landing page
            window.location.href = "./landing.html";
        } catch (error) {
            alert(error.message);
        }
    });
};

document.addEventListener("DOMContentLoaded", render);

