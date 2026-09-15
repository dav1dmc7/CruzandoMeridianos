import type { DestinationGuide } from "./types";
import { costaRicaGuide } from "./costa-rica";
import { additionalGuides } from "./additional";

const guides: Readonly<Record<string, DestinationGuide>> = {
  [costaRicaGuide.slug]: costaRicaGuide,
  ...Object.fromEntries(additionalGuides.map((guide) => [guide.slug, guide])),
};

const normalizeSlug = (slug: string): string => slug.trim().toLowerCase();

export const getGuideBySlug = (slug: string): DestinationGuide | undefined =>
  guides[normalizeSlug(slug)];

export const getAllGuides = (): DestinationGuide[] => Object.values(guides);

export const getPublishedGuides = (): DestinationGuide[] =>
  getAllGuides().filter((guide) => guide.editorial?.status === "published");

export const getPublicGuides = (): DestinationGuide[] =>
  getAllGuides().filter((guide) => guide.editorial?.status !== "draft");

export const hasGuide = (slug: string): boolean => Boolean(getGuideBySlug(slug));

export const hasPublishedGuide = (slug: string): boolean =>
  getGuideBySlug(slug)?.editorial?.status === "published";
