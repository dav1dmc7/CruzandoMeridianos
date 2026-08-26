/**
 * ============================================================
 * CRUZANDO MERIDIANOS
 * GUIDE SYSTEM — SHARED TYPES
 * ============================================================
 *
 * Contrato común para TODAS las guías de destino.
 *
 * Este archivo contiene SOLO TypeScript.
 *
 * No contiene:
 * - Astro
 * - HTML
 * - CSS
 * - páginas
 * - componentes
 * - contenido específico de Costa Rica
 *
 * Arquitectura:
 *
 * destinations.ts
 *        ↓
 * guides/<destino>.ts
 *        ↓
 * types.ts
 *        ↓
 * Guide Template
 *        ↓
 * /viajes/<slug>
 *
 * ============================================================
 */


/* ============================================================
   EDITORIAL BLOCKS
   ============================================================ */

   export type GuideBlockType =
   | "text"
   | "highlight"
   | "list"
   | "comparison"
   | "warning"
   | "tip"
   | "important"
   | "quote"
   | "source"
   | "table"
   | "place"
   | "region"
   | "experience";
 
 
 export type GuideHighlightType =
   | "decision"
   | "tip"
   | "warning"
   | "important"
   | "experience";
 
 
 export interface GuideSource {
   label: string;
 
   url: string;
 
   type:
     | "official"
     | "primary"
     | "secondary"
     | "experience";
 
   accessedAt?: string;
 }
 
 
 export interface GuideBlock {
   type: GuideBlockType;
 
   title?: string;
 
   content?: string;
 
   items?: string[];
 
   label?: string;
 
   emphasis?:
     | "normal"
     | "important";
 
   source?: GuideSource;
 }
 
 
 export interface GuideHighlight {
   title: string;
 
   description: string;
 
   type?: GuideHighlightType;
 }
 
 
 /* ============================================================
    GUIDE SECTIONS
    ============================================================ */
 
 export type GuideSectionStatus =
   | "draft"
   | "reviewed"
   | "published";
 
 
 export interface GuideSection {
   id: string;
 
   number: string;
 
   title: string;
 
   intro?: string;
 
   paragraphs?: string[];
 
   highlights?: GuideHighlight[];
 
   blocks?: GuideBlock[];
 
   closing?: string;
 
   status?: GuideSectionStatus;
 
   reviewedAt?: string;
 }
 
 
 /* ============================================================
    TRAVEL ALERTS
    ============================================================ */
 
 export type TravelAlertType =
   | "carretera"
   | "clima"
   | "parque"
   | "transporte"
   | "entrada"
   | "seguridad"
   | "salud"
   | "volcan"
   | "otro";
 
 
 export type TravelAlertSeverity =
   | "critical"
   | "high"
   | "medium"
   | "low";
 
 
 export type TravelAlertSourceType =
   | "official"
   | "primary"
   | "secondary";
 
 
 export interface TravelAlert {
   /**
    * Identificador estable.
    *
    * Permite modificar o desactivar un aviso posteriormente
    * sin depender del título.
    */
   id?: string;
 
   date: string;
 
   type: TravelAlertType;
 
   severity: TravelAlertSeverity;
 
   title: string;
 
   description: string;
 
   source?: string;
 
   sourceLabel?: string;
 
   sourceType?: TravelAlertSourceType;
 
   active: boolean;
 
   expiresAt?: string;
 
   checkedAt?: string;
 
   affectedAreas?: string[];
 
   travelerAction?: string;
 }
 
 
 /* ============================================================
    FAQ
    ============================================================ */
 
 export type FAQCategory =
   | "planning"
   | "transport"
   | "practical"
   | "safety"
   | "general";
 
 
 export interface FAQItem {
   question: string;
 
   answer: string;
 
   category?: FAQCategory;
 
   reviewedAt?: string;
 }
 
 
 /* ============================================================
    ENTRY REQUIREMENTS
    ============================================================ */
 
 export type VisaRequirement =
   | "none"
   | "consular"
   | "restricted"
   | "special";
 
 
 export type TravelerRegion =
   | "europe"
   | "south-america"
   | "central-america"
   | "north-america"
   | "caribbean"
   | "asia"
   | "africa"
   | "oceania"
   | "middle-east"
   | "other";
 
 
 export type VisaGroup =
   | "group-1"
   | "group-2"
   | "group-3"
   | "group-4";
 
 
 /**
  * Requisitos de entrada específicos para una nacionalidad.
  *
  * La estructura está preparada para que podamos tener:
  *
  * - España por defecto
  * - resto de Europa
  * - Sudamérica
  * - Centroamérica
  * - Norteamérica
  * - Caribe
  * - Asia
  * - África
  * - Oceanía
  * - etc.
  *
  * IMPORTANTE:
  * Cada país deberá alimentarse con su propia fuente.
  */
 export interface TravelerRequirement {
   countryCode: string;
 
   countryName: string;
 
   region: TravelerRegion;
 
   visaGroup: VisaGroup;
 
   visaRequirement: VisaRequirement;
 
   maximumStay?: string;
 
   passportRequirement?: string;
 
   returnTicketRequired?: boolean;
 
   proofOfMeansRequired?: boolean;
 
   onwardTravelRequired?: boolean;
 
   entryFee?: string;
 
   yellowFeverRelevant?: boolean;
 
   notes?: string[];
 
   source?: GuideSource;
 
   lastReviewed?: string;
 }
 
 
 /**
  * Modelo completo de requisitos migratorios.
  */
 export interface DestinationEntryRequirements {
   /**
    * País que aparecerá seleccionado inicialmente.
    *
    * Para nuestro proyecto será "ES".
    */
   defaultCountryCode: string;
 
   /**
    * Nombre visible del país predeterminado.
    *
    * Ejemplo:
    * España
    */
   defaultCountryName: string;
 
   /**
    * Todos los países disponibles.
    */
   travelers: TravelerRequirement[];
 
   /**
    * Fuente legal principal del destino.
    */
   legalSource: GuideSource;
 
   /**
    * Fecha de la última revisión.
    */
   lastReviewed: string;
 
   /**
    * Aviso legal/editorial.
    */
   disclaimer: string;
 }
 
 
 /* ============================================================
    DESTINATION SNAPSHOT
    ============================================================ */
 
 export interface DestinationSnapshot {
   climateSummary?: string;
 
   travelStyle?: string;
 
   mainStrengths?: string[];
 
   mainConsiderations?: string[];
 
   idealFor?: string[];
 
   notIdealFor?: string[];
 }
 
 
 /* ============================================================
    EDITORIAL METADATA
    ============================================================ */
 
 export type GuideEditorialStatus =
   | "draft"
   | "in-review"
   | "published";
 
 
 export interface GuideEditorialMeta {
   status: GuideEditorialStatus;
 
   updatedAt?: string;
 
   author?: string;
 
   nextReviewAt?: string;
 
   /**
    * Última comprobación de información especialmente sensible:
    *
    * - migración
    * - salud
    * - seguridad
    * - normativa
    */
   factsCheckedAt?: string;
 }
 
 
 /* ============================================================
    CTA
    ============================================================ */
 
 export interface GuideCTA {
   title: string;
 
   description: string;
 
   buttonLabel: string;
 
   buttonHref: string;
 }
 
 
 /* ============================================================
    COMPLETE DESTINATION GUIDE
    ============================================================ */
 
 export interface DestinationGuide {
   /* ----------------------------------------------------------
      Identity
      ---------------------------------------------------------- */
 
   slug: string;
 
   title: string;
 
   subtitle: string;
 
   intro: string;
 
 
   /* ----------------------------------------------------------
      Editorial
      ---------------------------------------------------------- */
 
   editorial?: GuideEditorialMeta;
 
 
   /* ----------------------------------------------------------
      Snapshot
      ---------------------------------------------------------- */
 
   snapshot?: DestinationSnapshot;
 
 
   /* ----------------------------------------------------------
      Sections
      ---------------------------------------------------------- */
 
   sections: GuideSection[];
 
 
   /* ----------------------------------------------------------
      Alerts
      ---------------------------------------------------------- */
 
   alerts: TravelAlert[];
 
 
   /* ----------------------------------------------------------
      Entry requirements
      ---------------------------------------------------------- */
 
   entryRequirements?: DestinationEntryRequirements;
 
 
   /* ----------------------------------------------------------
      FAQ
      ---------------------------------------------------------- */
 
   faq: FAQItem[];
 
 
   /* ----------------------------------------------------------
      Sources
      ---------------------------------------------------------- */
 
   sources?: GuideSource[];
 
 
   /* ----------------------------------------------------------
      Commercial CTA
      ---------------------------------------------------------- */
 
   cta: GuideCTA;
 }
 
 
 /* ============================================================
    GENERIC UTILITY TYPES
    ============================================================ */
 
 export type CountryCode = string;
 
 
 export type EditorialStatus =
   | "draft"
   | "reviewed"
   | "published";