import type { ImageMetadata } from "astro";

import selvaCostaRica from "./assets/images/costa-rica/selva-costa-rica.jpg";
import playaCostaRica from "./assets/images/costa-rica/playa-costa-rica.jpg";
import rioPlaya from "./assets/images/costa-rica/rio-playa.jpg";
import bosqueCascada from "./assets/images/costa-rica/bosque-cascada.jpg";
import cascada from "./assets/images/costa-rica/cascada.jpg";
import arbol from "./assets/images/costa-rica/arbol.jpg";
import cocodrilo from "./assets/images/costa-rica/cocodrilo.jpg";
import rana from "./assets/images/costa-rica/rana.jpg";
import mono from "./assets/images/costa-rica/mono.jpg";
import perezoso from "./assets/images/costa-rica/perezoso.jpg";

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
};
