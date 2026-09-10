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
  image?: ImageMetadata;
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

  {
    name: "Polonia",
    slug: "polonia",
    number: "06",
    description:
      "Ciudades con historia, patrimonio, gastronomía y una Europa central que merece descubrirse con calma.",
    continent: "Europa",
    status: "coming-soon",
  },

  {
    name: "Italia",
    slug: "italia",
    number: "07",
    description:
      "Historia, arte, comida y paisajes. Un país enorme para plantear viajes muy diferentes.",
    continent: "Europa",
    status: "coming-soon",
  },

  {
    name: "Viena",
    slug: "viena",
    number: "08",
    description:
      "Arquitectura imperial, cafés, música y una de las grandes capitales culturales de Europa.",
    continent: "Europa",
    status: "coming-soon",
  },

  {
    name: "Praga",
    slug: "praga",
    number: "09",
    description:
      "Una ciudad para caminar, descubrir barrios, arquitectura, historia y rincones que cambian con cada paseo.",
    continent: "Europa",
    status: "coming-soon",
  },

  {
    name: "Budapest",
    slug: "budapest",
    number: "10",
    description:
      "El Danubio, arquitectura, termas y una ciudad con mucha personalidad.",
    continent: "Europa",
    status: "coming-soon",
  },

  {
    name: "Ámsterdam",
    slug: "amsterdam",
    number: "11",
    description:
      "Canales, barrios, museos y una ciudad que se entiende mejor cuando sales de los recorridos de siempre.",
    continent: "Europa",
    status: "coming-soon",
  },

  {
    name: "París",
    slug: "paris",
    number: "12",
    description:
      "Mucho más que una lista de monumentos: barrios, paseos, cultura, gastronomía y pequeñas decisiones que cambian el viaje.",
    continent: "Europa",
    status: "coming-soon",
  },

  {
    name: "Sur de Francia",
    slug: "sur-de-francia",
    number: "13",
    description:
      "Pueblos, costa, carreteras secundarias, mercados y paisajes mediterráneos para recorrer sin prisas.",
    continent: "Europa",
    status: "coming-soon",
  },

  {
    name: "Nueva York",
    slug: "nueva-york",
    number: "14",
    description:
      "Una ciudad enorme que pide planificación: barrios, miradores, comida, cultura y mucho que decidir antes de llegar.",
    continent: "América",
    status: "coming-soon",
  },

  {
    name: "Washington",
    slug: "washington",
    number: "15",
    description:
      "Museos, historia, arquitectura y una capital estadounidense que merece algo más que una visita rápida.",
    continent: "América",
    status: "coming-soon",
  },

  {
    name: "Egipto",
    slug: "egipto",
    number: "16",
    description:
      "Historia, desierto, templos y un viaje donde la planificación puede cambiar completamente la experiencia.",
    continent: "África",
    status: "coming-soon",
  },

  {
    name: "Mauricio",
    slug: "mauricio",
    number: "17",
    description:
      "Una isla que nosotros vivimos dentro de un viaje combinado con Sudáfrica. Naturaleza, costa y una parte del viaje muy distinta.",
    continent: "África",
    status: "coming-soon",
  },

  {
    name: "Malta",
    slug: "malta",
    number: "18",
    description:
      "Historia, calas, pueblos y Mediterráneo en una isla pequeña pero llena de posibilidades.",
    continent: "Europa",
    status: "coming-soon",
  },

  {
    name: "Tenerife",
    slug: "tenerife",
    number: "19",
    description:
      "Volcanes, costa, montaña y paisajes muy diferentes en una de las islas más completas de Canarias.",
    continent: "Otros",
    status: "coming-soon",
  },

  {
    name: "Gran Canaria",
    slug: "gran-canaria",
    number: "20",
    description:
      "Playas, montaña, pueblos y carreteras con cambios de paisaje constantes.",
    continent: "Otros",
    status: "coming-soon",
  },

  {
    name: "Lanzarote",
    slug: "lanzarote",
    number: "21",
    description:
      "Volcanes, arquitectura, costa y paisajes que parecen de otro planeta.",
    continent: "Otros",
    status: "coming-soon",
  },

  {
    name: "Fuerteventura",
    slug: "fuerteventura",
    number: "22",
    description:
      "Playas, viento, carreteras abiertas y una isla para explorar a tu propio ritmo.",
    continent: "Otros",
    status: "coming-soon",
  },

  {
    name: "El Hierro",
    slug: "el-hierro",
    number: "23",
    description:
      "Naturaleza, tranquilidad, volcanes y rincones para descubrir lejos de las rutas habituales.",
    continent: "Otros",
    status: "coming-soon",
  },
];