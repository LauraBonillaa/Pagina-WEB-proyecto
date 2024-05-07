

class Producto {
  constructor(img, nombre, precio) {
    this.img = img;
    this.nombre = nombre;
    this.precio = precio;
  }

  render() {
    const section = document.createElement("section");
    section.classList.add("product");

    const imgElement = document.createElement("img");
    imgElement.src = this.img;
    imgElement.classList.add("img");
    imgElement.alt = this.nombre;

    const h3 = document.createElement("h3");
    h3.textContent = this.nombre;

    const p = document.createElement("p");
    p.textContent = `Precio: ${this.precio}`;

    const button = document.createElement("button");
    button.textContent = "Comprar";

    section.appendChild(imgElement);
    section.appendChild(h3);
    section.appendChild(p);
    section.appendChild(button);

    return section;
  }
}

fetch('data.json')
  .then(response => response.json())
  .then(charactersJSON => {
    const contenedorProductos = document.getElementById("container");
    contenedorProductos.classList.add("container");

    charactersJSON.productos.forEach(producto => {
      const productoObj = new Producto(producto.img, producto.nombre, producto.precio);
      const productoElement = productoObj.render();
      contenedorProductos.appendChild(productoElement);
    });
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON', error);
  });
