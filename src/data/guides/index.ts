/**
 * ============================================================
 * CRUZANDO MERIDIANOS
 * GUIDE REGISTRY
 * ============================================================
 *
 * Registro central de guías + capa de inteligencia de viaje.
 *
 * El contenido editorial estable vive en guides/<destino>.ts.
 * Los avisos temporales generados por la monitorización diaria
 * se inyectan desde ../live/travel-intelligence.generated.ts.
 * ============================================================
 */

import type {
  DestinationGuide,
} from "./types";

import {
  costaRicaGuide,
} from "./costa-rica";

import {
  liveGuideUpdates,
} from "../live/travel-intelligence.generated";


/* ============================================================
   REGISTRY
   ============================================================ */

const guides: Readonly<
  Record<string, DestinationGuide>
> = {
  [costaRicaGuide.slug]:
    costaRicaGuide,
};


/* ============================================================
   NORMALIZATION
   ============================================================ */

const normalizeSlug = (
  slug: string
): string =>
  slug
    .trim()
    .toLowerCase();


/* ============================================================
   LIVE INTELLIGENCE
   ============================================================ */

const withLiveUpdates = (
  guide: DestinationGuide
): DestinationGuide => {
  const update =
    liveGuideUpdates[guide.slug];

  if (!update) {
    return guide;
  }

  return {
    ...guide,

    alerts: [
      ...update.alerts,
      ...guide.alerts,
    ],
  };
};


/* ============================================================
   GET BY SLUG
   ============================================================

/**
 * Obtiene una guía por slug.
 *
 * Incluye automáticamente los avisos temporales generados
 * por la monitorización diaria cuando existen.
 */
export const getGuideBySlug = (
  slug: string
): DestinationGuide | undefined => {
  const guide =
    guides[
      normalizeSlug(slug)
    ];

  return guide
    ? withLiveUpdates(guide)
    : undefined;
};


/* ============================================================
   GET ALL
   ============================================================ */

export const getAllGuides =
  (): DestinationGuide[] =>
    Object.values(
      guides
    ).map(withLiveUpdates);


/* ============================================================
   GET PUBLISHED
   ============================================================ */

export const getPublishedGuides =
  (): DestinationGuide[] =>
    getAllGuides().filter(
      (guide) =>
        guide.editorial?.status ===
        "published"
    );


/* ============================================================
   GET PUBLIC / NON-DRAFT
   ============================================================ */

export const getPublicGuides =
  (): DestinationGuide[] =>
    getAllGuides().filter(
      (guide) =>
        guide.editorial?.status !==
        "draft"
    );


/* ============================================================
   HAS GUIDE
   ============================================================ */

export const hasGuide = (
  slug: string
): boolean =>
  Boolean(
    getGuideBySlug(slug)
  );


/* ============================================================
   HAS PUBLISHED GUIDE
   ============================================================ */

export const hasPublishedGuide = (
  slug: string
): boolean => {
  const guide =
    getGuideBySlug(slug);

  return (
    guide?.editorial?.status ===
    "published"
  );
};
