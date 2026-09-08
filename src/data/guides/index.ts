/**
 * ============================================================
 * CRUZANDO MERIDIANOS
 * GUIDE REGISTRY
 * ============================================================
 *
 * Registro central de guías.
 *
 * La capa de presentación no necesita conocer cómo se
 * almacenan los destinos.
 *
 * Para añadir una nueva guía:
 *
 *   1. Crear guides/nuevo-destino.ts
 *   2. Importarla aquí.
 *   3. Registrarla.
 *
 * El resto de la arquitectura permanece intacto.
 * ============================================================
 */

import type {
    DestinationGuide,
  } from "./types";

  import {
    costaRicaGuide,
  } from "./costa-rica";


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
     GET BY SLUG
     ============================================================ */

  /**
   * Obtiene una guía por slug.
   *
   * Normaliza espacios y mayúsculas para evitar fallos
   * innecesarios en consultas internas.
   */
  export const getGuideBySlug = (
    slug: string
  ): DestinationGuide | undefined =>
    guides[
      normalizeSlug(slug)
    ];


  /* ============================================================
     GET ALL
     ============================================================ */

  /**
   * Devuelve todas las guías registradas.
   *
   * Útil para:
   *
   * - listado de destinos
   * - sitemap
   * - búsqueda
   * - generación de índices
   * - auditorías internas
   */
  export const getAllGuides =
    (): DestinationGuide[] =>
      Object.values(
        guides
      );


  /* ============================================================
     GET PUBLISHED
     ============================================================ */

  /**
   * Devuelve solamente las guías publicadas.
   *
   * "in-review" puede seguir siendo accesible internamente,
   * pero no se considera una guía editorialmente publicada.
   */
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

  /**
   * Devuelve guías que no estén en estado "draft".
   *
   * Útil para una futura estrategia donde una guía pueda estar
   * en revisión editorial pero ya ser accesible al público.
   */
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

  /**
   * Comprueba si existe una guía registrada.
   */
  export const hasGuide = (
    slug: string
  ): boolean =>
    Boolean(
      getGuideBySlug(slug)
    );


  /* ============================================================
     HAS PUBLISHED GUIDE
     ============================================================ */

  /**
   * Comprueba si existe una guía editorialmente publicada.
   */
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