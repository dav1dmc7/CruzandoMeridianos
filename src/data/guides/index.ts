import type { DestinationGuide, GuideSection } from "./types";
import { costaRicaGuide } from "./costa-rica";
import { costaRicaSectionOverrides } from "./costa-rica-editorial";
import { additionalGuides } from "./additional";
import { southAfricaSectionOverrides } from "./sudafrica-editorial";
import { jordaniaSectionOverrides } from "./jordania-editorial";
import { liveGuideUpdates } from "../live/travel-intelligence.generated";

const guides: Readonly<Record<string, DestinationGuide>> = {
  [costaRicaGuide.slug]: costaRicaGuide,
  ...Object.fromEntries(additionalGuides.map((guide) => [guide.slug, guide])),
};

const normalizeSlug = (slug: string): string => slug.trim().toLowerCase();

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

const withEditorialContent = (guide: DestinationGuide): DestinationGuide => {
  const withCostaRica = mergeCostaRicaSections(guide);

  if (withCostaRica.slug === "sudafrica") {
    return mergeSectionOverrides(withCostaRica, southAfricaSectionOverrides);
  }

  if (withCostaRica.slug === "jordania") {
    return mergeSectionOverrides(withCostaRica, jordaniaSectionOverrides);
  }

  return withCostaRica;
};

const withLiveUpdates = (guide: DestinationGuide): DestinationGuide => {
  const update = liveGuideUpdates[guide.slug];

  const updatedGuide = update
    ? {
        ...guide,
        alerts: [...update.alerts, ...guide.alerts],
      }
    : guide;

  return withEditorialContent(updatedGuide);
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
