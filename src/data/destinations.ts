import type { ImageMetadata } from "astro";

import costaRica from "../assets/images/costa-rica/playa-costa-rica.jpg";
import sudafrica from "../assets/images/leonas.jpg";
import jordania from "../assets/images/petra.jpg";
import grecia from "../assets/images/corfu.jpg";
import auroras from "../assets/images/aurora.jpg";
import atlasGuideFallback from "../assets/images/atlas-guide-fallback.svg";
import { firstHandMediaBySlug } from "./guide-media";

export type DestinationContinent =
  | "Europa"
  | "África"
  | "Asia"
  | "América"
  | "Oceanía";

export interface Destination {
  name: string;
  slug: string;
  number: string;
  description: string;
  image: ImageMetadata;
  imageAlt: string;
  continent: DestinationContinent;
  country?: string;
  region?: string;
  status: "ready" | "coming-soon";
}

export const destinations: Destination[] = [
  {
    name: "Costa Rica",
    slug: "costa-rica",
    number: "01",
    description:
      "Selva, fauna y costa. Naturaleza, playas, parques y experiencias muy diferentes dentro de un mismo país.",
    image: firstHandMediaBySlug["costa-rica"]?.cover.src ?? costaRica,
    imageAlt:
      firstHandMediaBySlug["costa-rica"]?.cover.alt ??
      "Playa tropical en Costa Rica",
    continent: "América",
    country: "Costa Rica",
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
    country: "Sudáfrica",
    status: "ready",
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
    country: "Jordania",
    status: "ready",
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
    country: "Grecia",
    status: "ready",
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
    country: "Varios destinos",
    status: "ready",
  },
  {
    name: "Polonia",
    slug: "polonia",
    number: "06",
    description:
      "Ciudades con historia, patrimonio, gastronomía y una Europa central que merece descubrirse con calma.",
    image: atlasGuideFallback,
    imageAlt: "Composición editorial del atlas de Cruzando Meridianos para Polonia",
    continent: "Europa",
    country: "Polonia",
    status: "ready",
  },
  {
    name: "Italia",
    slug: "italia",
    number: "07",
    description:
      "Historia, arte, comida y paisajes. Un país enorme para plantear viajes muy diferentes.",
    image: atlasGuideFallback,
    imageAlt: "Composición editorial del atlas de Cruzando Meridianos para Italia",
    continent: "Europa",
    country: "Italia",
    status: "ready",
  },
  {
    name: "Viena",
    slug: "viena",
    number: "08",
    description:
      "Arquitectura imperial, cafés, música y una de las grandes capitales culturales de Europa.",
    image: atlasGuideFallback,
    imageAlt: "Composición editorial del atlas de Cruzando Meridianos para Viena",
    continent: "Europa",
    country: "Austria",
    status: "ready",
  },
  {
    name: "Praga",
    slug: "praga",
    number: "09",
    description:
      "Una ciudad para caminar, descubrir barrios, arquitectura, historia y rincones que cambian con cada paseo.",
    image: atlasGuideFallback,
    imageAlt: "Composición editorial del atlas de Cruzando Meridianos para Praga",
    continent: "Europa",
    country: "Chequia",
    status: "ready",
  },
  {
    name: "Budapest",
    slug: "budapest",
    number: "10",
    description:
      "El Danubio, arquitectura, termas y una ciudad con mucha personalidad.",
    image: atlasGuideFallback,
    imageAlt: "Composición editorial del atlas de Cruzando Meridianos para Budapest",
    continent: "Europa",
    country: "Hungría",
    status: "ready",
  },
  {
    name: "Ámsterdam",
    slug: "amsterdam",
    number: "11",
    description:
      "Canales, barrios, museos y una ciudad que se entiende mejor cuando sales de los recorridos de siempre.",
    image: atlasGuideFallback,
    imageAlt: "Composición editorial del atlas de Cruzando Meridianos para Ámsterdam",
    continent: "Europa",
    country: "Países Bajos",
    status: "ready",
  },
  {
    name: "París",
    slug: "paris",
    number: "12",
    description:
      "Mucho más que una lista de monumentos: barrios, paseos, cultura, gastronomía y pequeñas decisiones que cambian el viaje.",
    image: atlasGuideFallback,
    imageAlt: "Composición editorial del atlas de Cruzando Meridianos para París",
    continent: "Europa",
    country: "Francia",
    status: "ready",
  },
  {
    name: "Sur de Francia",
    slug: "sur-de-francia",
    number: "13",
    description:
      "Pueblos, costa, carreteras secundarias, mercados y paisajes mediterráneos para recorrer sin prisas.",
    image: atlasGuideFallback,
    imageAlt: "Composición editorial del atlas de Cruzando Meridianos para el sur de Francia",
    continent: "Europa",
    country: "Francia",
    status: "ready",
  },
  {
    name: "Nueva York",
    slug: "nueva-york",
    number: "14",
    description:
      "Una ciudad enorme que pide planificación: barrios, miradores, comida, cultura y mucho que decidir antes de llegar.",
    image: atlasGuideFallback,
    imageAlt: "Composición editorial del atlas de Cruzando Meridianos para Nueva York",
    continent: "América",
    country: "Estados Unidos",
    status: "ready",
  },
  {
    name: "Washington",
    slug: "washington",
    number: "15",
    description:
      "Museos, historia, arquitectura y una capital estadounidense que merece algo más que una visita rápida.",
    image: atlasGuideFallback,
    imageAlt: "Composición editorial del atlas de Cruzando Meridianos para Washington",
    continent: "América",
    country: "Estados Unidos",
    status: "ready",
  },
  {
    name: "Egipto",
    slug: "egipto",
    number: "16",
    description:
      "Historia, desierto, templos y un viaje donde la planificación puede cambiar completamente la experiencia.",
    image: atlasGuideFallback,
    imageAlt: "Composición editorial del atlas de Cruzando Meridianos para Egipto",
    continent: "África",
    country: "Egipto",
    status: "ready",
  },
  {
    name: "Mauricio",
    slug: "mauricio",
    number: "17",
    description:
      "Una isla que nosotros vivimos dentro de un viaje combinado con Sudáfrica. Naturaleza, costa y una parte del viaje muy distinta.",
    image: atlasGuideFallback,
    imageAlt: "Composición editorial del atlas de Cruzando Meridianos para Mauricio",
    continent: "África",
    country: "Mauricio",
    status: "ready",
  },
  {
    name: "Malta",
    slug: "malta",
    number: "18",
    description:
      "Historia, calas, pueblos y Mediterráneo en una isla pequeña pero llena de posibilidades.",
    image: atlasGuideFallback,
    imageAlt: "Composición editorial del atlas de Cruzando Meridianos para Malta",
    continent: "Europa",
    country: "Malta",
    status: "ready",
  },
  {
    name: "Tenerife",
    slug: "tenerife",
    number: "19",
    description:
      "Volcanes, costa, montaña y paisajes muy diferentes en una de las islas más completas de Canarias.",
    image: atlasGuideFallback,
    imageAlt: "Composición editorial del atlas de Cruzando Meridianos para Tenerife",
    continent: "Europa",
    country: "España",
    region: "Canarias",
    status: "ready",
  },
  {
    name: "Gran Canaria",
    slug: "gran-canaria",
    number: "20",
    description:
      "Playas, montaña, pueblos y carreteras con cambios de paisaje constantes.",
    image: atlasGuideFallback,
    imageAlt: "Composición editorial del atlas de Cruzando Meridianos para Gran Canaria",
    continent: "Europa",
    country: "España",
    region: "Canarias",
    status: "ready",
  },
  {
    name: "Lanzarote",
    slug: "lanzarote",
    number: "21",
    description:
      "Volcanes, arquitectura, costa y paisajes que parecen de otro planeta.",
    image: atlasGuideFallback,
    imageAlt: "Composición editorial del atlas de Cruzando Meridianos para Lanzarote",
    continent: "Europa",
    country: "España",
    region: "Canarias",
    status: "ready",
  },
  {
    name: "Fuerteventura",
    slug: "fuerteventura",
    number: "22",
    description:
      "Playas, viento, carreteras abiertas y una isla para explorar a tu propio ritmo.",
    image: atlasGuideFallback,
    imageAlt: "Composición editorial del atlas de Cruzando Meridianos para Fuerteventura",
    continent: "Europa",
    country: "España",
    region: "Canarias",
    status: "ready",
  },
  {
    name: "El Hierro",
    slug: "el-hierro",
    number: "23",
    description:
      "Naturaleza, tranquilidad, volcanes y rincones para descubrir lejos de las rutas habituales.",
    image: atlasGuideFallback,
    imageAlt: "Composición editorial del atlas de Cruzando Meridianos para El Hierro",
    continent: "Europa",
    country: "España",
    region: "Canarias",
    status: "ready",
  },
];
