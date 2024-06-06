class Personaje {
  constructor(name, chineseName, alias, appearance) {
    this.name = name;
    this.chineseName = chineseName;
    this.alias = alias;
    this.appearance = appearance;
    this.isStarred = this.checkIfFavorited();
  }

  checkIfFavorited() {
    const usuarioActivo = obtenerUsuarioEnSesion();
    if (!usuarioActivo) return false;
    const favoritos = usuarioActivo.favoritos || [];
    return favoritos.some(fav => fav.name === this.name);
  }

  toggleStar(starButton, section) {
    this.isStarred = !this.isStarred;
    this.updateFavorites(starButton, section);
  }

  updateFavorites(starButton, section) {
    const usuarioActivo = obtenerUsuarioEnSesion();
    if (!usuarioActivo) return;

    let favoritos = usuarioActivo.favoritos || [];

    if (this.isStarred) {
      favoritos.push({
        name: this.name,
        chineseName: this.chineseName,
        alias: this.alias,
        appearance: this.appearance
      });
    } else {
      favoritos = favoritos.filter(fav => fav.name !== this.name);
      section.remove(); // Remove the section from the DOM
    }

    usuarioActivo.favoritos = favoritos;
    guardarUsuarios(usuarioActivo);

    starButton.style.backgroundColor = this.isStarred ? "red" : "transparent";
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
  const usuarioActivo = obtenerUsuarioEnSesion();
  if (!usuarioActivo) {
    window.location.href = "./Login.html";
    return;
  }

  const favoritos = usuarioActivo.favoritos || [];
  const contenedorFavoritos = document.getElementById("container-favoritos");

  contenedorFavoritos.innerHTML = '';

  favoritos.forEach(character => {
    const characterObj = new Personaje(character.name, character.chineseName, character.alias, character.appearance);
    const characterElement = characterObj.render();
    contenedorFavoritos.appendChild(characterElement);
  });
};

document.addEventListener("DOMContentLoaded", renderFavoriteCharacters);
