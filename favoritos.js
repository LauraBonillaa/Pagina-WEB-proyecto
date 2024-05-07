const favoritosList = document.getElementById('favoritos-list');

// Aquí puedes agregar los productos favoritos seleccionados por el usuario
const favoritos = ['Producto 1', 'Producto 2', 'Producto 3'];

favoritos.forEach(producto => {
  const listItem = document.createElement('li');
  listItem.innerText = producto;
  favoritosList.appendChild(listItem);
});
