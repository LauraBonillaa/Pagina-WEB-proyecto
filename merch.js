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
    h3.textContent = this.nombre;

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

fetch('https://raw.githubusercontent.com/LauraBonillaa/Pagina-WEB-proyecto/main/data.json')
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


