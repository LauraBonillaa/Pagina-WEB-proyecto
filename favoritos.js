
import { obtenerUsuarioEnSesion } from './session.js';
import { fetchAndRenderProductos } from './merch.js';
import { fetchAndRenderCharacters } from './personaje.js';

const renderFavoritos = async () => {
  const usuario = obtenerUsuarioEnSesion();
  if (!usuario) {
    alert("Por favor, inicia sesión para ver tus favoritos.");
    window.location.href = './Login.html';
    return;
  }

  const productos = await obtenerProductos();
  const favoritos = usuario.favoritos;

  const favoritosContainer = document.getElementById('gallery');
  favoritosContainer.innerHTML = '';

  if (favoritos.length === 0) {
    favoritosContainer.textContent = 'No tienes productos en tus favoritos.';
    return;
  }

  favoritos.forEach(favoritoId => {
    const producto = productos.find(p => p.id === favoritoId);
                 
                    
    if (producto) {
      const container = document.createElement("div");
      container.classList.add("gallery");
      container.innerHTML = `
        <div class="product">
          <img src="${producto.img}" alt="${producto.name}" class="product img">
        </div>
        <div class=".descripExtras">
          <p class="nombre"">${producto.name}</p>
         
          
        </div>`;
      favoritosContainer.appendChild(container);
    }
  });
};

document.addEventListener("DOMContentLoaded", renderFavoritos);


