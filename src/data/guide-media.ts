import type { ImageMetadata } from "astro";

import selvaCostaRica from "../assets/images/costa-rica/selva-costa-rica.jpg";
import playaCostaRica from "../assets/images/costa-rica/playa-costa-rica.jpg";
import rioPlaya from "../assets/images/costa-rica/rio-playa.jpg";
import bosqueCascada from "../assets/images/costa-rica/bosque-cascada.jpg";
import cascada from "../assets/images/costa-rica/cascada.jpg";
import arbol from "../assets/images/costa-rica/arbol.jpg";
import cocodrilo from "../assets/images/costa-rica/cocodrilo.jpg";
import rana from "../assets/images/costa-rica/rana.jpg";
import mono from "../assets/images/costa-rica/mono.jpg";
import perezoso from "../assets/images/costa-rica/perezoso.jpg";
import mauricioFirstHand from "../assets/images/mauricio.jpg";
import sudafricaFirstHandCover from "../assets/images/sudafrica.jpg";
import bufaloKruger from "../assets/images/animales-kruger/bufalo.jpg";
import cocodriloKruger from "../assets/images/animales-kruger/cocodrilo.jpg";
import elefanteKruger from "../assets/images/animales-kruger/elefante.jpg";
import impalaHembraKruger from "../assets/images/animales-kruger/impalahembra.jpg";
import impalaMachoKruger from "../assets/images/animales-kruger/impalamacho.jpg";
import leonKruger from "../assets/images/animales-kruger/leon.jpg";
import leonaKruger from "../assets/images/animales-kruger/leona.jpg";
import leopardoKruger from "../assets/images/animales-kruger/leopardo.jpg";
import leopardo2Kruger from "../assets/images/animales-kruger/leopardo2.jpg";
import monoKruger from "../assets/images/animales-kruger/mono.jpg";


export interface FirstHandMediaItem {
  src: ImageMetadata;
  alt: string;
  caption: string;
}

export interface DestinationFirstHandMedia {
  cover: FirstHandMediaItem;
  gallery: FirstHandMediaItem[];
}

export const firstHandMediaBySlug: Readonly<
  Record<string, DestinationFirstHandMedia>
> = {
  "costa-rica": {
    cover: {
      src: playaCostaRica,
      alt: "Playa tropical en Costa Rica fotografiada durante nuestro viaje",
      caption: "Una de las escenas que forman parte de nuestro viaje por Costa Rica.",
    },
    gallery: [
      {
        src: selvaCostaRica,
        alt: "Sendero entre la vegetación tropical de Costa Rica",
        caption: "El bosque fue una parte constante del recorrido.",
      },
      {
        src: playaCostaRica,
        alt: "Playa tropical de Costa Rica",
        caption: "Costa y carretera como parte de la misma ruta.",
      },
      {
        src: rioPlaya,
        alt: "Río desembocando en una playa de Costa Rica",
        caption: "Algunas de las mejores escenas aparecieron durante los desplazamientos.",
      },
      {
        src: bosqueCascada,
        alt: "Cascada entre el bosque tropical de Costa Rica",
        caption: "Naturaleza y paisaje que pedían dejar espacio al día.",
      },
      {
        src: cascada,
        alt: "Cascada en un entorno de bosque de Costa Rica",
        caption: "Parar también formaba parte del viaje.",
      },
      {
        src: mono,
        alt: "Mono entre la vegetación tropical de Costa Rica",
        caption: "Encuentros con fauna que no estaban completamente bajo nuestro control.",
      },
      {
        src: perezoso,
        alt: "Perezoso entre la vegetación tropical de Costa Rica",
        caption: "La observación de fauna también exige paciencia.",
      },
      {
        src: cocodrilo,
        alt: "Cocodrilo junto al agua en Costa Rica",
        caption: "La naturaleza también tiene una parte más salvaje.",
      },
      {
        src: rana,
        alt: "Rana entre la vegetación tropical de Costa Rica",
        caption: "Pequeños encuentros que solo aparecen cuando bajas el ritmo.",
      },
      {
        src: arbol,
        alt: "Árbol entre la vegetación del bosque de Costa Rica",
        caption: "El paisaje no era solo el fondo: condicionaba cómo viajábamos.",
      },
    ],
  },
  "mauricio": {
    cover: {
      src: mauricioFirstHand,
      alt: "Fotografía propia de Mauricio durante nuestro viaje",
      caption: "Una escena de Mauricio tal y como la vivimos durante nuestro viaje.",
    },
    gallery: [
      {
        src: mauricioFirstHand,
        alt: "Fotografía propia de Mauricio durante nuestro viaje",
        caption: "Una imagen propia para acompañar la guía de Mauricio.",
      },
    ],
  },
  "sudafrica": {
    cover: {
      src: sudafricaFirstHandCover,
      alt: "Fotografía propia de Sudáfrica durante nuestro viaje",
      caption: "Una fotografía propia de nuestro viaje por Sudáfrica.",
    },
    gallery: [
      {
        src: leopardoKruger,
        alt: "Leopardo durante nuestro viaje por Kruger",
        caption: "La fauna es parte del viaje, pero nunca debería convertirse en una promesa de avistamientos.",
      },
      {
        src: leopardo2Kruger,
        alt: "Segundo encuentro con un leopardo en Kruger",
        caption: "Dos escenas diferentes recuerdan que cada salida tiene su propio ritmo.",
      },
      {
        src: leonaKruger,
        alt: "Leona fotografiada durante nuestro safari en Kruger",
        caption: "El safari se construye con tiempo, observación y mucha paciencia.",
      },
      {
        src: leonKruger,
        alt: "León fotografiado durante nuestro viaje por Kruger",
        caption: "La distancia y el comportamiento de los animales importan tanto como el lugar.",
      },
      {
        src: elefanteKruger,
        alt: "Elefante fotografiado en Kruger",
        caption: "Kruger cambia de paisaje y de ritmo constantemente.",
      },
      {
        src: bufaloKruger,
        alt: "Búfalo fotografiado en Kruger",
        caption: "No todo el viaje gira alrededor de los animales más famosos.",
      },
      {
        src: impalaMachoKruger,
        alt: "Impala macho fotografiado en Kruger",
        caption: "La experiencia de safari también está en aprender a mirar lo que aparece alrededor.",
      },
      {
        src: impalaHembraKruger,
        alt: "Impala hembra fotografiada en Kruger",
        caption: "Cada recorrido tiene encuentros distintos y ninguno está garantizado.",
      },
      {
        src: cocodriloKruger,
        alt: "Cocodrilo fotografiado durante el viaje por Sudáfrica",
        caption: "Agua, fauna y paisaje forman parte del mismo ecosistema.",
      },
      {
        src: monoKruger,
        alt: "Mono fotografiado durante nuestro viaje por Sudáfrica",
        caption: "También hay espacio para escenas pequeñas lejos de los grandes mamíferos.",
      },
    ],
  },

};
