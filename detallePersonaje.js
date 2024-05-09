window.addEventListener('load', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const nombre = decodeURIComponent(urlParams.get('nombre'));

  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const characterData = data.characters.find(character => character.name === nombre);
      if (characterData) {
        const container = document.getElementById('container');

        const imgElement = document.createElement("img");
        imgElement.src = characterData.appearance.image; 
        imgElement.className = "character-image"; 

        const h3 = document.createElement("h3");
        h3.textContent = characterData.name;
        h3.className = "character-name";

        const p = document.createElement("p");
        p.textContent = characterData.chineseName;
        p.className = "character-chinese-name";  


        const p2 = document.createElement("p");
        p2.textContent = characterData.alias; 
        p2.className = "character-alias";

        const p3 = document.createElement("p");
        p3.textContent = characterData.appearance.description;
        p3.className = "character-description";

        container.appendChild(imgElement);
        container.appendChild(h3);
        container.appendChild(p);
        container.appendChild(p2);
        container.appendChild(p3);
      }
    })
    .catch(error => {
      console.error('Error al cargar el archivo JSON', error);
    });
});
