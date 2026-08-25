import type { ImageMetadata } from "astro";

import costaRica from "../assets/images/playa-costa-rica.jpg";
import sudafrica from "../assets/images/leonas.jpg";
import jordania from "../assets/images/petra.jpg";
import grecia from "../assets/images/corfu.jpg";
import auroras from "../assets/images/aurora.jpg";

export interface Destination {
  name: string;
  slug: string;
  number: string;
  description: string;
  image: ImageMetadata;
  imageAlt: string;
  status: "ready" | "coming-soon";
}

export const destinations: Destination[] = [
  {
    name: "Costa Rica",
    slug: "costa-rica",
    number: "01",
    description:
      "Selva, fauna y costa. Un viaje de naturaleza y aventura que permite combinar diferentes paisajes y ritmos.",
    image: costaRica,
    imageAlt: "Playa tropical en Costa Rica",
    status: "ready",
  },

  {
    name: "Sudáfrica",
    slug: "sudafrica",
    number: "02",
    description:
      "Kruger y Ciudad del Cabo. Safari, naturaleza, gastronomía y ciudad en un mismo viaje.",
    image: sudafrica,
    imageAlt: "Leonas durante un safari en Sudáfrica",
    status: "coming-soon",
  },

  {
    name: "Jordania",
    slug: "jordania",
    number: "03",
    description:
      "Petra, desierto y cultura. Un viaje para descubrir paisajes e historia a otro ritmo.",
    image: jordania,
    imageAlt: "Petra, Jordania",
    status: "coming-soon",
  },

  {
    name: "Grecia",
    slug: "grecia",
    number: "04",
    description:
      "Islas, historia y Mediterráneo. Un viaje que combina cultura, paisaje y tiempo para disfrutar sin prisas.",
    image: grecia,
    imageAlt: "Paisaje costero de Corfú, Grecia",
    status: "coming-soon",
  },

  {
    name: "Auroras",
    slug: "auroras",
    number: "05",
    description:
      "No es solo verlas. Es saber cuándo ir, dónde buscarlas y cómo construir el viaje alrededor de la experiencia.",
    image: auroras,
    imageAlt: "Auroras boreales sobre un paisaje nórdico",
    status: "coming-soon",
  },
];