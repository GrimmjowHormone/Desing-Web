const nuevoEnlace = document.createElement("A");
console.log(nuevoEnlace);

// Agregar el href
nuevoEnlace.href = "nuevo-enlace.html";
// Agregar el texto
nuevoEnlace.textContent = "Un nuevo enlace";
// Agregar la clase

nuevoEnlace.classList.add(".navegacion__enlace");

// Agregarlo al documento
const nav=document.querySelector('.navegacion');

nav.appendChild(nuevoEnlace)