function obtenerUsuarioEnSesion() {
    const usuarioActivoId = localStorage.getItem('usuario-activo');
    if (!usuarioActivoId) return null;
  
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.find(usuario => usuario.id === parseInt(usuarioActivoId)) || null;
  }
  
  function verificarSesion() {
    const usuarioActivo = obtenerUsuarioEnSesion();
    if (!usuarioActivo) {
      window.location.href = 'login.html';
    } else {
      sessionStorage.setItem('currentUser', usuarioActivo.id);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const isRestrictedPage = window.location.pathname.includes('personaje1.html') ||
                             window.location.pathname.includes('favoritos.html') ||
                             window.location.pathname.includes('merch.html');
  
    if (isRestrictedPage) {
      verificarSesion();
    }
  });
  