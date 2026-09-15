import type { ImageMetadata } from "astro";

import costaRica from "../assets/images/costa-rica/playa-costa-rica.jpg";
import sudafrica from "../assets/images/leonas.jpg";
import jordania from "../assets/images/petra.jpg";
import grecia from "../assets/images/corfu.jpg";
import auroras from "../assets/images/aurora.jpg";

export type TravelAdvisoryLevel =
  | "standard"
  | "caution"
  | "postpone";

export interface TravelAdvisory {
  level: TravelAdvisoryLevel;
  label: string;
  summary: string;
  sourceLabel: string;
  sourceUrl: string;
  reviewedAt: string;
}

export interface Destination {
  name: string;
  slug: string;
  number: string;
  description: string;
  image: ImageMetadata;
  imageAlt: string;
  status: "ready" | "coming-soon";
  advisory?: TravelAdvisory;
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
    advisory: {
      level: "caution",
      label: "Viajar con precaución",
      summary:
        "La recomendación oficial vigente aconseja viajar con precaución y prestar especial atención a seguridad ciudadana, conducción y fenómenos naturales.",
      sourceLabel:
        "Ministerio de Asuntos Exteriores de España — Costa Rica",
      sourceUrl:
        "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Costa+Rica",
      reviewedAt: "2026-09-15",
    },
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
    advisory: {
      level: "caution",
      label: "Extremar las precauciones",
      summary:
        "La recomendación oficial señala un nivel muy alto de delincuencia, incluida delincuencia violenta, y aconseja extremar las precauciones y evitar determinadas zonas.",
      sourceLabel:
        "Ministerio de Asuntos Exteriores de España — Sudáfrica",
      sourceUrl:
        "https://exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Sud%C3%A1frica",
      reviewedAt: "2026-09-15",
    },
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
    advisory: {
      level: "postpone",
      label: "Viaje aplazado actualmente",
      summary:
        "La recomendación oficial vigente aconseja aplazar el viaje a Jordania hasta nuevo aviso por el conflicto regional de Oriente Próximo.",
      sourceLabel:
        "Ministerio de Asuntos Exteriores de España — Jordania",
      sourceUrl:
        "https://exteriores.gob.es/Embajadas/amman/en/ViajarA/Paginas/Recomendaciones-de-viaje.aspx",
      reviewedAt: "2026-09-15",
    },
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
    advisory: {
      level: "standard",
      label: "Sin restricciones específicas",
      summary:
        "La recomendación oficial vigente no establece restricciones específicas de viaje, aunque recuerda mantener las precauciones habituales y vigilar incendios, terremotos y condiciones meteorológicas.",
      sourceLabel:
        "Ministerio de Asuntos Exteriores de España — Grecia",
      sourceUrl:
        "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
      reviewedAt: "2026-09-15",
    },
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