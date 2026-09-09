/**
 * ============================================================
 * CRUZANDO MERIDIANOS
 * TRAVEL RESOURCES — REGISTRY
 * ============================================================
 *
 * Registro central de recursos recomendados por
 * Cruzando Meridianos.
 *
 * ============================================================
 *
 * PRINCIPIOS
 *
 * - No convertir la página de recursos en un escaparate publicitario.
 * - Priorizar recursos que realmente aporten utilidad al viajero.
 * - Identificar claramente cualquier relación comercial, afiliación o referido.
 * - No esconder un beneficio por ser un enlace comercial.
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
    "Este enlace es de referido. Cruzando Meridianos puede recibir una recompensa si se cumplen las condiciones aplicables del programa de Revolut. Las promociones y condiciones pueden cambiar.",
  reviewedAt: LAST_REVIEWED,
  benefit:
    "Puede simplificar la gestión de pagos y dinero durante un viaje. Al utilizar nuestro enlace, además, puedes acceder a la promoción que Revolut tenga asociada en ese momento, si cumples sus condiciones.",
  limitation:
    "Las condiciones, comisiones, límites y promociones dependen del producto, país y condiciones vigentes. Comprueba siempre la oferta mostrada por Revolut al abrir el enlace.",
  priority: 10,
  showOnResourcesPage: true,
  showInGuides: true,
};

const blinkEsim: TravelResource = {
  id: "blinkesim",
  category: "connectivity",
  title: "BLINKeSIM",
  shortDescription:
    "Una eSIM para tener conexión móvil durante el viaje sin depender de una tarjeta SIM física.",
  longDescription:
    "BLINKeSIM ofrece conectividad mediante eSIM. En la promoción de referidos que nos ha comunicado BLINKeSIM, quien se registre con nuestro enlace obtiene 1 día de internet gratis y Cruzando Meridianos puede recibir 1 día adicional cuando se cumplen las condiciones del programa.",
  url: "https://blinkesim.com/",
  trackingUrl: "https://blinkesim.com/es/my-account?pkey=M5HI4PQ8GE",
  provider: "BLINKeSIM",
  status: "active",
  recommended: true,
  referral: true,
  relationship: "referral",
  disclosure:
    "Este es un enlace de referido. Según la promoción que nos ha comunicado BLINKeSIM, quien se registre con nuestro enlace obtiene 1 día de internet gratis y Cruzando Meridianos puede recibir 1 día adicional cuando se cumplen las condiciones del programa. Las condiciones de la promoción pueden cambiar.",
  reviewedAt: LAST_REVIEWED,
  benefit:
    "Al registrarte con nuestro enlace, puedes conseguir 1 día de internet gratis según la promoción de referidos indicada por BLINKeSIM.",
  limitation:
    "La cobertura, precio, duración, compatibilidad y condiciones de la promoción dependen del destino, dispositivo y programa vigente de BLINKeSIM.",
  relevantDestinations: ["costa-rica"],
  priority: 20,
  showOnResourcesPage: true,
  showInGuides: true,
};

const tripCom: TravelResource = {
  id: "trip-com",
  category: "bookings",
  title: "Trip.com",
  shortDescription:
    "Una plataforma para comparar y reservar alojamientos, vuelos y otros servicios de viaje.",
  longDescription:
    "Trip.com puede servir como punto de comparación y reserva para distintas partes de un viaje. Este es un enlace de referido de Cruzando Meridianos.",
  url: "https://es.trip.com/",
  trackingUrl:
    "https://es.trip.com/sale/4283/referee.html?locale=es-ES&referCode=B836SR",
  provider: "Trip.com",
  status: "active",
  recommended: true,
  referral: true,
  relationship: "referral",
  disclosure:
    "Este es un enlace de referido. Cruzando Meridianos puede recibir una compensación si se cumplen las condiciones del programa de Trip.com. Consulta las condiciones vigentes antes de reservar.",
  reviewedAt: LAST_REVIEWED,
  benefit:
    "Puedes usar Trip.com para comparar y reservar parte del viaje desde un mismo sitio. Al registrarte o reservar mediante nuestro enlace, además, puedes ayudarnos a sostener el proyecto.",
  limitation:
    "Las promociones, requisitos, disponibilidad, precios y condiciones del programa pueden cambiar y dependen de Trip.com.",
  priority: 30,
  showOnResourcesPage: true,
  showInGuides: true,
};

const resources: TravelResource[] = [
  revolutTravelMoney,
  blinkEsim,
  tripCom,
];

export const getAllTravelResources = (): TravelResource[] =>
  [...resources]
    .filter((resource) => resource.status === "active")
    .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));

export const getPublicTravelResources = (): TravelResource[] =>
  getAllTravelResources().filter(
    (resource) => resource.showOnResourcesPage !== false
  );

export const getGuideTravelResources = (
  destinationSlug?: string
): TravelResource[] =>
  getAllTravelResources()
    .filter((resource) => resource.showInGuides !== false)
    .filter((resource) => {
      if (!destinationSlug) return true;
      if (
        !resource.relevantDestinations ||
        resource.relevantDestinations.length === 0
      ) {
        return true;
      }
      return resource.relevantDestinations.includes(destinationSlug);
    });

export const getTravelResourceById = (
  id: string
): TravelResource | undefined =>
  resources.find((resource) => resource.id === id);

export const hasTravelResource = (id: string): boolean =>
  Boolean(getTravelResourceById(id));
