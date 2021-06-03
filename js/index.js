/* eslint-disable import/extensions */
import Escudero from "./escudero.js";
import Asesor from "./asesor.js";
import Luchador from "./luchador.js";
import Rey from "./rey.js";

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

const main = () => {};

main();
