import type { FAQItem, GuideSource, GuideSection } from "./types";

export const krugerGuideTitle =
  "Safari en Kruger: cómo organizar tu viaje por tu cuenta | Cruzando Meridianos";

export const krugerGuideSubtitle =
  "Una guía práctica para decidir cuántos días necesitas, si compensa conducir, cómo funcionan los safaris guiados, dónde dormir y qué comprobar antes de entrar al parque.";

export const krugerGuideDescription =
  "Guía para organizar un safari en el Parque Nacional Kruger: acceso, coche, safaris guiados, campamentos, ritmo, reservas y decisiones prácticas.";

export const krugerGuideLastReviewed = "2026-09-18";

export const krugerSources: GuideSource[] = [
  {
    label: "SANParks — Kruger National Park",
    url: "https://www.sanparks.org/parks/kruger",
    type: "official",
    accessedAt: krugerGuideLastReviewed,
  },
  {
    label: "SANParks — Game Drives",
    url: "https://www.sanparks.org/parks/kruger/what-to-do/activities/game-drives",
    type: "official",
    accessedAt: krugerGuideLastReviewed,
  },
  {
    label: "SANParks — Accommodation",
    url: "https://www.sanparks.org/parks/kruger/accommodation",
    type: "official",
    accessedAt: krugerGuideLastReviewed,
  },
  {
    label: "SANParks — Day Visits",
    url: "https://www.sanparks.org/parks/kruger/what-to-do/day-visits",
    type: "official",
    accessedAt: krugerGuideLastReviewed,
  },
];

export const krugerGuideSections: GuideSection[] = [
  {
    id: "por-que-kruger",
    number: "01",
    title: "Kruger no es una excursión: es un viaje dentro del viaje.",
    category: "overview",
    intro:
      "El Parque Nacional Kruger es lo bastante grande como para que la forma de moverte y dormir cambie por completo la experiencia.",
    paragraphs: [
      "SANParks describe Kruger como un parque de casi 2 millones de hectáreas y ofrece varias formas de visitarlo: conducir con vehículo propio, alojarse en campamentos públicos o elegir lodges privados. La decisión no es solo económica; define cuánto control tienes sobre el ritmo y qué tipo de safari vas a vivir.",
      "Por eso tiene sentido tratar Kruger como una pieza propia dentro de un viaje por Sudáfrica. Ciudad del Cabo, Garden Route y safari pueden convivir en la misma ruta, pero no se organizan con la misma lógica.",
    ],
    highlights: [
      {
        title: "Piensa en zonas, no en una lista de animales",
        description:
          "El objetivo es construir un ritmo que permita observar, desplazarte y descansar sin convertir cada día en una persecución.",
        type: "decision",
      },
      {
        title: "La entrada no es el viaje completo",
        description:
          "Las puertas, campamentos, carreteras internas y horarios condicionan cuánto tiempo real tendrás para observar fauna.",
        type: "important",
      },
    ],
  },
  {
    id: "coche-o-guiado",
    number: "02",
    title: "¿Coche de alquiler o safari guiado?",
    category: "planning",
    intro:
      "Kruger permite visitar el parque con vehículo propio y también ofrece game drives guiados. No son experiencias equivalentes.",
    paragraphs: [
      "Con coche propio tienes libertad para decidir cuándo parar y cuánto tiempo dedicar a una escena. Es una buena herramienta cuando disfrutas leyendo el paisaje y aceptas que algunos avistamientos requieren paciencia.",
      "SANParks ofrece salidas guiadas de mañana, tarde y noche, además de otras opciones bajo disponibilidad. Las salidas guiadas aportan interpretación del entorno y permiten ampliar la experiencia más allá de la conducción autónoma.",
      "Una combinación de ambos formatos puede tener sentido: autonomía para explorar y alguna salida guiada para cambiar de perspectiva. No hace falta convertir todo el viaje en un safari organizado.",
    ],
    highlights: [
      {
        title: "Coche",
        description:
          "Más autonomía y capacidad para adaptar el ritmo, pero también más responsabilidad sobre horarios, combustible, orientación y conducción.",
        type: "decision",
      },
      {
        title: "Guiado",
        description:
          "Menos control sobre el ritmo y más interpretación del entorno. Las salidas de mañana, tarde y noche tienen objetivos diferentes.",
        type: "decision",
      },
      {
        title: "No hace falta elegir para todo el viaje",
        description:
          "La mezcla de formatos puede ser más útil que apostar por uno solo.",
        type: "tip",
      },
    ],
  },
  {
    id: "donde-dormir",
    number: "03",
    title: "Dónde dormir importa tanto como dónde entrar.",
    category: "practical",
    intro:
      "En Kruger no compensa pensar el alojamiento como un simple lugar donde pasar la noche.",
    paragraphs: [
      "SANParks gestiona campamentos principales, campamentos más pequeños y otras modalidades de alojamiento dentro del parque. La propia ubicación de cada campamento cambia el punto de partida de tus jornadas.",
      "Elegir el alojamiento después de decidir qué zonas quieres recorrer suele producir una ruta más coherente que escoger primero el hotel y adaptar después todo lo demás.",
      "Si quieres una experiencia más exclusiva, existen también lodges privados en el ecosistema de Kruger. Conviene decidir qué valoras más: autonomía, servicios, proximidad a una zona concreta o una experiencia guiada más cerrada.",
    ],
    highlights: [
      {
        title: "Primero la geografía",
        description:
          "Decide qué parte de Kruger quieres explorar y después busca el alojamiento que evita trayectos innecesarios.",
        type: "decision",
      },
      {
        title: "Campamento público",
        description:
          "Puede ofrecer más sensación de viaje autónomo y mayor variedad de configuraciones de alojamiento.",
        type: "experience",
      },
      {
        title: "Lodge privado",
        description:
          "Puede simplificar servicios y actividades, pero responde a una lógica distinta de la del self-drive.",
        type: "experience",
      },
    ],
  },
  {
    id: "cuantos-dias",
    number: "04",
    title: "Cuántas noches dedicar a Kruger.",
    category: "planning",
    intro:
      "Para un primer viaje, suele ser más útil pensar en noches y ritmo que en el número teórico de safaris.",
    paragraphs: [
      "Tres noches ya permiten empezar a entender el ritmo del parque; cuatro o cinco dan más margen para cambiar de zona, alternar actividades y asumir que algunos días serán más tranquilos que otros.",
      "Cuando el safari es uno de los motivos centrales del viaje, añadir noches puede aportar más que intentar encajar una nueva región de Sudáfrica a toda costa.",
      "Nuestro criterio: no diseñes Kruger como un paréntesis entre dos vuelos. Dale continuidad suficiente para que la observación no dependa de acertar un único día.",
    ],
    highlights: [
      {
        title: "3 noches",
        description:
          "Primera toma de contacto cuando el resto del viaje pesa mucho en la ruta.",
        type: "tip",
      },
      {
        title: "4–5 noches",
        description:
          "Más margen para cambiar de zona, descansar y asumir que la fauna no funciona con horarios de museo.",
        type: "decision",
      },
    ],
  },
  {
    id: "fauna-real",
    number: "05",
    title: "Los Big Five no son una lista de tareas.",
    category: "experience",
    intro:
      "Kruger es famoso por su fauna, pero la calidad de un safari no debería medirse solo por cuántas especies puedes marcar.",
    paragraphs: [
      "SANParks destaca el león, leopardo, elefante, rinoceronte y búfalo como los conocidos Big Five. Eso ayuda a entender la riqueza del parque, pero no convierte cada salida en un catálogo de avistamientos garantizados.",
      "La experiencia también está en aprender a leer el paisaje, observar comportamiento y aceptar que un día puede tener menos encuentros espectaculares y aun así ser un buen día de safari.",
    ],
    highlights: [
      {
        title: "No prometas fauna",
        description:
          "Nadie puede garantizar qué animales aparecerán en una salida concreta.",
        type: "important",
      },
      {
        title: "Mira también lo pequeño",
        description:
          "Impala, aves, primates, reptiles y cambios del paisaje forman parte del viaje y ayudan a entender el ecosistema.",
        type: "experience",
      },
    ],
  },
  {
    id: "entradas-y-planificacion",
    number: "06",
    title: "Puertas, reservas y horarios: la parte que no se ve en las fotos.",
    category: "practical",
    intro:
      "El mapa del parque es parte de la planificación. No basta con saber qué campamento te gusta.",
    paragraphs: [
      "SANParks publica información sobre puertas de entrada, accesos, mapas, distancias y tiempos de viaje internos. Antes de cerrar la ruta conviene comprobar qué puerta corresponde al alojamiento y cuánto margen necesitas para llegar.",
      "Los visitantes de un día también pueden acceder, pero SANParks advierte de que existe un umbral diario de visitantes y que en momentos de máxima afluencia puede priorizarse el acceso de quienes tienen alojamiento reservado dentro del parque.",
      "Las salidas guiadas tienen horarios que pueden variar según la época del año. Revisa la información oficial más cerca del viaje y evita encadenar actividades críticas sin margen.",
    ],
    highlights: [
      {
        title: "Comprueba la puerta real",
        description:
          "La puerta determina buena parte del tiempo de carretera que tendrás que asumir antes incluso de empezar el safari.",
        type: "decision",
      },
      {
        title: "No diseñes el día al minuto",
        description:
          "Deja margen para retrasos, animales en carretera, controles y cambios de ritmo.",
        type: "important",
      },
    ],
  },
  {
    id: "salud-seguridad",
    number: "07",
    title: "Salud, seguridad y decisiones que conviene revisar antes de salir.",
    category: "practical",
    intro:
      "En un parque de fauna salvaje, la prudencia forma parte del diseño del viaje.",
    paragraphs: [
      "Sigue las normas del parque y las instrucciones de los guías. No conviertas un acercamiento a la fauna en una escena para conseguir una fotografía.",
      "Para cuestiones sanitarias, consulta antes del viaje las recomendaciones oficiales y la situación de las enfermedades relevantes para la zona. SANParks identifica Kruger como área de malaria en determinadas actividades y zonas; la prevención sanitaria debe individualizarse con fuentes médicas oficiales.",
      "Mantén también una revisión específica de las condiciones de acceso y de los avisos vigentes antes de entrar. Las reglas del parque y las circunstancias del momento pueden cambiar.",
    ],
    highlights: [
      {
        title: "La seguridad manda",
        description:
          "La distancia, las normas del parque y las indicaciones de los profesionales están por encima de la fotografía.",
        type: "important",
      },
      {
        title: "Salud antes de viajar",
        description:
          "Contrasta recomendaciones sanitarias actuales con fuentes oficiales y profesionales de salud.",
        type: "important",
      },
    ],
  },
];

export const krugerGuideFaq: FAQItem[] = [
  {
    question: "¿Es mejor hacer safari con coche propio o contratar un guía?",
    answer:
      "No son opciones excluyentes. El coche da autonomía y las salidas guiadas aportan interpretación del entorno y horarios diferentes; una combinación puede funcionar especialmente bien.",
    category: "transport",
  },
  {
    question: "¿Cuántas noches dedicar a Kruger?",
    answer:
      "Para una primera experiencia, tres noches permiten una toma de contacto y cuatro o cinco noches dejan más margen para cambiar de zona y aceptar el ritmo real del parque.",
    category: "planning",
  },
  {
    question: "¿Dónde conviene dormir?",
    answer:
      "Primero decide qué zonas quieres recorrer y después elige campamentos o alojamientos que reduzcan desplazamientos innecesarios. La ubicación debe formar parte de la decisión.",
    category: "planning",
  },
  {
    question: "¿Hay que contratar un safari guiado?",
    answer:
      "No necesariamente. SANParks permite visitar el parque con vehículo propio y también ofrece game drives guiados de distintos tipos y horarios.",
    category: "transport",
  },
  {
    question: "¿Se pueden ver los Big Five?",
    answer:
      "Es posible encontrar las especies que forman los Big Five, pero ningún safari serio debería presentar los avistamientos como garantizados.",
    category: "general",
  },
];

export const krugerGuideEditorialNote =
  "Revisada el 18 de septiembre de 2026. Las normas de entrada, horarios, disponibilidad, actividades y recomendaciones sanitarias deben comprobarse de nuevo antes del viaje.";
