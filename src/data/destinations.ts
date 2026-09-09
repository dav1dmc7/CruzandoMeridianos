import type { ImageMetadata } from "astro";

import costaRica from "../assets/images/costa-rica/playa-costa-rica.jpg";
import sudafrica from "../assets/images/leonas.jpg";
import jordania from "../assets/images/petra.jpg";
import grecia from "../assets/images/corfu.jpg";
import auroras from "../assets/images/aurora.jpg";

export type DestinationContinent =
  | "Europa"
  | "África"
  | "Asia"
  | "América"
  | "Oceanía"
  | "Otros";

export interface Destination {
  name: string;
  slug: string;
  number: string;
  description: string;
  image: ImageMetadata;
  imageAlt: string;
  continent: DestinationContinent;
  status: "ready" | "coming-soon";
}

export const destinations: Destination[] = [
  {
    name: "Costa Rica",
    slug: "costa-rica",
    number: "01",
    description:
      "Selva, fauna y costa. Naturaleza, playas, parques y experiencias muy diferentes dentro de un mismo país.",
    image: costaRica,
    imageAlt: "Playa tropical en Costa Rica",
    continent: "América",
    status: "ready",
  },

  {
    name: "Sudáfrica",
    slug: "sudafrica",
    number: "02",
    description:
      "Safari, costa, naturaleza, gastronomía y ciudad. Un país con muchos viajes posibles dentro del mismo destino.",
    image: sudafrica,
    imageAlt: "Leonas durante un safari en Sudáfrica",
    continent: "África",
    status: "coming-soon",
  },

  {
    name: "Jordania",
    slug: "jordania",
    number: "03",
    description:
      "Petra, desierto, mar y cultura. Paisajes muy distintos y una historia que se descubre sobre el terreno.",
    image: jordania,
    imageAlt: "Petra, Jordania",
    continent: "Asia",
    status: "coming-soon",
  },

  {
    name: "Grecia",
    slug: "grecia",
    number: "04",
    description:
      "Islas, historia y Mediterráneo. Cultura, paisaje, gastronomía y costa en un mismo país.",
    image: grecia,
    imageAlt: "Paisaje costero de Corfú, Grecia",
    continent: "Europa",
    status: "coming-soon",
  },

  {
    name: "Auroras",
    slug: "auroras",
    number: "05",
    description:
      "Una experiencia que puede llevarte al norte de Europa y otros territorios árticos en busca de cielos nocturnos y paisajes extremos.",
    image: auroras,
    imageAlt: "Auroras boreales sobre un paisaje nórdico",
    continent: "Europa",
    status: "coming-soon",
  },
];