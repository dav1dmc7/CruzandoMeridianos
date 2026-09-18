import type {
  DestinationEntryRequirements,
  DestinationFitProfile,
  DestinationGuide,
  DestinationSnapshot,
  FAQItem,
  GuideDurationOption,
  GuideSection,
  GuideSource,
  GuideMonitoringConfig,
  TravelerRequirement,
  TravelAlert,
} from "./types";

const REVIEWED_AT = "2026-09-15";
const NEXT_REVIEW = "2026-12-15";

interface DestinationSpec {
  slug: string;
  name: string;
  country: string;
  title: string;
  subtitle: string;
  intro: string;
  officialLabel: string;
  officialUrl: string;
  maecUrl: string;
  snapshot: DestinationSnapshot;
  fit: DestinationFitProfile;
  decision: string;
  regions: string;
  transport: string;
  season: string;
  tradeoff: string;
  experience: string;
  avoid: string;
  durations: Array<[number, string, string, boolean?]>;
  visaRequirement: TravelerRequirement["visaRequirement"];
  entryNotes: string[];
  alerts?: TravelAlert[];
  extraSources?: GuideSource[];
  faqs: Array<[string, string]>;
}

const source = (label: string, url: string, type: GuideSource["type"] = "official"): GuideSource => ({
  label,
  url,
  type,
  accessedAt: REVIEWED_AT,
});

const buildGuide = (spec: DestinationSpec): DestinationGuide => {
  const official = source(spec.officialLabel, spec.officialUrl);
  const maec = source(`MAEC — Recomendaciones de viaje para ${spec.country}`, spec.maecUrl, "official");
  const sources = [official, maec, ...(spec.extraSources ?? [])];

  const traveler: TravelerRequirement = {
    countryCode: "ES",
    countryName: "España",
    region: "europe",
    visaRequirement: spec.visaRequirement,
    passportRequirement: "Documento de viaje válido durante el viaje. Comprueba siempre las condiciones concretas del destino antes de salir.",
    onwardTravelRequired: false,
    yellowFeverRelevant: false,
    notes: spec.entryNotes,
    source: maec,
    lastReviewed: REVIEWED_AT,
  };

  const entryRequirements: DestinationEntryRequirements = {
    defaultCountryCode: "ES",
    defaultCountryName: "España",
    travelers: [traveler],
    lastReviewed: REVIEWED_AT,
    legalSource: maec,
    disclaimer: "Los requisitos migratorios, sanitarios y de documentación pueden cambiar. Esta ficha sirve para orientarte; la fuente oficial y la autoridad competente prevalecen siempre.",
  };

  const sections: GuideSection[] = [
    {
      id: "entender-el-destino",
      number: "01",
      title: `Entender ${spec.name} antes de reservar`,
      category: "overview",
      intro: spec.decision,
      paragraphs: [
        spec.intro,
        `La primera decisión no es qué ver, sino qué tipo de viaje quieres que sea. ${spec.regions}`,
        spec.tradeoff,
      ],
      highlights: [
        { title: "La idea clave", description: spec.decision, type: "decision" },
        { title: "El encaje importa", description: `${spec.fit.title}: ${spec.fit.intro}`, type: "important" },
      ],
      closing: "Una buena guía no te da una lista infinita: te ayuda a entender qué merece espacio y qué puedes dejar fuera.",
      status: "published",
      reviewedAt: REVIEWED_AT,
    },
    {
      id: "zonas-y-ritmo",
      number: "02",
      title: "Zonas, distancias y ritmo",
      category: "planning",
      intro: "El mapa debe servir al viaje, no al revés.",
      paragraphs: [
        spec.regions,
        `La variable invisible suele ser el ritmo. ${spec.transport}`,
        "Cuando un destino combina varias regiones, conviene agrupar por lógica geográfica y por experiencia, dejando margen para que el viaje no se convierta en una carrera entre puntos de interés.",
      ],
      highlights: [
        { title: "Piensa en bloques", description: "Agrupar zonas reduce traslados y hace que cada estancia tenga una personalidad más clara.", type: "tip" },
        { title: "No optimices solo kilómetros", description: "Un trayecto puede ser corto en el mapa y caro en atención, tiempo o energía.", type: "important" },
      ],
      status: "published",
      reviewedAt: REVIEWED_AT,
    },
    {
      id: "donde-alojarse",
      number: "03",
      title: "Dónde alojarse y cómo elegir zona",
      category: "planning",
      intro: "La ubicación del alojamiento puede cambiar más el viaje que una diferencia de categoría entre hoteles.",
      paragraphs: [
        `No queremos darte aquí una lista de hoteles para ${spec.name}. Lo útil antes de reservar es entender qué estás comprando con cada zona: cercanía a lo que quieres hacer, facilidad para moverte, ambiente, tiempo de ida y vuelta y libertad para improvisar.`,
        `En ${spec.name}, la base debería salir de las prioridades del viaje. ${spec.regions}`,
        `También importa la logística. ${spec.transport} Cambiar de alojamiento demasiado a menudo puede parecer eficiente sobre el mapa y acabar robando tiempo de viaje, maletas y energía.`,
      ],
      highlights: [
        {
          title: "Primero la zona, después el hotel",
          description: "Una habitación mejor situada puede mejorar mucho más el viaje que otra con más servicios pero peor encaje con la ruta.",
          type: "decision",
        },
        {
          title: "No cambies de base por inercia",
          description: "Cada mudanza tiene un coste real: check-out, equipaje, trayecto y tiempo que deja de estar disponible para disfrutar del destino.",
          type: "important",
        },
      ],
      closing: "La guía te enseña qué variables comparar. La elección final de zona y alojamiento depende de tus fechas, presupuesto y forma de viajar.",
      status: "published",
      reviewedAt: REVIEWED_AT,
    },
    {
      id: "cuando-ir",
      number: "04",
      title: "Cuándo ir y qué cambia con la fecha",
      category: "planning",
      intro: "La temporada modifica precios, luz, clima, actividad y disponibilidad.",
      paragraphs: [
        spec.season,
        "No buscamos un falso mes perfecto. Buscamos qué condiciones favorecen el viaje que tienes en mente y qué compromisos aparecen fuera de esa ventana.",
        "En destinos urbanos la estacionalidad puede venir de eventos, exposiciones y demanda; en destinos de naturaleza, de clima, fauna, nieve, mar o accesibilidad.",
      ],
      highlights: [
        { title: "La fecha cambia la experiencia", description: spec.season, type: "decision" },
        { title: "Reserva donde el calendario manda", description: "Alojamientos singulares, parques, trenes, actividades y experiencias con aforo limitado merecen una revisión temprana.", type: "tip" },
      ],
      status: "published",
      reviewedAt: REVIEWED_AT,
    },
    {
      id: "experiencias-que-merecen-espacio",
      number: "05",
      title: "Qué experiencias merecen espacio",
      category: "experience",
      intro: "No todas las atracciones tienen el mismo peso en un viaje.",
      paragraphs: [
        spec.experience,
        "Diferenciamos entre iconos imprescindibles, experiencias que justifican un desplazamiento y descubrimientos que funcionan mejor cuando ya estás en la zona.",
        `Nuestro criterio para ${spec.name} es priorizar profundidad antes que acumulación: una experiencia bien elegida suele aportar más que tres visitas hechas con prisa.`,
      ],
      highlights: [
        { title: "Lo icónico no sobra", description: "Lo importante es entender cuándo un icono justifica el tiempo y cuándo se convierte en un trámite.", type: "experience" },
        { title: "Deja hueco", description: "El espacio libre permite absorber cambios de tiempo, energía y ritmo sin romper toda la ruta.", type: "tip" },
      ],
      status: "published",
      reviewedAt: REVIEWED_AT,
    },
    {
      id: "como-moverse",
      number: "06",
      title: "Cómo moverse sin complicar el viaje",
      category: "practical",
      intro: "El medio de transporte correcto depende del tipo de destino y de la experiencia buscada.",
      paragraphs: [
        spec.transport,
        "La comparación útil no es solo precio: también cuentan frecuencia, tiempos reales, aparcamiento, comodidad con equipaje, conducción, conexiones y cuánto condiciona cada opción a la libertad del viaje.",
        "En una planificación premium, transporte y alojamiento se deciden juntos porque ambos determinan el ritmo.",
      ],
      highlights: [
        { title: "No hay una respuesta universal", description: "Algunas rutas piden coche; otras mejoran radicalmente con tren, transporte público, vuelos internos o traslados puntuales.", type: "decision" },
        { title: "Reduce cambios innecesarios", description: "Cada traslado adicional consume una parte del día que puede valer más que el ahorro conseguido.", type: "tip" },
      ],
      status: "published",
      reviewedAt: REVIEWED_AT,
    },
    {
      id: "encaja-contigo",
      number: "07",
      title: "¿Este destino encaja contigo?",
      category: "planning",
      intro: spec.fit.intro,
      paragraphs: [
        `Suele funcionar especialmente bien para: ${spec.fit.goodFor.join("; ")}.`,
        `Puede encajar peor si: ${spec.fit.notFor.join("; ")}.`,
        spec.tradeoff,
      ],
      status: "published",
      reviewedAt: REVIEWED_AT,
    },
    {
      id: "errores-a-evitar",
      number: "08",
      title: "Errores que empobrecen el viaje",
      category: "planning",
      intro: "La mejor planificación también consiste en saber qué no hacer.",
      paragraphs: [
        spec.avoid,
        "Otro error frecuente es intentar reproducir una ruta ajena sin comprobar si encaja con las fechas, el ritmo, el presupuesto o la forma de viajar de la persona que la copia.",
        "Aquí preferimos explicar la lógica de la decisión para que el lector pueda adaptarla a su propio caso.",
      ],
      highlights: [
        { title: "Menos puntos, más intención", description: "La selección es una herramienta de diseño, no una renuncia.", type: "important" },
        { title: "No copies una ruta por defecto", description: "Una buena ruta responde a unas circunstancias concretas.", type: "warning" },
      ],
      closing: "La diferencia entre un viaje correcto y un viaje muy bien diseñado suele estar en las decisiones pequeñas que se toman antes de reservar.",
      status: "published",
      reviewedAt: REVIEWED_AT,
    },
    {
      id: "informacion-practica-y-alertas",
      number: "09",
      title: "Información práctica y actualidad",
      category: "updates",
      intro: "La parte más sensible de una guía es la que puede cambiar.",
      paragraphs: [
        "Revisamos documentación, recomendaciones de viaje y cuestiones prácticas separándolas del criterio editorial. Cuando una decisión depende de una regla temporal, la fuente oficial prevalece.",
        "Esta página no sustituye una consulta oficial, pero sí intenta señalar qué merece una comprobación antes de cerrar reservas.",
      ],
      blocks: [
        { type: "source", title: "Fuentes consultadas", items: sources.map((item) => item.label) },
        { type: "important", title: "Última revisión", content: `Datos editoriales y fuentes consultados el ${REVIEWED_AT}. Próxima revisión planificada: ${NEXT_REVIEW}.` },
      ],
      status: "published",
      reviewedAt: REVIEWED_AT,
    },
    {
      id: "preguntas-frecuentes",
      number: "10",
      title: "Preguntas frecuentes",
      category: "practical",
      intro: `Preguntas concretas que suelen aparecer al planificar un viaje a ${spec.name}.`,
      paragraphs: [
        "Aquí respondemos dudas de planificación que ayudan a decidir fechas, duración, transporte y ritmo antes de reservar.",
        "Las respuestas se apoyan en la propia guía y, cuando una cuestión puede cambiar, en las fuentes que indicamos en ella.",
      ],
      status: "published",
      reviewedAt: REVIEWED_AT,
    },
  ];

  const durationOptions: GuideDurationOption[] = spec.durations.map(([days, title, description, featured]) => ({ days, title, description, featured }));
  const [firstDuration] = spec.durations;
  const lastDuration = spec.durations[spec.durations.length - 1];
  const searchFaqs: Array<[string, string]> = [
    [
      `¿Cuántos días necesito para viajar a ${spec.name}?`,
      `Como referencia, esta guía plantea opciones desde ${firstDuration[0]} días (${firstDuration[1].toLowerCase()}) hasta ${lastDuration[0]} días (${lastDuration[1].toLowerCase()}). La duración adecuada depende de las zonas que quieras combinar y del ritmo que quieras llevar.`,
    ],
    [
      `¿Cuál es la mejor época para viajar a ${spec.name}?`,
      spec.season,
    ],
    [
      `¿En qué zona conviene alojarse en ${spec.name}?`,
      `No hay una zona universalmente correcta. La elección depende de qué quieras priorizar, cuánto tiempo tengas, cómo te muevas y cuánto valor tenga para ti estar cerca de unas experiencias u otras. En ${spec.name}, ${spec.regions}`,
    ],
    [
      `¿Cómo moverse por ${spec.name} y hace falta coche?`,
      `${spec.transport} En las zonas donde el transporte público resuelve bien los desplazamientos, el coche puede aportar poco; fuera de esos ejes, la flexibilidad puede justificarlo.`,
    ],
  ];
  const faqPairs = [
    ...spec.faqs.filter(([question]) => !/hace falta coche|cómo moverse/i.test(question)),
    ...searchFaqs,
  ].filter((entry, index, entries) =>
      entries.findIndex(([question]) => question === entry[0]) === index,
    )
    .slice(0, 6);
  const faq: FAQItem[] = faqPairs.map(([question, answer]) => ({ question, answer, category: "planning", reviewedAt: REVIEWED_AT }));

  const monitoring: GuideMonitoringConfig = {
    enabled: true,
    cadence: "weekly",
    sources: [maec],
    monitoredAlertTypes: ["entrada", "seguridad", "salud", "clima", "transporte"],
    lastCheckedAt: REVIEWED_AT,
  };

  return {
    slug: spec.slug,
    title: spec.title,
    subtitle: spec.subtitle,
    intro: spec.intro,
    editorial: {
      status: "published",
      updatedAt: REVIEWED_AT,
      author: "Cruzando Meridianos",
      nextReviewAt: NEXT_REVIEW,
      factsCheckedAt: REVIEWED_AT,
    },
    snapshot: spec.snapshot,
    fit: spec.fit,
    sections,
    durationOptions,
    alerts: spec.alerts ?? [],
    monitoring,
    entryRequirements,
    faq,
    sources,
    commercial: {
      publicPromise: "Entender el destino, sus decisiones y sus principales compromisos antes de reservar.",
      premiumPromise: "Cruzar tiempo, presupuesto, ritmo, intereses y logística para construir una propuesta realmente personal.",
      publicDoesNotInclude: ["Itinerario privado completo", "Selección final de hoteles para un caso concreto", "Investigación personalizada de reservas y alternativas"],
      premiumIncludes: ["Investigación aplicada a tu caso", "Ruta y ritmo coherentes", "Opciones filtradas", "Decisiones explicadas y alternativas"],
    },
    cta: {
      title: `¿Quieres llevar ${spec.name} a tu caso concreto?`,
      description: "La guía te ayuda a decidir qué variables importan. Nuestro trabajo empieza cuando hay que cruzarlas para una persona, unas fechas y una forma concreta de viajar.",
      buttonLabel: "Cuéntanos tu viaje",
      buttonHref: "/cuentatuviaje",
    },
  };
};

const specs: DestinationSpec[] = [
  {
    slug: "sudafrica", name: "Sudáfrica", country: "Sudáfrica",
    title: "Guía de Sudáfrica: safari, costa y grandes contrastes | Cruzando Meridianos",
    subtitle: "Cómo pensar un viaje a Sudáfrica sin intentar convertir un país enorme en una colección de paradas.",
    intro: "Sudáfrica permite combinar safari, ciudad, costa, montaña, vino y carretera. Su valor está precisamente en el contraste, pero esa variedad obliga a decidir qué parte del país merece el protagonismo.",
    officialLabel: "South African Tourism", officialUrl: "https://www.southafrica.net/", maecUrl: "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Sud%C3%A1frica",
    snapshot: { climateSummary: "El clima cambia mucho entre regiones; la temporada útil depende de safari, costa y ruta.", travelStyle: "Gran viaje de contrastes con posibilidad de conducción y vuelos internos.", mainStrengths: ["Safari", "Paisaje", "Ciudad", "Carretera"], mainConsiderations: ["Distancias", "Seguridad", "Logística regional"] },
    fit: { title: "Sudáfrica pide variedad con criterio", intro: "Encaja especialmente bien cuando quieres un viaje con varios registros y aceptas cierta complejidad logística.", goodFor: ["quien quiere combinar naturaleza y ciudad", "viajes con coche y tramos regionales", "quien disfruta de contrastes"], notFor: ["quien busca una isla-resort sencilla", "quien no quiere planificar seguridad y movimientos"] },
    decision: "La gran decisión es cuánto protagonismo tendrá el safari frente a ciudad, costa y carretera.", regions: "Kruger y otros espacios de fauna, Ciudad del Cabo, Garden Route y regiones vinícolas pueden formar viajes muy distintos.", transport: "El coche da libertad en ciertas regiones, pero no todo el país conviene recorrerlo por carretera; la combinación de vuelos internos y coche suele ser más eficiente.", season: "La temporada de safari y la meteorología de cada costa no coinciden necesariamente, así que la fecha debe elegirse a partir de las prioridades.", tradeoff: "Cuanto más ambicioso sea el recorrido, más importancia adquiere dejar días de transición y no encadenar vuelos, safaris y conducción larga.", experience: "Safari, montaña alrededor de Ciudad del Cabo, costa y gastronomía son piezas suficientemente fuertes como para no necesitar una lista interminable de atracciones.", avoid: "Intentar unir demasiadas regiones en una sola ruta y subestimar los tiempos entre aeropuertos, reservas y alojamientos.", durations: [[7,"Sudáfrica concentrada","Una primera aproximación con foco claro y pocas regiones.",true],[10,"Contrastes","Permite combinar naturaleza y ciudad con algo más de aire."],[14,"Gran viaje","Da margen para unir más de un paisaje sin correr."],[18,"Profundidad","Más espacio para safari, costa y carretera sin convertirlos en trámites."]], visaRequirement: "none", entryNotes: ["Los requisitos para españoles deben comprobarse antes de viajar en las fuentes sudafricanas y MAEC.", "Desde julio de 2026 Sudáfrica exige declaración aduanera electrónica a viajeros que entren o salgan por puestos fronterizos habilitados; comprueba el procedimiento vigente."], alerts: [{ id:"za-2026-07-customs", date:"2026-07-01", type:"entrada", severity:"medium", title:"Declaración aduanera electrónica", description:"Sudáfrica ha introducido una declaración aduanera electrónica para viajeros; debe comprobarse y completarse dentro del plazo indicado por las autoridades.", source:"https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Sud%C3%A1frica", sourceLabel:"MAEC — Sudáfrica", sourceType:"official", active:true, checkedAt:REVIEWED_AT, travelerAction:"Revisa el procedimiento antes de la salida." }, { id:"za-2026-security", date:REVIEWED_AT, type:"seguridad", severity:"high", title:"Seguridad: planificación realista", description:"El MAEC recomienda extremar las precauciones y abstenerse de determinadas zonas por el alto nivel de delincuencia.", source:"https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Sud%C3%A1frica", sourceLabel:"MAEC — Sudáfrica", sourceType:"official", active:true, checkedAt:REVIEWED_AT, travelerAction:"Consulta la recomendación oficial antes de reservar y sigue las indicaciones locales." }], faqs: [["¿Se puede recorrer Sudáfrica en coche?","En determinadas regiones sí, y puede ser una gran parte de la experiencia. La decisión depende de seguridad, distancias y estructura de la ruta."],["¿Cuánto safari conviene?","Depende de cuánto pese la fauna en tus prioridades; una planificación premium evita reservar safari por inercia y analiza dónde encaja mejor."]]
  },
  {
    slug: "jordania", name: "Jordania", country: "Jordania",
    title: "Guía de Jordania: Petra, Wadi Rum y Mar Muerto | Cruzando Meridianos",
    subtitle: "La arquitectura de un viaje compacto donde historia, desierto, carretera y contexto regional importan tanto como los iconos.",
    intro: "Jordania concentra una enorme densidad de patrimonio y paisajes. Petra, Wadi Rum, el Mar Muerto y Amán pueden formar un viaje relativamente compacto, pero el contexto regional exige una revisión de actualidad especialmente cuidadosa.",
    officialLabel: "Visit Jordan — Oficina de Turismo de Jordania", officialUrl: "https://sp.visitjordan.com/", maecUrl: "https://exteriores.gob.es/Embajadas/amman/en/ViajarA/Paginas/Recomendaciones-de-viaje.aspx",
    snapshot: { climateSummary: "Destino de grandes contrastes térmicos entre ciudad, altitud y desierto.", travelStyle: "Viaje cultural y paisajístico con tramos por carretera.", mainStrengths: ["Petra", "Wadi Rum", "Historia", "Desierto"], mainConsiderations: ["Situación regional", "Calor", "Logística"] },
    fit: { title: "Jordania recompensa la concentración", intro: "Funciona muy bien para quien quiere mucha identidad en pocos días y acepta una cierta intensidad.", goodFor: ["historia y arqueología", "paisajes desérticos", "viajes cortos con mucho contenido"], notFor: ["quien busca un viaje exclusivamente de playa", "quien no quiere revisar actualidad regional"] },
    decision: "La gran decisión es equilibrar patrimonio, desierto y tiempo de carretera sin convertir Petra y Wadi Rum en visitas rápidas.", regions: "Amán y norte, Petra y el corredor central, Wadi Rum y Aqaba forman bloques muy diferentes.", transport: "El coche puede simplificar el país y dar flexibilidad, pero los tiempos reales y la conducción nocturna requieren una planificación conservadora.", season: "Primavera y otoño suelen ser especialmente atractivos para combinar caminatas y desierto; el calor estival cambia mucho el ritmo.", tradeoff: "Cuanto más tiempo dediques al paisaje y a experiencias de desierto, menos sentido tiene sobrecargar la parte urbana.", experience: "Petra, Wadi Rum, Jerash, Mar Muerto y la cocina jordana ofrecen suficiente profundidad para construir un viaje con una narrativa clara.", avoid: "Tratar Petra como una parada de pocas horas y asumir que cualquier recomendación de viaje sigue vigente sin revisar la situación regional.", durations: [[4,"Jordania esencial","Concentración máxima en los grandes contrastes.",true],[6,"Jordania equilibrada","Permite introducir patrimonio y desierto con mejor ritmo."],[8,"Jordania profunda","Más margen para norte, naturaleza y experiencias menos obvias."]], visaRequirement: "special", entryNotes: ["Comprueba los requisitos de entrada y visado aplicables a españoles en las fuentes oficiales antes de viajar.", "La situación regional es especialmente dinámica en 2026 y el MAEC recomienda aplazar el viaje hasta nuevo aviso según su recomendación vigente."], alerts: [{ id:"jo-2026-regional", date:REVIEWED_AT, type:"seguridad", severity:"critical", title:"Situación regional: revisar antes de viajar", description:"La recomendación vigente del MAEC desaconseja actualmente viajar a Jordania y señala un contexto de conflicto regional.", source:"https://exteriores.gob.es/Embajadas/amman/en/ViajarA/Paginas/Recomendaciones-de-viaje.aspx", sourceLabel:"MAEC — Jordania", sourceType:"official", active:true, checkedAt:REVIEWED_AT, travelerAction:"No cierres un viaje sin comprobar la recomendación oficial vigente inmediatamente antes de reservar y viajar." }], faqs: [["¿Está abierto Jordania para el turismo?","El funcionamiento del destino y la posibilidad operativa de viajar no equivalen a una recomendación de viaje favorable; en septiembre de 2026 el MAEC recomienda aplazar el viaje. Comprueba la situación vigente."],["¿Cuántos días hacen falta para Petra y Wadi Rum?","Una ruta corta puede cubrir ambos, pero una planificación con margen suele mejorar mucho la experiencia y permite añadir norte o Mar Muerto."]]
  },
  {
    slug: "grecia", name: "Grecia", country: "Grecia",
    title: "Guía de Grecia: Atenas, islas y continente | Cruzando Meridianos",
    subtitle: "Cómo elegir entre cultura, islas y paisaje sin convertir Grecia en una cadena de ferris.",
    intro: "Grecia no es un destino único: Atenas, Peloponeso, Cícladas, Jonias y otras regiones tienen ritmos y personalidades muy distintas. La calidad del viaje depende más de elegir bien la combinación que de acumular islas.",
    officialLabel: "Visit Greece", officialUrl: "https://www.visitgreece.gr/en/", maecUrl: "https://exteriores.gob.es/Embajadas/atenas/es/ViajarA/Paginas/Recomendaciones-de-viaje.aspx",
    snapshot: { climateSummary: "Veranos secos y calurosos; primavera y otoño ofrecen un equilibrio atractivo según región.", travelStyle: "Cultura, mar, pueblos, gastronomía y conducción o ferris.", mainStrengths: ["Islas", "Historia", "Gastronomía", "Paisaje"], mainConsiderations: ["Calor estival", "Ferries", "Elección de islas"] },
    fit: { title: "Grecia premia elegir una geografía", intro: "Es ideal para quien disfruta mezclando patrimonio y paisaje, pero la selección de islas es crítica.", goodFor: ["viajes culturales", "escapadas de mar con identidad", "road trips por el continente"], notFor: ["quien quiere verlo todo en una semana", "quien no tolera depender de conexiones marítimas"] },
    decision: "La gran decisión es si el viaje gira alrededor del continente, de una sola familia de islas o de una combinación muy controlada.", regions: "Atenas, Peloponeso, Jonias, Cícladas y norte de Grecia producen experiencias muy distintas.", transport: "El coche funciona especialmente bien en el continente y algunas islas; los ferris exigen coordinar horarios y márgenes.", season: "Mayo-junio y septiembre suelen ofrecer una mezcla atractiva de clima y menor presión que el pico de verano; cada isla tiene matices.", tradeoff: "Dos islas bien conectadas suelen resultar más ricas que cuatro visitas hechas a contrarreloj.", experience: "La combinación de arqueología, barrios, pueblos, gastronomía y mar permite diseñar viajes muy distintos para una misma persona.", avoid: "Elegir islas por fama sin comprobar conexiones, viento, temporada y personalidad del viaje.", durations: [[5,"Grecia urbana + costa","Atenas y una extensión sencilla.",true],[8,"Grecia equilibrada","Permite combinar cultura y mar con una lógica clara."],[12,"Grecia diversa","Más margen para continente o dos islas bien escogidas."],[16,"Grecia profunda","Espacio para una ruta regional con menos presión."]], visaRequirement: "none", entryNotes: ["España y Grecia forman parte del espacio Schengen; lleva documentación válida y revisa las recomendaciones oficiales antes de viajar."], faqs: [["¿Cuántas islas merece la pena combinar?","No existe un número correcto; la cuestión es cuánto tiempo de viaje estás dispuesto a gastar en embarques y cambios."],["¿Grecia necesita coche?","Depende totalmente de la geografía elegida; el continente y algunas islas se benefician mucho más que otras."]]
  },
  {
    slug: "auroras", name: "Auroras boreales", country: "Varios destinos",
    title: "Guía para ver auroras boreales: elegir destino y época | Cruzando Meridianos",
    subtitle: "No existe un destino mágico: la experiencia depende de oscuridad, cielos, latitud, actividad solar y margen.",
    intro: "Ver una aurora es una experiencia sensible a variables que ninguna agencia puede controlar por completo. El diseño bueno no promete la aurora: maximiza tus oportunidades y hace que el viaje siga teniendo sentido si el cielo no coopera.",
    officialLabel: "Visit Finland — Northern Lights", officialUrl: "https://www.visitfinland.com/en/saker-att-gora/northern-lights/", maecUrl: "https://exteriores.gob.es/Embajadas/helsinki/es/ViajarA/Paginas/Recomendaciones-de-viaje.aspx",
    snapshot: { climateSummary: "La temporada depende de oscuridad y clima; el invierno aporta nieve y actividad, pero no es la única ventana.", travelStyle: "Naturaleza, frío, actividades de invierno y paciencia.", mainStrengths: ["Auroras", "Paisaje", "Nieve", "Experiencias"], mainConsiderations: ["Nubes", "Frío", "Probabilidad, no garantía"] },
    fit: { title: "Las auroras son un viaje de probabilidades", intro: "Encaja con quien valora el paisaje completo y tolera que el gran espectáculo no esté garantizado.", goodFor: ["naturaleza", "fotografía", "experiencias invernales", "viajes pausados"], notFor: ["quien necesita una atracción garantizada", "quien lleva mal el frío o la oscuridad"] },
    decision: "La gran decisión es escoger el lugar por el conjunto del viaje, no solo por una supuesta garantía de aurora.", regions: "Laponia finlandesa, norte de Noruega y Suecia ofrecen enfoques distintos en accesibilidad, nieve, actividades y paisaje.", transport: "Las conexiones aéreas y ferroviarias pueden llevarte cerca de zonas aurorales; coche solo merece la pena cuando aporta libertad real y las condiciones lo permiten.", season: "Visit Finland sitúa la temporada de auroras aproximadamente entre finales de agosto y comienzos de abril, con meses destacados en torno a los equinoccios.", tradeoff: "Más noches mejoran las oportunidades; más actividad y menos tiempo fijo frente al cielo mejoran la experiencia global si la aurora no aparece.", experience: "Cabañas, nieve, saunas, trineos, raquetas y cielos oscuros hacen que el viaje pueda ser excelente incluso en una noche sin aurora.", avoid: "Viajar una única noche pensando que la aurora funciona como una reserva con fecha y hora.", durations: [[4,"Escapada auroral","Primer contacto con nieve y cielo nocturno.",true],[6,"Auroras con margen","Más noches y más posibilidades de combinar actividades."],[8,"Invierno ártico","El viaje deja de depender de una sola noche y gana profundidad."]], visaRequirement: "none", entryNotes: ["Finlandia pertenece al espacio Schengen; para españoles la entrada turística se rige por las reglas Schengen vigentes.", "Si eliges Noruega o Suecia, revisa las recomendaciones y transporte del país concreto."], extraSources: [source("Visit Norway — Northern Lights", "https://www.visitnorway.com/things-to-do/nature-attractions/northern-lights/")], faqs: [["¿Cuál es el mejor mes para ver auroras?","No hay un único mes ganador; importa combinar oscuridad, actividad auroral, nubes y número de noches."],["¿Las auroras están garantizadas?","No. La planificación premium maximiza oportunidades y hace que el viaje siga mereciendo la pena aunque el cielo no colabore."]]
  },
  {
    slug: "polonia", name: "Polonia", country: "Polonia",
    title: "Guía de Polonia: ciudades, memoria y paisaje | Cruzando Meridianos",
    subtitle: "Una Polonia que va más allá de una escapada rápida entre Cracovia y Varsovia.",
    intro: "Polonia permite combinar ciudades históricas, patrimonio, gastronomía, memoria europea y paisajes más tranquilos. El reto es decidir qué historia y qué ritmo quieres seguir.",
    officialLabel: "Poland Travel", officialUrl: "https://www.poland.travel/en", maecUrl: "https://exteriores.gob.es/Embajadas/varsovia/es/ViajarA/Paginas/Recomendaciones-de-viaje.aspx",
    snapshot: { climateSummary: "Cuatro estaciones claras; el invierno cambia radicalmente el ritmo urbano y la luz.", travelStyle: "Ciudades, historia, gastronomía y escapadas regionales.", mainStrengths: ["Patrimonio", "Historia", "Gastronomía", "Relación calidad-precio"], mainConsiderations: ["Distancias regionales", "Invierno", "Contexto fronterizo"] },
    fit: { title: "Polonia funciona mejor cuando se lee por capas", intro: "Ideal para quien disfruta de historia, arquitectura y ciudades caminables con excursiones bien escogidas.", goodFor: ["escapadas culturales", "viajes urbanos", "historia europea"], notFor: ["quien busca solo playa", "quien quiere un único paisaje dominante"] },
    decision: "La gran decisión es si el viaje se articula por grandes ciudades o por una ruta cultural más amplia.", regions: "Varsovia, Cracovia, Wrocław, Gdańsk y regiones de naturaleza ofrecen registros muy distintos.", transport: "El ferrocarril es especialmente útil para unir grandes ciudades; el coche gana sentido cuando el viaje sale de los principales ejes urbanos.", season: "Primavera y otoño suelen ser muy equilibradas; verano aporta más horas de luz y invierno una atmósfera distinta con más exigencia térmica.", tradeoff: "Añadir ciudades es fácil; darles suficiente tiempo es lo difícil.", experience: "Museos, barrios reconstruidos, arquitectura, mercados y cocina polaca ofrecen más profundidad de la que sugiere una lista de monumentos.", avoid: "Tratar Polonia como una sucesión de centros históricos idénticos.", durations: [[4,"Cracovia o Varsovia","Escapada concentrada.",true],[7,"Dos ciudades con sentido","Combina dos polos y un contexto intermedio."],[10,"Polonia cultural","Más margen para una tercera región."],[14,"Polonia amplia","Permite salir de los circuitos principales."]], visaRequirement: "none", entryNotes: ["Polonia pertenece al espacio Schengen; para españoles se aplica la normativa de libre circulación y documentación vigente.", "El MAEC recomienda atención especial al contexto de seguridad regional por la situación en Ucrania."] , alerts: [{ id:"pl-2026-border-context", date:REVIEWED_AT, type:"seguridad", severity:"low", title:"Contexto regional", description:"El MAEC señala la situación en la frontera con Ucrania y recomienda mantenerse atento a la información oficial.", source:"https://exteriores.gob.es/Embajadas/varsovia/es/ViajarA/Paginas/Recomendaciones-de-viaje.aspx", sourceLabel:"MAEC — Polonia", sourceType:"official", active:true, checkedAt:REVIEWED_AT, travelerAction:"Consulta las recomendaciones vigentes si tu ruta se acerca a zonas fronterizas." }], faqs: [["¿Mejor tren o coche?","Para grandes ciudades, el tren suele simplificar; para regiones rurales, el coche puede abrir otra escala del viaje."],["¿Tiene sentido combinar Cracovia y Varsovia?","Sí, pero conviene dar a cada ciudad suficiente tiempo y no convertir el traslado en un simple corte de jornada."]]
  },
  {
    slug: "italia", name: "Italia", country: "Italia",
    title: "Guía de Italia: elegir región, ritmo y temporada | Cruzando Meridianos",
    subtitle: "Italia no necesita más lugares: necesita una selección que tenga sentido.",
    intro: "Italia contiene tantos viajes posibles que el principal problema no es encontrar qué visitar, sino decidir qué Italia quieres vivir.",
    officialLabel: "Italia.it", officialUrl: "https://www.italia.it/en", maecUrl: "https://exteriores.gob.es/Embajadas/roma/it/ViajarA/Paginas/Recomendaciones-de-viaje.aspx",
    snapshot: { climateSummary: "Muy regional: Alpes, centros urbanos, lagos, costas e islas cambian mucho la experiencia.", travelStyle: "Cultura, gastronomía, paisaje y road trips regionales.", mainStrengths: ["Arte", "Comida", "Paisaje", "Patrimonio"], mainConsiderations: ["Masificación", "Calor", "Distancias"] },
    fit: { title: "Italia es casi un sistema de destinos", intro: "Funciona para casi cualquier perfil si se limita geográficamente.", goodFor: ["viajes gastronómicos", "arte e historia", "parejas y familias", "road trips"], notFor: ["quien quiere verlo entero en pocos días"] },
    decision: "La gran decisión es elegir una región o una combinación de regiones con continuidad geográfica y narrativa.", regions: "Roma, Toscana, Dolomitas, Puglia, Sicilia, Campania, Lagos y muchas otras áreas merecen viajes diferentes.", transport: "Tren y transporte público funcionan muy bien entre grandes ciudades; el coche gana valor en campiña, costa y zonas rurales.", season: "Primavera y otoño suelen ofrecer gran equilibrio; verano puede ser excelente para montaña o costa, pero aumenta la presión en lugares icónicos.", tradeoff: "Italia castiga más la ambición geográfica que otros destinos europeos porque hay demasiadas cosas que parecen cercanas sobre el mapa.", experience: "La experiencia más premium suele estar en mezclar iconos con barrios, pueblos, comida y tiempo sin agenda.", avoid: "Roma + Florencia + Venecia + Costa Amalfitana + Sicilia en una sola semana.", durations: [[4,"Una ciudad bien hecha","Una capital o ciudad de arte con profundidad.",true],[7,"Una región","La forma más limpia de entender una Italia concreta."],[10,"Región + contraste","Permite introducir paisaje o segunda zona sin romper el ritmo."],[14,"Italia en profundidad","Solo cuando la combinación geográfica está muy bien resuelta."]], visaRequirement: "none", entryNotes: ["Italia forma parte del espacio Schengen; lleva documentación válida y revisa recomendaciones oficiales antes de viajar."], faqs: [["¿Es mejor coche o tren en Italia?","Depende de la región. Para grandes ciudades, el tren suele ser mejor; en zonas rurales y ciertas costas el coche puede aportar libertad."],["¿Cuántas ciudades caben en una semana?","Más que cuántas, importa cuánto tiempo real tendrás para vivirlas."]]
  },
  {
    slug: "viena", name: "Viena", country: "Austria",
    title: "Guía de Viena: barrios, cultura, cafés y ritmo | Cruzando Meridianos",
    subtitle: "Una Viena que combina iconos imperiales con barrios, música, gastronomía y paseos sin correr.",
    intro: "Viena es una ciudad muy estructurada para visitar, pero su carácter aparece cuando sales del itinerario puramente monumental y mezclas barrios, cafés, museos, mercados y espacios verdes.",
    officialLabel: "Vienna Tourist Board", officialUrl: "https://www.wien.info/es", maecUrl: "https://www.exteriores.gob.es/Embajadas/viena/es/ViajarA/Paginas/Recomendaciones-de-viaje.aspx",
    snapshot: { climateSummary: "Cuatro estaciones; el invierno tiene mucha identidad cultural y menos horas de luz.", travelStyle: "Ciudad cultural, caminable y muy fácil de estructurar por barrios.", mainStrengths: ["Museos", "Música", "Arquitectura", "Cafés"], mainConsiderations: ["Agenda cultural", "Distancias por barrios", "Temporada"] },
    fit: { title: "Viena premia el ritmo pausado", intro: "Excelente para viajes culturales donde comer, pasear y visitar museos forman parte del mismo plan.", goodFor: ["parejas", "cultura", "escapadas urbanas", "música"], notFor: ["quien quiere aventura de carretera"] },
    decision: "La gran decisión es equilibrar la Viena imperial con una ciudad contemporánea mucho más amplia.", regions: "Innere Stadt, MuseumsQuartier, barrios residenciales, viñedos y zonas del Danubio ofrecen experiencias distintas.", transport: "La red pública y el caminar cubren muy bien la ciudad; el coche aporta poco valor dentro de Viena.", season: "Cada estación cambia el viaje: Navidad e invierno tienen una identidad propia; primavera y otoño son muy cómodos para caminar.", tradeoff: "Añadir demasiados palacios y museos puede saturar el viaje; el café y el barrio deben tener espacio real.", experience: "La ciudad combina patrimonio imperial, museos, música, cafés y gastronomía con una facilidad poco común.", avoid: "Convertir cada jornada en una competición de monumentos.", durations: [[3,"Viena esencial","Primer contacto concentrado.",true],[4,"Viena cultural","Más margen para museos y barrios."],[5,"Viena con calma","Añade gastronomía y excursiones puntuales."]], visaRequirement: "none", entryNotes: ["Austria forma parte del espacio Schengen; comprueba documentación y recomendaciones oficiales vigentes."], extraSources: [source("Vienna Tourism — Discover Vienna", "https://www.wien.info/en/see-do/discover-vienna", "primary")], faqs: [["¿Cuántos días necesita Viena?","Tres permiten una primera lectura; cuatro o cinco mejoran mucho el equilibrio entre iconos, museos y barrios."],["¿Hace falta coche?","No para la ciudad y normalmente tampoco como primera opción."]]
  },
  {
    slug: "praga", name: "Praga", country: "Chequia",
    title: "Guía de Praga: barrios, arquitectura e historia | Cruzando Meridianos",
    subtitle: "Cómo entender una ciudad que se disfruta más caminando que tachando monumentos.",
    intro: "Praga es manejable y fotogénica, pero su mejor versión aparece cuando se organiza por zonas y horas del día, no como una lista plana de lugares.",
    officialLabel: "Prague City Tourism", officialUrl: "https://www.prague.eu/en", maecUrl: "https://exteriores.gob.es/Embajadas/praga/es/ViajarA/Paginas/Recomendaciones-de-viaje.aspx",
    snapshot: { climateSummary: "Estacionalidad clara; primavera, otoño e invierno ofrecen atmósferas muy diferentes.", travelStyle: "Escapada urbana caminable y cultural.", mainStrengths: ["Arquitectura", "Historia", "Paseos", "Cerveza y gastronomía"], mainConsiderations: ["Aglomeraciones", "Escala turística", "Barrios"] },
    fit: { title: "Praga funciona muy bien en pocos días", intro: "Ideal para una escapada con mucha identidad visual y cultural.", goodFor: ["primeras escapadas", "parejas", "arquitectura", "historia"], notFor: ["quien necesita naturaleza o gran variedad regional"] },
    decision: "La gran decisión es cuándo dedicar el centro histórico y cuánto espacio reservar para barrios y orillas del río.", regions: "Staré Město, Malá Strana, Hradčany, Josefov, Vinohrady y Holešovice tienen ritmos diferentes.", transport: "Caminar y transporte público son suficientes para casi toda la experiencia urbana.", season: "La ciudad cambia mucho con la luz y el frío; una jornada de invierno y una de verano no se sienten iguales.", tradeoff: "La ciudad es pequeña en comparación con grandes capitales, por lo que el valor está en profundizar y no en añadir excursiones por defecto.", experience: "Arquitectura, cafés, cervecerías, miradores y barrios pueden formar una narrativa mucho más rica que el circuito de puente-castillo-reloj.", avoid: "Quedarse solo en las horas de máxima afluencia del centro histórico.", durations: [[3,"Praga esencial","Perfecta para una escapada de primera vez.",true],[4,"Praga con barrios","Mejor equilibrio entre iconos y ciudad real."],[5,"Praga tranquila","Más margen para museos, comida y zonas menos centrales."]], visaRequirement: "none", entryNotes: ["Chequia forma parte del espacio Schengen; revisa la documentación y recomendaciones oficiales vigentes."], faqs: [["¿Praga se hace a pie?","En gran medida sí, complementando con transporte público cuando conviene."],["¿Merece la pena dormir fuera del centro?","Depende del barrio; la prioridad debería ser una zona que facilite el tipo de ritmo que buscas."]]
  },
  {
    slug: "budapest", name: "Budapest", country: "Hungría",
    title: "Guía de Budapest: Danubio, barrios y termas | Cruzando Meridianos",
    subtitle: "Una ciudad que se entiende mejor cuando se combinan arquitectura, agua, gastronomía y vida cotidiana.",
    intro: "Budapest es mucho más que el Parlamento visto de noche. El Danubio, Buda y Pest, los baños termales, los cafés y los barrios contemporáneos construyen una ciudad con varias capas.",
    officialLabel: "Budapestinfo", officialUrl: "https://www.budapestinfo.hu/", maecUrl: "https://exteriores.gob.es/Embajadas/budapest/es/ViajarA/Paginas/Recomendaciones-de-viaje.aspx",
    snapshot: { climateSummary: "Veranos calurosos e inviernos fríos; termas y cultura funcionan bien todo el año.", travelStyle: "Ciudad cultural con experiencias termales y gastronómicas.", mainStrengths: ["Danubio", "Termas", "Arquitectura", "Gastronomía"], mainConsiderations: ["Elección de baño", "Barrios", "Tiempo de crucero/visitas"] },
    fit: { title: "Budapest mezcla lo monumental con el descanso", intro: "Muy buena para escapadas donde el paisaje urbano y la experiencia cotidiana cuentan tanto como los monumentos.", goodFor: ["parejas", "arquitectura", "gastronomía", "bienestar"], notFor: ["viajes de naturaleza extensa"] },
    decision: "La gran decisión es cómo repartir Buda, Pest y el tiempo de termas sin romper el ritmo de la ciudad.", regions: "Buda, Distrito V, VII, XIII y zonas del Danubio tienen identidades muy diferentes.", transport: "Metro, tranvía y caminar cubren muy bien la ciudad; conducir no aporta mucho.", season: "El invierno da sentido a las termas; primavera y otoño son excelentes para caminar; verano favorece terrazas y largas tardes.", tradeoff: "El valor está en alternar intensidad cultural y pausas reales.", experience: "Termas, mercados, cafeterías, arquitectura y vida nocturna crean una mezcla especialmente fácil de personalizar.", avoid: "Intentar ver Buda y Pest como dos listas separadas sin reservar tiempo a cruzar la ciudad y disfrutarla.", durations: [[3,"Budapest esencial","Escapada concentrada.",true],[4,"Budapest equilibrada","Más tiempo para barrios y termas."],[5,"Budapest con calma","Permite añadir experiencias culturales o gastronómicas."]], visaRequirement: "none", entryNotes: ["Hungría forma parte del espacio Schengen; comprueba documentación y recomendaciones oficiales vigentes."], faqs: [["¿Merecen la pena las termas?","Sí, pero la elección del baño y la hora importa mucho para que la experiencia encaje contigo."],["¿Hace falta coche?","No para una escapada urbana."]]
  },
  {
    slug: "amsterdam", name: "Ámsterdam", country: "Países Bajos",
    title: "Guía de Ámsterdam: canales, barrios y museos | Cruzando Meridianos",
    subtitle: "Más allá del centro de postal: cómo diseñar una Ámsterdam cultural, caminable y con barrios.",
    intro: "Ámsterdam tiene un centro icónico, pero la ciudad gana profundidad cuando se amplía la mirada hacia Museumplein, De Pijp, Noord, Oost, Westerpark y otros barrios.",
    officialLabel: "I amsterdam", officialUrl: "https://www.iamsterdam.com/en", maecUrl: "https://www.exteriores.gob.es/Embajadas/lahaya/es/ViajarA/Paginas/Recomendaciones-de-viaje.aspx",
    snapshot: { climateSummary: "Clima cambiante y húmedo; luz y lluvia influyen mucho en el ritmo urbano.", travelStyle: "Ciudad de museos, bicicleta, barrios y canales.", mainStrengths: ["Museos", "Canales", "Barrios", "Diseño y cultura"], mainConsiderations: ["Afluencia", "Bicicletas", "Alojamiento"] },
    fit: { title: "Ámsterdam es una ciudad para caminar despacio", intro: "Excelente para combinar arte, barrios y gastronomía sin necesidad de grandes desplazamientos.", goodFor: ["museos", "parejas", "escapadas culturales", "viajes urbanos"], notFor: ["quien busca solo monumentos monumentales"] },
    decision: "La gran decisión es cuánto tiempo pasar en el centro histórico frente a los barrios donde la ciudad se abre.", regions: "Canal Ring, Museum Quarter, De Pijp, Noord, Oost y Westerpark aportan escalas muy diferentes.", transport: "Caminar, bicicleta, tranvía, metro y ferris son suficientes para construir un viaje completo; el coche suele aportar poco.", season: "Primavera es atractiva por jardines y luz; verano aporta más vida exterior; otoño e invierno tienen valor cultural y menos horas de luz.", tradeoff: "La calidad aparece al reducir transbordos y reservar tiempo para museos y barrios.", experience: "El cinturón de canales, Museumplein, Nine Streets y barrios como Noord permiten combinar iconos y capas menos obvias.", avoid: "Pasar todo el viaje dentro del eje Dam–canales principales.", durations: [[3,"Ámsterdam esencial","Centro, canales y un museo fuerte.",true],[4,"Ámsterdam de barrios","Más espacio para Museumplein y barrios."],[5,"Ámsterdam profunda","Añade Noord, Oost o experiencias culturales."]], visaRequirement: "none", entryNotes: ["Países Bajos forma parte del espacio Schengen; lleva documentación válida y revisa recomendaciones oficiales."], faqs: [["¿Hace falta usar bicicleta?","No. Es una opción cultural muy importante de la ciudad, pero caminar y transporte público pueden cubrir el viaje."],["¿Merece la pena salir del centro?","Sí; la propia oficina de turismo destaca la personalidad diferenciada de numerosos barrios."]]
  },
  {
    slug: "paris", name: "París", country: "Francia",
    title: "Guía de París: barrios, museos y ritmo | Cruzando Meridianos",
    subtitle: "Cómo construir una París con sentido de lugar y no una carrera entre iconos.",
    intro: "París ofrece una densidad cultural extraordinaria. El reto es gestionar esa abundancia y diseñar días por zonas para que el tiempo no se consuma en desplazamientos y colas.",
    officialLabel: "Paris je t'aime", officialUrl: "https://parisjetaime.com/eng/", maecUrl: "https://exteriores.gob.es/Embajadas/paris/es/ViajarA/Paginas/Recomendaciones-de-viaje.aspx",
    snapshot: { climateSummary: "Destino de cuatro estaciones; exposiciones y agenda cultural añaden estacionalidad propia.", travelStyle: "Ciudad cultural, gastronómica y muy caminable.", mainStrengths: ["Museos", "Barrios", "Gastronomía", "Arquitectura"], mainConsiderations: ["Colas", "Escala", "Elección de barrio"] },
    fit: { title: "París premia la selección", intro: "Perfecta para quien quiere cultura y gastronomía con margen para caminar sin agenda rígida.", goodFor: ["arte", "parejas", "gastronomía", "arquitectura"], notFor: ["quien necesita un viaje de naturaleza"] },
    decision: "La gran decisión es seleccionar pocos grandes museos y construir el resto alrededor de barrios y paseos.", regions: "Marais, Saint-Germain, Latin Quarter, Montmartre, Canal Saint-Martin y grandes ejes del centro ofrecen experiencias distintas.", transport: "Metro, RER, caminar y transporte de superficie cubren el destino; el coche es un lastre para un viaje urbano.", season: "Cada estación aporta una ciudad diferente; la agenda cultural y las exposiciones pueden ser tan determinantes como el clima.", tradeoff: "Un día con un gran museo y una zona bien escogida puede ser más rico que cuatro grandes monumentos separados por metro.", experience: "El centro histórico, Montmartre y barrios menos obvios permiten alternar iconos y vida cotidiana.", avoid: "Intentar completar una lista de 20 imprescindibles en una visita corta.", durations: [[3,"París primera vez","Iconos + un barrio fuerte por jornada.",true],[4,"París cultural","Mejor equilibrio entre museos y paseos."],[5,"París de barrios","Permite salir de las rutas obvias."],[7,"París profunda","Más margen para exposiciones y Grand Paris."]], visaRequirement: "none", entryNotes: ["Francia forma parte del espacio Schengen; revisa documentación y recomendaciones oficiales vigentes."], extraSources: [source("Paris je t'aime — París por barrios", "https://parisjetaime.com/spa/paris-por-barrio-i153", "primary")], faqs: [["¿Es necesario reservar museos?","Para los grandes museos y determinadas exposiciones, comprobar reservas y franjas con antelación puede mejorar mucho el día."],["¿En qué barrio alojarse?","Depende del ritmo: el centro facilita iconos; otros barrios pueden aportar más vida local y mejor relación con tus prioridades."]]
  },
  {
    slug: "sur-de-francia", name: "Sur de Francia", country: "Francia",
    title: "Guía del sur de Francia: Provenza, Costa Azul y Occitania | Cruzando Meridianos",
    subtitle: "Un gran territorio de pueblos, mar, gastronomía y carreteras donde elegir la zona es la mitad del viaje.",
    intro: "El sur de Francia no es una sola ruta. Provenza, Costa Azul y Occitania ofrecen paisajes y ritmos distintos, por lo que la primera decisión es geográfica.",
    officialLabel: "France.fr — Provenza y Costa Azul", officialUrl: "https://www.france.fr/fr/destination/provence/", maecUrl: "https://exteriores.gob.es/Embajadas/paris/es/ViajarA/Paginas/Recomendaciones-de-viaje.aspx",
    snapshot: { climateSummary: "Mediterráneo con diferencias entre costa, interior y áreas pirenaicas.", travelStyle: "Road trip regional, gastronomía, pueblos y costa.", mainStrengths: ["Paisaje", "Gastronomía", "Pueblos", "Carretera"], mainConsiderations: ["Temporada alta", "Aparcamiento", "Distancias"] },
    fit: { title: "El sur de Francia pide un territorio pequeño", intro: "Ideal para quien disfruta de conducir poco a poco, comer bien y alternar naturaleza y pueblos.", goodFor: ["road trips", "gastronomía", "parejas", "paisaje"], notFor: ["quien busca una gran ciudad única"] },
    decision: "La gran decisión es elegir Provenza, Costa Azul, Occitania o una combinación limitada.", regions: "Provenza, Costa Azul y Occitania merecen tratarse como familias de viaje distintas.", transport: "El coche es muy útil en el interior; tren y transporte regional ganan peso en la costa y entre ciudades principales.", season: "Primavera y otoño son excelentes para recorrer; verano funciona muy bien para costa pero aumenta la demanda y el calor.", tradeoff: "Añadir más pueblos nunca es gratis: cada uno consume aparcamiento, conducción y atención.", experience: "Mercados, pueblos, viñedos, calas, arquitectura y gastronomía pueden formar una ruta mucho más personal que una lista de postales.", avoid: "Cruzar toda la costa y toda Provenza en una sola semana.", durations: [[5,"Una región","La mejor manera de no diluir la experiencia.",true],[7,"Road trip equilibrado","Pocas bases y mucha libertad."],[10,"Dos territorios próximos","Solo si la conexión geográfica es limpia."],[14,"Gran sur francés","Para una ruta con mucho margen y ritmo lento."]], visaRequirement: "none", entryNotes: ["Francia forma parte del espacio Schengen; revisa documentación y recomendaciones oficiales."], extraSources: [source("France.fr — Côte d'Azur", "https://www.france.fr/fr/destination/cote-dazur/"), source("France.fr — Occitanie", "https://www.france.fr/fr/destination/occitanie/")], faqs: [["¿Hace falta coche?","Para interiores y pueblos, a menudo aporta mucho valor; para grandes ciudades y parte de la costa, no siempre."],["¿Provenza o Costa Azul?","Son dos viajes muy diferentes: uno más rural y gastronómico; otro más costero y urbano."]]
  },
  {
    slug: "nueva-york", name: "Nueva York", country: "Estados Unidos",
    title: "Guía de Nueva York: barrios, museos y decisiones | Cruzando Meridianos",
    subtitle: "Cómo organizar una ciudad gigantesca sin pasar el viaje entero cruzando Manhattan.",
    intro: "Nueva York parece inabarcable, pero la clave es estructurarla por barrios, líneas de transporte y horarios. Un viaje premium se parece más a una secuencia de pequeñas zonas que a una colección de atracciones.",
    officialLabel: "NYC Tourism + Conventions", officialUrl: "https://www.nyctourism.com/", maecUrl: "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Estados+Unidos+",
    snapshot: { climateSummary: "Cuatro estaciones con calor húmedo en verano y frío en invierno; la ciudad cambia mucho con la luz.", travelStyle: "Urbano intenso, barrios, cultura y gastronomía.", mainStrengths: ["Barrios", "Museos", "Comida", "Cultura"], mainConsiderations: ["Escala", "Entradas", "Ritmo"] },
    fit: { title: "Nueva York funciona por microviajes", intro: "Ideal para quien disfruta caminar mucho y cambiar de barrio constantemente.", goodFor: ["cultura", "gastronomía", "arquitectura", "viajes urbanos"], notFor: ["quien quiere una escapada relajada sin planificar nada"] },
    decision: "La gran decisión es elegir barrios por jornada y no una lista transversal de puntos.", regions: "Manhattan, Brooklyn, Queens y otros boroughs ofrecen experiencias muy diferentes.", transport: "Metro y caminar son la columna vertebral; los taxis y ferris son herramientas tácticas, no la base del viaje.", season: "Primavera y otoño suelen ser especialmente agradables para caminar; verano e invierno tienen ventajas y costes propios.", tradeoff: "Cada cruce largo de la ciudad roba tiempo a una experiencia que podría estar a cinco minutos de donde ya estás.", experience: "Museos, barrios, miradores, parques, comida y música permiten construir días con personalidad propia.", avoid: "Ir de un extremo a otro por tres atracciones que podrían repartirse en jornadas distintas.", durations: [[4,"Nueva York esencial","Primer contacto con focos claros.",true],[5,"Nueva York equilibrada","Más espacio para barrios."],[7,"Nueva York profunda","La mejor duración para entender la ciudad por capas."],[10,"Nueva York + alrededores","Solo cuando la ciudad ya tiene su propio espacio."]], visaRequirement: "special", entryNotes: ["Para españoles el viaje turístico suele requerir autorización ESTA bajo el Visa Waiver Program, pero debes comprobar el estado y elegibilidad oficiales antes de viajar.", "La recomendación del MAEC vigente en septiembre de 2026 no establece restricciones generales de viaje a EE. UU."] , faqs: [["¿Cuántos días hacen falta?","Cuatro permiten una primera lectura, pero siete ofrecen mucha más profundidad sin tener que correr."],["¿Hace falta reservar todo?","No; conviene reservar lo que tiene aforo o franja y dejar espacio para el resto."]]
  },
  {
    slug: "washington", name: "Washington", country: "Estados Unidos",
    title: "Guía de Washington DC: museos, memoria y barrios | Cruzando Meridianos",
    subtitle: "Una capital que merece más que una sucesión de monumentos del National Mall.",
    intro: "Washington DC combina instituciones, museos gratuitos, barrios con identidad y espacios verdes. Su escala permite concentrar cultura sin la intensidad logística de Nueva York.",
    officialLabel: "Washington DC", officialUrl: "https://washington.org/", maecUrl: "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Estados+Unidos+",
    snapshot: { climateSummary: "Primaveras suaves, veranos húmedos y otoño especialmente agradable.", travelStyle: "Ciudad cultural, museos y barrios.", mainStrengths: ["Smithsonian", "Historia", "Arquitectura", "Parques"], mainConsiderations: ["Distancias a pie", "Reservas", "Agenda"] },
    fit: { title: "Washington favorece el viaje cultural", intro: "Muy buena para quien disfruta de museos, memoria política y barrios caminables.", goodFor: ["historia", "museos", "familias", "arquitectura"], notFor: ["quien busca gran vida nocturna o naturaleza extensa"] },
    decision: "La gran decisión es cuánto tiempo dedicar al National Mall frente a Georgetown, Capitol Hill, Adams Morgan y otros barrios.", regions: "National Mall, Capitol Hill, Georgetown, Dupont Circle y Adams Morgan muestran caras diferentes.", transport: "Metro y caminar funcionan muy bien; las bicicletas y autobuses completan el sistema.", season: "Primavera y otoño son especialmente agradables para combinar museos y parques; verano aumenta calor y humedad.", tradeoff: "Los grandes museos son gratuitos en muchos casos, pero el tiempo sigue siendo el recurso escaso.", experience: "Museos Smithsonian, monumentos, barrios y Rock Creek Park permiten equilibrar historia y ciudad cotidiana.", avoid: "Pasar todo el viaje entre monumentos del Mall sin entrar en la estructura de barrios.", durations: [[3,"Washington esencial","Monumentos y uno o dos museos fuertes.",true],[4,"Washington cultural","Más espacio para barrios y museos."],[5,"Washington con calma","Permite profundizar en arquitectura y vida local."]], visaRequirement: "special", entryNotes: ["Para españoles se debe comprobar la autorización ESTA/condiciones del Visa Waiver Program antes de viajar.", "El MAEC no establece restricciones generales de viaje a EE. UU. en septiembre de 2026."], faqs: [["¿Cuántos museos caben?","Muchos; el problema no es capacidad sino evitar una saturación cultural."],["¿Es una ciudad caminable?","Sí, especialmente por bloques de zonas; el sistema de Metro ayuda a unirlas."]]
  },
  {
    slug: "egipto", name: "Egipto", country: "Egipto",
    title: "Guía de Egipto: pirámides, Nilo y templos | Cruzando Meridianos",
    subtitle: "Cómo ordenar un país de gran densidad histórica sin convertirlo en una carrera de ruinas.",
    intro: "Egipto tiene una capacidad extraordinaria para condensar historia, arqueología, río, desierto y mar. La experiencia mejora mucho cuando se separan los grandes bloques del país y se protegen del cansancio.",
    officialLabel: "Experience Egypt", officialUrl: "https://www.experienceegypt.eg/", maecUrl: "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Egipto",
    snapshot: { climateSummary: "Calor intenso en buena parte del año; invierno suele favorecer la visita arqueológica.", travelStyle: "Historia, arqueología, río y desierto.", mainStrengths: ["Patrimonio", "Nilo", "Museos", "Desierto"], mainConsiderations: ["Calor", "Cansancio", "Logística local"] },
    fit: { title: "Egipto pide energía y estructura", intro: "Muy recomendable para quien quiere una experiencia histórica intensa y acepta una logística menos simple que Europa.", goodFor: ["arqueología", "historia", "fotografía", "crucero cultural"], notFor: ["quien busca un viaje urbano relajado"] },
    decision: "La gran decisión es cómo combinar Cairo/Giza, el eje del Nilo y el Mar Rojo sin perder ritmo.", regions: "Cairo y Giza, Luxor, Asuán, valle del Nilo y costa del Mar Rojo son viajes distintos.", transport: "Avión y tren conectan grandes tramos; crucero o traslados organizados pueden aportar coherencia en el valle del Nilo.", season: "Los meses más frescos suelen mejorar las visitas arqueológicas, especialmente en el sur.", tradeoff: "Más templos no siempre significan mejor viaje: la fatiga cultural es real.", experience: "La escala monumental de Giza y Luxor se beneficia de tiempo, explicación y horarios adecuados, no solo de presencia física.", avoid: "Encadenar cinco monumentos al día bajo calor y llamarlo profundidad cultural.", durations: [[5,"Egipto esencial","Cairo + Giza y un bloque histórico fuerte.",true],[8,"Egipto equilibrado","Añade Luxor/Nilo con mejor ritmo."],[10,"Egipto profundo","Más margen para Asuán o Mar Rojo."],[14,"Egipto amplio","Solo con logística muy bien coordinada."]], visaRequirement: "consular", entryNotes: ["Comprueba el sistema de visado aplicable a españoles y las condiciones de entrada en fuentes oficiales antes de viajar.", "El MAEC señala que Egipto mantiene un nivel de seguridad general mejorado, pero recomienda consultar la situación de cada zona."], faqs: [["¿Hace falta crucero por el Nilo?","No es obligatorio, pero puede ser una forma muy eficiente de unir experiencias y descanso."],["¿Mejor Cairo y Luxor o añadir Mar Rojo?","Depende de si buscas una ruta esencial de patrimonio o un viaje con final de descanso."]]
  },
  {
    slug: "mauricio", name: "Mauricio", country: "Mauricio",
    title: "Guía de Mauricio: playas, naturaleza y ritmo | Cruzando Meridianos",
    subtitle: "Mucho más que un resort: cómo decidir entre costa, interior, montaña y experiencias locales.",
    intro: "Mauricio funciona muy bien como destino de descanso, pero su geografía, montaña, gastronomía y diversidad costera permiten construir un viaje más interesante si se sale del hotel sin convertirlo en una carrera.",
    officialLabel: "Mauritius Now", officialUrl: "https://mauritiusnow.com/", maecUrl: "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Mauricio",
    snapshot: { climateSummary: "Tropical, con temporada de ciclones entre mediados de noviembre y mediados de abril según MAEC.", travelStyle: "Isla, costa, naturaleza y descanso con coche.", mainStrengths: ["Playas", "Mar", "Naturaleza", "Gastronomía"], mainConsiderations: ["Ciclones", "Conducción", "Elección de costa"] },
    fit: { title: "Mauricio funciona cuando el descanso también forma parte del viaje", intro: "Ideal para quien quiere mar y naturaleza pero no necesita una ruta hiperactiva.", goodFor: ["parejas", "descanso", "naturaleza", "viajes combinados"], notFor: ["quien busca un gran volumen de patrimonio histórico"] },
    decision: "La gran decisión es dónde dormir y cuánto moverse; la costa elegida cambia mucho la experiencia.", regions: "Norte, oeste, este, sur y el interior montañoso ofrecen perfiles diferentes.", transport: "El coche aporta libertad y suele ser la herramienta más flexible para conocer la isla.", season: "El clima tropical obliga a mirar temporada, ciclones y microclimas antes de fijar la zona de viaje.", tradeoff: "Moverse demasiado roba precisamente la sensación de isla que hace atractivo el destino.", experience: "Playas, Le Morne, mercados, cocina criolla, senderos y lagunas permiten alternar descanso y exploración.", avoid: "Elegir hotel solo por una foto de playa sin analizar orientación, acceso y relación con el resto de la isla.", durations: [[6,"Mauricio esencial","Una base principal y algunas salidas.",true],[8,"Mauricio equilibrado","Mejor mezcla de descanso y exploración."],[10,"Mauricio profunda","Más margen para el interior y varias costas."]], visaRequirement: "none", entryNotes: ["El MAEC recomienda viajar con pasaporte válido y con más de seis meses de vigencia.", "Consulta las condiciones exactas de entrada y sanidad antes de viajar."], alerts: [{ id:"mu-2026-cyclone", date:"2026-01-01", type:"clima", severity:"medium", title:"Temporada de ciclones", description:"La temporada de ciclones se sitúa entre mediados de noviembre y mediados de abril.", source:"https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Mauricio", sourceLabel:"MAEC — Mauricio", sourceType:"official", active:true, checkedAt:REVIEWED_AT, travelerAction:"Consulta la previsión y avisos meteorológicos oficiales antes y durante el viaje." }], faqs: [["¿Hace falta coche en Mauricio?","Aporta mucha libertad si quieres explorar más allá del resort, aunque no es imprescindible para un viaje muy centrado en descanso."],["¿Qué costa es mejor?","No hay una respuesta universal; orientación, viento, servicios y tipo de alojamiento cambian la experiencia."]]
  },
  {
    slug: "malta", name: "Malta", country: "Malta",
    title: "Guía de Malta: Valletta, Gozo, calas e historia | Cruzando Meridianos",
    subtitle: "Una isla pequeña con más capas de las que parece: historia, mar, gastronomía y paisaje.",
    intro: "Malta combina patrimonio, mar, pueblos y una enorme densidad histórica. Su tamaño hace fácil recorrerla, pero también invita a sobrecargar el día.",
    officialLabel: "Visit Malta", officialUrl: "https://www.visitmalta.com/es/", maecUrl: "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Malta",
    snapshot: { climateSummary: "Mediterráneo, muchos días de sol y veranos muy cálidos.", travelStyle: "Historia, mar, carretera y escapadas cortas.", mainStrengths: ["Historia", "Mar", "Gozo", "Buceo"], mainConsiderations: ["Calor", "Carreteras", "Excursiones a islas"] },
    fit: { title: "Malta es excelente para viajes cortos", intro: "Funciona especialmente bien cuando se quiere mezclar patrimonio y mar sin grandes distancias.", goodFor: ["escapadas", "historia", "parejas", "buceo"], notFor: ["quien necesita grandes paisajes montañosos"] },
    decision: "La gran decisión es si el viaje gira alrededor de Valletta y las Three Cities, o si se da más peso a Gozo y costa.", regions: "Valletta, Three Cities, Mdina/Rabat, Gozo y Comino organizan el destino.", transport: "Coche puede facilitar ciertas zonas, aunque el tamaño del país permite combinar transporte público y barco.", season: "Primavera y otoño son excelentes para caminar; verano favorece mar pero aumenta calor y demanda.", tradeoff: "La isla es pequeña, pero los trayectos y el aparcamiento pueden consumir más de lo que parece.", experience: "Fortificaciones, iglesias, templos, calas, buceo y Gozo permiten equilibrar historia y mar.", avoid: "Intentar hacer Malta y Gozo en una única jornada.", durations: [[3,"Malta esencial","Valletta + una zona de costa.",true],[5,"Malta equilibrada","Introduce Mdina y Gozo."],[7,"Malta profunda","Más tiempo para Gozo y experiencias marítimas."]], visaRequirement: "none", entryNotes: ["Malta pertenece al espacio Schengen; comprueba documentación y recomendaciones oficiales vigentes."], extraSources: [source("Visit Malta — Gozo y experiencias", "https://www.visitmalta.com/es/things-to-do-in-malta-and-gozo/", "primary")], faqs: [["¿Merece la pena Gozo?","Sí, especialmente si buscas una Malta más verde y tranquila; requiere darle tiempo propio."],["¿Hace falta coche?","Depende de las zonas, pero aporta flexibilidad si quieres recorrer la isla a tu ritmo."]]
  },
  {
    slug: "tenerife", name: "Tenerife", country: "España",
    title: "Guía de Tenerife: Teide, costa y Anaga | Cruzando Meridianos",
    subtitle: "Cómo leer Tenerife por microclimas y paisajes en vez de por una lista de playas.",
    intro: "Tenerife permite pasar en poco tiempo de costa a alta montaña y bosque húmedo. La clave es aprovechar esa variedad sin convertir el viaje en una sucesión de carreteras.",
    officialLabel: "Turismo de Tenerife", officialUrl: "https://www.webtenerife.com/", maecUrl: "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Espa%C3%B1a",
    snapshot: { climateSummary: "Microclimas muy marcados entre norte, sur y alta montaña.", travelStyle: "Isla de coche, senderismo, gastronomía y costa.", mainStrengths: ["Teide", "Anaga", "Costa", "Gastronomía"], mainConsiderations: ["Altitud", "Carreteras", "Microclimas"] },
    fit: { title: "Tenerife funciona por contrastes", intro: "Perfecta si quieres combinar naturaleza y costa sin vuelos internos.", goodFor: ["senderismo", "parejas", "familias", "road trips"], notFor: ["quien busca solo playa o solo ciudad"] },
    decision: "La gran decisión es cuánto peso dar al norte, al Teide y a la costa según el tiempo disponible.", regions: "Santa Cruz/Anaga, norte, Teide y sur tienen personalidades distintas.", transport: "El coche es una herramienta especialmente útil para conectar microclimas y miradores.", season: "La costa y la montaña se comportan de forma diferente; las condiciones en Teide requieren atención específica independientemente del mes.", tradeoff: "Un día de montaña y un día de costa no se organizan igual ni tienen el mismo ritmo.", experience: "Teide, Anaga, pueblos del norte y costa permiten diseñar un viaje muy completo.", avoid: "Dormir toda la estancia en una base lejana de las experiencias que más importan.", durations: [[4,"Tenerife esencial","Teide + una zona costera.",true],[6,"Tenerife equilibrada","Norte, montaña y costa."],[8,"Tenerife profunda","Más senderos y pueblos."],[10,"Tenerife lenta","Más margen para conducir y descubrir."]], visaRequirement: "none", entryNotes: ["Destino nacional para viajeros españoles; revisa condiciones específicas si viajas con documentos de otra nacionalidad."], faqs: [["¿Norte o sur?","El norte aporta verdor, pueblos y naturaleza; el sur concentra más sol y servicios de playa."],["¿Hay que reservar Teide?","Las condiciones de acceso y reservas pueden cambiar según actividad; compruébalas antes del viaje."]]
  },
  {
    slug: "gran-canaria", name: "Gran Canaria", country: "España",
    title: "Guía de Gran Canaria: montaña, costa y paisajes | Cruzando Meridianos",
    subtitle: "Una isla que recompensa salir de la costa y leer sus cambios de altitud.",
    intro: "Gran Canaria tiene una diversidad de paisajes sorprendente para su escala. El viaje gana cuando montaña, pueblos y costa comparten protagonismo.",
    officialLabel: "Gran Canaria Turismo", officialUrl: "https://www.grancanaria.com/turismo/", maecUrl: "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Espa%C3%B1a",
    snapshot: { climateSummary: "Clima diverso según costa y altitud; interior mucho más fresco.", travelStyle: "Road trip insular con montaña y mar.", mainStrengths: ["Paisaje", "Montaña", "Pueblos", "Costa"], mainConsiderations: ["Carreteras", "Curvas", "Microclimas"] },
    fit: { title: "Gran Canaria es más interesante cuando se conduce hacia dentro", intro: "Ideal para quien disfruta de paisajes cambiantes y rutas cortas en coche.", goodFor: ["road trips", "senderismo", "gastronomía", "parejas"], notFor: ["quien solo quiere resort"] },
    decision: "La gran decisión es cuánto explorar el interior frente al tiempo de playa.", regions: "Las Palmas, norte, interior montañoso, Tejeda y costa sur forman experiencias muy distintas.", transport: "El coche aporta mucho valor, especialmente para interior y miradores.", season: "La isla es agradecida todo el año, pero el interior siempre debe analizarse por altitud.", tradeoff: "Más carretera significa más paisajes, pero también trayectos sinuosos y más atención.", experience: "Tejeda, barrancos, pueblos y costa permiten un viaje de gran variedad sin largas distancias.", avoid: "Quedarse únicamente en la franja de playa y concluir que la isla es homogénea.", durations: [[4,"Gran Canaria esencial","Costa + interior.",true],[6,"Gran Canaria completa","Añade más montaña y pueblos."],[8,"Gran Canaria lenta","Ritmo de carretera y naturaleza."]], visaRequirement: "none", entryNotes: ["Destino nacional para viajeros españoles; revisa condiciones específicas si viajas con documentos de otra nacionalidad."], faqs: [["¿Hace falta coche?","Para el interior, sí aporta una diferencia clara."],["¿La isla es solo playa?","No; su diversidad interior es precisamente una de sus mayores fortalezas."]]
  },
  {
    slug: "lanzarote", name: "Lanzarote", country: "España",
    title: "Guía de Lanzarote: volcanes, paisaje y arquitectura | Cruzando Meridianos",
    subtitle: "Una isla donde paisaje, obra humana y velocidad del viaje forman parte de la misma experiencia.",
    intro: "Lanzarote tiene una identidad visual muy marcada. El viaje funciona cuando volcanes, pueblos, costa y arquitectura se observan como un conjunto, no como excursiones aisladas.",
    officialLabel: "Turismo de Lanzarote", officialUrl: "https://turismolanzarote.com/", maecUrl: "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Espa%C3%B1a",
    snapshot: { climateSummary: "Clima árido y ventoso, con temperaturas suaves y poca lluvia.", travelStyle: "Isla de paisajes, arquitectura y coche.", mainStrengths: ["Volcanes", "Paisaje", "César Manrique", "Costa"], mainConsiderations: ["Viento", "Calor solar", "Conducción"] },
    fit: { title: "Lanzarote es una isla de paisaje", intro: "Excelente para quien valora arquitectura, geología y carretera corta.", goodFor: ["parejas", "fotografía", "paisaje", "arte y arquitectura"], notFor: ["quien busca grandes bosques o senderos húmedos"] },
    decision: "La gran decisión es cuánto espacio reservar a Timanfaya y al interior frente a costa y pueblos.", regions: "Timanfaya, La Geria, norte, costa este y sur pueden organizar un viaje muy coherente.", transport: "El coche facilita muchísimo el conjunto.", season: "Es uno de los destinos canarios más fáciles de visitar todo el año, aunque viento y calor alteran algunas actividades.", tradeoff: "Las distancias son cortas; la clave es no sobrecargar el día con paradas visualmente similares.", experience: "Timanfaya, La Geria, Jameos, arquitectura de Manrique y pueblos construyen una identidad de viaje única.", avoid: "Convertir cada mirador en una parada sin contexto.", durations: [[4,"Lanzarote esencial","Volcanes + arquitectura.",true],[6,"Lanzarote completa","Más costa y norte."],[8,"Lanzarote lenta","Permite descubrir calas, pueblos y gastronomía."]], visaRequirement: "none", entryNotes: ["Destino nacional para viajeros españoles; revisa condiciones específicas si viajas con documentos de otra nacionalidad."], faqs: [["¿Hace falta coche?","Es una de las islas donde más cómodo resulta tenerlo."],["¿Timanfaya ocupa un día entero?","No necesariamente; el valor está en integrarlo con otras zonas y controlar el ritmo."]]
  },
  {
    slug: "fuerteventura", name: "Fuerteventura", country: "España",
    title: "Guía de Fuerteventura: playas, viento y paisaje abierto | Cruzando Meridianos",
    subtitle: "Una isla para conducir, parar y dejar espacio, no para llenar cada hora.",
    intro: "Fuerteventura destaca por su escala paisajística: playas, arena, viento, volcanes bajos y carreteras abiertas. El viaje funciona especialmente bien cuando no se intenta llenar el calendario.",
    officialLabel: "Visit Fuerteventura", officialUrl: "https://www.visitfuerteventura.com/", maecUrl: "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Espa%C3%B1a",
    snapshot: { climateSummary: "Muy seca, con viento frecuente y temperaturas suaves buena parte del año.", travelStyle: "Playa, carretera, surf y paisaje abierto.", mainStrengths: ["Playas", "Paisaje", "Surf", "Espacio"], mainConsiderations: ["Viento", "Distancias insulares", "Exposición al sol"] },
    fit: { title: "Fuerteventura es una isla para bajar revoluciones", intro: "Funciona mejor cuando el espacio y la improvisación forman parte del viaje.", goodFor: ["parejas", "surf", "playas", "descanso activo"], notFor: ["quien necesita una agenda cultural intensa"] },
    decision: "La gran decisión es elegir base según el tipo de costa y actividades, no según una única fotografía de playa.", regions: "Corralejo, norte, interior, costa oeste, Costa Calma y Jandía presentan perfiles distintos.", transport: "El coche resulta muy útil para aprovechar la isla.", season: "Todo el año puede funcionar, pero viento y temperatura del agua condicionan mucho la elección de actividades.", tradeoff: "Más playas no necesariamente mejoran el viaje; la selección de zonas y el tiempo libre sí.", experience: "Dunas, playas, pueblos, faros y deportes acuáticos forman una narrativa simple y efectiva.", avoid: "Cambiar de base demasiadas veces en una isla donde el objetivo es precisamente bajar el ritmo.", durations: [[4,"Fuerteventura esencial","Dos zonas y mucho mar.",true],[6,"Fuerteventura equilibrada","Norte + sur con tiempo de playa."],[8,"Fuerteventura abierta","Más interior, pueblos y actividad."]], visaRequirement: "none", entryNotes: ["Destino nacional para viajeros españoles; revisa condiciones específicas si viajas con documentos de otra nacionalidad."], faqs: [["¿Es solo para playa?","No; viento, volcanes bajos, pueblos y deportes aportan otra dimensión."],["¿Dónde conviene alojarse?","Depende del viento, playas y actividades que quieras priorizar."]]
  },
  {
    slug: "el-hierro", name: "El Hierro", country: "España",
    title: "Guía de El Hierro: naturaleza, volcanes y calma | Cruzando Meridianos",
    subtitle: "Una isla para quien busca paisaje, carretera y silencio por encima de la acumulación de lugares.",
    intro: "El Hierro tiene una personalidad más contemplativa que otras Canarias. Su valor está en el paisaje, el mar, los miradores, los bosques y el ritmo lento.",
    officialLabel: "El Hierro Turismo", officialUrl: "https://elhierro.travel/", maecUrl: "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Espa%C3%B1a",
    snapshot: { climateSummary: "Microclimas, relieve y exposición generan cambios notables en una isla pequeña.", travelStyle: "Naturaleza, coche, buceo y desconexión.", mainStrengths: ["Paisaje", "Buceo", "Bosques", "Tranquilidad"], mainConsiderations: ["Accesibilidad", "Carreteras", "Ritmo"] },
    fit: { title: "El Hierro no se visita con prisa", intro: "Ideal para viajeros que valoran silencio, paisaje y naturaleza por encima de una lista de atracciones.", goodFor: ["senderismo", "b&b tranquilos", "buceo", "fotografía"], notFor: ["quien busca vida urbana intensa"] },
    decision: "La gran decisión es aceptar que el principal producto del destino es el propio ritmo.", regions: "Valverde, Frontera, El Golfo, Sabinosa, costa sur y zonas de montaña permiten organizar una ruta suave.", transport: "El coche es prácticamente la herramienta principal para aprovechar el paisaje.", season: "Se puede visitar todo el año, con variación importante por altitud y orientación.", tradeoff: "No hace falta cambiar de alojamiento continuamente; muchas experiencias funcionan mejor desde una base bien elegida.", experience: "Miradores, bosques, piscinas naturales, buceo y volcanes ofrecen una densidad de paisaje poco habitual.", avoid: "Comparar El Hierro con Tenerife en términos de cantidad de cosas que hacer.", durations: [[4,"El Hierro esencial","Una muestra del paisaje y un ritmo pausado.",true],[6,"El Hierro profundo","Más senderos y costa."],[8,"El Hierro lento","Tiempo para explorar sin agenda."]], visaRequirement: "none", entryNotes: ["Destino nacional para viajeros españoles; revisa condiciones específicas si viajas con documentos de otra nacionalidad."], faqs: [["¿Hace falta coche?","Aporta una diferencia enorme para entender la isla."],["¿Es una isla para una escapada corta?","Sí, pero su valor aumenta cuanto menos intentas compactarla."]]
  },
];

export const additionalGuides: DestinationGuide[] = specs.map(buildGuide);
