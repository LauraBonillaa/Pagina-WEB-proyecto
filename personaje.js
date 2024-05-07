class Personaje {
    constructor(name, chineseName, alias, appearence) {
      this.name = name;
      this.chineseName = chineseName;
      this.alias = alias;
      this.appearence = appearence;
    }
  
    render() {
      const link = document.createElement("a");
      link.href = `detalle.html?nombre=${encodeURIComponent(this.name)}`;

      const section = document.createElement("section");
  
      const imgElement = document.createElement("img");
      imgElement.src = this.appearence.image; 
      
  
      const h3 = document.createElement("h3");
      h3.textContent = this.name;
  
      const p = document.createElement("p");
      p.textContent = this.chineseName;
  
      const p2 = document.createElement("p");
      p2.textContent = this.alias; 
  
      section.appendChild(imgElement);
      section.appendChild(h3);
      section.appendChild(p);
      section.appendChild(p2);
  
      return section;
    }
  }
  
  fetch('data.json')
    .then(response => response.json())
    .then(charactersJSON => {
      const contenedorProductos = document.getElementById("container");
      contenedorProductos.classList.add("container");
  
      charactersJSON.characters.forEach(character => {
        const characterObj = new Personaje(character.name, character.chineseName, character.alias, character.appearance); // Ajusta los parámetros que recibe el constructor de Personaje
        const characterElement = characterObj.render();
        contenedorProductos.appendChild(characterElement);
      });
    })
    .catch(error => {
      console.error('Error al cargar el archivo JSON', error);
    });
  
  