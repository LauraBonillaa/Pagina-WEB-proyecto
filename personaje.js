class Personaje {
  constructor(name, chineseName, alias, appearance) {
    this.name = name;
    this.chineseName = chineseName;
    this.alias = alias;
    this.appearance = appearance;
    this.isStarred = this.checkIfStarred();
  }

  checkIfStarred() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    return favoritos.includes(this.name);
  }

  toggleStar(starButton) {
    this.isStarred = !this.isStarred;
    this.updateFavorites();
    this.addToFavorites(starButton);
  }

  updateFavorites() {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    if (this.isStarred) {
      favoritos.push(this.name);
    } else {
      favoritos = favoritos.filter(fav => fav !== this.name);
    }
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }

  addToFavorites(starButton) {
    console.log(`${this.name} ${this.isStarred ? 'añadido a' : 'eliminado de'} favoritos`);

    // Cambiar el color del botón de la estrella cuando se añade a favoritos
    starButton.style.backgroundColor = this.isStarred ? "red" : "transparent";
  }

  render() {
    const section = document.createElement("section");
    section.id = `personaje-${this.name}`;

    section.style.cursor = "pointer";
    section.addEventListener('click', () => {
      window.location.href = `detallePersonaje.html?nombre=${encodeURIComponent(this.name)}`;
    });

    const imgSection = document.createElement("section");
    const imgElement = document.createElement("img");
    imgElement.src = this.appearance.image;
    imgSection.appendChild(imgElement);

    const textSection = document.createElement("section");

    const h3 = document.createElement("h3");
    const nameText = document.createElement("span");
    nameText.textContent = this.name;

    const starButton = document.createElement("button");
    starButton.classList.add("estrella");
    starButton.style.marginLeft = "10px";
    starButton.style.verticalAlign = "middle";
    starButton.textContent = "★"; // Usar un símbolo de estrella como texto del botón
    starButton.style.backgroundColor = this.isStarred ? "red" : "transparent"; // Establecer el color inicial del botón
    starButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this.toggleStar(starButton);
    });

    h3.appendChild(nameText);
    h3.appendChild(starButton);

    const p = document.createElement("p");
    p.textContent = this.chineseName;

    const p2 = document.createElement("p");
    p2.textContent = this.alias;

    textSection.appendChild(h3);
    textSection.appendChild(p);
    textSection.appendChild(p2);

    section.appendChild(imgSection);
    section.appendChild(textSection);

    return section;
  }
}



const fetchAndRenderCharacters = () => {
  return fetch('https://raw.githubusercontent.com/LauraBonillaa/Pagina-WEB-proyecto/main/data.json')
    .then(response => response.json())
    .then(charactersJSON => {
      const contenedorProductos = document.getElementById("container");
      contenedorProductos.classList.add("container");

      charactersJSON.characters.forEach(character => {
        const characterObj = new Personaje(character.name, character.chineseName, character.alias, character.appearance);
        const characterElement = characterObj.render();
        contenedorProductos.appendChild(characterElement);
      });
    })
    .catch(error => {
      console.error('Error al cargar el archivo JSON', error);
    });
};

// Llamar a la función
fetchAndRenderCharacters();



const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();
  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchText)
  );
  renderCharacters(filteredCharacters);
});




