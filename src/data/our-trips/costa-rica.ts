/**
 * COSTA RICA — TRIP DATA
 *
 * Fuente principal:
 * - Experiencia real de David & Itciar
 * - Google Maps
 * - Tricount
 * - Revolut
 * - Datos de viaje registrados
 *
 * IMPORTANTE:
 * No se deben inventar datos.
 *
 * Cuando un dato no esté confirmado:
 * - status = "unverified"
 * - confidence = "low"
 *
 * Cuando un lugar estaba en los planes pero finalmente no se visitó:
 * - status = "planned_but_not_visited"
 */

export type EvidenceSource =
  | "experience"
  | "google_maps"
  | "tricount"
  | "revolut"
  | "pinguin"
  | "photo"
  | "unknown";

export type Confidence = "high" | "medium" | "low";

export type PlaceStatus =
  | "visited"
  | "planned_but_not_visited"
  | "unverified";

export type PlaceCategory =
  | "beach"
  | "national_park"
  | "nature_reserve"
  | "waterfall"
  | "viewpoint"
  | "town"
  | "city"
  | "restaurant"
  | "hotel"
  | "gym"
  | "wildlife"
  | "transport"
  | "lake"
  | "island"
  | "historical"
  | "activity"
  | "other";

export interface TripPlace {
  id: string;
  name: string;

  location?: string;
  category: PlaceCategory;

  status: PlaceStatus;

  rating?: number;
  reviewCount?: number;

  note?: string;

  /**
   * Por qué aparece este lugar en nuestra base de conocimiento.
   */
  relevance?: string;

  /**
   * Qué fuente nos permite afirmar el estado.
   */
  evidence: EvidenceSource[];

  confidence: Confidence;

  /**
   * Útil para futuras versiones de la web:
   * - attraction
   * - food
   * - accommodation
   * - transport
   * - decision
   */
  tags?: string[];

  googleMapsUrl?: string;

  /**
   * Si algún día queremos contar por qué NO fuimos.
   */
  reasonNotVisited?: string;
}

export interface TripDay {
  day: number;

  date?: string;

  title: string;

  location?: string;

  summary: string;

  content?: string[];

  highlights?: string[];

  decisions?: string[];

  wouldChange?: string[];

  places?: string[];

  accommodation?: string;

  transport?: string;

  notes?: string[];
}

export interface TripAccommodation {
  location: string;
  name: string;
  nights: number;

  amount?: number;
  currency?: string;

  paidBy?: "David" | "Itciar" | "unknown";

  notes?: string;

  evidence?: EvidenceSource[];
}

export interface TripBudgetItem {
  category:
    | "flights"
    | "car"
    | "fuel"
    | "accommodation"
    | "food"
    | "activities"
    | "transport"
    | "insurance"
    | "shopping"
    | "cash"
    | "other";

  amount: number;

  currency: string;

  description: string;

  paidBy?: "David" | "Itciar" | "shared" | "unknown";

  source?: EvidenceSource;

  notes?: string;
}

export interface TripMetrics {
  durationDays: number;

  startDate: string;
  endDate: string;

  countries: number;

  photos?: number;

  placesRecorded?: number;

  carKm?: number;

  flightKm?: number;

  boatNm?: number;
}

export interface PlannedButNotVisited {
  placeId: string;

  title: string;

  description: string;

  reason: string;

  /**
   * Puede ser:
   * - weather
   * - time
   * - route
   * - fatigue
   * - logistics
   * - cost
   * - priority
   * - unexpected
   * - unknown
   */
  reasonType:
    | "weather"
    | "time"
    | "route"
    | "fatigue"
    | "logistics"
    | "cost"
    | "priority"
    | "unexpected"
    | "unknown";

  lesson?: string;
}

export interface OurTrip {
  slug: string;

  title: string;

  subtitle: string;

  duration: string;

  destination: string;

  introduction: string;

  metrics: TripMetrics;

  whyDestination: string[];

  whatWeWanted: string[];

  howWeDesignedTheRoute: string[];

  days: TripDay[];

  places: TripPlace[];

  plannedButNotVisited: PlannedButNotVisited[];

  importantDecisions: {
    title: string;
    content: string;
  }[];

  accommodations: TripAccommodation[];

  budget: TripBudgetItem[];

  whatWeWouldRepeat: string[];

  whatWeWouldChange: string[];

  whatWeWouldDoToday: string[];

  gallery?: {
    src: string;
    alt: string;
    caption?: string;
  }[];

  relatedGuide: {
    title: string;
    description: string;
    href: string;
  };

  cta: {
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
  };
}

/**
 * ============================================================
 * PLACES
 * ============================================================
 *
 * Los lugares que aparecen aquí proceden de la lista compartida
 * de Google Maps.
 *
 * No todos tienen todavía el estado confirmado.
 *
 * Esto es deliberado.
 */

const places: TripPlace[] = [

  // ==========================================================
  // COSTA PACÍFICA
  // ==========================================================

  {
    id: "playa-ventanas",
    name: "Playa Ventanas",
    category: "beach",
    status: "unverified",
    rating: 4.6,
    reviewCount: 1695,
    evidence: ["google_maps"],
    confidence: "medium",
    tags: ["pacifico", "playa"],
  },

  {
    id: "playa-hermosa",
    name: "Playa Hermosa",
    category: "beach",
    status: "unverified",
    rating: 4.6,
    reviewCount: 532,
    evidence: ["google_maps"],
    confidence: "medium",
    tags: ["pacifico", "playa"],
  },

  {
    id: "dominicalito-beach",
    name: "Dominicalito Beach",
    category: "beach",
    status: "unverified",
    rating: 4.5,
    reviewCount: 399,
    evidence: ["google_maps"],
    confidence: "medium",
    tags: ["dominical", "playa"],
  },

  {
    id: "poza-azul-waterfall",
    name: "Poza Azul Waterfall",
    category: "waterfall",
    status: "unverified",
    rating: 4.5,
    reviewCount: 229,
    evidence: ["google_maps"],
    confidence: "medium",
    tags: ["agua", "naturaleza"],
  },

  {
    id: "playa-matapalo",
    name: "Playa Matapalo",
    category: "beach",
    status: "unverified",
    rating: 4.7,
    reviewCount: 14,
    evidence: ["google_maps"],
    confidence: "medium",
    tags: ["pacifico", "playa"],
  },

  {
    id: "mirador-playa-hermosa",
    name: "Mirador Playa Hermosa Lookout",
    category: "viewpoint",
    status: "unverified",
    rating: 4.5,
    reviewCount: 25,
    evidence: ["google_maps"],
    confidence: "medium",
    tags: ["mirador"],
  },

  {
    id: "puerto-vargas",
    name: "Puerto Vargas",
    category: "beach",
    status: "unverified",
    rating: 4.6,
    reviewCount: 85,
    evidence: ["google_maps"],
    confidence: "medium",
    tags: ["cahuita"],
  },

  {
    id: "playa-blanca",
    name: "Playa Blanca",
    category: "beach",
    status: "unverified",
    rating: 4.5,
    reviewCount: 288,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "playa-mantas",
    name: "Playa Mantas",
    category: "beach",
    status: "unverified",
    rating: 4.4,
    reviewCount: 793,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "playa-dominical",
    name: "Playa Dominical",
    category: "beach",
    status: "unverified",
    rating: 4.5,
    reviewCount: 91,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "playa-punta-uva",
    name: "Playa Punta Uva",
    category: "beach",
    status: "unverified",
    rating: 4.8,
    reviewCount: 561,
    evidence: ["google_maps"],
    confidence: "medium",
    tags: ["caribe", "puerto-viejo"],
    note:
      "Nota de planificación: aparcar cerca de hoteles porque existe riesgo de robo.",
  },

  {
    id: "playa-espadilla-sur",
    name: "Playa Espadilla Sur",
    category: "beach",
    status: "unverified",
    rating: 4.8,
    reviewCount: 183,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "playa-biesanz",
    name: "Playa Biesanz",
    category: "beach",
    status: "unverified",
    rating: 4.4,
    reviewCount: 1000,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "playa-herradura",
    name: "Playa Herradura",
    category: "beach",
    status: "unverified",
    rating: 4.4,
    reviewCount: 136,
    evidence: ["google_maps"],
    confidence: "medium",
    note: "Nota de planificación: evitar fines de semana por la afluencia.",
  },

  // ==========================================================
  // MANUEL ANTONIO / UVITA / CORCOVADO
  // ==========================================================

  {
    id: "parque-nacional-manuel-antonio",
    name: "Parque Nacional Manuel Antonio",
    category: "national_park",
    status: "visited",
    rating: 4.5,
    reviewCount: 24819,
    evidence: ["google_maps", "tricount"],
    confidence: "high",
    tags: ["manuel-antonio", "parque-nacional"],
  },

  {
    id: "cataratas-nauyaca",
    name: "Cataratas Nauyaca",
    category: "waterfall",
    status: "unverified",
    rating: 4.7,
    reviewCount: 3731,
    evidence: ["google_maps"],
    confidence: "medium",
    tags: ["dominical", "cascada"],
  },

  {
    id: "uvita",
    name: "Uvita",
    category: "town",
    status: "visited",
    evidence: ["google_maps", "tricount"],
    confidence: "high",
    tags: ["pacifico", "uvita"],
  },

  {
    id: "parque-nacional-corcovado",
    name: "Parque Nacional Corcovado",
    category: "national_park",
    status: "visited",
    rating: 4.6,
    reviewCount: 1270,
    evidence: ["google_maps", "tricount"],
    confidence: "high",
    tags: ["corcovado", "naturaleza"],
  },

  {
    id: "isla-del-cano",
    name: "Isla del Caño",
    category: "island",
    status: "unverified",
    rating: 4.7,
    reviewCount: 110,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "playa-matapalo-corco",
    name: "Playa Matapalo",
    category: "beach",
    status: "unverified",
    evidence: ["google_maps"],
    confidence: "low",
  },

  // ==========================================================
  // MONTEVERDE
  // ==========================================================

  {
    id: "reserva-curi-cancha",
    name: "Reserva Curi Cancha",
    category: "nature_reserve",
    status: "visited",
    rating: 4.6,
    reviewCount: 1915,
    evidence: ["google_maps", "tricount"],
    confidence: "high",
    tags: ["monteverde", "naturaleza"],
  },

  {
    id: "reserva-biologica-monteverde",
    name: "Reserva Biológica Bosque Nuboso Monteverde",
    category: "nature_reserve",
    status: "unverified",
    rating: 4.5,
    reviewCount: 5950,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "ficus-la-raiz",
    name: "Ficus La Raiz",
    category: "viewpoint",
    status: "unverified",
    rating: 4.4,
    reviewCount: 471,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "cafe-colibri-monteverde",
    name: "Cafe Colibri Monteverde",
    category: "restaurant",
    status: "unverified",
    rating: 4.5,
    reviewCount: 565,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  // ==========================================================
  // LA FORTUNA / ARENAL
  // ==========================================================

  {
    id: "laguna-arenal",
    name: "Laguna de Arenal",
    category: "lake",
    status: "unverified",
    rating: 4.7,
    reviewCount: 721,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "mirador-volcan-arenal",
    name: "Mirador al Volcán Arenal",
    category: "viewpoint",
    status: "unverified",
    rating: 4.8,
    reviewCount: 12,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "catarata-rio-fortuna",
    name: "Catarata Río Fortuna",
    category: "waterfall",
    status: "unverified",
    rating: 4.6,
    reviewCount: 10239,
    evidence: ["google_maps", "tricount"],
    confidence: "high",
  },

  {
    id: "hot-springs-pura-vida",
    name: "Hot Springs Pura Vida",
    category: "activity",
    status: "unverified",
    rating: 4.6,
    reviewCount: 463,
    evidence: ["google_maps"],
    confidence: "medium",
    note: "Lugar guardado como opción para valorar.",
  },

  {
    id: "rio-celeste",
    name: "Parque Nacional Volcán Tenorio - Río Celeste",
    category: "national_park",
    status: "unverified",
    rating: 4.6,
    reviewCount: 2792,
    evidence: ["google_maps"],
    confidence: "medium",
    note: "Nota de planificación: solo si hace buen tiempo.",
  },

  {
    id: "mirador-lago-arenal",
    name: "Mirador del Lago Arenal, Sector Península",
    category: "viewpoint",
    status: "unverified",
    rating: 4.8,
    reviewCount: 165,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  // ==========================================================
  // JACO
  // ==========================================================

  {
    id: "jaco-perico-azul",
    name: "Jaco Perico Azul",
    category: "hotel",
    status: "visited",
    rating: 4.8,
    reviewCount: 103,
    evidence: ["google_maps", "tricount"],
    confidence: "high",
  },

  {
    id: "don-casado",
    name: "Don Casado",
    category: "restaurant",
    status: "visited",
    rating: 4.6,
    reviewCount: 162,
    evidence: ["google_maps", "tricount"],
    confidence: "high",
    note: "Restaurante que nos gustó y con buena relación calidad-precio.",
  },

  {
    id: "gimnasio-platinum",
    name: "Gimnasio Platinum",
    category: "gym",
    status: "visited",
    rating: 4.4,
    reviewCount: 108,
    evidence: ["google_maps", "tricount"],
    confidence: "high",
  },

  // ==========================================================
  // CAHUITA / PUERTO VIEJO
  // ==========================================================

  {
    id: "puerto-viejo",
    name: "Puerto Viejo de Talamanca",
    category: "town",
    status: "visited",
    evidence: ["google_maps", "tricount"],
    confidence: "high",
    tags: ["caribe", "puerto-viejo"],
  },

  {
    id: "playa-punta-uva-caribe",
    name: "Playa Punta Uva",
    category: "beach",
    status: "unverified",
    rating: 4.8,
    reviewCount: 561,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "puerto-vargas-caribe",
    name: "Puerto Vargas",
    category: "beach",
    status: "unverified",
    rating: 4.6,
    reviewCount: 85,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "playa-blanca-caribe",
    name: "Playa Blanca",
    category: "beach",
    status: "unverified",
    rating: 4.5,
    reviewCount: 288,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "playa-mantas-caribe",
    name: "Playa Mantas",
    category: "beach",
    status: "unverified",
    rating: 4.4,
    reviewCount: 793,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  // ==========================================================
  // SAN JOSE
  // ==========================================================

  {
    id: "parque-central-san-jose",
    name: "Parque Central de San José",
    category: "city",
    status: "unverified",
    rating: 4.1,
    reviewCount: 20797,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "catedral-san-jose",
    name: "Catedral Metropolitana de San José",
    category: "historical",
    status: "unverified",
    rating: 4.7,
    reviewCount: 3176,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "mercado-central",
    name: "Mercado Central",
    category: "city",
    status: "unverified",
    rating: 4.4,
    reviewCount: 31342,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "teatro-nacional",
    name: "Teatro Nacional de Costa Rica",
    category: "historical",
    status: "unverified",
    rating: 4.8,
    reviewCount: 7009,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "plaza-cultura",
    name: "Plaza de la Cultura",
    category: "historical",
    status: "unverified",
    rating: 4.5,
    reviewCount: 17346,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "plaza-democracia",
    name: "Plaza de la Democracia y de la Abolición del Ejército",
    category: "historical",
    status: "unverified",
    rating: 4.6,
    reviewCount: 2662,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "iglesia-merced",
    name: "Iglesia Nuestra Señora de la Merced",
    category: "historical",
    status: "unverified",
    evidence: ["google_maps"],
    confidence: "low",
  },

  {
    id: "reloj-avenida-central",
    name: "El reloj de la fuente de la Avenida Central",
    category: "historical",
    status: "unverified",
    rating: 4.6,
    reviewCount: 13,
    evidence: ["google_maps"],
    confidence: "low",
  },

  // ==========================================================
  // OTROS
  // ==========================================================

  {
    id: "puente-tarcoles",
    name: "Puente Río Tárcoles",
    category: "viewpoint",
    status: "unverified",
    rating: 3.9,
    reviewCount: 817,
    evidence: ["google_maps"],
    confidence: "medium",
    note:
      "Nota propia: aparcar en la zona de los souvenirs por seguridad.",
  },

  {
    id: "puente-rio-grande-tarcoles",
    name: "Puente Río Grande de Tárcoles",
    category: "transport",
    status: "unverified",
    rating: 3.8,
    reviewCount: 113,
    evidence: ["google_maps"],
    confidence: "low",
  },

  {
    id: "volcan-irazu",
    name: "Volcán Irazú",
    category: "other",
    status: "unverified",
    rating: 4.5,
    reviewCount: 1680,
    evidence: ["google_maps"],
    confidence: "medium",
  },

  {
    id: "centro-rescate-pumas",
    name: "Centro de Rescate y Santuario Las Pumas",
    category: "wildlife",
    status: "unverified",
    rating: 4.6,
    reviewCount: 1385,
    evidence: ["google_maps", "tricount"],
    confidence: "high",
  },

  {
    id: "sixt-alajuela",
    name: "Sixt • Alajuela",
    category: "transport",
    status: "unverified",
    rating: 4.5,
    reviewCount: 2183,
    evidence: ["google_maps"],
    confidence: "medium",
    note: "Relacionado con el alquiler/entrega del coche.",
  },

  {
    id: "bar-el-avion",
    name: "Bar y restaurante El Avión",
    category: "restaurant",
    status: "unverified",
    rating: 4.4,
    reviewCount: 5890,
    evidence: ["google_maps"],
    confidence: "medium",
  },
];


/**
 * ============================================================
 * PLACES — PLANNED BUT NOT VISITED
 * ============================================================
 *
 * Estos cinco NO se deben mezclar con los lugares visitados.
 *
 * Son una categoría editorial propia.
 */

const plannedButNotVisited: PlannedButNotVisited[] = [

  {
    placeId: "bioluminescence-costa-rica",

    title: "Bioluminescence Costa Rica",

    description:
      "Experiencia de bioluminiscencia que teníamos guardada como parte de los planes del viaje.",

    reason:
      "Finalmente no la hicimos durante el viaje. La dejamos como una experiencia pendiente.",

    reasonType: "time",

    lesson:
      "No todo lo que merece la pena cabe en un viaje de 14 días. La selección también consiste en saber qué dejar fuera.",
  },

  {
    placeId: "santa-teresa",

    title: "Santa Teresa",

    description:
      "Destino de la costa del Pacífico que formaba parte de nuestras opciones iniciales.",

    reason:
      "Finalmente quedó fuera de la ruta que realizamos.",

    reasonType: "route",

    lesson:
      "Añadir destinos puede mejorar una lista sobre el papel y empeorar el viaje real si obliga a introducir demasiados desplazamientos.",
  },

  {
    placeId: "manzanillo",

    title: "Manzanillo",

    description:
      "Destino del Caribe que teníamos identificado para explorar durante el viaje.",

    reason:
      "Finalmente no llegamos a visitarlo.",

    reasonType: "time",

    lesson:
      "En un viaje con múltiples regiones, cada desvío tiene un coste real en tiempo y energía.",
  },

  {
    placeId: "la-paz-waterfall-gardens",

    title: "La Paz Waterfall Gardens Nature Park",

    description:
      "Parque de naturaleza y cascadas que habíamos considerado para la ruta.",

    reason:
      "Finalmente decidimos no incluirlo en el recorrido realizado.",

    reasonType: "priority",

    lesson:
      "Un lugar muy popular no tiene por qué ser automáticamente una prioridad para nuestro tipo de viaje.",
  },

  {
    placeId: "botos-lagoon",

    title: "Botos Lagoon",

    description:
      "Laguna que aparecía entre los lugares que queríamos valorar durante la planificación.",

    reason:
      "Finalmente no pudimos incorporarla al viaje.",

    reasonType: "time",

    lesson:
      "La lista de deseos inicial siempre debe ser mucho mayor que la ruta final.",
  },
];


/**
 * ============================================================
 * ACCOMMODATIONS
 * ============================================================
 *
 * Importes basados en los datos proporcionados.
 * No completamos noches hasta reconstruirlas con precisión.
 */

const accommodations: TripAccommodation[] = [

  {
    location: "Manuel Antonio",
    name: "Hotel Manuel Antonio",
    nights: 0,
    amount: 58.93,
    currency: "EUR",
    paidBy: "David",
    notes: "Importe registrado en Tricount.",
    evidence: ["tricount"],
  },

  {
    location: "Jacó",
    name: "Hotel Perico",
    nights: 0,
    amount: 55.93,
    currency: "EUR",
    paidBy: "David",
    notes: "Importe registrado en Tricount.",
    evidence: ["tricount", "revolut"],
  },

  {
    location: "Monteverde",
    name: "Montefresco Hostel Boutique",
    nights: 0,
    amount: 42.65,
    currency: "EUR",
    paidBy: "Itciar",
    evidence: ["revolut"],
  },

  {
    location: "Cahuita",
    name: "Atlantida Lodge",
    nights: 0,
    amount: 234.39,
    currency: "EUR",
    paidBy: "Itciar",
    evidence: ["revolut"],
  },

  {
    location: "San José",
    name: "Hotel / alojamiento San José",
    nights: 0,
    amount: 32.95,
    currency: "EUR",
    paidBy: "David",
    notes: "En Revolut aparece como Xin Bed Y Breakfast.",
    evidence: ["revolut"],
  },

  {
    location: "Uvita",
    name: "Hotel Uvita",
    nights: 0,
    amount: 216.57,
    currency: "EUR",
    paidBy: "David",
    evidence: ["tricount"],
  },
];


/**
 * ============================================================
 * BUDGET
 * ============================================================
 *
 * Todavía NO presentamos un total definitivo.
 *
 * Primero hay que reconciliar:
 * - Tricount
 * - Revolut
 * - pagos en efectivo
 * - pagos de David
 * - pagos de Itciar
 * - posibles duplicados
 */

const budget: TripBudgetItem[] = [

  {
    category: "flights",
    amount: 1241.52,
    currency: "EUR",
    description: "Vuelos internacionales",
    paidBy: "Itciar",
    source: "tricount",
  },

  {
    category: "car",
    amount: 566.17,
    currency: "EUR",
    description: "Alquiler del coche",
    paidBy: "David",
    source: "tricount",
  },

  {
    category: "fuel",
    amount: 0,
    currency: "EUR",
    description:
      "Combustible — pendiente de consolidar todos los pagos de gasolina.",
    paidBy: "shared",
    source: "revolut",
  },

  {
    category: "accommodation",
    amount: 58.93,
    currency: "EUR",
    description: "Hotel Manuel Antonio",
    paidBy: "David",
    source: "tricount",
  },

  {
    category: "accommodation",
    amount: 55.93,
    currency: "EUR",
    description: "Hotel Perico / Jacó",
    paidBy: "David",
    source: "tricount",
  },

  {
    category: "accommodation",
    amount: 216.57,
    currency: "EUR",
    description: "Hotel Uvita",
    paidBy: "David",
    source: "tricount",
  },

  {
    category: "accommodation",
    amount: 234.39,
    currency: "EUR",
    description: "Atlantida Lodge / Cahuita",
    paidBy: "Itciar",
    source: "revolut",
  },

  {
    category: "activities",
    amount: 274.99,
    currency: "EUR",
    description: "Experiencia Corcovado",
    paidBy: "David",
    source: "tricount",
  },

  {
    category: "activities",
    amount: 31.37,
    currency: "EUR",
    description: "Parque Nacional Manuel Antonio",
    paidBy: "David",
    source: "tricount",
  },

  {
    category: "activities",
    amount: 43.22,
    currency: "EUR",
    description: "Reserva Curi Cancha",
    paidBy: "Itciar",
    source: "revolut",
  },

  {
    category: "activities",
    amount: 34.31,
    currency: "EUR",
    description: "Catarata La Fortuna",
    paidBy: "Itciar",
    source: "tricount",
  },

  {
    category: "activities",
    amount: 29.16,
    currency: "EUR",
    description: "Reserva Las Pumas",
    paidBy: "Itciar",
    source: "tricount",
  },

  {
    category: "transport",
    amount: 34.31,
    currency: "EUR",
    description: "Transporte / gasto pendiente de categorizar",
    paidBy: "Itciar",
    source: "revolut",
  },
];


/**
 * ============================================================
 * TRIP
 * ============================================================
 */

export const costaRicaTrip: OurTrip = {

  slug: "costa-rica",

  title: "Nuestro viaje a Costa Rica",

  subtitle:
    "14 días, una ruta real, decisiones sobre la marcha y todo lo que aprendimos viajando por Costa Rica.",

  duration: "14 días",

  destination: "Costa Rica",

  introduction:
    "Costa Rica fue uno de esos viajes en los que la ruta sobre el mapa y el viaje real acabaron siendo dos cosas ligeramente distintas. Salimos con una lista de lugares, alojamientos y experiencias que queríamos conocer y terminamos tomando decisiones sobre la marcha según el tiempo, los desplazamientos, la energía y nuestras prioridades. Aquí no queremos construir una ruta perfecta a posteriori. Queremos reconstruir lo que realmente hicimos, qué funcionó, qué descartamos y qué haríamos hoy después de haberlo vivido.",

  metrics: {

    durationDays: 14,

    startDate: "2026-05-11",

    endDate: "2026-05-24",

    countries: 1,

    photos: 46,

    placesRecorded: 56,

    carKm: 1497,

    flightKm: 1259,

    boatNm: 34,
  },

  whyDestination: [

    "Queríamos combinar naturaleza, playas, selva y aventura en un mismo viaje.",

    "Nos atraía especialmente la posibilidad de recorrer el país por carretera.",

    "Queríamos experimentar diferentes zonas del país en lugar de quedarnos en una única región.",

    "Buscábamos un viaje activo, pero sin convertir cada día en una carrera por tachar lugares.",
  ],

  whatWeWanted: [

    "Naturaleza",

    "Playas",

    "Animales",

    "Selva",

    "Carretera",

    "Aventura",

    "Experiencias locales",

    "Una ruta suficientemente variada para sentir que habíamos conocido diferentes caras de Costa Rica.",
  ],

  howWeDesignedTheRoute: [

    "Partimos de una lista amplia de lugares que queríamos conocer.",

    "Utilizamos el coche como elemento principal para conectar diferentes zonas.",

    "Priorizamos algunas experiencias frente a intentar visitar absolutamente todo.",

    "La ruta final fue adaptándose a la realidad del viaje.",

    "Algunos lugares que estaban en los planes terminaron quedándose fuera.",
  ],

  /**
   * ========================================================
   * DAYS
   * ========================================================
   *
   * TODAVÍA NO LOS RELLENAMOS.
   *
   * Este es el siguiente trabajo de reconstrucción.
   */

  days: [],

  places,

  plannedButNotVisited,

  importantDecisions: [

    {
      title: "No intentar verlo absolutamente todo",

      content:
        "Una de las principales lecciones del viaje es que una lista de 50 lugares no equivale a un buen viaje. La ruta real tiene que absorber desplazamientos, clima, cansancio, comidas, imprevistos y tiempo simplemente para estar en un sitio.",
    },

    {
      title: "El coche fue parte de la experiencia",

      content:
        "Recorrimos aproximadamente 1.497 km en coche. Eso convierte los desplazamientos en una parte importante del viaje y no simplemente en tiempo perdido entre destinos.",
    },

    {
      title: "La ruta sobre el mapa no es la ruta real",

      content:
        "Algunos lugares que estaban inicialmente previstos no acabaron formando parte del viaje. Queremos conservar esa información porque explica mejor cómo se toman decisiones reales que una ruta reconstruida como si todo hubiera salido exactamente según el plan.",
    },
  ],

  accommodations,

  budget,

  whatWeWouldRepeat: [],

  whatWeWouldChange: [],

  whatWeWouldDoToday: [],

  gallery: [],

  relatedGuide: {

    title: "Guía completa de Costa Rica",

    description:
      "Nuestra guía de Costa Rica reunirá la investigación del destino, la ruta real, los lugares que probamos y las decisiones que tomamos para que puedas utilizar nuestra experiencia como punto de partida para construir tu propio viaje.",

    href: "/viajes/costa-rica",
  },

  cta: {

    title: "¿Quieres que diseñemos tu viaje?",

    description:
      "Nuestro viaje a Costa Rica responde a nuestras prioridades, nuestro tiempo y nuestra forma de viajar. El tuyo debería responder a las tuyas. Si prefieres que hagamos la investigación y construyamos contigo una ruta con criterio, cuéntanos qué tienes en mente.",

    buttonLabel: "Cuéntanos tu viaje",

    buttonHref: "/cuentatuviaje",
  },
};