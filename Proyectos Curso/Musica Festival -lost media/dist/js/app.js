document.addEventListener("DOMContentLoaded", function (params) {
  navegacionFija();
  crearGaleria();
  resaltarEnlace();
  scrollNav();
});

function navegacionFija() {
  const header = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");
  window.addEventListener("scroll", function () {
    if (sobreFestival.getBoundingClientRect().bottom < 1) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
}

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  const cantidadImagenes = 16;

  for (let i = 1; i <= cantidadImagenes; i++) {
    const imagen = document.createElement("IMG");
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = "Imagen Galería";

    // Event handler
    imagen.onclick = function () {
      mostrarImagen(i);
    };

    galeria.appendChild(imagen);
  }
}

function mostrarImagen(id) {
  const imagen = document.createElement("IMG");
  imagen.src = `src/img/gallery/full/${id}.jpg`;
  imagen.alt = "Imagen Galería";

  //Generar modal
  const modal = document.createElement("DIV");
  modal.classList.add("modal");
  modal.onclick = cerrarModal;
  modal.appendChild(imagen);

  // Boton cerrar omdal
  const cerrarBtn = document.createElement("BUTTON");
  cerrarBtn.textContent = "X";
  cerrarBtn.classList.add("cerrar");
  cerrarBtn.onclick = cerrarModal;
  modal.appendChild(cerrarBtn);
  //Agregar al html
  const body = document.querySelector("body");
  body.classList.add("overflow-hidden");
  body.appendChild(modal);

  console.log(modal);
}

function cerrarModal() {
  const body = document.querySelector("body");
  const modal = document.querySelector(".modal");
  modal.classList.add("fade-out");
  setTimeout(() => {
    body.classList.remove("overflow-hidden");
    modal?.remove();
  }, 500);
}
function resaltarEnlace() {
  document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navegacion-principal a");
    let actual = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        actual = section.id;
      }
    });
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === "#" + actual) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });
}

function scrollNav() {
  const navLinks = document.querySelectorAll(".navegacion-principal a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
     const sectionScroll=e.target.getAttribute('href');
     const section=document.querySelector(sectionScroll)
     section.scrollIntoView({behavior:'smooth'})
    });
  });
}
