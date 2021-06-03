/* eslint-disable import/extensions */
import Escudero from "./escudero.js";
import Asesor from "./asesor.js";
import Luchador from "./luchador.js";
import Rey from "./rey.js";
import { personajes } from "./personajes.js";

const seriesConstantes = {
  juegoDeTronos: "Juego de Tronos",
};

const rutas = {
  imagenPersonaje: "./img/",
};

const hablanLuchadores = (personajes) =>
  personajes
    .filter((personaje) => personaje instanceof Luchador)
    .map((personaje) => personaje.comunicar());

const seriePersonaje = (arrayPersonajes) => [
  ...new Set(arrayPersonajes.map((personaje) => personaje.serie)),
];

const resumenPersonajes = (personajes) =>
  personajes
    .map((personaje) => personaje.constructor.name)
    .filter((tipo, i, tipos) => tipos.indexOf(tipo) === i)
    .map((tipo) => ({
      tipo,
      personajes: personajes
        .filter((personaje) => personaje.constructor.name === tipo)
        .map((personaje) => ({
          nombre: `${personaje.nombre} ${personaje.familia}`,
          estado: personaje.vivo ? "vivo" : "muerto",
          edad: personaje.edad,
        }))
        .sort((personajeA, personajeB) => personajeA.edad - personajeB.edad),
    }));

// copiar personaje-dummy

// anyadir emjoi segun rol

// ocultar iconos de estado
const determinarEstado = (estado, elementoImagen, personaje) => {
  ocultarIconosEstado(estado, personaje);
  girarCabezaPersonaje(elementoImagen);
};

const ocultarIconosEstado = (estado, personaje) => {
  const emojiMuerto = estado.querySelector(".emojiMuerto");
  const emojiVivo = estado.querySelector(".emojiVivo");

  if (personaje.vivo) {
    emojiMuerto.classList.add("ocultar-emoji");
    return;
  }
  emojiVivo.classList.add("ocultar-emoji");
};

// cabeza abajo poner
const girarCabezaPersonaje = (elementoImagen) =>
  elementoImagen.classList.add("rotar-imagen");

// filtrar los li de la clase metadata
const filtrarMetadata = (metadataElemento, rolPersonaje) => {
  const elementoMantener = [];

  if (rolPersonaje === "Luchador") {
    elementoMantener.push(metadataElemento.querySelector(".arma"));
    elementoMantener.push(metadataElemento.querySelector(".destreza"));
  } else if (rolPersonaje === "Asesor") {
    elementoMantener.push(metadataElemento.querySelector(".asesora"));
  } else if (rolPersonaje === "Escudero") {
    elementoMantener.push(metadataElemento.querySelector(".peloteo"));
    elementoMantener.push(metadataElemento.querySelector(".sirve"));
  } else if (rolPersonaje === "Rey") {
    elementoMantener.push(metadataElemento.querySelector(".reinadoTiempo"));
  }

  borrarHijosNodos(metadataElemento);

  metadataElemento.append(...elementoMantener);

  return metadataElemento;
};

const borrarHijosNodos = (padre) => {
  while (padre.firstChild) {
    padre.removeChild(padre.firstChild);
  }
};
// aplicar funcion al boton muere y actualizar pj

// aplicar funcion al boton habla
const personajeHabla = (personaje) => {
  const comunicaciones = document.querySelector(".comunicaciones");
  const comunicacionesTexto = document.querySelector(".comunicaciones p");
  const imagenPersonaje = document.querySelector(".comunicaciones img");

  setTimeout(() => {
    comunicaciones.classList.remove("on");
  }, 2000);

  comunicaciones.classList.add("on");
  comunicacionesTexto.textContent = personaje.comunicar();
  imagenPersonaje.src = obtenerImagen(personaje);
  imagenPersonaje.alt = `${personaje.nombre} ${personaje.familia}`;
};

const obtenerImagen = (personaje) => `img/${personaje.nombre}.jpg`;

// insertar personaje

const anyadirDatosMetadata = (metadataElemento, rolPersonaje, personaje) => {
  if (rolPersonaje === "Luchador") {
    metadataElemento.querySelector(".armaNombre").textContent = personaje.arma;
    metadataElemento.querySelector(".destrezaNumero").textContent =
      personaje.destreza;
  } else if (rolPersonaje === "Asesor") {
    metadataElemento.querySelector(
      ".asesoraPersonaje"
    ).textContent = ` ${personaje.asesorado.nombre} ${personaje.asesorado.familia}`;
  } else if (rolPersonaje === "Escudero") {
    metadataElemento.querySelector(".peloteoNumero").textContent =
      personaje.pelotismo;
    metadataElemento.querySelector(
      ".sirvePersonaje"
    ).textContent = `${personaje.sirveA.nombre} ${personaje.sirveA.familia}`;
  } else if (rolPersonaje === "Rey") {
    metadataElemento.querySelector(".reinadoTiempoNumero").textContent =
      personaje.anyosReinado;
  }
};

const insertarPersonaje = (personaje) => {
  const personajeElementoCopia = document
    .querySelector(".personaje-dummy")
    .cloneNode(true);
  personajeElementoCopia.classList.remove("personaje-dummy");
  const personajesElemento = document.querySelector(".personajes");

  const personajeElemento = personajeElementoCopia.cloneNode(true);
  const imagenElemento = personajeElemento.querySelector(".card-img-top");
  const nombreElemento = personajeElemento.querySelector(".nombre");
  const edadElemento = personajeElemento.querySelector(".edad .edadNumero");
  const estado = personajeElemento.querySelector(".estado");
  const metadataUnicas = personajeElemento.querySelector(
    ".metadataPropiedadesUnicas"
  );
  imagenElemento.src = `${getNombreImagen(personaje)}`;
  imagenElemento.alt = `${personaje.nombre} ${personaje.familia}`;

  nombreElemento.textContent = `${personaje.nombre} ${personaje.familia}`;
  edadElemento.textContent = personaje.edad;

  filtrarMetadata(metadataUnicas, personaje.constructor.name);
  anyadirDatosMetadata(metadataUnicas, personaje.constructor.name, personaje);
  determinarEstado(estado, imagenElemento, personaje);

  personajesElemento.append(personajeElemento);
};

const getNombreImagen = (personaje) =>
  `${rutas.imagenPersonaje}${personaje.nombre.toLowerCase()}.jpg`;

const main = (personajes) => {
  for (const personaje of personajes) {
    insertarPersonaje(personaje);
  }
};

main(personajes);
