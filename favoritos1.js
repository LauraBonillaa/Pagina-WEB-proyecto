export const obtenerPersonajes = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/LauraBonillaa/Pagina-WEB-proyecto/main/data.json"
    );
    const data = await response.json();
    return data;
  };