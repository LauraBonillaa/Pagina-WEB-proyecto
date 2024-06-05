const USUARIOS_KEY = "usuarios"; 
const USUARIOS_ACTIVO_KEY = "usuario-activo";

const obtenerUsuarios = () => {
    const usuarios = localStorage.getItem(USUARIOS_KEY);

    if(!usuarios) {
        return []
    }
    return JSON.parse(usuarios);
};

// {
//     id,
//     correo,
//     contraseña,
//     favoritos,
// }


//vamos a crear errores, se escribe throw new error
export const registrar = (name, correo, contraseña, confirmarContraseña) => {
    if(contraseña !== confirmarContraseña) {
        throw new Error("Las contraseñas no coinciden");
    }

    const usuarios = obtenerUsuarios ();

    for(const usuario of usuarios) {
        if (usuario.correo === correo) {
            throw new Error("El correo ya se encuentra registrado");
        }
    }

  usuarios.push ({
    id: new Date().getTime(),
    name: name,
    correo: correo,
    contraseña: contraseña,
    favoritos: [],
  }); 

//ahora vamos a actualizar el local storage porque aun no tiene el nuevo usuario
  localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
};

export const login = (correo, contraseña) => {
    const usuarios = obtenerUsuarios();
    for (const usuario of usuarios) {
        if (usuario.correo === correo && usuario.contraseña === contraseña){
            localStorage.setItem(USUARIOS_ACTIVO_KEY, usuario.id);
            return usuario;
        }
    }

    throw new Error ("Usuario y/o contraseña incorrectos");

};


export const obtenerUsuarioEnSesion = () => {
   const usuarioActivo = localStorage.getItem(USUARIOS_ACTIVO_KEY);
   
   if (!usuarioActivo) {
    return null;
   }

   const usuarios = obtenerUsuarios();
   for (const usuario of usuarios){
    if(usuario.id === parent(usuarioActivo)) {
        return usuario;
    }
   }

   return null;
}

export const logout = () => {
    localStorage.removeItem(USUARIOS_ACTIVO_KEY);
}

