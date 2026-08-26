/**
 * ============================================================
 * CRUZANDO MERIDIANOS
 * GUIDE SYSTEM — SHARED TYPES
 * ============================================================
 *
 * Contrato común para todas las guías de destino.
 *
 * Este archivo contiene SOLO TypeScript:
 *
 * - tipos
 * - interfaces
 * - contratos de datos
 *
 * No debe contener:
 *
 * - Astro
 * - HTML
 * - CSS
 * - componentes
 * - páginas
 * - lógica de renderizado
 *
 * Arquitectura:
 *
 *   destinations.ts
 *          ↓
 *   guides/<destino>.ts
 *          ↓
 *   types.ts
 *          ↓
 *   guides/index.ts
 *          ↓
 *   pages / components
 *
 * PRINCIPIO:
 *
 * Una guía de destino es una combinación de:
 *
 *   conocimiento editorial
 *   + información práctica
 *   + fuentes
 *   + actualidad
 *   + requisitos
 *   + preguntas reales
 *   + experiencia
 *
 * pero NO es un itinerario personalizado.
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


 export type GuideBlockEmphasis =
   | "normal"
   | "important";


 /* ============================================================
    SOURCES
    ============================================================ */

 export type GuideSourceType =
   | "official"
   | "primary"
   | "secondary"
   | "experience";


 /**
  * Fuente utilizada para respaldar una afirmación.
  *
  * Regla editorial:
  *
  * - información migratoria → preferentemente official
  * - información sanitaria → preferentemente official
  * - seguridad → official / primary
  * - información práctica → primary / secondary
  * - experiencia propia → experience
  */
 export interface GuideSource {
   label: string;

   url: string;

   type: GuideSourceType;

   accessedAt?: string;
 }


 /* ============================================================
    BLOCK
    ============================================================ */

 export interface GuideBlock {
   type: GuideBlockType;

   title?: string;

   content?: string;

   items?: string[];

   label?: string;

   emphasis?: GuideBlockEmphasis;

   source?: GuideSource;
 }


 /* ============================================================
    HIGHLIGHT
    ============================================================ */

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


 export type GuideSectionCategory =
   | "overview"
   | "planning"
   | "experience"
   | "practical"
   | "updates";


 /**
  * Entrada editorial de una sección.
  *
  * NO incluye "number".
  *
  * El número se añade automáticamente por la capa de datos
  * para impedir errores humanos de numeración.
  */
 export type GuideSectionInput = Omit<
   GuideSection,
   "number"
 >;


 export interface GuideSection {
   /**
    * Identificador estable utilizado para anchors y enlaces.
    *
    * Ejemplo:
    *
    * /viajes/costa-rica#cuando-viajar
    */
   id: string;

   /**
    * Número editorial generado automáticamente.
    *
    * Nunca debería escribirse manualmente en una guía.
    */
   number: string;

   title: string;

   intro?: string;

   category?: GuideSectionCategory;

   paragraphs?: string[];

   highlights?: GuideHighlight[];

   blocks?: GuideBlock[];

   closing?: string;

   status?: GuideSectionStatus;

   reviewedAt?: string;
 }


 /* ============================================================
    DURATION OPTIONS
    ============================================================ */

 export interface GuideDurationOption {
   days: number;

   title: string;

   description: string;

   featured?: boolean;
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


 /**
  * Aviso temporal que puede afectar a viajeros.
  *
  * Debe poder:
  *
  * - activarse
  * - desactivarse
  * - caducar
  * - revisarse
  * - asociarse a una zona
  * - explicar la acción recomendada
  */
 export interface TravelAlert {
   /**
    * Identificador estable.
    *
    * Permite que futuras automatizaciones actualicen un aviso
    * sin depender del título.
    */
   id?: string;

   /**
    * Fecha del evento o de publicación del aviso.
    */
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
    MONITORING
    ============================================================ */

 /**
  * Configuración para futuras automatizaciones de monitorización.
  *
  * IMPORTANTE:
  *
  * Este tipo NO ejecuta ninguna monitorización por sí mismo.
  *
  * Sirve como contrato para:
  *
  * - Workers
  * - Cron
  * - APIs
  * - scrapers permitidos
  * - fuentes oficiales
  * - sistemas de alertas
  *
  * que alimentarán posteriormente "alerts".
  */
 export type GuideMonitoringCadence =
   | "hourly"
   | "daily"
   | "weekly"
   | "manual";


 export interface GuideMonitoringConfig {
   enabled: boolean;

   cadence: GuideMonitoringCadence;

   sources: GuideSource[];

   monitoredAlertTypes: TravelAlertType[];

   lastCheckedAt?: string;
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

   source?: GuideSource;
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
   | "other";


 /**
  * Información migratoria por nacionalidad.
  *
  * Nunca asumir que dos países tienen los mismos requisitos
  * simplemente por pertenecer a una misma región.
  */
 export interface TravelerRequirement {
   countryCode: string;

   countryName: string;

   region?: TravelerRegion;

   visaRequirement: VisaRequirement;

   maximumStay?: string;

   passportRequirement?: string;

   returnTicketRequired?: boolean;

   entryFee?: string;

   onwardTravelRequired?: boolean;

   proofOfMeansRequired?: boolean;

   yellowFeverRelevant?: boolean;

   notes?: string[];

   source?: GuideSource;

   lastReviewed?: string;
 }


 /**
  * Requisitos de entrada del destino.
  */
 export interface DestinationEntryRequirements {
   /**
    * Nacionalidad mostrada inicialmente.
    *
    * En Cruzando Meridianos:
    *
    * ES = España
    */
   defaultCountryCode: string;

   defaultCountryName?: string;

   travelers: TravelerRequirement[];

   /**
    * Regiones que queremos incorporar progresivamente.
    *
    * No significa que todos sus países estén ya cargados.
    */
   targetRegions?: TravelerRegion[];

   lastReviewed: string;

   legalSource: GuideSource;

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
 }


 /* ============================================================
    DESTINATION FIT
    ============================================================ */

 /**
  * Capa editorial de "¿Este destino encaja contigo?".
  *
  * Esto es deliberadamente general:
  *
  * demuestra criterio,
  * pero no construye el itinerario individual.
  */
 export interface DestinationFitProfile {
   title: string;

   intro: string;

   goodFor: string[];

   notFor: string[];
 }


 /* ============================================================
    EDITORIAL META
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
    * Última revisión de datos especialmente sensibles.
    *
    * Ejemplo:
    *
    * migración
    * salud
    * seguridad
    * requisitos de entrada
    */
   factsCheckedAt?: string;
 }


 /* ============================================================
    COMMERCIAL POSITIONING
    ============================================================ */

 /**
  * Ayuda a mantener la frontera entre:
  *
  * conocimiento público
  * versus
  * trabajo personalizado de pago.
  *
  * No se renderiza directamente.
  *
  * Sirve como contrato editorial interno.
  */
 export interface GuideCommercialPositioning {
   publicPromise: string;

   premiumPromise: string;

   publicDoesNotInclude: string[];

   premiumIncludes: string[];
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
    COMPLETE GUIDE
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
      Destination fit
      ---------------------------------------------------------- */

   fit?: DestinationFitProfile;


   /* ----------------------------------------------------------
      Sections
      ---------------------------------------------------------- */

   sections: GuideSection[];


   /* ----------------------------------------------------------
      Duration
      ---------------------------------------------------------- */

   durationOptions?: GuideDurationOption[];


   /* ----------------------------------------------------------
      Alerts
      ---------------------------------------------------------- */

   alerts: TravelAlert[];


   /* ----------------------------------------------------------
      Monitoring
      ---------------------------------------------------------- */

   monitoring?: GuideMonitoringConfig;


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
      Related real trip
      ---------------------------------------------------------- */

   relatedTripSlug?: string;


   /* ----------------------------------------------------------
      Commercial positioning
      ---------------------------------------------------------- */

   commercial?: GuideCommercialPositioning;


   /* ----------------------------------------------------------
      CTA
      ---------------------------------------------------------- */

   cta: GuideCTA;
 }


 /* ============================================================
    UTILITY TYPES
    ============================================================ */

 export type CountryCode = string;


 export type EditorialStatus =
   | "draft"
   | "reviewed"
   | "published";