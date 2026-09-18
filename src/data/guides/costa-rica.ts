/**
 * ============================================================
 * CRUZANDO MERIDIANOS
 * GUIDE DATA — COSTA RICA
 * ============================================================
 *
 * Contenido estructurado de la guía editorial de Costa Rica.
 *
 * Arquitectura:
 *
 *   destinations.ts
 *          ↓
 *   guides/costa-rica.ts
 *          ↓
 *   guides/index.ts
 *          ↓
 *   /viajes/[slug].astro
 *
 * PRINCIPIOS
 * ------------------------------------------------------------
 *
 * 1. No inventar datos.
 * 2. Separar conocimiento editorial de datos temporales.
 * 3. Información migratoria, sanitaria y de seguridad:
 *    fuente oficial + fecha de revisión.
 * 4. Las alertas deben poder caducar.
 * 5. El criterio editorial se diferencia de los hechos.
 * 6. La plantilla nunca debe depender de Costa Rica.
 * 7. La información personalizada que vendemos no se regala.
 *
 * IMPORTANTE
 * ------------------------------------------------------------
 *
 * Este archivo NO intenta resolver el viaje completo del lector.
 * La función de esta guía pública es demostrar:
 *
 * - profundidad;
 * - investigación;
 * - criterio;
 * - metodología;
 * - fuentes;
 * - capacidad de actualización.
 *
 * El itinerario personalizado sigue siendo nuestro producto.
 * ============================================================
 */

import type {
    DestinationEntryRequirements,
    DestinationGuide,
    FAQItem,
    GuideDurationOption,
    GuideSection,
    GuideSource,
    TravelerRequirement,
    TravelAlert,
  } from "./types";


  /* ============================================================
     CONSTANTES
     ============================================================ */

  const GUIDE_SLUG =
    "costa-rica";

  const LAST_REVIEWED =
    "2026-08-26";


  /* ============================================================
     FUENTES OFICIALES
     ============================================================ */

  const sourceVisitCostaRica = {
    label:
      "Visit Costa Rica — Requisitos de entrada",

    url:
      "https://es.visitcostarica.com/planning-your-trip/entry-requirements",

    type:
      "official",

    accessedAt:
      LAST_REVIEWED,
  } satisfies GuideSource;


  const sourceMigration = {
    label:
      "Dirección General de Migración y Extranjería de Costa Rica",

    url:
      "https://www.migracion.go.cr/",

    type:
      "official",

    accessedAt:
      LAST_REVIEWED,
  } satisfies GuideSource;


  const sourceHealth = {
    label:
      "Ministerio de Salud de Costa Rica",

    url:
      "https://www.ministeriodesalud.go.cr/",

    type:
      "official",

    accessedAt:
      LAST_REVIEWED,
  } satisfies GuideSource;


  const sourceYellowFever = {
    label:
      "Ministerio de Salud — Fiebre amarilla",

    url:
      "https://www.ministeriodesalud.go.cr/index.php/temas-de-interes/2470-zonas-geograficas-en-riesgo-de-transmision-de-fiebre-amarilla-26",

    type:
      "official",

    accessedAt:
      LAST_REVIEWED,
  } satisfies GuideSource;

  const sourceVisitCostaRicaNature10 = {
    label:
      "Visit Costa Rica — Itinerario de naturaleza de 10 días",

    url:
      "https://es.visitcostarica.com/planning-your-trip/itineraries/nature-10-days",

    type:
      "official",

    accessedAt:
      LAST_REVIEWED,
  } satisfies GuideSource;

  const sourceVisitCostaRicaMonteverde = {
    label:
      "Visit Costa Rica — Guía turística de Monteverde",

    url:
      "https://es.visitcostarica.com/where-to-go/puntarenas",

    type:
      "official",

    accessedAt:
      LAST_REVIEWED,
  } satisfies GuideSource;


  /* ============================================================
     REQUISITOS DE ENTRADA
     ============================================================
   *
   * España es la nacionalidad predeterminada.
   *
   * No añadimos artificialmente países europeos,
   * sudamericanos o centroamericanos hasta contrastar
   * individualmente su situación con las directrices vigentes.
   *
   * La arquitectura sí está preparada para ello.
   */

  const travelerRequirements:
    TravelerRequirement[] = [
    {
      countryCode:
        "ES",

      countryName:
        "España",

      region:
        "europe",

      visaRequirement:
        "none",

      /*
       * Evitamos codificar aquí un número absoluto que pueda
       * quedar desactualizado. La fuente oficial determina
       * el grupo y la autoridad migratoria fija finalmente
       * la estancia autorizada.
       */
      maximumStay:
        "Depende del grupo migratorio aplicable. La autoridad migratoria determina la estancia autorizada al entrar.",

      passportRequirement:
        "Pasaporte o documento de viaje válido y aceptado por las autoridades costarricenses.",

      returnTicketRequired:
        true,

      proofOfMeansRequired:
        true,

      yellowFeverRelevant:
        true,

      notes: [
        "España aparece como nacionalidad predeterminada.",
        "Para entrar pueden exigirse pasaporte o documento de viaje válido, visado cuando corresponda, acreditación de medios económicos y billete de regreso o continuación.",
        "Visit Costa Rica establece una referencia mínima de 100 USD por mes o fracción de estancia legal para la acreditación de medios económicos.",
        "La estancia finalmente autorizada corresponde al agente de inmigración en el momento de entrada.",
        "Los requisitos sanitarios relacionados con fiebre amarilla dependen, entre otros factores, de la procedencia reciente del viajero.",
      ],

      source:
        sourceVisitCostaRica,

      lastReviewed:
        LAST_REVIEWED,
    },
  ];


  const entryRequirements:
    DestinationEntryRequirements = {
    defaultCountryCode:
      "ES",

    defaultCountryName:
      "España",

    travelers:
      travelerRequirements,

    legalSource:
      sourceVisitCostaRica,

    lastReviewed:
      LAST_REVIEWED,

    disclaimer:
      "Los requisitos migratorios y sanitarios pueden cambiar. Esta información sirve para orientarte, pero la fuente oficial y la autoridad competente prevalecen siempre sobre este resumen. Comprueba los requisitos aplicables a tu nacionalidad, procedencia, documento de viaje e itinerario antes de viajar.",
  };


  /* ============================================================
     SECCIONES
     ============================================================ */

  const rawSections:
    Omit<GuideSection, "number">[] = [

    /* ----------------------------------------------------------
       01
       ---------------------------------------------------------- */

    {
      id:
        "costa-rica-de-un-vistazo",

      title:
        "Costa Rica de un vistazo",

      category:
        "overview",

      intro:
        "Antes de decidir una ruta, conviene entender qué tipo de destino tienes delante.",

      paragraphs: [
        "Costa Rica permite combinar selva, fauna, volcanes, bosque nuboso, aventura y costa dentro de un mismo viaje. Esa variedad es una de sus grandes virtudes, pero también hace que la planificación tenga más importancia de la que parece.",
        "No existe una única manera correcta de recorrer el país. La mejor combinación dependerá del tiempo disponible, de las experiencias que quieras priorizar y de cuánto desplazamiento estés dispuesto a asumir.",
        "Nuestro objetivo es ayudarte a entender las piezas importantes del destino. La construcción de un viaje concreto depende después de la combinación de tiempo, preferencias, presupuesto, ritmo y prioridades.",
      ],

      highlights: [
        {
          title:
            "La geografía importa",

          description:
            "Las distancias sobre el mapa no cuentan toda la historia. El relieve, las carreteras, las condiciones meteorológicas y las paradas hacen que el tiempo real de desplazamiento sea una variable fundamental.",

          type:
            "decision",
        },

        {
          title:
            "No todo cabe",

          description:
            "Intentar incluir demasiados lugares puede convertir un viaje de naturaleza en una sucesión de trayectos. Seleccionar es parte del diseño del viaje.",

          type:
            "important",
        },
      ],

      closing:
        "Antes de construir una ruta, entiende primero el país. Después decide qué experiencias merecen realmente formar parte del viaje.",

      status:
        "published",

      reviewedAt:
        LAST_REVIEWED,
    },


    /* ----------------------------------------------------------
       02
       ---------------------------------------------------------- */

    {
      id:
        "cuando-viajar",

      title:
        "Cuándo viajar",

      category:
        "planning",

      intro:
        "La fecha importa, pero no debería analizarse separada de la ruta que quieres hacer.",

      paragraphs: [
        "Costa Rica presenta diferencias climáticas importantes entre regiones. Por eso no creemos que baste con hablar de una única temporada seca y otra lluviosa para todo el país.",
        "La decisión correcta depende de la zona que quieras visitar, las actividades que quieras realizar y del margen que tengas para adaptarte a las condiciones del momento.",
        "La climatología también debe relacionarse con la conducción, los senderos, la fauna, las playas y cualquier actividad que dependa de condiciones exteriores.",
      ],

      highlights: [
        {
          title:
            "La fecha condiciona la ruta",

          description:
            "La mejor época para un viaje concreto depende de las regiones y experiencias que hayas elegido.",

          type:
            "decision",
        },

        {
          title:
            "Costa Rica no tiene un único clima",

          description:
            "Las condiciones pueden variar entre vertientes y zonas, por lo que una conclusión válida para una región puede no serlo para otra.",

          type:
            "important",
        },
      ],

      closing:
        "No preguntes solamente cuándo es mejor viajar a Costa Rica. Pregunta cuándo es mejor hacer el viaje que quieres hacer.",

      status:
        "published",

      reviewedAt:
        LAST_REVIEWED,
    },


    /* ----------------------------------------------------------
       03
       ---------------------------------------------------------- */

    {
      id:
        "cuantos-dias",

      title:
        "Cuántos días necesitas",

      category:
        "planning",

      intro:
        "No existe una duración perfecta. La pregunta útil es qué tipo de viaje quieres construir con el tiempo disponible.",

      paragraphs: [
        "Una semana obliga a seleccionar con bastante dureza. Diez días ofrecen más margen para combinar zonas. Dos semanas permiten plantear una ruta notablemente más variada.",
        "Tener más días no significa automáticamente añadir más lugares. También puede significar conducir menos, dormir más noches en una misma zona y dejar espacio para improvisar.",
      ],

      highlights: [
        {
          title:
            "7 días",

          description:
            "Necesitas concentrarte en pocas prioridades y reducir los desplazamientos innecesarios.",

          type:
            "decision",
        },

        {
          title:
            "10 días",

          description:
            "Empieza a existir margen para combinar experiencias diferentes sin intentar abarcarlo todo.",

          type:
            "decision",
        },

        {
          title:
            "14 días",

          description:
            "El abanico de combinaciones aumenta considerablemente.",

          type:
            "important",
        },

        {
          title:
            "21 días",

          description:
            "Puedes construir con menos presión y dejar más espacio a la profundidad.",

          type:
            "experience",
        },
      ],

      closing:
        "No queremos darte cuatro rutas prefabricadas. Queremos que entiendas qué sacrificios implica cada duración.",

      status:
        "published",

      reviewedAt:
        LAST_REVIEWED,
    },


    /* ----------------------------------------------------------
       04
       ---------------------------------------------------------- */

    {
      id:
        "regiones-y-zonas",

      title:
        "Regiones y zonas",

      category:
        "planning",

      intro:
        "Costa Rica se entiende mucho mejor cuando dejas de pensar en una lista de sitios y empiezas a pensar en zonas con ritmos y experiencias distintas.",

      paragraphs: [
        "Valle Central y San José sirven sobre todo para entrada, salida y conexiones. No hace falta reservarles mucho tiempo salvo que quieras conocer la capital o necesites una noche logística.",
        "La Fortuna y el entorno del Arenal concentran volcanes, naturaleza, termas y actividades variadas. Es una base muy completa y una de las zonas que más fácilmente justifica varias noches.",
        "Monteverde ofrece un ecosistema y un paisaje distintos: bosque nuboso, montaña, aves y actividades de aventura. Precisamente por ser diferente puede aportar mucho, pero no necesita convertirse por defecto en una estancia larga.",
        "La costa del Pacífico Central, con Manuel Antonio como referencia, permite combinar fauna, selva y playa con una logística relativamente sencilla. El Caribe Sur, en cambio, cambia el ambiente y la experiencia; añadirlo merece la pena cuando el viaje tiene tiempo suficiente para absorber el desplazamiento.",
        "La pregunta útil no es qué regiones son obligatorias, sino qué combinación produce el viaje que quieres sin pasar demasiadas horas moviéndote entre ellas.",
      ],

      highlights: [
        {
          title:
            "Una zona puede sustituir a otra",

          description:
            "No necesitas acumular volcanes, bosque, dos costas y parques solo porque estén disponibles. A menudo elegir una segunda experiencia muy diferente aporta más que añadir una tercera zona parecida.",

          type:
            "decision",
        },

        {
          title:
            "El desvío también cuesta",

          description:
            "Una zona puede ser magnífica y aun así no encajar en una ruta corta si obliga a gastar demasiadas horas para entrar y salir de ella.",

          type:
            "important",
        },
      ],

      closing:
        "Primero decide qué quieres sentir durante el viaje. Después utiliza las regiones como piezas para construirlo.",

      status:
        "published",

      reviewedAt:
        LAST_REVIEWED,
    },

    /* ----------------------------------------------------------
       05
       ---------------------------------------------------------- */

    {
      id:
        "que-ver-y-hacer",

      title:
        "Qué ver y qué hacer",

      category:
        "experience",

      intro:
        "Costa Rica funciona mejor cuando eliges experiencias que se complementan en lugar de intentar coleccionar actividades.",

      paragraphs: [
        "Si tu prioridad es fauna y selva, interesa combinar al menos una zona de bosque con otra experiencia que cambie de ecosistema. Si buscas aventura, Arenal y Monteverde ofrecen perfiles diferentes sin necesidad de convertir ambos en una carrera de actividades.",
        "Las actividades de agua, puentes colgantes, canopy, caminatas, termas, navegación o visitas de fauna pueden ocupar varias horas reales. El problema aparece cuando se colocan demasiadas en el mismo día o se programan como si los desplazamientos no existieran.",
        "También merece la pena distinguir entre experiencias que justifican cambiar de zona y experiencias que pueden añadirse de paso. Esa diferencia es una de las claves para que el viaje no se convierta en una sucesión de checklists.",
        "La mejor selección no es la que contiene más nombres. Es la que te deja recordar diferentes paisajes y sensaciones al terminar el viaje.",
      ],

      highlights: [
        {
          title:
            "Naturaleza ≠ una sola actividad",

          description:
            "Bosque, fauna, paisaje, senderismo y aventura pueden ocupar papeles diferentes dentro de la misma ruta.",

          type:
            "experience",
        },

        {
          title:
            "No llenes todos los huecos",

          description:
            "En destinos con tanta naturaleza, dejar algunas horas sin una reserva cerrada puede mejorar el viaje más que añadir otra actividad.",

          type:
            "tip",
        },
      ],

      closing:
        "Seleccionar experiencias es parte de diseñar la ruta, no una tarea que se hace al final.",

      status:
        "published",

      reviewedAt:
        LAST_REVIEWED,
    },

    /* ----------------------------------------------------------
       06
       ---------------------------------------------------------- */

    {
      id:
        "fauna-y-naturaleza",

      title:
        "Fauna y naturaleza",

      category:
        "experience",

      intro:
        "La fauna es uno de los grandes argumentos para viajar a Costa Rica, pero la experiencia cambia mucho según el ecosistema, la hora y la forma de buscarla.",

      paragraphs: [
        "No conviene construir una ruta pensando en una lista de animales que tienen que aparecer. La mejor decisión suele ser elegir ecosistemas y experiencias que aumenten las oportunidades de observar naturaleza sin convertir cada día en una persecución.",
        "Bosque nuboso, selva, humedales, costa y zonas de montaña ofrecen experiencias diferentes. También cambia mucho si haces una caminata, un recorrido con guía, una actividad nocturna o simplemente dejas tiempo para observar.",
        "La fotografía y la observación de aves requieren otra relación con el tiempo que una excursión rápida. Si esa es una prioridad real, tiene sentido proteger horas de calidad en lugar de llenar la ruta de cambios de zona.",
        "La regla editorial será sencilla: hablar de posibilidades y contexto, no prometer avistamientos.",
      ],

      highlights: [
        {
          title:
            "El animal no es el único objetivo",

          description:
            "Elegir bien el ecosistema, el tipo de actividad y el ritmo puede mejorar mucho más la experiencia que perseguir una especie concreta.",

          type:
            "experience",
        },

        {
          title:
            "Deja margen",

          description:
            "La naturaleza recompensa tener tiempo para parar, escuchar y observar. Un calendario demasiado cerrado puede jugar en contra.",

          type:
            "decision",
        },
      ],

      closing:
        "La pregunta útil no es «¿dónde veo este animal?», sino «¿qué tipo de experiencia de naturaleza quiero vivir y cuánto espacio necesita?»",

      status:
        "published",

      reviewedAt:
        LAST_REVIEWED,
    },

    /* ----------------------------------------------------------
       07
       ---------------------------------------------------------- */

    {
      id:
        "parques-nacionales",

      title:
        "Parques nacionales",

      category:
        "experience",

      intro:
        "Un parque puede ser un destino en sí mismo o una pieza de una ruta. La decisión depende de lo que quieras vivir allí y del coste de llegar.",

      paragraphs: [
        "Antes de incluir un parque, conviene mirar cuatro variables juntas: qué aporta, cuánto tiempo requiere, cómo se llega y qué otras experiencias puedes combinar alrededor.",
        "La fama no siempre coincide con el mejor encaje. Un parque puede ser magnífico y aun así no compensar un desvío en una ruta corta si otra zona ofrece el tipo de naturaleza que buscas con mucha menos fricción.",
        "También hay que distinguir entre un parque que funciona como jornada completa y una visita que puedes integrar en un día de desplazamiento o de costa.",
        "Las condiciones de acceso, senderos y recomendaciones concretas deben comprobarse cerca de la fecha en las fuentes oficiales antes de viajar.",
      ],

      highlights: [
        {
          title:
            "No colecciones parques",

          description:
            "Elegir dos parques que aportan ecosistemas distintos puede tener más sentido que intentar encadenar muchos.",

          type:
            "decision",
        },

        {
          title:
            "El acceso también forma parte del parque",

          description:
            "La experiencia real incluye desplazamiento, aparcamiento, senderos, calor, lluvia y tiempo de regreso.",

          type:
            "important",
        },
      ],

      closing:
        "Un buen parque es el que aporta algo que tu ruta necesita, no simplemente el que aparece en más listas.",

      status:
        "published",

      reviewedAt:
        LAST_REVIEWED,
    },

    /* ----------------------------------------------------------
       08
       ---------------------------------------------------------- */

    {
      id:
        "playas",

      title:
        "Playas y costas",

      category:
        "experience",

      intro:
        "Costa Rica permite elegir entre dos costas con personalidades diferentes; la dificultad está precisamente en decidir cuánto quieres dedicarles.",

      paragraphs: [
        "No buscamos una clasificación de playas. Para una planificación útil importan cosas distintas según el viajero: baño, surf, fauna, paisaje, tranquilidad, ambiente, acceso y relación con el resto de la ruta.",
        "En un viaje corto, intentar incluir Pacífico y Caribe puede consumir demasiadas horas de desplazamiento. Con más días, el contraste entre ambas costas puede convertirse en uno de los grandes atractivos del viaje.",
        "También hay que decidir si la costa será un destino protagonista o una parte final de la ruta. Esa elección cambia completamente cuántas noches y qué tipo de alojamiento tienen sentido.",
        "El estado del mar, la temporada y las condiciones locales deben revisarse antes de planificar actividades específicas en el agua.",
      ],

      highlights: [
        {
          title:
            "Una costa puede ser suficiente",

          description:
            "En viajes cortos, elegir bien una costa suele producir un viaje más agradable que dividir pocos días entre las dos.",

          type:
            "decision",
        },

        {
          title:
            "Playa no significa solo descansar",

          description:
            "Fauna, surf, paseos, gastronomía y paisaje pueden convertir la costa en una parte muy diferente según la zona.",

          type:
            "experience",
        },
      ],

      closing:
        "La pregunta no es qué costa es mejor. Es qué costa aporta al viaje que estás intentando construir.",

      status:
        "published",

      reviewedAt:
        LAST_REVIEWED,
    },

    /* ----------------------------------------------------------
       09
       ---------------------------------------------------------- */

    {
      id:
        "como-moverse",

      title:
        "Cómo moverse",

      category:
        "planning",

      intro:
        "El transporte debe resolver la ruta que quieres hacer, no dictarla por adelantado.",

      paragraphs: [
        "El coche de alquiler aporta libertad para cambiar de base, parar durante el trayecto y llegar a lugares donde el transporte colectivo es menos directo. A cambio, exige asumir conducción, aparcamiento, carreteras y tiempos reales de desplazamiento.",
        "Los traslados privados o compartidos pueden quitarte parte de esa carga y funcionan bien cuando quieres conectar bases sin conducir. En una ruta con pocas zonas y actividades concentradas pueden simplificar mucho el viaje.",
        "El transporte público puede tener sentido en trayectos concretos, especialmente si el recorrido no depende de encadenar muchas zonas. En Costa Rica, la decisión cambia bastante cuando empiezas a combinar regiones alejadas.",
        "Los vuelos internos pueden ahorrar tiempo en determinados recorridos, pero no tienen por qué encajar en una ruta basada en carretera y naturaleza. La solución correcta puede ser incluso mixta.",
      ],

      highlights: [
        {
          title:
            "No hay un transporte universalmente mejor",

          description:
            "La mejor opción cambia según las zonas elegidas, las noches disponibles y el valor que tenga para ti la autonomía.",

          type:
            "decision",
        },

        {
          title:
            "Mide puerta a puerta",

          description:
            "Compara no solo la duración del vehículo o vuelo, sino también recogidas, esperas, check-in, aparcamiento y conexiones.",

          type:
            "important",
        },
      ],

      closing:
        "Primero dibuja el viaje. Después decide qué medio hace más fácil recorrerlo.",

      status:
        "published",

      reviewedAt:
        LAST_REVIEWED,
    },

    /* ----------------------------------------------------------
       10
       ---------------------------------------------------------- */

    {
      id:
        "hace-falta-coche",

      title:
        "¿Hace falta coche?",

      category:
        "planning",

      intro:
        "En Costa Rica el coche puede ser una herramienta excelente, pero no debería convertirse en una obligación automática.",

      paragraphs: [
        "Tiene mucho sentido cuando quieres unir varias zonas, aprovechar el día con libertad, hacer paradas intermedias o alojarte fuera de los núcleos principales.",
        "Puede aportar menos valor si concentras el viaje en pocas bases, utilizas excursiones organizadas o prefieres que los desplazamientos entre zonas los gestione otra persona.",
        "También hay una cuestión de energía: conducir durante horas después de una noche corta, una caminata larga o una actividad de naturaleza puede cambiar la experiencia más de lo que parece al planificar delante del mapa.",
      ],

      highlights: [
        {
          title:
            "Sí lo consideraría como herramienta de ruta",

          description:
            "Especialmente cuando vas a combinar varias regiones y quieres conservar margen para parar, cambiar de plan o explorar por tu cuenta.",

          type:
            "decision",
        },

        {
          title:
            "No lo alquilaría por inercia",

          description:
            "Si las bases están muy concentradas y puedes resolver traslados clave sin conducir, el coste y la responsabilidad añadidos pueden no compensar.",

          type:
            "important",
        },
      ],

      closing:
        "La pregunta correcta no es «¿Costa Rica necesita coche?», sino «¿mi ruta necesita el coche que estoy pensando alquilar?».",

      status:
        "published",

      reviewedAt:
        LAST_REVIEWED,
    },

    /* ----------------------------------------------------------
       11
       ---------------------------------------------------------- */

    {
      id:
        "desplazamientos-y-tiempos",

      title:
        "Desplazamientos y tiempos",

      category:
        "planning",

      intro:
        "Una ruta que parece sencilla sobre el mapa puede consumir buena parte de una jornada cuando se hace de verdad.",

      paragraphs: [
        "Como referencia oficial, Visit Costa Rica plantea alrededor de cuatro horas para llegar a Monteverde desde San José y aproximadamente tres horas entre La Fortuna y Monteverde por la ruta terrestre tradicional. Las condiciones, el tráfico, las paradas y el punto exacto de salida pueden hacer variar esos tiempos.",
        "Por eso conviene pensar en medias jornadas y jornadas completas, no solo en horas de Google Maps. Llegar a una zona también implica dejar el alojamiento, comer, aparcar, recoger el coche o esperar un traslado.",
        "Los trayectos de transición son especialmente importantes en Costa Rica. Un día de movimiento no debe tratarse como si fuera un día completo de visitas.",
        "La mejor ruta suele ser la que reduce los cambios de base innecesarios, incluso cuando sobre el papel incluya menos lugares.",
      ],

      highlights: [
        {
          title:
            "Monteverde es un buen ejemplo",

          description:
            "El valor de la zona no se entiende solo por lo que hay allí, sino por el tiempo que cuesta entrar y salir. Esa fricción debe formar parte de la decisión.",

          type:
            "important",
        },

        {
          title:
            "Cuenta el día completo",

          description:
            "Una jornada de traslado puede dejar huecos útiles, pero no conviene venderla como si fuera otra jornada de exploración.",

          type:
            "decision",
        },
      ],

      closing:
        "Cuando compares dos rutas, compara también cuántas horas de tu viaje vas a pasar realmente en carretera.",

      status:
        "published",

      reviewedAt:
        LAST_REVIEWED,
    },

    /* ----------------------------------------------------------
       12
       ---------------------------------------------------------- */

    {
      id:
        "comida",

      title:
        "Comida",

      category:
        "experience",

      intro:
        "La gastronomía funciona como una forma muy sencilla de cambiar el ritmo del viaje y conocer una parte menos turística del destino.",

      paragraphs: [
        "Para entender Costa Rica merece la pena dejar espacio a restaurantes locales, sodas y mercados, no solo a los establecimientos pensados para visitantes. La comida puede ser una actividad en sí misma o una pausa útil entre experiencias de naturaleza.",
        "Hay platos y productos que cambian según la región y el contexto. Gallo pinto, casados, ceviche, café, frutas y productos del Caribe pueden aparecer en viajes muy distintos, pero la experiencia de comerlos depende también del lugar donde lo hagas.",
        "No hace falta diseñar el viaje alrededor de reservas gastronómicas. Suele ser más interesante decidir qué momentos justifican una comida buscada y cuáles conviene dejar abiertos para descubrir sobre la marcha.",
        "Los precios, horarios y establecimientos concretos cambian; cuando demos recomendaciones específicas, convendrá acompañarlas de fecha de revisión y fuente.",
      ],

      highlights: [
        {
          title:
            "Come donde tiene sentido",

          description:
            "Una comida local puede formar parte de la lectura de una zona y no solo de la logística entre dos actividades.",

          type:
            "experience",
        },

        {
          title:
            "No conviertas todo en reserva",

          description:
            "En un viaje de naturaleza, algunos de los mejores momentos gastronómicos aparecen precisamente cuando no has llenado cada hueco.",

          type:
            "tip",
        },
      ],

      closing:
        "La gastronomía no necesita protagonizar el viaje para mejorar muchísimo cómo se recuerda.",

      status:
        "published",

      reviewedAt:
        LAST_REVIEWED,
    },

    /* ----------------------------------------------------------
       13
       ---------------------------------------------------------- */

    {
      id:
        "documentacion-y-entrada",

      title:
        "Documentación y entrada",

      category:
        "practical",

      intro:
        "La información migratoria debe estar siempre vinculada a una fuente oficial y a una fecha de revisión.",

      paragraphs: [
        "Las autoridades costarricenses establecen requisitos de entrada que incluyen documento de viaje válido, visado cuando corresponda, medios económicos y prueba de regreso o continuación del viaje.",
        "La estancia autorizada depende de la clasificación migratoria aplicable y la autoridad migratoria determina finalmente el periodo concedido al entrar.",
        "Nuestra arquitectura permite consultar estos requisitos por nacionalidad sin mezclar la información administrativa con el contenido editorial del destino.",
      ],

      blocks: [
        {
          type:
            "source",

          label:
            "Fuente oficial",

          title:
            sourceVisitCostaRica.label,

          content:
            "Consulta siempre la fuente oficial antes de viajar. La información migratoria es susceptible de modificación.",

          source:
            sourceVisitCostaRica,
        },

        {
          type:
            "important",

          label:
            "Nuestra regla",

          title:
            "Fuente oficial antes que una respuesta rápida",

          content:
            "La guía sirve para entender el requisito. La autoridad oficial es la referencia definitiva para la situación concreta del viajero.",
        },
      ],

      status:
        "reviewed",

      reviewedAt:
        LAST_REVIEWED,
    },


    /* ----------------------------------------------------------
       14
       ---------------------------------------------------------- */

    {
      id:
        "seguro",

      title:
        "Seguro",

      category:
        "practical",

      intro:
        "No existe una póliza universalmente correcta para todos los viajeros.",

      paragraphs: [
        "La cobertura debería analizarse en función de duración, actividades, transporte, equipaje, cancelación y necesidades médicas.",
        "No queremos convertir esta sección en una caja de afiliación disfrazada de asesoramiento. Primero explicaremos qué debe cubrir una buena póliza y después podremos comparar opciones.",
      ],

      status:
        "draft",
    },


    /* ----------------------------------------------------------
       15
       ---------------------------------------------------------- */

    {
      id:
        "salud",

      title:
        "Salud",

      category:
        "practical",

      intro:
        "La información sanitaria requiere especial cuidado porque puede cambiar y depender del itinerario.",

      paragraphs: [
        "No queremos convertir esta sección en un listado genérico de enfermedades. Nos centraremos en aquello que realmente puede afectar a una persona que prepara un viaje.",
        "La fiebre amarilla es un buen ejemplo de por qué la procedencia y el itinerario importan.",
      ],

      blocks: [
        {
          type:
            "warning",

          label:
            "Importante",

          title:
            "Fiebre amarilla",

          content:
            "Costa Rica publica requisitos específicos para viajeros procedentes de determinadas zonas de riesgo. La aplicabilidad debe comprobarse según la procedencia reciente y las circunstancias concretas del viaje.",

          source:
            sourceYellowFever,
        },

        {
          type:
            "source",

          label:
            "Fuente sanitaria",

          title:
            sourceHealth.label,

          content:
            "Para cuestiones sanitarias sensibles, la fuente oficial debe prevalecer sobre cualquier resumen editorial.",

          source:
            sourceHealth,
        },
      ],

      status:
        "reviewed",

      reviewedAt:
        LAST_REVIEWED,
    },


    /* ----------------------------------------------------------
       16
       ---------------------------------------------------------- */

    {
      id:
        "dinero-y-tarjetas",

      title:
        "Dinero y tarjetas",

      category:
        "practical",

      intro:
        "Una buena planificación financiera también consiste en reducir puntos de fallo.",

      paragraphs: [
        "La sección analizará moneda, tarjetas, efectivo, cajeros, posibles comisiones y situaciones en las que conviene disponer de una alternativa de pago.",
        "Cuando demos cifras o comisiones concretas, deberán revisarse porque pueden depender del banco, del proveedor o de las condiciones vigentes.",
      ],

      status:
        "draft",
    },


    /* ----------------------------------------------------------
       17
       ---------------------------------------------------------- */

    {
      id:
        "internet-y-conectividad",

      title:
        "Internet y conectividad",

      category:
        "practical",

      intro:
        "La conectividad puede ser especialmente importante cuando se conduce y se depende de mapas, reservas o comunicaciones.",

      paragraphs: [
        "Compararemos SIM local, eSIM y otras alternativas teniendo en cuenta cobertura, facilidad de instalación, coste y utilidad real durante el recorrido.",
        "La recomendación debe basarse en la ruta concreta y no simplemente en qué producto tenga más popularidad.",
      ],

      status:
        "draft",
    },


    /* ----------------------------------------------------------
       18
       ---------------------------------------------------------- */

    {
      id:
        "seguridad",

      title:
        "Seguridad",

      category:
        "practical",

      intro:
        "La seguridad se entiende mejor con hábitos concretos que con una lista genérica de peligros.",

      paragraphs: [
        "En un viaje por Costa Rica conviene pensar especialmente en conducción, aparcamiento, pertenencias, desplazamientos después de anochecer, senderos y actividades de naturaleza. El contexto cambia según la zona y la situación.",
        "La regla más útil para un viaje en coche es sencilla: no dejar equipaje visible, elegir bien dónde aparcar y evitar improvisar desplazamientos o rutas aisladas cuando las condiciones no sean claras.",
        "En naturaleza, seguir indicaciones de guías y gestores de los espacios, respetar senderos y condiciones meteorológicas y no acercarse innecesariamente a fauna son decisiones tan importantes como el equipo que lleves.",
        "Cuando una advertencia dependa de una zona concreta o de una situación temporal, debe prevalecer la recomendación oficial más reciente.",
      ],

      highlights: [
        {
          title:
            "Seguridad práctica",

          description:
            "Más que memorizar una lista de riesgos, interesa saber qué hábitos reducen problemas durante conducción, aparcamiento y actividades.",

          type:
            "important",
        },

        {
          title:
            "La fuente puede cambiar",

          description:
            "Las recomendaciones de seguridad son de las partes que más merece la pena revisar cerca de la fecha del viaje.",

          type:
            "decision",
        },
      ],

      closing:
        "Prepararse bien no significa viajar con miedo; significa saber qué hábitos sencillos cambian la experiencia.",

      status:
        "published",

      reviewedAt:
        LAST_REVIEWED,
    },

    /* ----------------------------------------------------------
       19
       ---------------------------------------------------------- */

    {
      id:
        "equipaje",

      title:
        "Equipaje",

      category:
        "practical",

      intro:
        "El equipaje debe responder a la ruta y a las actividades, no a una lista genérica.",

      paragraphs: [
        "Un viaje que combina selva, costa, carretera y posibles zonas de montaña requiere equilibrio entre protección, comodidad y peso.",
        "La lista definitiva debería construirse después de conocer la ruta concreta.",
      ],

      status:
        "draft",
    },


    /* ----------------------------------------------------------
       20
       ---------------------------------------------------------- */

    {
      id:
        "consejos-practicos",

      title:
        "Consejos prácticos",

      category:
        "practical",

      intro:
        "Los pequeños detalles pesan mucho en un país donde el clima, la carretera y la naturaleza forman parte del propio viaje.",

      paragraphs: [
        "Planifica con margen. Un trayecto que parece cómodo puede ocupar más tiempo real del previsto y dejarte menos energía para una actividad de naturaleza.",
        "Lleva el equipo pensando en cambios de temperatura, lluvia y actividades concretas, pero evita preparar una maleta enorme para cada escenario posible. La ruta también debe determinar el equipaje.",
        "Conviene tener una estrategia sencilla para el móvil: mapas disponibles sin conexión, batería suficiente y acceso a la documentación del viaje. Son pequeños detalles que cobran valor cuando sales de las zonas más urbanas.",
        "Y, sobre todo, no intentes controlar todo el viaje. Dejar algo de margen es una forma de adaptarte al clima, a la fauna y a esos momentos que no estaban en el plan original.",
      ],

      highlights: [
        {
          title:
            "Planifica margen, no agujeros",

          description:
            "Un hueco libre tiene valor cuando permite absorber retrasos, lluvia o una actividad que se alarga.",

          type:
            "tip",
        },

        {
          title:
            "El equipaje sigue a la ruta",

          description:
            "No prepares la maleta antes de saber qué tipo de viaje vas a hacer: coche, senderismo, costa y montaña no necesitan exactamente lo mismo.",

          type:
            "decision",
        },
      ],

      closing:
        "Los mejores consejos prácticos suelen ser los que evitan pequeñas molestias que, sumadas, terminan cambiando el ritmo del viaje.",

      status:
        "published",

      reviewedAt:
        LAST_REVIEWED,
    },

    /* ----------------------------------------------------------
       21
       ---------------------------------------------------------- */

    {
      id:
        "errores-habituales",

      title:
        "Errores habituales",

      category:
        "practical",

      intro:
        "La mayoría de los problemas de una ruta de Costa Rica no aparecen porque falte información, sino porque se han tomado demasiadas decisiones buenas a la vez.",

      paragraphs: [
        "Intentar meter demasiadas regiones es el error más común. Cada lugar puede ser interesante de forma aislada y aun así producir una ruta peor cuando se conectan todos.",
        "Otro error es tratar Monteverde como una parada fija de tres noches. Para muchas rutas, una o dos noches permiten vivir el bosque nuboso y sus actividades sin convertir la zona en un bloque sobredimensionado; una estancia mayor puede tener sentido cuando existe un motivo concreto para quedarse.",
        "También es fácil subestimar los trayectos, encadenar actividades sin margen, reservar alojamientos en zonas poco prácticas o cambiar de costa sin preguntarse si el desvío aporta algo que no puedas conseguir en otro punto del viaje.",
        "Finalmente, conviene dejar espacio para el clima y para la naturaleza. No todas las experiencias pueden programarse con la precisión de una ciudad europea.",
      ],

      highlights: [
        {
          title:
            "Menos bases, mejor elegidas",

          description:
            "Reducir cambios de alojamiento puede liberar horas y mejorar la sensación de viaje sin hacer que veas menos cosas importantes.",

          type:
            "decision",
        },

        {
          title:
            "Tres noches no son un estándar",

          description:
            "La duración de una zona debe justificarse por lo que vas a hacer allí, no por una cifra repetida en itinerarios ajenos.",

          type:
            "experience",
        },
      ],

      closing:
        "Un buen viaje no es el que encaja más sitios. Es el que hace que cada cambio de zona tenga una razón.",

      status:
        "published",

      reviewedAt:
        LAST_REVIEWED,
    },

    /* ----------------------------------------------------------
       22
       ---------------------------------------------------------- */

    {
      id:
        "actualidad-y-avisos",

      title:
        "Actualidad y avisos de viaje",

      category:
        "updates",

      intro:
        "Solo publicaremos información reciente cuando pueda afectar realmente a una decisión de viaje.",

      paragraphs: [
        "Esta sección no pretende convertirse en un periódico de Costa Rica.",
        "Nos interesan únicamente incidencias operativas: carreteras afectadas, parques con acceso restringido, fenómenos meteorológicos relevantes, problemas de transporte, cambios migratorios, alertas sanitarias y otras situaciones con una consecuencia práctica para viajeros.",
        "Cada aviso deberá tener fecha, fuente, zona afectada y explicación de qué debería hacer el viajero.",
        "Esta misma información deberá poder servirnos internamente para revisar viajes de clientes que puedan verse afectados.",
      ],

      highlights: [
        {
          title:
            "Información accionable",

          description:
            "Una noticia solo entra en esta sección si puede cambiar una ruta, una reserva o una decisión de viaje.",

          type:
            "important",
        },
      ],

      status:
        "draft",
    },


    /* ----------------------------------------------------------
       23
       ---------------------------------------------------------- */

    {
      id:
        "preguntas-frecuentes",

      title:
        "Preguntas frecuentes",

      category:
        "practical",

      intro:
        "Preguntas concretas que suelen aparecer al planificar un viaje a Costa Rica.",

      paragraphs: [
        "Aquí reunimos dudas reales de planificación para resolver decisiones sobre entrada, transporte, ritmo y preparación del viaje.",
        "La idea no es repetir información, sino responder con claridad y señalar la fuente que conviene volver a comprobar cuando un dato puede cambiar.",
      ],

      status:
        "published",
    },
  ];


  /* ============================================================
     NUMERACIÓN AUTOMÁTICA
     ============================================================ */

  const sections:
    GuideSection[] =
      rawSections.map(
        (
          section,
          index
        ) => ({
          ...section,

          number:
            String(index + 1).padStart(
              2,
              "0"
            ),
        })
      );


  /* ============================================================
     DURACIONES
     ============================================================ */

  const durationOptions:
    GuideDurationOption[] = [
    {
      days:
        7,

      title:
        "Elegir muy bien",

      description:
        "Mejor pensar en pocas prioridades y, normalmente, una sola costa. Intentar meter demasiadas regiones convierte rápido el viaje en carretera.",
    },

    {
      days:
        10,

      title:
        "Combinar sin correr",

      description:
        "Ya permite juntar varias experiencias y alguna costa, pero sigue siendo importante limitar los cambios de base y proteger los días de naturaleza.",
    },

    {
      days:
        14,

      title:
        "Construir un viaje completo",

      description:
        "Hay margen para combinar interior, bosque, fauna y costa con un ritmo mucho más razonable, siempre que no se intente cubrir todo el país.",
      
      featured:
        true,
    },

    {
      days:
        21,

      title:
        "Dejar respirar la ruta",

      description:
        "Más tiempo puede servir para profundizar, conducir menos y reaccionar al clima, no solo para añadir más lugares al mapa.",
    },
  ];


  /* ============================================================
     AVISOS
     ============================================================
   *
   * Vacío deliberadamente.
   *
   * No inventamos incidencias.
   *
   * El sistema futuro de monitorización podrá alimentar esta
   * colección con información contrastada.
   */

  const alerts:
    TravelAlert[] = [];


  /* ============================================================
     FAQ
     ============================================================ */

  const faq:
    FAQItem[] = [
    {
      question:
        "¿Qué documentación necesito para entrar en Costa Rica?",

      answer:
        "Los viajeros deben cumplir los requisitos migratorios aplicables a su nacionalidad y situación. La información oficial contempla, entre otros elementos, documento de viaje válido, visado cuando corresponda, medios económicos y prueba de regreso o continuación del viaje.",

      category:
        "planning",

      reviewedAt:
        LAST_REVIEWED,
    },

    {
      question:
        "¿Necesito demostrar medios económicos?",

      answer:
        "La información oficial de Visit Costa Rica establece una referencia mínima de 100 USD por mes o fracción de mes de estancia legal. La autoridad migratoria puede solicitar la acreditación correspondiente.",

      category:
        "planning",

      reviewedAt:
        LAST_REVIEWED,
    },

    {
      question:
        "¿Necesito billete de salida?",

      answer:
        "Sí. Costa Rica exige a los viajeros disponer de prueba de regreso o continuación del viaje en los supuestos establecidos por sus autoridades.",

      category:
        "planning",

      reviewedAt:
        LAST_REVIEWED,
    },

    {
      question:
        "¿Cuánto tiempo puedo permanecer en Costa Rica?",

      answer:
        "La duración permitida depende de la clasificación migratoria aplicable a la nacionalidad. La autoridad migratoria determina finalmente la estancia autorizada en el momento de entrada.",

      category:
        "planning",

      reviewedAt:
        LAST_REVIEWED,
    },

    {
      question:
        "¿Necesito coche para recorrer Costa Rica?",

      answer:
        "No necesariamente. Depende de las regiones que quieras combinar, del ritmo del viaje y de la flexibilidad que necesites. Nuestra recomendación general es definir primero la estructura de la ruta y decidir después el transporte.",

      category:
        "transport",
    },

    {
      question:
        "¿Es mejor intentar ver muchas zonas o concentrarse en unas pocas?",

      answer:
        "La respuesta depende del tiempo disponible y de las prioridades del viaje. En Costa Rica añadir regiones puede aumentar la variedad, pero también puede aumentar considerablemente los desplazamientos.",

      category:
        "planning",
    },

    {
      question:
        "¿Cuántas noches merece la pena estar en Monteverde?",

      answer:
        "Para muchas rutas, una o dos noches son suficientes para disfrutar del bosque nuboso y elegir una actividad principal. Tres noches pueden tener sentido si el objetivo es profundizar en fauna, observación de aves, fotografía, visitas de fincas o simplemente viajar con un ritmo muy pausado.",

      category:
        "planning",

      reviewedAt:
        LAST_REVIEWED,
    },

    {
      question:
        "¿Monteverde merece la pena si ya voy a La Fortuna?",

      answer:
        "Puede merecerla porque no ofrece exactamente la misma experiencia. La Fortuna aporta un entorno volcánico y una oferta de actividades muy amplia, mientras que Monteverde cambia el paisaje y el ecosistema. La decisión depende del tiempo disponible y de si ese contraste justifica el desplazamiento adicional.",

      category:
        "planning",
    },

    {
      question:
        "¿Es mejor Pacífico o Caribe?",

      answer:
        "No hay una única respuesta. El Pacífico Central puede facilitar una combinación de fauna, parque y playa dentro de una ruta relativamente sencilla. El Caribe Sur cambia el ambiente y la experiencia. En viajes cortos suele ser más importante elegir una costa que intentar conocer las dos.",

      category:
        "planning",
    },

    {
      question:
        "¿Puedo hacer Costa Rica sin coche?",

      answer:
        "Sí, pero la facilidad cambia mucho según las zonas elegidas. Cuando concentras el viaje en pocas bases y utilizas traslados organizados, puede funcionar muy bien. Cuando quieres encadenar varias regiones y parar por tu cuenta, el coche aporta mucha más flexibilidad.",

      category:
        "transport",
    },

    {
      question:
        "¿La fiebre amarilla puede afectar a mi entrada?",

      answer:
        "Puede hacerlo dependiendo de la procedencia reciente del viajero y de las circunstancias aplicables. Costa Rica publica información específica sobre países y zonas de riesgo y sobre los certificados correspondientes.",

      category:
        "safety",

      reviewedAt:
        LAST_REVIEWED,
    },
  ];


  /* ============================================================
     GUÍA
     ============================================================ */

  export const costaRicaGuide:
    DestinationGuide = {

    slug:
      GUIDE_SLUG,

    title:
      "Costa Rica: guía completa para organizar tu viaje",

    subtitle:
      "Investigación, información práctica y criterio para entender Costa Rica antes de tomar decisiones.",

    intro:
      "Costa Rica es uno de esos destinos en los que elegir bien importa tanto como saber qué visitar. La distancia entre regiones, el clima, la naturaleza, la fauna y la forma de desplazarse pueden cambiar por completo la experiencia. Esta guía reúne nuestra investigación para ayudarte a entender el destino sin convertirla en un itinerario cerrado.",

    /* ----------------------------------------------------------
       METADATA
       ---------------------------------------------------------- */

    editorial: {
      status:
        "in-review",

      updatedAt:
        LAST_REVIEWED,

      factsCheckedAt:
        LAST_REVIEWED,

      author:
        "Cruzando Meridianos",

      nextReviewAt:
        "2026-09-26",
    },


    /* ----------------------------------------------------------
       SNAPSHOT
       ---------------------------------------------------------- */

    snapshot: {
      climateSummary:
        "Costa Rica presenta contrastes climáticos entre regiones. La época del viaje debe analizarse junto con la zona y las experiencias que quieras priorizar.",

      travelStyle:
        "Naturaleza, fauna, aventura, carretera, playas y diferentes paisajes en un mismo viaje.",

      mainStrengths: [
        "Gran variedad de paisajes y ecosistemas.",
        "Posibilidad de combinar naturaleza, fauna, aventura y costa.",
        "Muchas posibilidades para construir viajes muy diferentes.",
        "Especialmente interesante para viajeros que disfrutan explorando.",
      ],

      mainConsiderations: [
        "La geografía condiciona los desplazamientos.",
        "El tiempo disponible cambia radicalmente las posibilidades.",
        "Las condiciones meteorológicas pueden afectar actividades y trayectos.",
        "Intentar incluir demasiadas regiones puede deteriorar el ritmo del viaje.",
      ],
    },


    /* ----------------------------------------------------------
       REQUISITOS
       ---------------------------------------------------------- */

    entryRequirements:
      entryRequirements,


    /* ----------------------------------------------------------
       SECCIONES
       ---------------------------------------------------------- */

    sections:
      sections,


    /* ----------------------------------------------------------
       DURACIÓN
       ---------------------------------------------------------- */

    durationOptions:
      durationOptions,


    /* ----------------------------------------------------------
       ALERTAS
       ---------------------------------------------------------- */

    alerts:
      alerts,


    /* ----------------------------------------------------------
       FAQ
       ---------------------------------------------------------- */

    faq:
      faq,


    /* ----------------------------------------------------------
       FUENTES
       ---------------------------------------------------------- */

    sources: [
      sourceVisitCostaRica,
      sourceMigration,
      sourceHealth,
      sourceYellowFever,
      sourceVisitCostaRicaNature10,
      sourceVisitCostaRicaMonteverde,
    ],


    /* ----------------------------------------------------------
       VIAJE REAL
       ---------------------------------------------------------- */

    relatedTripSlug:
      "costa-rica",


    /* ----------------------------------------------------------
       CTA
       ---------------------------------------------------------- */

    cta: {
      title:
        "¿Quieres que hagamos nosotros la investigación?",

      description:
        "Si sabes que quieres viajar a Costa Rica pero no quieres dedicar horas a investigar, comparar opciones y construir la ruta, podemos hacer ese trabajo contigo.",

      buttonLabel:
        "Cuéntanos tu viaje",

      buttonHref:
        "/cuentatuviaje",
    },
  };