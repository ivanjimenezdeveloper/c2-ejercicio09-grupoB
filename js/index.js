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

// poner cabeza abajo

// filtrar los li de la clase metadata

// aplicar funcion al boton muere y actualizar pj

// aplicar funcion al boton habla

// insertar personaje

const main = () => {};

main();
