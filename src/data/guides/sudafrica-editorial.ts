import type { GuideSection, GuideSource } from "./types";

const REVIEWED_AT = "2026-09-16";

const SOUTH_AFRICA_SOURCES: GuideSource[] = [
  {
    label: "South African Tourism — Garden Route",
    url: "https://www.southafrica.net/za/en/travel/article/discover-the-garden-route",
    type: "official",
    accessedAt: REVIEWED_AT,
  },
  {
    label: "South African Tourism — Table Mountain",
    url: "https://www.southafrica.net/za/en/travel/article/table-mountain-cape-town-south-africa-s-most-iconic-landmark",
    type: "official",
    accessedAt: REVIEWED_AT,
  },
  {
    label: "SANParks — Kruger National Park",
    url: "https://www.sanparks.org/parks/kruger",
    type: "official",
    accessedAt: REVIEWED_AT,
  },
];

const section = (value: Omit<GuideSection, "number">): GuideSection => ({
  ...value,
  number: "00",
  status: "published",
  reviewedAt: REVIEWED_AT,
});

export const southAfricaSectionOverrides: GuideSection[] = [
  section({
    id: "entender-el-destino",
    title: "Entender Sudáfrica antes de reservar",
    category: "overview",
    intro: "Sudáfrica no funciona bien como una lista de lugares: funciona cuando decides qué parte del país quieres que protagonice el viaje.",
    paragraphs: [
      "Ciudad del Cabo, safari, costa, viñedos y carretera pueden convivir en un mismo viaje, pero las distancias y los cambios de ritmo hacen que intentar meterlo todo tenga un coste real.",
      "Ciudad del Cabo concentra ciudad, costa y Table Mountain; el Kruger aporta una experiencia de fauna completamente distinta; la Garden Route tiene sentido cuando quieres carretera, paisajes, bosques y costa.",
      "La primera decisión útil es elegir dos o tres bloques que se complementen y aceptar que el resto puede quedar fuera.",
    ],
    highlights: [
      { title: "Safari", description: "Kruger es una referencia clara si la fauna es una prioridad y quieres combinar avistamiento con alojamiento dentro o alrededor del parque.", type: "experience" },
      { title: "Ciudad + naturaleza", description: "Ciudad del Cabo permite combinar Table Mountain, costa y vida urbana sin convertir cada día en un traslado.", type: "decision" },
      { title: "Carretera", description: "La Garden Route encaja cuando el desplazamiento forma parte de la experiencia y quieres alternar costa, bosques y pequeñas localidades.", type: "experience" },
    ],
    status: "published",
    reviewedAt: REVIEWED_AT,
  }),
  section({
    id: "zonas-y-ritmo",
    title: "Qué zonas combinar y cuánto desplazarte",
    category: "planning",
    intro: "En Sudáfrica el mapa engaña: no basta con contar kilómetros; hay que decidir qué tipo de día quieres tener.",
    paragraphs: [
      "Una estructura habitual puede separar Ciudad del Cabo de la parte de safari y reservar la Garden Route para un viaje donde conducir sea parte del atractivo.",
      "Ciudad del Cabo merece varios días si quieres explorar la ciudad, Table Mountain y la península con margen para meteorología y cambios de plan.",
      "En el Kruger conviene pensar en noches dentro del área del parque y en tiempos de entrada, salida y desplazamiento entre campamentos, en lugar de tratarlo como una única visita rápida.",
    ],
    highlights: [
      { title: "Menos saltos de alojamiento", description: "La variedad del país invita a cambiar mucho de base; hacerlo menos veces suele dejar más tiempo para vivir cada zona.", type: "tip" },
      { title: "Carretera con sentido", description: "La Garden Route se disfruta mejor cuando el trayecto entre paradas forma parte del plan, no cuando solo sirve para conectar dos hoteles.", type: "important" },
    ],
    status: "published",
    reviewedAt: REVIEWED_AT,
  }),
  section({
    id: "experiencias-que-merecen-espacio",
    title: "Qué merece espacio en el viaje",
    category: "experience",
    intro: "Aquí sí merece la pena elegir experiencias concretas en vez de perseguir una lista de imprescindibles.",
    paragraphs: [
      "En Ciudad del Cabo, Table Mountain forma parte del contexto natural de la ciudad y puede plantearse con teleférico o a pie según el tiempo, las condiciones y el tipo de día que quieras construir.",
      "En el Kruger, la experiencia no consiste en garantizar avistamientos, sino en reservar suficiente tiempo para recorrer distintas zonas y aceptar que la fauna marca parte del ritmo.",
      "En la Garden Route destacan el paisaje, la costa, los bosques y poblaciones como Knysna, Wilderness o Plettenberg Bay; aquí el valor está tanto en los lugares como en el recorrido.",
    ],
    highlights: [
      { title: "No prometas fauna", description: "Un safari se diseña alrededor de tiempo, hábitat y paciencia; ninguna ruta seria debería convertir los avistamientos en una garantía.", type: "important" },
      { title: "Table Mountain depende del día", description: "El viento, la visibilidad y las condiciones meteorológicas pueden cambiar la experiencia, así que conviene mantener margen.", type: "tip" },
    ],
    blocks: [
      {
        type: "source",
        title: "Fuentes oficiales consultadas",
        items: SOUTH_AFRICA_SOURCES.map((item) => item.label),
      },
    ],
    status: "published",
    reviewedAt: REVIEWED_AT,
  }),
  section({
    id: "como-moverse",
    title: "Cómo moverse sin que la logística se coma el viaje",
    category: "practical",
    intro: "Coche y vuelos internos pueden convivir; la clave es asignar cada medio a la parte del país donde aporta valor.",
    paragraphs: [
      "La conducción tiene sentido en rutas donde quieres detenerte con libertad, especialmente en la Garden Route y otros recorridos del Western Cape. En cambio, recorrer grandes distancias únicamente por carretera puede consumir demasiadas horas.",
      "Para un viaje que combine Ciudad del Cabo y Kruger, suele ser más coherente valorar un vuelo interno y reservar el coche para la zona donde realmente vas a conducir.",
      "En el Kruger puedes moverte en vehículo propio o mediante actividades y alojamientos que incorporen recorridos guiados; la elección cambia la autonomía, el horario y la forma de vivir el parque.",
    ],
    highlights: [
      { title: "Coche donde aporta libertad", description: "En una ruta de carretera, el coche permite detenerte, cambiar el ritmo y explorar lugares secundarios sin depender de conexiones.", type: "decision" },
      { title: "Vuela cuando la distancia deja de aportar", description: "Ahorrar un día de conducción puede tener más valor que convertir el traslado en otro bloque de vacaciones.", type: "tip" },
    ],
    status: "published",
    reviewedAt: REVIEWED_AT,
  }),
  section({
    id: "encaja-contigo",
    title: "¿Sudáfrica encaja contigo?",
    category: "planning",
    intro: "Es un destino especialmente interesante cuando buscas variedad y aceptas que esa variedad exige tomar decisiones logísticas.",
    paragraphs: [
      "Suele funcionar bien para quien quiere combinar naturaleza, ciudad y carretera; para quien disfruta de viajes con contrastes; y para quien prefiere una ruta construida alrededor de prioridades concretas.",
      "Puede encajar peor si buscas unas vacaciones muy sencillas, con pocos desplazamientos y una sola base desde la que hacerlo todo.",
      "El intercambio principal es claro: más variedad implica más planificación y, normalmente, más cambios. La clave es decidir dónde compensa asumir esa complejidad.",
    ],
    highlights: [
      { title: "Buen encaje", description: "Naturaleza + ciudad + carretera, con interés por elegir qué regiones merecen realmente tiempo.", type: "decision" },
      { title: "Menos encaje", description: "Viaje de una sola base, logística mínima o necesidad de mantener todos los días muy predecibles.", type: "warning" },
    ],
    status: "published",
    reviewedAt: REVIEWED_AT,
  }),
];
