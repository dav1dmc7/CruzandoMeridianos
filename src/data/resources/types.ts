/**
 * ============================================================
 * CRUZANDO MERIDIANOS
 * TRAVEL RESOURCES — SHARED TYPES
 * ============================================================
 *
 * Contrato común para todos los recursos que Cruzando Meridianos
 * pueda recomendar o utilizar.
 *
 * Este archivo contiene SOLO TypeScript.
 *
 * No debe contener:
 * - Astro
 * - HTML
 * - CSS
 * - componentes
 * - páginas
 * - lógica de renderizado
 *
 * ============================================================
 *
 * PRINCIPIOS
 *
 * 1. Un recurso puede ser una recomendación editorial,
 *    un enlace de afiliación o simplemente una herramienta
 *    que utilizamos.
 *
 * 2. Nunca debemos presentar una promoción como permanente
 *    cuando depende de una campaña externa.
 *
 * 3. Los enlaces comerciales deben poder identificarse
 *    explícitamente.
 *
 * 4. El sistema debe permitir añadir nuevas categorías
 *    sin modificar los componentes principales.
 *
 * 5. La información sensible al cambio debe tener fecha
 *    de revisión.
 *
 * ============================================================
 */


/* ============================================================
   CATEGORIES
   ============================================================ */

   export type ResourceCategory =
   | "money"
   | "connectivity"
   | "insurance"
   | "maps"
   | "bookings"
   | "gear"
   | "planning"
   | "communication"
   | "other";
 
 
 /* ============================================================
    STATUS
    ============================================================ */
 
 export type ResourceStatus =
   | "active"
   | "paused"
   | "retired";
 
 
 /* ============================================================
    SOURCE / RELATIONSHIP
    ============================================================ */
 
 export type ResourceRelationship =
   | "editorial"
   | "referral"
   | "affiliate"
   | "sponsor";
 
 
 /* ============================================================
    COMPLETE RESOURCE
    ============================================================ */
 
 export interface TravelResource {
   /**
    * Identificador estable interno.
    *
    * Ejemplo:
    *
    *   revolut-travel-money
    *   blinkesim
    */
   id: string;
 
 
   /**
    * Categoría editorial.
    */
   category: ResourceCategory;
 
 
   /**
    * Nombre visible del recurso.
    */
   title: string;
 
 
   /**
    * Descripción corta utilizada en tarjetas.
    */
   shortDescription: string;
 
 
   /**
    * Descripción ampliada opcional.
    */
   longDescription?: string;
 
 
   /**
    * URL principal del proveedor.
    */
   url: string;
 
 
   /**
    * URL de afiliación / referido.
    *
    * Si existe, el componente podrá utilizarla como destino
    * del enlace comercial.
    */
   trackingUrl?: string;
 
 
   /**
    * Nombre del proveedor.
    */
   provider: string;
 
 
   /**
    * Estado editorial.
    */
   status: ResourceStatus;
 
 
   /**
    * Indica si actualmente lo consideramos una recomendación.
    */
   recommended?: boolean;
 
 
   /**
    * Existe relación económica o de referido.
    */
   referral?: boolean;
 
 
   /**
    * Tipo concreto de relación comercial.
    */
   relationship?: ResourceRelationship;
 
 
   /**
    * Texto obligatorio cuando haya relación comercial.
    */
   disclosure?: string;
 
 
   /**
    * Fecha de última revisión editorial.
    *
    * Formato ISO:
    *
    *   YYYY-MM-DD
    */
   reviewedAt: string;
 
 
   /**
    * Nota editorial interna o pública opcional.
    */
   note?: string;
 
 
   /**
    * Ventaja principal resumida.
    *
    * Puede utilizarse para destacar el recurso.
    */
   benefit?: string;
 
 
   /**
    * Limitación o advertencia.
    *
    * Muy útil para evitar recomendaciones excesivamente
    * promocionales.
    */
   limitation?: string;
 
 
   /**
    * Destinos donde tiene especial sentido.
    *
    * Ejemplo:
    *
    *   ["costa-rica", "japon", "tailandia"]
    */
   relevantDestinations?: string[];
 
 
   /**
    * Orden editorial.
    *
    * Menor número = mayor prioridad.
    */
   priority?: number;
 
 
   /**
    * Indica si queremos mostrar el recurso en la página global
    * de recursos.
    */
   showOnResourcesPage?: boolean;
 
 
   /**
    * Indica si queremos mostrarlo dentro de las guías.
    */
   showInGuides?: boolean;
 }
 
 
 /* ============================================================
    UTILITY TYPES
    ============================================================ */
 
 /**
  * Recursos que se pueden mostrar públicamente.
  */
 export type PublicTravelResource =
   Omit<
     TravelResource,
     "note"
   >;
 
 
 /**
  * Recurso comercial.
  *
  * Útil para filtros y auditorías internas.
  */
 export type CommercialTravelResource =
   TravelResource & {
     referral: true;
   };