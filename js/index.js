/* eslint-disable import/extensions */
import Escudero from "./escudero.js";
import Asesor from "./asesor.js";
import Luchador from "./luchador.js";
import Rey from "./rey.js";
import { personajes } from "./personajes.js";

const seriesConstantes = {
  juegoDeTronos: "Juego de Tronos",
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

const girarCabezaPersonaje = (elementoImagen) =>
  elementoImagen.classList.add("rotar-imagen");

// poner cabeza abajo

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

// insertar personaje

const main = () => {};

main();
