import type { GuideSection } from "./types";

const REVIEWED_AT = "2026-09-16";

const visitCostaRicaSource = {
  label: "Visit Costa Rica — Destinos, playas y parques",
  url: "https://es.visitcostarica.com/where-to-go",
  type: "official",
  accessedAt: REVIEWED_AT,
};

const parksSource = {
  label: "SINAC — Parques Nacionales",
  url: "https://www.sinac.go.cr/ES/turismo/Paginas/parquesnacionales.aspx",
  type: "official",
  accessedAt: REVIEWED_AT,
};

const section = (
  value: Omit<GuideSection, "number" | "reviewedAt" | "status">,
): GuideSection => ({
  ...value,
  status: "published",
  reviewedAt: REVIEWED_AT,
});

export const costaRicaSectionOverrides: GuideSection[] = [
  section({
    id: "regiones-y-zonas",
    title: "Regiones y zonas",
    category: "planning",
    intro:
      "No elegiría las regiones de Costa Rica por cantidad. Las elegiría por el tipo de viaje que quieres construir.",
    paragraphs: [
      "Guanacaste funciona especialmente bien cuando quieres dar peso a la costa y a un clima más seco. La Península de Nicoya añade pueblos de playa, surf y una forma de viajar más pausada.",
      "Las Llanuras del Norte concentran una de las combinaciones más fáciles de entender del país: Volcán Arenal, bosque, actividades de aventura y aguas termales alrededor de La Fortuna.",
      "El Pacífico Central reúne costa y selva con una pieza muy clara: Manuel Antonio. El Pacífico Sur cambia el tono hacia una experiencia más salvaje, con Osa, Corcovado, Marino Ballena y zonas de costa como Dominical y Uvita.",
      "En el Caribe Sur, Cahuita, Puerto Viejo, Cocles y Punta Uva mezclan playa, bosque, arrecifes y cultura afrocaribeña. Tortuguero juega otra liga: canales, humedales y acceso principalmente por agua.",
    ],
    highlights: [
      {
        title: "Quiero playa y menos carretera",
        description:
          "Guanacaste y la Península de Nicoya son una primera línea de investigación; la elección concreta depende de la playa, el ambiente y las actividades que busques.",
        type: "decision",
      },
      {
        title: "Quiero volcán + naturaleza + actividades",
        description:
          "La Fortuna y el entorno del Volcán Arenal permiten combinar senderos, bosque, aventura y aguas termales sin cambiar continuamente de base.",
        type: "decision",
      },
      {
        title: "Quiero fauna y selva por encima de todo",
        description:
          "Tortuguero y el Pacífico Sur merecen investigarse con especial atención. El tipo de fauna, la logística y el ritmo son muy diferentes.",
        type: "experience",
      },
      {
        title: "Quiero Caribe",
        description:
          "Cahuita, Puerto Viejo, Cocles y Punta Uva permiten combinar costa, selva, arrecifes y cultura local en el mismo viaje.",
        type: "experience",
      },
    ],
    blocks: [
      {
        type: "source",
        label: "Fuente oficial",
        title: visitCostaRicaSource.label,
        content:
          "La web oficial de turismo organiza el país por regiones y perfiles de viaje; usamos esa división como punto de partida para comparar zonas.",
        source: visitCostaRicaSource,
      },
    ],
    closing:
      "No necesitas visitar todas las regiones. Necesitas elegir las que mejor encajen con el viaje que quieres vivir.",
  }),

  section({
    id: "que-ver-y-hacer",
    title: "Qué ver y qué hacer",
    category: "experience",
    intro:
      "Aquí sí queremos responder a la pregunta que suele quedar escondida detrás de una guía: ¿qué merece realmente mi tiempo?",
    paragraphs: [
      "Si es tu primer viaje y quieres una mezcla muy reconocible de Costa Rica, una combinación de volcán, bosque, fauna y costa suele ser más coherente que intentar coleccionar parques y playas.",
      "Entre las experiencias concretas que merece la pena investigar están caminar por senderos del entorno del Arenal, visitar aguas termales en La Fortuna, buscar fauna con guía, recorrer canales en Tortuguero, explorar el bosque de Manuel Antonio, conocer playas del Pacífico o del Caribe y dedicar tiempo a surf, snorkel o actividades de aventura cuando encajen contigo.",
      "La clave está en saber qué experiencias justifican un desplazamiento propio y cuáles aparecen naturalmente al construir la ruta alrededor de una región.",
    ],
    highlights: [
      {
        title: "Arenal",
        description:
          "Volcán, senderos, bosque, fauna, actividades y aguas termales alrededor de La Fortuna. Es una zona especialmente versátil para combinar varias experiencias.",
        type: "experience",
      },
      {
        title: "Tortuguero",
        description:
          "Canales, humedales y observación de fauna con una logística diferente al resto del país: el acceso se realiza principalmente en pequeñas embarcaciones.",
        type: "experience",
      },
      {
        title: "Manuel Antonio",
        description:
          "Una mezcla muy directa de bosque tropical, senderos, fauna y playas dentro del mismo parque nacional.",
        type: "experience",
      },
      {
        title: "Caribe Sur",
        description:
          "Cahuita y el entorno de Puerto Viejo permiten combinar playa, bosque, arrecifes y cultura afrocaribeña.",
        type: "experience",
      },
      {
        title: "Pacífico Sur",
        description:
          "Osa, Corcovado, Marino Ballena, Dominical y Uvita permiten construir viajes donde la naturaleza y la costa tienen mucho peso.",
        type: "experience",
      },
    ],
    closing:
      "La pregunta no es cuántas cosas puedes hacer en Costa Rica. Es cuáles merecen formar parte de tus días.",
  }),

  section({
    id: "volcanes",
    title: "Volcanes: cuáles tienen sentido",
    category: "experience",
    intro:
      "Costa Rica tiene varios volcanes accesibles al viajero, pero no ofrecen la misma experiencia ni justifican la misma parte de la ruta.",
    paragraphs: [
      "El Volcán Arenal es la referencia más fácil de integrar en un viaje de naturaleza: el parque ofrece senderos y zonas donde se observan restos de coladas de lava, y La Fortuna añade termales y muchas actividades alrededor.",
      "El Poás funciona de otra manera: es una visita de acceso relativamente sencillo desde el Valle Central y su gran cráter es el protagonista. Irazú también destaca por su accesibilidad y por sus cráteres, además de su altura y cercanía a Cartago.",
      "Rincón de la Vieja aporta un paisaje volcánico muy diferente en Guanacaste, mientras que Tenorio interesa especialmente por el entorno del Río Celeste. No conviene meter todos estos volcanes en una misma ruta solo porque aparezcan en la lista.",
    ],
    highlights: [
      {
        title: "Arenal — para combinar",
        description:
          "La opción más completa cuando buscas volcán + naturaleza + actividades + termales en una misma zona.",
        type: "decision",
      },
      {
        title: "Poás — para una visita sencilla",
        description:
          "Interesante cuando quieres incorporar paisaje volcánico sin dedicar varios días a una zona concreta.",
        type: "decision",
      },
      {
        title: "Irazú — cráter y altura",
        description:
          "Una visita accesible desde el Valle Central, con varios cráteres y miradores naturales.",
        type: "experience",
      },
      {
        title: "Rincón de la Vieja — paisaje volcánico",
        description:
          "Especialmente interesante si tu ruta ya pasa por Guanacaste y quieres combinar bosque seco, actividad volcánica y naturaleza.",
        type: "experience",
      },
      {
        title: "Tenorio — volcán + Río Celeste",
        description:
          "La gran razón para ir no es buscar una visita de cráter convencional, sino el paisaje del parque y el Río Celeste.",
        type: "experience",
      },
    ],
    blocks: [
      {
        type: "source",
        label: "Fuente oficial",
        title: parksSource.label,
        content:
          "SINAC mantiene la información oficial de los parques nacionales volcánicos y sus áreas protegidas.",
        source: parksSource,
      },
    ],
    closing:
      "No necesitas marcar todos los volcanes en el mapa. Elige el que aporte algo real a la ruta que estás construyendo.",
  }),

  section({
    id: "parques-nacionales",
    title: "Parques nacionales",
    category: "experience",
    intro:
      "Los parques no compiten todos por el mismo espacio en tu viaje: algunos destacan por fauna, otros por paisaje volcánico, canales, bosque o combinación de naturaleza y playa.",
    paragraphs: [
      "Manuel Antonio es especialmente fácil de entender para un primer viaje: senderos de bosque tropical, fauna y playas dentro del mismo parque. Tortuguero ofrece una experiencia completamente distinta, basada en canales, humedales y acceso en pequeñas embarcaciones.",
      "Arenal permite combinar senderos, bosque y paisaje volcánico con la infraestructura turística de La Fortuna. Cahuita une bosque, costa y arrecifes. Corcovado tiene un perfil mucho más centrado en selva y biodiversidad en la Península de Osa.",
      "Poás, Irazú y Tenorio tienen sentido cuando el objetivo concreto es el paisaje que protege cada parque, mientras que Marino Ballena añade un componente marino muy claro en el Pacífico Sur.",
    ],
    highlights: [
      {
        title: "Manuel Antonio",
        description:
          "Fauna + bosque tropical + playas. Una combinación muy directa para un viaje que quiere tocar varios elementos sin cambiar completamente de experiencia.",
        type: "decision",
      },
      {
        title: "Tortuguero",
        description:
          "Canales, humedales y fauna. Aquí la propia logística de acceso forma parte del viaje.",
        type: "decision",
      },
      {
        title: "Arenal",
        description:
          "Volcán, senderos, bosque y paisaje de lava alrededor de una zona con muchas actividades.",
        type: "experience",
      },
      {
        title: "Cahuita",
        description:
          "Una combinación especialmente clara de selva, playa y arrecife en el Caribe Sur.",
        type: "experience",
      },
      {
        title: "Corcovado",
        description:
          "Una elección orientada a selva y biodiversidad en la Península de Osa; requiere valorar mejor la logística y el tiempo disponible.",
        type: "decision",
      },
      {
        title: "Tenorio / Poás / Irazú",
        description:
          "Tres perfiles diferentes de visita volcánica y paisajística; la elección depende mucho más de tu ruta que de una supuesta clasificación de 'mejores'.",
        type: "important",
      },
    ],
    blocks: [
      {
        type: "source",
        label: "Fuente oficial",
        title: parksSource.label,
        content:
          "Consulta siempre SINAC para horarios, accesos, reservas y condiciones de visita antes de desplazarte a un parque.",
        source: parksSource,
      },
    ],
    closing:
      "Un parque merece entrar en la ruta cuando aporta una experiencia que el resto del viaje no te está dando.",
  }),

  section({
    id: "playas",
    title: "Playas: cuáles encajan contigo",
    category: "experience",
    intro:
      "No existe una única 'mejor playa' de Costa Rica. Sí existen playas mucho más adecuadas para determinados tipos de viaje.",
    paragraphs: [
      "En Guanacaste y Nicoya aparecen referencias como Tamarindo, Playa Grande y Playa Conchal, además de Nosara. Son útiles cuando quieres que la costa tenga un peso importante en la ruta y buscas perfiles que van desde surf y ambiente hasta paisajes de playa más tranquilos.",
      "En el Pacífico Central, Manuel Antonio combina parque y playas; Espadilla y otras playas de la zona tienen además una oferta amplia de actividades. Hacia el Pacífico Sur aparecen Dominical, Uvita y otras costas con un carácter más ligado a naturaleza y paisaje.",
      "En el Caribe Sur, Cahuita, Cocles, Punta Uva y Playa Negra permiten combinar costa con bosque y cultura afrocaribeña. Aquí la experiencia es muy distinta de Guanacaste aunque ambas sean 'playa'.",
    ],
    highlights: [
      {
        title: "Tamarindo — surf y servicios",
        description:
          "Una referencia clara de Guanacaste cuando quieres playa con una oferta amplia de actividades y servicios.",
        type: "experience",
      },
      {
        title: "Playa Conchal — costa como protagonista",
        description:
          "Una opción muy conocida de Guanacaste si quieres dedicar peso real del viaje a la costa.",
        type: "experience",
      },
      {
        title: "Manuel Antonio — playa + parque",
        description:
          "Tiene sentido cuando quieres evitar separar los días de costa de los de naturaleza y fauna.",
        type: "decision",
      },
      {
        title: "Dominical / Uvita — Pacífico Sur",
        description:
          "Interesantes cuando buscas una costa más ligada al paisaje y a la naturaleza del Pacífico Sur.",
        type: "experience",
      },
      {
        title: "Cocles / Punta Uva / Cahuita — Caribe Sur",
        description:
          "Buenas referencias para quien quiere combinar playa, selva, arrecifes y cultura afrocaribeña.",
        type: "experience",
      },
    ],
    blocks: [
      {
        type: "source",
        label: "Fuente oficial",
        title: "Visit Costa Rica — Playas y relax",
        content:
          "La oficina de turismo agrupa playas por regiones y actividades; usamos esa información como base y añadimos criterio sobre cómo encajan en una ruta.",
        source: {
          label: "Visit Costa Rica — Playas y relax",
          url: "https://es.visitcostarica.com/things-to-do/beaches-and-relaxation",
          type: "official",
          accessedAt: REVIEWED_AT,
        },
      },
    ],
    closing:
      "Cuando nos preguntes por la mejor playa, la pregunta que necesitamos devolver es: ¿mejor para hacer qué, y en qué parte de tu viaje?",
  }),
];
