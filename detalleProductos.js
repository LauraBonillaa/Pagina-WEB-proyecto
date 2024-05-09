window.addEventListener('load', function() {
    // Obtenemos el ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = decodeURIComponent(urlParams.get('id'));
  
    // Cargamos los datos del producto
    fetch('https://raw.githubusercontent.com/LauraBonillaa/Pagina-WEB-proyecto/main/data.json')
      .then(response => response.json())
      .then(data => {
        // Buscamos el producto por su ID
        const productoData = data.productos.find((producto, index) => index === Number(id));
  
        // Si encontramos el producto, lo mostramos
        if (productoData) {
          const container = document.getElementById('container');
          container.innerHTML = '';  // Limpiamos el contenedor
  
          // Creamos y añadimos la imagen del producto
          const imgElement = document.createElement("img");
          imgElement.src = productoData.img;
          imgElement.className = "product-image";
          container.appendChild(imgElement);
  
          // Creamos y añadimos el nombre del producto
          const h3 = document.createElement("h3");
          h3.textContent = productoData.nombre;
          h3.className = "product-name";
          container.appendChild(h3);
  
          // Creamos y añadimos el precio del producto
          const p = document.createElement("p");
          p.textContent = productoData.precio;
          p.className = "product-price";
          container.appendChild(p);

          const p1 = document.createElement("p1");
          p.textContent = productoData.description;
          p.className = "product-price";
          container.appendChild(p1);
        }
      })
      .catch(error => {
        console.error('Error al cargar el archivo JSON', error);
      });
  });
  