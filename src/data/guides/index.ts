import type { DestinationGuide } from "./types";
import { costaRicaGuide } from "./costa-rica";
import { additionalGuides } from "./additional";
import { liveGuideUpdates } from "../live/travel-intelligence.generated";

const guides: Readonly<Record<string, DestinationGuide>> = {
  [costaRicaGuide.slug]: costaRicaGuide,
  ...Object.fromEntries(additionalGuides.map((guide) => [guide.slug, guide])),
};

const normalizeSlug = (slug: string): string => slug.trim().toLowerCase();

const withLiveUpdates = (guide: DestinationGuide): DestinationGuide => {
  const update = liveGuideUpdates[guide.slug];

  if (!update) return guide;

  return {
    ...guide,
    alerts: [...update.alerts, ...guide.alerts],
  };
};

export const getGuideBySlug = (slug: string): DestinationGuide | undefined => {
  const guide = guides[normalizeSlug(slug)];
  return guide ? withLiveUpdates(guide) : undefined;
};

export const getAllGuides = (): DestinationGuide[] =>
  Object.values(guides).map(withLiveUpdates);

export const getPublishedGuides = (): DestinationGuide[] =>
  getAllGuides().filter((guide) => guide.editorial?.status === "published");

export const getPublicGuides = (): DestinationGuide[] =>
  getAllGuides().filter((guide) => guide.editorial?.status !== "draft");

export const hasGuide = (slug: string): boolean => Boolean(getGuideBySlug(slug));

export const hasPublishedGuide = (slug: string): boolean =>
  getGuideBySlug(slug)?.editorial?.status === "published";
