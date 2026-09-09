/**
 * ============================================================
 * CRUZANDO MERIDIANOS
 * TRAVEL RESOURCES — REGISTRY
 * ============================================================
 *
 * Registro central de recursos recomendados por
 * Cruzando Meridianos.
 *
 * La interfaz pública puede consumir este archivo sin
 * conocer cómo están organizados los recursos internamente.
 *
 * ============================================================
 *
 * PRINCIPIOS
 *
 * - No convertir la página de recursos en un escaparate
 *   publicitario.
 *
 * - Priorizar recursos que realmente aporten utilidad
 *   al viajero.
 *
 * - Identificar claramente cualquier relación comercial,
 *   afiliación o referido.
 *
 * - No prometer promociones que puedan cambiar.
 *
 * - Revisar periódicamente enlaces y condiciones.
 *
 * ============================================================
 */

import type { TravelResource } from "./types";

const LAST_REVIEWED = "2026-09-09";

const revolutTravelMoney: TravelResource = {
  id: "revolut-travel-money",
  category: "money",
  title: "Revolut",
  shortDescription:
    "Una opción práctica para gestionar dinero y pagos cuando viajas al extranjero.",
  longDescription:
    "Revolut puede resultar útil durante un viaje para gestionar pagos y disponer de una alternativa a la banca tradicional. Las condiciones, funcionalidades, límites, tipos de cambio y promociones pueden variar según el país y el plan contratado, por lo que conviene comprobar siempre las condiciones vigentes directamente con Revolut.",
  url: "https://www.revolut.com/",
  trackingUrl:
    "https://revolut.com/referral/?referral-code=david3txj!SEP1-26-AR-RFAC-CRY&geo-redirect",
  provider: "Revolut",
  status: "active",
  recommended: true,
  referral: true,
  relationship: "referral",
  disclosure:
    "Este enlace es de referido. Cruzando Meridianos puede recibir una recompensa si cumples las condiciones aplicables del programa de referidos de Revolut. Las condiciones pueden cambiar.",
  reviewedAt: LAST_REVIEWED,
  benefit:
    "Puede simplificar la gestión de pagos y dinero durante un viaje.",
  limitation:
    "Las condiciones, comisiones, límites y promociones dependen del producto, país y condiciones vigentes.",
  priority: 10,
  showOnResourcesPage: true,
  showInGuides: true,
};

const blinkEsim: TravelResource = {
  id: "blinkesim",
  category: "connectivity",
  title: "BLINKeSIM",
  shortDescription:
    "eSIM para disponer de conexión móvil mientras viajas sin depender necesariamente de una SIM física.",
  longDescription:
    "Una eSIM puede ser una solución práctica para mantener conexión móvil durante un viaje y evitar determinados procesos asociados a las tarjetas SIM físicas. BLINKeSIM dispone además de un programa de referidos. Las condiciones exactas de sus promociones pueden cambiar, por lo que no las presentamos como una ventaja permanente.",
  url: "https://blinkesim.com/",
  trackingUrl: "https://blinkesim.com/es/my-account?pkey=M5HI4PQ8GE",
  provider: "BLINKeSIM",
  status: "active",
  recommended: true,
  referral: true,
  relationship: "referral",
  disclosure:
    "Este enlace es de referido. La disponibilidad y las condiciones del beneficio dependen del programa vigente de BLINKeSIM. Comprueba las condiciones antes de contratar.",
  reviewedAt: LAST_REVIEWED,
  benefit:
    "Puedes ayudarnos a seguir mejorando Cruzando Meridianos y, según las condiciones vigentes del programa, obtener un beneficio en datos por utilizar nuestro enlace de referido.",
  limitation:
    "La cobertura, precio, duración, compatibilidad y promociones dependen del destino, dispositivo y condiciones vigentes.",
  relevantDestinations: ["costa-rica"],
  priority: 20,
  showOnResourcesPage: true,
  showInGuides: true,
};

const resources: TravelResource[] = [revolutTravelMoney, blinkEsim];

export const getAllTravelResources = (): TravelResource[] =>
  [...resources]
    .filter((resource) => resource.status === "active")
    .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));

export const getPublicTravelResources = (): TravelResource[] =>
  getAllTravelResources().filter(
    (resource) => resource.showOnResourcesPage !== false,
  );

export const getGuideTravelResources = (
  destinationSlug?: string,
): TravelResource[] =>
  getAllTravelResources()
    .filter((resource) => resource.showInGuides !== false)
    .filter((resource) => {
      if (!destinationSlug) return true;
      if (!resource.relevantDestinations || resource.relevantDestinations.length === 0) {
        return true;
      }
      return resource.relevantDestinations.includes(destinationSlug);
    });

export const getTravelResourceById = (
  id: string,
): TravelResource | undefined => resources.find((resource) => resource.id === id);

export const hasTravelResource = (id: string): boolean =>
  Boolean(getTravelResourceById(id));
