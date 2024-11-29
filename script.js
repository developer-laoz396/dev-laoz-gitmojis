let emojis = []; // Variable global para almacenar los emojis

// Función para cargar y mostrar emojis
async function loadEmojis() {
  try {
    const response = await fetch("emojis.json");
    emojis = await response.json();
    displayEmojis(emojis);
  } catch (error) {
    console.error("Error al cargar los emojis:", error);
  }
}

// Función para mostrar emojis en el contenedor
function displayEmojis(emojisToDisplay) {
  const container = document.getElementById("emoji-container");
  container.innerHTML = ""; // Limpiar contenedor antes de agregar emojis

  emojisToDisplay.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("emoji-card"); 
     
    card.innerHTML = `<div class="card-name">${emoji.name}</div>
    <div class="emoji">${emoji.emoji}</div>    
    <div class="card-description">${emoji.description}</div>
    <span class="card-code">${emoji.code}</span>`;

    card.setAttribute('title', emoji.code);
    card.onclick = () => copyCode(emoji.code);
    container.appendChild(card);
  });
}

// Función para copiar al portapapeles
function copyCode(code) {
  navigator.clipboard?.writeText(code) // Verificar si el navegador soporta el API Clipboard
    .then(() => {
      alert(`Código copiado: ${code}`); // Mensaje de confirmación
    })
    .catch((err) => {
      console.error("Error al copiar el texto: ", err);
    });
}

// Función para filtrar emojis en base a la búsqueda
function filterEmojis() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const filteredEmojis = emojis.filter(
    (emoji) =>
      emoji.name.toLowerCase().includes(searchValue) ||
      emoji.description.toLowerCase().includes(searchValue) ||
      emoji.description.toLowerCase().includes(searchValue.split(" ").join("-")) // Permitir búsqueda con guiones
  );
  displayEmojis(filteredEmojis);
}

// Función para manejar el ícono "X" en el buscador
function handleClearButton() {
  const searchInput = document.getElementById('search');
  const clearButton = document.getElementById('clearSearch');

  // Mostrar u ocultar el botón "X" dependiendo de si hay texto
  searchInput.addEventListener('input', () => {
      clearButton.classList.toggle('visible', searchInput.value.length > 0);
  });

  // Limpiar el texto cuando se haga clic en la "X"
  clearButton.addEventListener('click', () => {
      searchInput.value = '';
      clearButton.classList.remove('visible');
      searchInput.focus();
  });
}

// Inicializar
window.onload = () => {
  loadEmojis();
  handleClearButton();
};
