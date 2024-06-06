class Personaje {
  constructor(name, chineseName, alias, appearance) {
    this.name = name;
    this.chineseName = chineseName;
    this.alias = alias;
    this.appearance = appearance;
    this.isStarred = true; // En la página de favoritos, todos los personajes están marcados como favoritos
  }

  toggleStar(starButton, section) {
    this.isStarred = !this.isStarred;
    this.updateFavorites(starButton, section);
  }

  updateFavorites(starButton, section) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    if (!this.isStarred) {
      favoritos = favoritos.filter(fav => fav.name !== this.name);
      section.remove(); // Remove the section from the DOM
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));

    starButton.style.backgroundColor = this.isStarred ? "red" : "transparent";
  }

  console.log (updateFavorites);

  render() {
    const section = document.createElement("section");
    section.id = `personaje-${this.name}`;

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
    starButton.textContent = "★";
    starButton.style.backgroundColor = this.isStarred ? "red" : "transparent";
    starButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this.toggleStar(starButton, section);
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

const renderFavoriteCharacters = () => {
  fetch('https://raw.githubusercontent.com/LauraBonillaa/Pagina-WEB-proyecto/main/data.json')
    .then(response => response.json())
    .then(charactersJSON => {
      const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
      const contenedorFavoritos = document.getElementById("container-favoritos");

      contenedorFavoritos.innerHTML = '';

      charactersJSON.characters.forEach(character => {
        if (favoritos.some(fav => fav.name === character.name)) {
          const characterObj = new Personaje(character.name, character.chineseName, character.alias, character.appearance);
          const characterElement = characterObj.render();
          contenedorFavoritos.appendChild(characterElement);
        }
      });
    })
    .catch(error => {
      console.error('Error al cargar el archivo JSON', error);
    });
};

// Llamar a la función
renderFavoriteCharacters();
