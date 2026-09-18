import type {
  OurTrip,
  TripPlace,
} from "./costa-rica";

const place = (
  id: string,
  name: string,
  category: TripPlace["category"],
): TripPlace => ({
  id,
  name,
  category,
  status: "unverified",
  evidence: ["google_maps"],
  confidence: "medium",
  tags: ["mauricio"],
});

const mauricioPlaces: TripPlace[] = [
  place("ile-aux-cerfs", "Île aux Cerfs", "island"),
  place("mon-choisy", "Mon Choisy Public Beach", "beach"),
  place("ocean-v-hotel", "Ocean V Hotel", "hotel"),
  place("pereybere", "Pereybere Beach", "beach"),
  place("bain-boeuf", "Bain Boeuf Public Beach", "beach"),
  place("la-cuvette", "La Cuvette Public Beach", "beach"),
  place("trou-aux-biches", "Trou aux Biches", "beach"),
  place("cap-malheureux", "Cap Malheureux", "viewpoint"),
  place("blue-penny-museum", "Blue Penny Museum", "historical"),
  place("central-post-office", "Central Post Office", "historical"),
  place("port-louis-waterfront", "Port Louis Waterfront by Landscope Mauritius", "city"),
  place("mercado-central-port-louis", "Mercado Central", "city"),
  place("casa-gobierno", "Casa de Gobierno", "historical"),
  place("port-louis-theatre", "Port Louis Theatre", "historical"),
  place("supreme-court", "Supreme Court of Mauritius", "historical"),
  place("catedral-san-luis", "Catedral de San Luis", "historical"),
  place("flic-en-flac", "Flic en Flac Beach", "beach"),
  place("maison-eureka", "Maison Eureka", "historical"),
  place("tamarin-beach", "Tamarin Public Beach", "beach"),
  place("ben-whale-safari", "Ben Whale Safari", "activity"),
  place("le-morne-public-beach", "Le Morne Public Beach", "beach"),
  place("cascadas-tamarin", "Cascadas de Tamarin", "waterfall"),
  place("le-morne-brabant", "Le Morne Brabant", "viewpoint"),
  place("trou-aux-cerfs", "Trou aux Cerfs Viewpoint", "viewpoint"),
  place("chamarel-seven-coloured-earth", "Chamarel Seven Colored Earth Geopark", "other"),
  place("chamarel-waterfall", "Chamarel Waterfall Viewpoint", "waterfall"),
  place("gorges-viewpoint", "Gorges Viewpoint", "viewpoint"),
  place("lagoon-island", "Lagoon Island", "island"),
  place("maconde-viewpoint", "Maconde Viewpoint", "viewpoint"),
  place("belle-mare-beach", "Belle Mare Beach", "beach"),
  place("grand-bassin", "Grand Bassin Temple", "historical"),
  place("cascade-mamzelle", "Cascade Mamzelle", "waterfall"),
  place("gris-gris", "Gris Gris Beach", "beach"),
  place("ile-aux-aigrettes", "Île aux Aigrettes", "island"),
  place("pointe-desny", "Pointe d'Esny Beach", "beach"),
  place("blue-bay", "Blue Bay Beach", "beach"),
];

export const sudafricaMauricioTrip: OurTrip = {
  slug: "sudafrica-mauricio",
  title: "Sudáfrica y Mauricio",
  subtitle:
    "Un viaje combinado de 28 días entre safari, carretera, Ciudad del Cabo y experiencias de océano.",
  duration: "28 días",
  destination: "Sudáfrica y Mauricio",
  introduction:
    "El registro de nuestro viaje une dos destinos muy distintos dentro de una misma experiencia: Sudáfrica, con safari y carretera, y Mauricio, con costa, actividades marinas y exploración de la isla. En lugar de reconstruir un itinerario perfecto, queremos conservar aquí lo que sí podemos demostrar con nuestros registros: dónde estuvimos, qué pagamos y qué lugares fuimos guardando sobre el terreno.",
  metrics: {
    durationDays: 28,
    startDate: "2025-09-28",
    endDate: "2025-10-25",
    countries: 2,
    placesRecorded: 37,
  },
  whyDestination: [
    "El viaje combinó dos geografías muy diferentes sin salir de una misma aventura: safari y carretera en Sudáfrica, y costa y actividades marinas en Mauricio.",
    "El registro de gastos confirma etapas de alquiler de coche, alojamientos y actividades tanto en Sudáfrica como en Mauricio.",
    "Entre las experiencias registradas aparecen safari nocturno, actividades de tiburón y ballena, buceo y snorkel, además de varios días de carretera.",
  ],
  whatWeWanted: [
    "Safari y fauna terrestre.",
    "Carretera y libertad de movimiento.",
    "Ciudad del Cabo y paisaje costero.",
    "Océano: tiburones, ballenas, buceo y snorkel.",
    "Combinar exploración con días de isla y mar.",
  ],
  howWeDesignedTheRoute: [
    "El viaje duró 28 días, del 28 de septiembre al 25 de octubre de 2025, y abarcó Sudáfrica y Mauricio.",
    "En los gastos aparecen coches diferenciados para Mauricio, Kruger y Ciudad del Cabo, señal de que el coche fue una herramienta importante en distintos tramos del viaje.",
    "En Sudáfrica el registro conserva gastos y alojamientos vinculados a Kruger y Ciudad del Cabo, además de combustible, peajes y actividades.",
    "Mauricio aparece asociado a alquiler de coche y a varias experiencias marítimas y de costa.",
    "No reconstruimos aquí trayectos que no estén confirmados en los registros: esta página distingue entre lo que sabemos y lo que todavía falta por documentar.",
  ],
  days: [],
  places: mauricioPlaces,
  plannedButNotVisited: [],
  importantDecisions: [
    {
      title: "Separar safari y ciudad como experiencias diferentes",
      content:
        "Los gastos y alojamientos registrados muestran una etapa clara en Kruger y otra en Ciudad del Cabo. Son dos formas de viajar muy diferentes y merece la pena tratarlas como bloques distintos.",
    },
    {
      title: "Usar coche donde aportaba libertad",
      content:
        "El registro incluye alquileres y combustible en Mauricio, Kruger y Ciudad del Cabo. El coche no fue una constante única, sino una herramienta adaptada a cada parte del viaje.",
    },
    {
      title: "Dar espacio a las experiencias marinas",
      content:
        "Tiburón, ballena, buceo y snorkel aparecen entre los gastos registrados. El mar no fue un complemento puntual, sino una parte visible de la experiencia de Mauricio.",
    },
    {
      title: "Conservar los datos aunque todavía falte parte del relato",
      content:
        "Tenemos un registro económico muy detallado y una lista compartida de lugares, pero no todos los trayectos y estados de visita están documentados con el mismo nivel de precisión. Preferimos dejar esa diferencia visible antes que rellenarla con suposiciones.",
    },
  ],
  accommodations: [
    { location: "Mauricio", name: "Hotel Mauricio", nights: 1, amount: 370.60, currency: "€", paidBy: "Itciar", evidence: ["tricount"] },
    { location: "Mauricio", name: "Hotel Mauricio - HE", nights: 1, amount: 190.11, currency: "€", paidBy: "David", evidence: ["tricount"] },
    { location: "Johannesburgo", name: "Hotel Aeropuerto Johannesburgo", nights: 1, amount: 28.83, currency: "€", paidBy: "David", evidence: ["tricount"] },
    { location: "Kruger", name: "Hotel Puerta Kruger", nights: 1, amount: 39.80, currency: "€", paidBy: "David", evidence: ["tricount"] },
    { location: "Kruger", name: "Hoteles Kruger", nights: 1, amount: 312.60, currency: "€", paidBy: "David", evidence: ["tricount"] },
    { location: "Ciudad del Cabo", name: "Hotel Ciudad del Cabo", nights: 1, amount: 259.67, currency: "€", paidBy: "David", evidence: ["tricount"] },
    { location: "Aeropuerto", name: "Hotel 2 Aeropuerto", nights: 1, amount: 33.60, currency: "€", paidBy: "David", evidence: ["tricount"] },
  ],
  budget: [],
  budgetSummary: {
    total: 5810.83,
    perPerson: 2905.42,
    currency: "€",
    source: "tricount",
    note:
      "Total que aparece en Tricount para las dos personas. El texto compartido no conserva el importe legible de todas las líneas individuales, así que no reconstruimos un desglose artificial por categorías.",
  },
  whatWeWouldRepeat: [],
  whatWeWouldChange: [],
  whatWeWouldDoToday: [],
  gallery: [],
  relatedGuide: {
    title: "Preparar la guía de Sudáfrica",
    description:
      "La guía reúne el criterio para decidir cómo combinar safari, ciudad, costa, carretera y tiempos de desplazamiento sin copiar nuestro viaje.",
    href: "/viajes/sudafrica",
  },
  cta: {
    title: "¿Quieres un viaje con esta complejidad, pero hecho para ti?",
    description:
      "Cuéntanos qué queréis combinar y empezamos a cruzar destinos, tiempos, ritmo y logística.",
    buttonLabel: "Cuéntanos tu viaje",
    buttonHref: "/cuentatuviaje",
  },
};
