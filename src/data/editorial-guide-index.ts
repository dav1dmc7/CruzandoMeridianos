import krugerCover from "../assets/images/animales-kruger/leopardo.jpg";

export interface EditorialGuideIndexEntry {
  slug: string;
  href: string;
  name: string;
  eyebrow: string;
  description: string;
  parentName: string;
  image: typeof krugerCover;
  imageAlt: string;
}

export const editorialGuideEntries: EditorialGuideIndexEntry[] = [
  {
    slug: "sudafrica/kruger",
    href: "/viajes/sudafrica/kruger",
    name: "Safari en Kruger",
    eyebrow: "GUÍA ESPECÍFICA · SUDÁFRICA",
    description:
      "Cómo organizar un safari por tu cuenta: noches, coche, safaris guiados, entradas, alojamiento y decisiones que conviene tomar antes de reservar.",
    parentName: "Sudáfrica",
    image: krugerCover,
    imageAlt: "Leopardo fotografiado durante nuestro viaje por Kruger, Sudáfrica",
  },
];
