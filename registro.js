document.addEventListener("DOMContentLoaded", () => {
    const registroForm = document.querySelector("#registro");

    registroForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = e.target.name.value;
        const correo = e.target.email.value;
        const contraseña = e.target.password.value;
        const confirmarContraseña = e.target.confirmarContraseña.value;
        const aceptarTerminos = e.target.agree.checked;

        if (contraseña !== confirmarContraseña) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        if (!aceptarTerminos) {
            alert("Debes aceptar los términos y condiciones.");
            return;
        }

        // Simular registro exitoso
        alert("Registro exitoso");

        // Redirigir a la landing page
        window.location.href = "./landing.html";
    });
});

