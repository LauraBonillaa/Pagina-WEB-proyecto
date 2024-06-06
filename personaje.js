// verifica que este log
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = sessionStorage.getItem('currentUser');
  if (!currentUser) {
      window.location.href = "./login.html";
      return;
  }
  fetchAndRenderCharacters();
});


class Personaje {
  constructor(name, chineseName, alias, appearance, isFavorited = false) {
    this.name = name;
    this.chineseName = chineseName;
    this.alias = alias;
    this.appearance = appearance;
    this.isFavorited = isFavorited;
  }

  toggleFavorite(starButton) {
    this.isFavorited = !this.isFavorited;
    this.updateLocalStorage();
    starButton.style.backgroundColor = this.isFavorited ? "red" : "transparent";
  }

  updateLocalStorage() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) return;

    let userFavorites = JSON.parse(localStorage.getItem(currentUser)) || [];
    const characterIndex = userFavorites.findIndex(char => char.name === this.name);

    if (characterIndex > -1) {
      userFavorites[characterIndex].isFavorited = this.isFavorited;
    } else {
      userFavorites.push(this);
    }

    localStorage.setItem(currentUser, JSON.stringify(userFavorites));
  }

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
    starButton.style.backgroundColor = this.isFavorited ? "red" : "transparent";
    starButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this.toggleFavorite(starButton);
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
  fetch('https://raw.githubusercontent.com/LauraBonillaa/Pagina-WEB-proyecto/main/data.json')
    .then(response => response.json())
    .then(charactersJSON => {
      const currentUser = sessionStorage.getItem('currentUser');
      const storedCharacters = JSON.parse(localStorage.getItem(currentUser)) || [];
      const contenedorProductos = document.getElementById("container");
      contenedorProductos.classList.add("container");

      const renderCharacters = (characters) => {
        contenedorProductos.innerHTML = '';
        characters.forEach(characterData => {
          const storedCharacter = storedCharacters.find(char => char.name === characterData.name);
          const character = storedCharacter ? 
            new Personaje(storedCharacter.name, storedCharacter.chineseName, storedCharacter.alias, storedCharacter.appearance, storedCharacter.isFavorited) :
            new Personaje(characterData.name, characterData.chineseName, characterData.alias, characterData.appearance);

          const characterElement = character.render();
          contenedorProductos.appendChild(characterElement);
        });
      };

      renderCharacters(charactersJSON.characters);

      const searchInput = document.getElementById('searchInput');

      const filterCharacters = () => {
        const query = searchInput.value.toLowerCase();
        const filteredCharacters = charactersJSON.characters.filter(character => 
          character.name.toLowerCase().includes(query)
        );
        renderCharacters(filteredCharacters);
      };

      searchInput.addEventListener('keyup', filterCharacters);
    })
    .catch(error => {
      console.error('Error al cargar el archivo JSON', error);
    });
};

document.addEventListener('DOMContentLoaded', fetchAndRenderCharacters);
