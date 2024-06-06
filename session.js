const USUARIOS_KEY = "usuarios"; 
const USUARIOS_ACTIVO_KEY = "usuario-activo";

const obtenerUsuarios = () => {
  const usuarios = localStorage.getItem(USUARIOS_KEY);
  return usuarios ? JSON.parse(usuarios) : [];
};

export const registrar = (name, correo, contraseña, confirmarContraseña) => {
  if (contraseña !== confirmarContraseña) {
    throw new Error("Las contraseñas no coinciden");
  }

  const usuarios = obtenerUsuarios();

  for (const usuario of usuarios) {
    if (usuario.correo === correo) {
      throw new Error("El correo ya se encuentra registrado");
    }
  }

  const nuevoUsuario = {
    id: new Date().getTime(),
    name: name,
    correo: correo,
    contraseña: contraseña,
    favoritos: [],
  };

  usuarios.push(nuevoUsuario);
  localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
};

export const login = (correo, contraseña) => {
  const usuarios = obtenerUsuarios();
  for (const usuario of usuarios) {
    if (usuario.correo === correo && usuario.contraseña === contraseña) {
      localStorage.setItem(USUARIOS_ACTIVO_KEY, usuario.id);
      sessionStorage.setItem('currentUser', usuario.id);
      return usuario;
    }
  }

  throw new Error("Usuario y/o contraseña incorrectos");
};

export const obtenerUsuarioEnSesion = () => {
  const usuarioActivoId = localStorage.getItem(USUARIOS_ACTIVO_KEY);
  if (!usuarioActivoId) return null;

  const usuarios = obtenerUsuarios();
  return usuarios.find(usuario => usuario.id === parseInt(usuarioActivoId)) || null;
};

export const logout = () => {
  localStorage.removeItem(USUARIOS_ACTIVO_KEY);
  sessionStorage.removeItem('currentUser');
};
