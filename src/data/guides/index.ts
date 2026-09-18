import type { DestinationGuide, GuideSection } from "./types";
import { keyPlacesBySlug } from "./key-places";
import { costaRicaGuide } from "./costa-rica";
import { costaRicaSectionOverrides } from "./costa-rica-editorial";
import { additionalGuides } from "./additional";
import { southAfricaSectionOverrides } from "./sudafrica-editorial";
import { jordaniaSectionOverrides } from "./jordania-editorial";
import { greciaSectionOverrides } from "./grecia-editorial";
import { aurorasSectionOverrides } from "./auroras-editorial";
import { tenerifeSectionOverrides } from "./tenerife-editorial";
import { destinationDeepDiveOverrides } from "./destination-deep-dive";
import { liveGuideUpdates } from "../live/travel-intelligence.generated";

const guides: Readonly<Record<string, DestinationGuide>> = {
  [costaRicaGuide.slug]: costaRicaGuide,
  ...Object.fromEntries(additionalGuides.map((guide) => [guide.slug, guide])),
};

const normalizeSlug = (slug: string): string => slug.trim().toLowerCase();

const withKeyPlaces = (guide: DestinationGuide): DestinationGuide => ({
  ...guide,
  places: keyPlacesBySlug[guide.slug] ?? guide.places,
});

type GuideSectionWithOptionalNumber = Omit<GuideSection, "number"> & {
  number?: string;
};

const renumberSections = (
  sections: GuideSectionWithOptionalNumber[],
): GuideSection[] =>
  sections.map((section, index) => ({
    ...section,
    number: String(index + 1).padStart(2, "0"),
  }));

const mergeSectionOverrides = (
  guide: DestinationGuide,
  overrides: GuideSectionWithOptionalNumber[],
): DestinationGuide => {
  const overridesById = new Map(overrides.map((section) => [section.id, section]));
  const merged = guide.sections.map(
    (section) => overridesById.get(section.id) ?? section,
  );
  const missing = overrides.filter(
    (section) => !guide.sections.some((existing) => existing.id === section.id),
  );

  return {
    ...guide,
    sections: renumberSections([...merged, ...missing]),
  };
};

const mergeCostaRicaSections = (guide: DestinationGuide): DestinationGuide => {
  if (guide.slug !== "costa-rica") return guide;

  const overridesById = new Map(
    costaRicaSectionOverrides.map((section) => [section.id, section]),
  );

  const merged = guide.sections.map(
    (section) => overridesById.get(section.id) ?? section,
  );

  const missing = costaRicaSectionOverrides.filter(
    (section) => !guide.sections.some((existing) => existing.id === section.id),
  );

  const volcanoes = missing.find((section) => section.id === "volcanes");
  const remainingMissing = missing.filter((section) => section.id !== "volcanes");

  const withInsertedVolcanoes = volcanoes
    ? (() => {
        const insertBeforeIndex = merged.findIndex(
          (section) => section.id === "parques-nacionales",
        );

        if (insertBeforeIndex === -1) return [...merged, volcanoes];

        return [
          ...merged.slice(0, insertBeforeIndex),
          volcanoes,
          ...merged.slice(insertBeforeIndex),
        ];
      })()
    : merged;

  return {
    ...guide,
    sections: renumberSections([
      ...withInsertedVolcanoes,
      ...remainingMissing,
    ]),
  };
};

const utilityFocusBySlug: Readonly<Record<string, string>> = {
  "costa-rica": "parques y reservas, estado de carreteras, lluvia, reservas de acceso y tiempos reales entre regiones",
  sudafrica: "reservas de safari, seguridad de cada zona, vuelos internos, conducción y distancias reales",
  jordania: "situación regional, pasos fronterizos, horarios de Petra y otros enclaves, calor y conducción",
  grecia: "ferris y puertos, viento y estado del mar, aperturas estacionales, alquiler de coche y conexiones",
  auroras: "actividad solar, nubosidad, oscuridad, previsión de corto plazo y condiciones de conducción invernal",
  polonia: "trenes, horarios de museos, reservas de visitas, clima y movilidad entre ciudades",
  italia: "trenes, reservas con hora, zonas ZTL, aparcamiento y condiciones de carretera o montaña",
  viena: "eventos, museos con reserva, transporte público, horarios estacionales y excursiones",
  praga: "transporte público, reservas de monumentos, horarios, eventos y excursiones cercanas",
  budapest: "termas, horarios de museos, transporte, eventos y posibles reservas con antelación",
  amsterdam: "museos con franja horaria, transporte, bicicletas, agenda cultural y excursiones",
  paris: "reservas de museos y monumentos, transporte, agenda cultural y barrios donde conviene dormir",
  "sur-de-francia": "mercados y eventos, horarios, carreteras, aparcamiento, ferris y clima por costa/interior",
  "nueva-york": "reservas de miradores y espectáculos, transporte, eventos, meteorología y tiempos entre barrios",
  washington: "reservas de museos o monumentos, horarios, transporte, agenda y excursiones regionales",
  egipto: "horarios de templos, temperatura, navegación si procede, traslados internos y recomendaciones oficiales",
  mauricio: "meteorología por costa, estado del mar, excursiones, conducción y reservas de actividades",
  malta: "ferris a Gozo/Comino, estado del mar, horarios de patrimonio, aparcamiento y transporte",
  tenerife: "reservas y avisos del Teide, carreteras, meteorología por vertiente y aparcamiento",
  "gran-canaria": "microclimas, carreteras de montaña, playas, senderos, aparcamiento y excursiones",
  lanzarote: "viento, carreteras, horarios de centros, acceso a espacios naturales y excursiones",
  fuerteventura: "viento, estado del mar, carreteras, playas, senderos y excursiones entre zonas",
  "el-hierro": "estado del mar, carreteras, senderos, alojamientos, conectividad y meteorología",
};

const getUtilityFocus = (guide: DestinationGuide): string =>
  utilityFocusBySlug[guide.slug] ?? "meteorología, movilidad, horarios, reservas, eventos y fuentes oficiales del destino";

const buildUtilitySections = (
  guide: DestinationGuide,
): GuideSectionWithOptionalNumber[] => [
  {
    id: "herramientas-y-comprobaciones",
    title: "Herramientas para comprobar el viaje",
    category: "practical",
    intro:
      "Antes de reservar y durante el viaje conviene separar lo que sabemos del destino de lo que puede cambiar esta semana o incluso este mismo día.",
    paragraphs: [
      `Para ${guide.title.replace(/^Guía de /, "").replace(/ \|.*$/, "").toLowerCase()}, las comprobaciones que más pueden cambiar el plan son: ${getUtilityFocus(guide)}.`,
      "La regla práctica es sencilla: usa la fuente oficial para normas, accesos y horarios; una fuente meteorológica fiable para las condiciones; la web o app oficial de transporte cuando exista; y mapas para calcular tiempos reales antes de comprometer una ruta.",
      "Para actividades con cupo, hora concreta o acceso condicionado, comprueba disponibilidad y restricciones justo antes de cerrar el resto del día. Un enlace guardado hace semanas no sustituye una comprobación actual.",
    ],
    highlights: [
      {
        title: "Fuente oficial primero",
        description:
          "Documentación, avisos, cierres, reservas, parques, transporte y normas deben contrastarse con quien gestiona el servicio.",
        type: "important",
      },
      {
        title: "Meteorología por zonas",
        description:
          "En destinos grandes o con relieve, no basta con mirar una previsión general de la ciudad o del aeropuerto.",
        type: "tip",
      },
      {
        title: "Comprueba el día real",
        description:
          "La última revisión debe hacerse antes de desplazarte a un parque, puerto, monumento, carretera de montaña o actividad con horario.",
        type: "decision",
      },
      {
        title: "Mapas para medir tiempos",
        description:
          "Usa rutas reales y márgenes razonables; no diseñes jornadas a partir de distancias en línea recta.",
        type: "tip",
      },
    ],
    blocks: [
      {
        type: "source",
        label: "Fuentes de la guía",
        title: "Puntos de referencia que conviene revisar",
        content:
          "La guía parte de fuentes oficiales del destino y añade información práctica orientada a decidir qué merece una comprobación antes de reservar o desplazarse.",
        items: guide.sources?.map((source) => source.label) ?? [],
      },
    ],
    closing:
      "La utilidad de una guía no está en fingir que todo es estable, sino en decirte exactamente qué debes volver a comprobar.",
  },
  {
    id: "plan-b-y-flexibilidad",
    title: "Qué hacer si el plan cambia",
    category: "planning",
    intro:
      "Un viaje sólido no depende de que todo salga exactamente como estaba previsto.",
    paragraphs: [
      "Deja identificada al menos una alternativa para los días más sensibles a meteorología, transporte, reservas o cierres. Así un cambio de condiciones modifica el día, pero no rompe toda la ruta.",
      "Cuando una experiencia sea el motivo principal del desplazamiento, evita colocar después otra actividad crítica con una hora rígida. El margen también es parte del diseño del viaje.",
      "Y cuando el destino admita varias formas de disfrutarlo, prioriza primero lo que solo puede hacerse en unas fechas o con unas condiciones concretas; deja lo intercambiable para los días más flexibles.",
    ],
    highlights: [
      {
        title: "Ten una segunda opción",
        description:
          "Especialmente importante en parques, barcos, montaña, fenómenos naturales y actividades al aire libre.",
        type: "tip",
      },
      {
        title: "No encadenes reservas críticas",
        description:
          "Un retraso pequeño no debería hacerte perder dos experiencias importantes el mismo día.",
        type: "important",
      },
      {
        title: "Guarda las fuentes útiles",
        description:
          "Tener a mano avisos, horarios, mapas y canales oficiales reduce muchísimo el tiempo perdido cuando aparece un imprevisto.",
        type: "decision",
      },
    ],
    closing:
      "La planificación personalizada empieza justo aquí: en decidir qué debe quedar cerrado y qué conviene mantener abierto para poder reaccionar sin perder calidad.",
  },
];

const withUniversalUtility = (guide: DestinationGuide): DestinationGuide =>
  mergeSectionOverrides(guide, buildUtilitySections(guide));

const withEditorialContent = (guide: DestinationGuide): DestinationGuide => {
  const withCostaRica = mergeCostaRicaSections(guide);

  if (withCostaRica.slug === "sudafrica") {
    return mergeSectionOverrides(withCostaRica, southAfricaSectionOverrides);
  }

  if (withCostaRica.slug === "jordania") {
    return mergeSectionOverrides(withCostaRica, jordaniaSectionOverrides);
  }

  if (withCostaRica.slug === "grecia") {
    return mergeSectionOverrides(withCostaRica, greciaSectionOverrides);
  }

  if (withCostaRica.slug === "auroras") {
    return mergeSectionOverrides(withCostaRica, aurorasSectionOverrides);
  }

  if (withCostaRica.slug === "tenerife") {
    return mergeSectionOverrides(withCostaRica, tenerifeSectionOverrides);
  }

  return withCostaRica;
};

const withDestinationDeepDive = (guide: DestinationGuide): DestinationGuide => {
  const overrides = destinationDeepDiveOverrides[guide.slug];
  return overrides ? mergeSectionOverrides(guide, overrides) : guide;
};

const withLiveUpdates = (guide: DestinationGuide): DestinationGuide => {
  const update = liveGuideUpdates[guide.slug];

  const updatedGuide = update
    ? {
        ...guide,
        alerts: [...update.alerts, ...guide.alerts],
      }
    : guide;

  return withKeyPlaces(
    withUniversalUtility(withDestinationDeepDive(withEditorialContent(updatedGuide))),
  );
};

const toPublicGuide = (guide: DestinationGuide): DestinationGuide => ({
  ...guide,
  editorial: undefined,
  publicFreshness: guide.editorial
    ? {
        updatedAt: guide.editorial.updatedAt,
        factsCheckedAt: guide.editorial.factsCheckedAt,
      }
    : undefined,
  sections: renumberSections(
    guide.sections
      .filter((section) => section.status !== "draft")
      .map(({ status, reviewedAt, ...section }) => section),
  ),
});

const getInternalGuideBySlug = (
  slug: string,
): DestinationGuide | undefined => {
  const guide = guides[normalizeSlug(slug)];
  return guide ? withLiveUpdates(guide) : undefined;
};

export const getGuideBySlug = (
  slug: string,
): DestinationGuide | undefined => {
  const guide = getInternalGuideBySlug(slug);
  return guide ? toPublicGuide(guide) : undefined;
};

export const getAllGuides = (): DestinationGuide[] =>
  Object.values(guides).map(withLiveUpdates);

export const getPublishedGuides = (): DestinationGuide[] =>
  getAllGuides().filter((guide) => guide.editorial?.status === "published");

export const getPublicGuides = (): DestinationGuide[] =>
  getAllGuides()
    .filter((guide) => guide.editorial?.status !== "draft")
    .map(toPublicGuide);

export const hasGuide = (slug: string): boolean =>
  Boolean(getInternalGuideBySlug(slug));

export const hasPublishedGuide = (slug: string): boolean =>
  getInternalGuideBySlug(slug)?.editorial?.status === "published";
