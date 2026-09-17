import type { GuideSection, GuideSource } from "./types";

const REVIEWED_AT = "2026-09-17";

const visitNorwaySource: GuideSource = {
  label: "Visit Norway — Northern Lights y Tromsø",
  url: "https://www.visitnorway.com/places-to-go/northern-norway/tromso/winter/",
  type: "official",
  accessedAt: REVIEWED_AT,
};

const visitSwedenSource: GuideSource = {
  label: "Visit Sweden — Abisko, Kiruna y auroras",
  url: "https://visitsweden.com/where-to-go/northern-sweden/arctic-sweden/abisko-and-northern-lights/",
  type: "official",
  accessedAt: REVIEWED_AT,
};

const visitFinlandSource: GuideSource = {
  label: "Visit Finland — Laponia y Rovaniemi",
  url: "https://www.visitfinland.com/en/places-to-go/lapland/rovaniemi/",
  type: "official",
  accessedAt: REVIEWED_AT,
};

const noaaAuroraSource: GuideSource = {
  label: "NOAA / Space Weather Prediction Center — Aurora",
  url: "https://www.spaceweather.gov/content/aurora-tutorial",
  type: "official",
  accessedAt: REVIEWED_AT,
};

const myAuroraForecastSource: GuideSource = {
  label: "My Aurora Forecast & Alerts",
  url: "https://play.google.com/store/apps/details?id=com.jrustonapps.myauroraforecast",
  type: "primary",
  accessedAt: REVIEWED_AT,
};

const helloAuroraSource: GuideSource = {
  label: "Hello Aurora — Aurora Forecast",
  url: "https://hello-aurora.com/feature/aurora-forecast",
  type: "primary",
  accessedAt: REVIEWED_AT,
};

const spaceWeatherLiveSource: GuideSource = {
  label: "SpaceWeatherLive — Aurora Alerts",
  url: "https://www.spaceweatherlive.com/en/aurora-alerts.html",
  type: "primary",
  accessedAt: REVIEWED_AT,
};

const meteoblueSource: GuideSource = {
  label: "meteoblue — Astronomy Seeing",
  url: "https://content.meteoblue.com/en/private-customers/website-help/outdoor-and-sports/astronomy-seeing",
  type: "primary",
  accessedAt: REVIEWED_AT,
};

type SectionOverride = Omit<GuideSection, "number">;

const section = (
  value: Omit<GuideSection, "number" | "reviewedAt" | "status">,
): SectionOverride => ({
  ...value,
  status: "published",
  reviewedAt: REVIEWED_AT,
});

export const aurorasSectionOverrides: SectionOverride[] = [
  section({
    id: "entender-el-destino",
    title: "Entender un viaje de auroras antes de reservar",
    category: "overview",
    intro:
      "Buscar auroras no significa reservar cualquier viaje al norte. La experiencia cambia mucho según la base, la oscuridad, el clima y lo que quieras hacer durante el día.",
    paragraphs: [
      "Tromsø permite combinar auroras con una ciudad ártica, fiordos, cultura, gastronomía y actividades de invierno. Visit Norway señala además que el invierno es temporada alta y que diciembre, enero y febrero concentran mucha demanda.",
      "Abisko y Kiruna ofrecen una experiencia más centrada en el paisaje ártico. Visit Sweden destaca Abisko por sus condiciones de observación y por su relación con el parque nacional, mientras Kiruna aporta una base con más servicios y conexiones.",
      "Rovaniemi y la Laponia finlandesa tienen otro planteamiento: auroras, naturaleza ártica y una oferta amplia de actividades de invierno, pero también una dimensión familiar y cultural muy marcada. La ciudad está en el Círculo Polar Ártico y tiene conexiones por avión, tren y carretera.",
    ],
    highlights: [
      {
        title: "Quiero una ciudad ártica",
        description:
          "Tromsø encaja cuando quieres combinar la búsqueda de auroras con restaurantes, cultura, excursiones y una base urbana viva.",
        type: "decision",
      },
      {
        title: "Quiero priorizar cielo y naturaleza",
        description:
          "Abisko y el entorno de Kiruna permiten plantear un viaje más centrado en paisaje, oscuridad y actividades al aire libre.",
        type: "decision",
      },
      {
        title: "Quiero muchas actividades alrededor",
        description:
          "Rovaniemi ofrece una combinación amplia de auroras, naturaleza, nieve y experiencias árticas alrededor de una ciudad con buenas conexiones.",
        type: "experience",
      },
    ],
    blocks: [
      {
        type: "source",
        label: "Fuentes oficiales",
        title: "Turismos nacionales de Noruega, Suecia y Finlandia",
        content:
          "La comparación de Tromsø, Abisko/Kiruna y Rovaniemi parte de las oficinas oficiales de turismo de cada país.",
        source: visitNorwaySource,
      },
    ],
    closing:
      "La elección no debería empezar por la foto de una aurora, sino por el tipo de viaje que quieres vivir alrededor de ella.",
  }),

  section({
    id: "zonas-y-ritmo",
    title: "Dónde dormir y cuánto moverse",
    category: "planning",
    intro:
      "En un viaje de auroras, cada desplazamiento nocturno y cada cambio de alojamiento puede restar tiempo de descanso y oportunidades de observación.",
    paragraphs: [
      "Tromsø funciona bien como base única cuando quieres salir a excursiones de auroras y volver a una ciudad con servicios. No hace falta convertir el viaje en una ruta larga para tener variedad durante el día.",
      "Kiruna y Abisko pueden combinarse en un viaje por el norte de Suecia. Abisko está aproximadamente a 100 kilómetros al oeste de Kiruna y cuenta con conexión por carretera y tren, por lo que la elección entre ambas bases depende mucho del peso que quieras dar al paisaje y a los servicios.",
      "Rovaniemi tiene sentido cuando valoras una base estable y una oferta amplia de actividades. La propia información turística finlandesa destaca sus conexiones por avión, tren y carretera y la posibilidad de combinar auroras con experiencias de naturaleza durante distintas épocas del año.",
    ],
    highlights: [
      {
        title: "Menos cambios puede ser mejor",
        description:
          "Dormir varias noches en una misma base permite repetir intentos de observación sin rehacer cada día la logística.",
        type: "tip",
      },
      {
        title: "La oscuridad importa",
        description:
          "Aléjate de la contaminación lumínica cuando sea necesario, pero valora siempre el coste real de cada desplazamiento nocturno.",
        type: "important",
      },
      {
        title: "El día también cuenta",
        description:
          "Trineos, raquetas, esquí, cultura, senderos o gastronomía hacen que el viaje siga teniendo sentido aunque una noche no haya aurora visible.",
        type: "decision",
      },
    ],
    closing:
      "La mejor base no es necesariamente la más remota: es la que permite repetir oportunidades de aurora sin sacrificar el resto del viaje.",
  }),

  section({
    id: "experiencias-que-merecen-espacio",
    title: "Qué hacer además de buscar auroras",
    category: "experience",
    intro:
      "Una buena escapada de auroras no debería depender de una sola noche perfecta.",
    paragraphs: [
      "En Tromsø puedes combinar la observación nocturna con trineos de perros, renos, esquí, teleférico, fiordos y propuestas culturales. Visit Norway presenta la ciudad precisamente como una mezcla de experiencias naturales y culturales durante el invierno.",
      "En Abisko y Kiruna el paisaje tiene más peso: parque nacional, montaña, nieve, fotografía, esquí y experiencias vinculadas al territorio ártico. Kiruna también permite acercarse a la cultura y tradiciones sami a través de propuestas locales.",
      "En Rovaniemi, la oferta se extiende desde auroras y naturaleza hasta museos, actividades invernales, gastronomía y experiencias relacionadas con la cultura de Laponia. Visit Finland también destaca la posibilidad de disfrutar de la región fuera del invierno, con senderismo, bicicleta y otros fenómenos naturales.",
    ],
    highlights: [
      {
        title: "Tromsø — naturaleza + ciudad",
        description:
          "Una buena opción cuando quieres que la aurora sea una parte importante del viaje, no su única razón.",
        type: "experience",
      },
      {
        title: "Abisko — paisaje + cielo",
        description:
          "Tiene sentido cuando la observación y el entorno natural son protagonistas y buscas reducir la luz artificial.",
        type: "experience",
      },
      {
        title: "Kiruna — base ártica completa",
        description:
          "Combina auroras con paisaje, actividades invernales, patrimonio local y acceso a Abisko.",
        type: "decision",
      },
      {
        title: "Rovaniemi — muchas capas",
        description:
          "Auroras, naturaleza, gastronomía, nieve, cultura y actividades para diferentes perfiles de viaje.",
        type: "experience",
      },
    ],
    blocks: [
      {
        type: "source",
        label: "Fuente oficial",
        title: visitSwedenSource.label,
        content:
          "Visit Sweden respalda la comparación de Abisko y Kiruna y sus condiciones de observación y acceso en el norte de Suecia.",
        source: visitSwedenSource,
      },
      {
        type: "source",
        label: "Fuentes oficiales",
        title: "Visit Norway, Visit Sweden y Visit Finland",
        content:
          "Usamos las oficinas nacionales de turismo para diferenciar el perfil de cada base y no presentar todas las experiencias árticas como equivalentes.",
        source: visitFinlandSource,
      },
    ],
    closing:
      "El viaje gana cuando cada día tiene interés propio y la aurora se convierte en el gran extra que puede aparecer por la noche.",
  }),

  section({
    id: "aumentar-las-probabilidades",
    title: "Cómo aumentar las probabilidades de ver auroras",
    category: "planning",
    intro:
      "No puedes controlar la aurora, pero sí puedes diseñar el viaje para tener más oportunidades y leer mejor las condiciones cuando estés allí.",
    paragraphs: [
      "No pienses en una regla fija de diez años. El ciclo solar dura aproximadamente 11 años y su duración puede variar; alrededor del máximo solar aumenta la actividad del Sol y, con ella, suelen darse más episodios de actividad geomagnética y auroral. Aun así, el propio NOAA recuerda que el ciclo no garantiza una temporada concreta y que también puede haber auroras moderadas durante el mínimo solar.",
      "Las previsiones tampoco sirven todas para lo mismo. NOAA explica que una parte de la actividad puede anticiparse con alrededor de un día y que existe una referencia aproximada de 27 días relacionada con la rotación solar; cuanto más cerca estás del momento de observar, más útil resulta combinar la previsión de actividad geomagnética con las condiciones locales.",
      "Para el viaje, conviene usar varias herramientas en lugar de confiar en una sola. My Aurora Forecast ofrece índices y alertas; Hello Aurora combina actividad geomagnética y nubosidad local; SpaceWeatherLive permite recibir alertas de actividad espacial; y para las nubes puedes contrastar Meteoblue Astronomy Seeing o Windy, especialmente la cobertura de nubes y la previsión por capas. Son ayudas para decidir cuándo salir, no garantías de avistamiento.",
      "Una rutina sencilla funciona mejor: durante la planificación larga mira la actividad solar como contexto; al acercarte al viaje vigila las previsiones de varios días; y cada noche cruza actividad auroral, nubosidad, oscuridad y tu ubicación. NOAA dispone además de un pronóstico auroral de corto plazo basado en OVATION para aproximadamente los siguientes 30 a 90 minutos.",
    ],
    highlights: [
      {
        title: "El ciclo solar es contexto, no calendario",
        description:
          "El máximo solar puede favorecer más actividad auroral, pero no significa que cada once años tengas una semana garantizada de auroras.",
        type: "important",
      },
      {
        title: "Las nubes pueden arruinar una buena previsión",
        description:
          "Una actividad geomagnética excelente sirve de poco si una capa de nubes tapa el cielo; revisa la cobertura local antes de salir.",
        type: "decision",
      },
      {
        title: "Combina fuentes",
        description:
          "Una app para la aurora y otra previsión meteorológica te dan una lectura más útil que mirar solo el Kp.",
        type: "tip",
      },
      {
        title: "Reserva varias noches",
        description:
          "Tener varias oportunidades reduce la dependencia de una única noche y permite reaccionar mejor si cambia la nubosidad.",
        type: "decision",
      },
    ],
    blocks: [
      {
        type: "source",
        label: "Fuente oficial",
        title: "NOAA / Space Weather Prediction Center",
        content:
          "Usamos NOAA para explicar el ciclo solar, el horizonte de previsión de la actividad auroral y la diferencia entre predicciones a largo y corto plazo.",
        source: noaaAuroraSource,
      },
      {
        type: "source",
        label: "Herramienta",
        title: "My Aurora Forecast & Alerts",
        content:
          "Puede mostrar actividad auroral, previsiones y alertas para decidir cuándo merece la pena salir a observar.",
        source: myAuroraForecastSource,
      },
      {
        type: "source",
        label: "Herramienta",
        title: "Hello Aurora",
        content:
          "Combina actividad geomagnética con condiciones locales, incluida la nubosidad, para estimar las posibilidades de observación.",
        source: helloAuroraSource,
      },
      {
        type: "source",
        label: "Herramienta",
        title: "SpaceWeatherLive",
        content:
          "Permite configurar alertas de actividad geomagnética y otros eventos de clima espacial.",
        source: spaceWeatherLiveSource,
      },
      {
        type: "source",
        label: "Meteorología del cielo",
        title: "meteoblue Astronomy Seeing",
        content:
          "Ayuda a revisar la cobertura de nubes por capas y otras condiciones de visibilidad del cielo. Windy es otra alternativa útil para consultar nubes y cobertura local.",
        source: meteoblueSource,
      },
    ],
    closing:
      "La clave no es encontrar una app que diga que habrá aurora, sino cruzar actividad solar, cielo despejado, oscuridad y tiempo suficiente para intentarlo varias noches.",
  }),

  section({
    id: "errores-a-evitar",
    title: "Errores que empobrecen un viaje de auroras",
    category: "planning",
    intro:
      "La principal trampa es tratar un fenómeno natural como si fuera una atracción con horario garantizado.",
    paragraphs: [
      "Ninguna planificación puede asegurar que habrá aurora una noche concreta. La visibilidad depende de nubosidad, oscuridad y actividad geomagnética, además de las condiciones locales. Las propias fuentes oficiales y proveedores de turismo advierten de que el fenómeno no puede garantizarse.",
      "Otro error es dedicar todos los días a perseguir el cielo sin dejar tiempo para conocer la región. Una ruta demasiado móvil también puede generar más cansancio que oportunidades reales de observación.",
      "Por último, conviene planificar ropa, transporte y conducción con especial cuidado. Visit Norway advierte de que la conducción invernal puede implicar hielo, nieve, oscuridad y baja visibilidad.",
    ],
    highlights: [
      {
        title: "No compres una garantía",
        description:
          "Una experiencia organizada puede optimizar la búsqueda, pero nadie puede garantizar que el fenómeno aparezca.",
        type: "warning",
      },
      {
        title: "No persigas el cielo cada noche",
        description:
          "Una buena base y varias oportunidades suelen ser más razonables que cambiar continuamente de alojamiento.",
        type: "tip",
      },
      {
        title: "No subestimes el frío",
        description:
          "Esperar una aurora significa pasar tiempo al exterior de noche; ropa, calzado y protección adecuada forman parte del diseño del viaje.",
        type: "important",
      },
    ],
    blocks: [
      {
        type: "source",
        label: "Fuente oficial",
        title: visitNorwaySource.label,
        content:
          "La información oficial de Noruega recuerda que las condiciones árticas pueden dificultar la conducción durante la temporada fría y que la aurora es un fenómeno natural no garantizado.",
        source: visitNorwaySource,
      },
    ],
    closing:
      "La planificación inteligente no intenta controlar la aurora: prepara suficientes oportunidades para verla y construye un buen viaje aunque esa noche no aparezca.",
  }),
];