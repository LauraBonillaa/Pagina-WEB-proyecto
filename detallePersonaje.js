const searchParams = new URLSearchParams(window.location.search);
const NamePersonaje = searchParams.get("name")

console.log(NamePersonaje)
let personajeEncontrado= ""

async function traerPersonajes(){
  fetch('./data.json')
    .then(response => response.json())
    .then(charactersJSON => {
      const contenedorProductos = document.getElementById("container");
      contenedorProductos.classList.add("container");

      charactersJSON.characters.forEach((personaje) => {
        if (personaje.name === NamePersonaje) {
          console.log(personaje)
          personajeEncontrado = personaje
          console.log(personajeEncontrado)
          const carta = `
            <div class="card">
              <h3>${personaje.name}</h3>
              <p>${personaje.appearance}</p>
            </div>
          `;
          const foto = `<img src="${personaje.appearance.image}" >`;
          contenedorProductos.innerHTML += foto;
          contenedorProductos.innerHTML += carta;
        }
      });
    })
    .catch(error => {
      console.error('Error al cargar el archivo JSON', error);
    });
}

traerPersonajes();

console.log (traerPersonajes)

console.log (carta)
