// verifica que este log
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = sessionStorage.getItem('currentUser');
  if (!currentUser) {
      window.location.href = "./login.html";
      return;
  }
  fetchAndRenderMerch();
});

class Producto {
  constructor(id, img, nombre, precio, description) {
    this.id = id;
    this.img = img;
    this.nombre = nombre;
    this.precio = precio;
    this.description = description;
  }

  render() {
    const section = document.createElement("section");
    section.className = "product " + this.nombre.replace(/ /g, "-");

    const imgElement = document.createElement("img");
    imgElement.src = this.img;
    imgElement.className = "img";
    imgElement.alt = this.nombre;

    const h3 = document.createElement("h3");

    const nameText = document.createElement("span");
    nameText.textContent = this.nombre;

    const starImg = document.createElement("img");
    starImg.src = "https://github.com/LauraBonillaa/Pagina-WEB-proyecto/blob/main/Imagenes/Estrella2.png?raw=true";
    starImg.classList.add("estrella");
    starImg.style.marginLeft = "10px"; // Optional: Add some space between the name and the star
    starImg.style.verticalAlign = "middle"; // Align the star image with the text

    h3.appendChild(nameText);
    h3.appendChild(starImg);

    const p = document.createElement("p");
    p.textContent = `Precio: ${this.precio}`;

    const button = document.createElement("button");
    button.textContent = "Comprar";
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      window.location.href = `detalleProducto.html?id=${encodeURIComponent(this.id)}`;
    });

    section.appendChild(imgElement);
    section.appendChild(h3);
    section.appendChild(p);
    section.appendChild(button);

    return section;
  }
}


export const fetchAndRenderProductos = () => {
  return fetch('https://raw.githubusercontent.com/LauraBonillaa/Pagina-WEB-proyecto/main/data.json')
    .then(response => response.json())
    .then(data => {
      const contenedorProductos = document.querySelector(".container");
      contenedorProductos.classList.add("container");

      data.productos.forEach((producto, index) => {
        const productoObj = new Producto(index, producto.img, producto.nombre, producto.precio);
        const productoElement = productoObj.render();
        contenedorProductos.appendChild(productoElement);
      });
    })
    .catch(error => {
      console.error('Error al cargar el archivo JSON', error);
    });
};

// Llamar a la función
fetchAndRenderProductos();