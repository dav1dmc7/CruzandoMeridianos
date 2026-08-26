/**
 * ============================================================
 * CRUZANDO MERIDIANOS
 * GUIDE DATA — COSTA RICA
 * ============================================================
 *
 * Guía editorial de Costa Rica.
 *
 * PRINCIPIOS:
 *
 * 1. No inventar datos.
 * 2. Separar contenido editorial de información temporal.
 * 3. Información sensible → fuente + fecha.
 * 4. Alertas → fecha + fuente + caducidad cuando exista.
 * 5. El criterio editorial se diferencia de los hechos.
 * 6. El número de sección se genera automáticamente.
 * 7. La guía pública demuestra conocimiento sin entregar
 *    un itinerario personalizado completo.
 * 8. La información comercial de pago no se almacena aquí.
 *
 * FUTUROS DESTINOS:
 *
 * guides/sudafrica.ts
 * guides/jordania.ts
 * guides/grecia.ts
 * guides/auroras.ts
 */

import type {
    DestinationEntryRequirements,
    DestinationGuide,
    FAQItem,
    GuideCommercialPositioning,
    GuideDurationOption,
    GuideMonitoringConfig,
    GuideSection,
    GuideSectionInput,
    GuideSource,
    TravelerRequirement,
    TravelAlert,
  } from "./types";


  /* ============================================================
     CONSTANTES
     ============================================================ */

  const GUIDE_SLUG = "costa-rica";

  const LAST_REVIEWED = "2026-08-26";

  const NEXT_REVIEW = "2026-09-26";


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


  /* ============================================================
     REQUISITOS DE ENTRADA
     ============================================================
   *
   * España es la nacionalidad predeterminada.
   *
   * No rellenamos países adicionales sin contrastarlos
   * individualmente.
   *
   * La arquitectura queda preparada para:
   *
   * Europa
   * Sudamérica
   * Centroamérica
   * Norteamérica
   * Caribe
   * Asia
   * África
   * Oceanía
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

      maximumStay:
        "Depende de la clasificación migratoria aplicable. La autoridad migratoria determina finalmente la estancia autorizada al entrar.",

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
        "Los requisitos aplicables pueden incluir documento de viaje válido, visado cuando corresponda, acreditación de medios económicos y prueba de salida o continuación del viaje.",
        "Visit Costa Rica publica una referencia de medios económicos de 100 USD por mes o fracción de estancia legal.",
        "La estancia finalmente autorizada corresponde a la autoridad migratoria en el momento de entrada.",
        "La situación relacionada con fiebre amarilla puede depender de la procedencia reciente del viajero.",
        "Comprueba siempre los requisitos vigentes antes de viajar.",
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

    targetRegions: [
      "europe",
      "south-america",
      "central-america",
    ],

    legalSource:
      sourceVisitCostaRica,

    lastReviewed:
      LAST_REVIEWED,

    disclaimer:
      "Los requisitos migratorios y sanitarios pueden cambiar. Esta información sirve para orientarte, pero la fuente oficial y la autoridad competente prevalecen siempre sobre este resumen. Comprueba los requisitos aplicables a tu nacionalidad, procedencia, documento de viaje e itinerario antes de viajar.",
  };


  /* ============================================================
     SECCIONES
     ============================================================
   *
   * IMPORTANTE:
   *
   * Aquí NO existe ninguna propiedad "number".
   *
   * La numeración se genera automáticamente al final.
   */

  const rawSections:
    GuideSectionInput[] = [

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
        "No existe una única manera correcta de recorrer el país. La combinación adecuada depende del tiempo disponible, las experiencias prioritarias y el ritmo que quieras mantener.",
        "La guía pública está pensada para ayudarte a comprender el destino. La construcción de un viaje concreto requiere cruzar esa información con tus fechas, preferencias, presupuesto, tolerancia a los desplazamientos y prioridades.",
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
        "Costa Rica presenta diferencias climáticas entre regiones. Por eso no creemos que baste con hablar de una única temporada seca y otra lluviosa para todo el país.",
        "La decisión correcta depende de la zona que quieras visitar, las actividades que quieras realizar y del margen que tengas para adaptarte a las condiciones del momento.",
        "La climatología también debe relacionarse con conducción, senderos, fauna, playas y cualquier actividad dependiente de condiciones exteriores.",
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
        "Una semana obliga a seleccionar con bastante dureza. Diez días ofrecen más margen. Dos semanas permiten plantear una ruta considerablemente más variada.",
        "Tener más días no significa automáticamente añadir más lugares. También puede significar conducir menos, dormir más noches en una misma zona y dejar espacio para disfrutar.",
      ],

      highlights: [
        {
          title:
            "7 días",

          description:
            "Necesitas concentrarte en pocas prioridades y reducir desplazamientos innecesarios.",

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
        "Antes de conectar lugares en un mapa hay que entender qué ofrece cada región.",

      paragraphs: [
        "Las principales zonas del país tienen personalidades diferentes. Algunas destacan por fauna, otras por playas, volcanes, bosques, aventura o combinaciones de varias experiencias.",
        "La selección que tiene sentido para un viajero no tiene por qué coincidir con la de otro.",
        "La investigación profunda de una ruta concreta requiere cruzar regiones, fechas, tiempos y prioridades individuales.",
      ],

      status:
        "draft",
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
        "Una visión amplia de las posibilidades para entender qué merece realmente formar parte del viaje.",

      paragraphs: [
        "No queremos crear una lista interminable de cosas que hacer y dejar al viajero solo frente al problema de elegir.",
        "La guía ayuda a distinguir experiencias por tipo y contexto, pero la selección final depende del viaje concreto.",
        "También importa saber qué experiencias justifican un desplazamiento específico y cuáles funcionan mejor dentro de una ruta ya existente.",
      ],

      status:
        "draft",
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
        "La naturaleza es uno de los principales motivos para viajar a Costa Rica, pero observarla no funciona como una atracción programada.",

      paragraphs: [
        "La posibilidad de ver animales depende de la zona, el ecosistema, la época, el horario y la actividad elegida. También existe un componente inevitable de azar.",
        "Explicaremos contexto y posibilidades, evitando prometer avistamientos garantizados.",
      ],

      highlights: [
        {
          title:
            "No prometemos avistamientos",

          description:
            "La fauna es naturaleza, no un espectáculo garantizado.",

          type:
            "important",
        },

        {
          title:
            "El lugar importa",

          description:
            "Elegir la región y el tipo de experiencia puede ser tan importante como elegir una actividad concreta.",

          type:
            "experience",
        },
      ],

      status:
        "draft",
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
        "La fama de un parque no debería ser el único criterio para incluirlo.",

      paragraphs: [
        "Accesibilidad, tiempo necesario, condiciones meteorológicas, experiencia de visita, biodiversidad y encaje dentro de la ruta son variables que deben analizarse conjuntamente.",
        "No todos los parques aportan lo mismo ni requieren el mismo espacio dentro de un viaje.",
      ],

      status:
        "draft",
    },


    /* ----------------------------------------------------------
       08
       ---------------------------------------------------------- */

    {
      id:
        "playas",

      title:
        "Playas",

      category:
        "experience",

      intro:
        "Costa Rica tiene dos costas y muchas formas diferentes de vivirlas.",

      paragraphs: [
        "No buscamos declarar una única playa como la mejor. Una playa puede ser interesante por paisaje, fauna, surf, ambiente, accesibilidad, tranquilidad o por su relación con el resto de la ruta.",
        "La elección debe responder a lo que buscas en esos días y al papel que la costa desempeña dentro del viaje.",
      ],

      status:
        "draft",
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
        "El transporte es una decisión estructural del viaje, no un detalle logístico.",

      paragraphs: [
        "Coche, transporte público, traslados privados y otras opciones pueden tener sentido dependiendo de la ruta.",
        "La decisión debería hacerse después de conocer las regiones y los desplazamientos necesarios.",
        "En una ruta multidestino, la mejor solución puede ser una combinación de diferentes medios.",
      ],

      status:
        "draft",
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
        "En algunos viajes cambia completamente la libertad disponible. En otros puede añadir coste sin aportar suficiente valor.",

      paragraphs: [
        "Nuestra filosofía es sencilla: primero se define el viaje y después se decide si el coche es la herramienta adecuada.",
        "La necesidad de un vehículo depende de las regiones, la frecuencia de desplazamientos y la flexibilidad que quieras tener.",
      ],

      highlights: [
        {
          title:
            "Primero la ruta, después el coche",

          description:
            "No recomendamos un vehículo por defecto. Queremos determinar si realmente mejora el viaje concreto.",

          type:
            "decision",
        },
      ],

      status:
        "draft",
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
        "El tiempo que pasas moviéndote también forma parte de la experiencia.",

      paragraphs: [
        "Una ruta puede parecer razonable sobre un mapa y resultar agotadora cuando se añaden carretera, tráfico, paradas, condiciones meteorológicas y tiempo perdido.",
        "Por eso esta sección está pensada para valorar tiempos reales y no únicamente kilómetros.",
        "En la planificación personalizada analizamos cómo esos tiempos interactúan con tus prioridades y el ritmo que quieres mantener.",
      ],

      status:
        "draft",
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
        "La gastronomía también forma parte de cómo se conoce un destino.",

      paragraphs: [
        "Aquí reuniremos platos, tipos de establecimientos, experiencias gastronómicas y referencias que podamos contrastar.",
        "Cuando existan precios o recomendaciones concretas, deberán llevar fecha o fuente.",
      ],

      status:
        "draft",
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
        "Los requisitos aplicables pueden depender de la nacionalidad, documento de viaje, procedencia e itinerario.",
        "Nuestra arquitectura permite consultar la información por nacionalidad sin mezclarla con la parte editorial del destino.",
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
        "La guía explicará qué aspectos merece la pena evaluar, pero la elección de una solución concreta forma parte de las decisiones que deben individualizarse.",
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
        "No queremos convertir esta sección en un listado genérico de enfermedades. Nos centraremos en cuestiones que realmente pueden afectar a un viajero.",
        "La fiebre amarilla es un ejemplo de por qué la procedencia y las circunstancias del viaje importan.",
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
            "Costa Rica publica información específica para viajeros procedentes de determinadas zonas de riesgo. La aplicabilidad debe comprobarse según la procedencia reciente y las circunstancias concretas del viaje.",

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
        "Cuando demos cifras concretas deberán revisarse porque pueden depender del banco, proveedor o condiciones vigentes.",
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
        "Compararemos las opciones desde una perspectiva práctica y teniendo en cuenta cobertura, facilidad y utilidad real.",
        "La mejor solución depende de la ruta concreta y de las necesidades del viajero.",
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
        "La seguridad debe explicarse de forma práctica, concreta y sin alarmismo.",

      paragraphs: [
        "Nos centraremos en riesgos que puedan afectar realmente a viajeros: vehículo, aparcamiento, pertenencias, conducción, desplazamientos nocturnos, zonas aisladas y actividades de naturaleza.",
        "Cuando una recomendación provenga de nuestra experiencia, la diferenciaremos claramente de una advertencia oficial.",
      ],

      status:
        "draft",
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
        "La lista definitiva debería construirse después de conocer el viaje concreto.",
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
        "Pequeños detalles que pueden cambiar mucho la experiencia.",

      paragraphs: [
        "Aquí iremos concentrando aprendizajes contrastados que no encajan necesariamente en una sola región o actividad.",
        "La prioridad será que cada consejo responda a una situación real y aporte algo aplicable.",
      ],

      status:
        "draft",
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
        "planning",

      intro:
        "Una buena guía también debe explicar qué decisiones pueden complicar un viaje.",

      paragraphs: [
        "Uno de los errores habituales en viajes multidestino es intentar unir demasiados lugares sin valorar el coste real de los desplazamientos.",
        "Otro problema frecuente es diseñar la ruta alrededor de una lista de lugares populares y comprobar demasiado tarde si encajan realmente entre sí.",
        "Nuestra experiencia real tendrá aquí un papel importante para contrastar estas ideas sobre el terreno.",
      ],

      highlights: [
        {
          title:
            "Querer abarcar demasiado",

          description:
            "Una ruta demasiado ambiciosa puede convertir el viaje en una sucesión de desplazamientos.",

          type:
            "warning",
        },

        {
          title:
            "Elegir lugares antes que la estructura",

          description:
            "Primero hay que entender las relaciones entre zonas y después decidir qué lugares tienen sentido dentro de ellas.",

          type:
            "decision",
        },
      ],

      status:
        "draft",
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
        "Nos interesan incidencias operativas: carreteras afectadas, parques con acceso restringido, fenómenos meteorológicos relevantes, problemas de transporte, cambios migratorios, alertas sanitarias y otras situaciones con consecuencia práctica.",
        "Cada aviso deberá tener fecha, fuente, zona afectada y explicación de qué debería hacer el viajero.",
        "La información relevante podrá utilizarse también para revisar viajes de clientes que puedan verse afectados.",
      ],

      highlights: [
        {
          title:
            "Información accionable",

          description:
            "Una noticia solo entra si puede cambiar una ruta, una reserva o una decisión de viaje.",

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
        "Las mejores preguntas suelen aparecer durante la planificación real.",

      paragraphs: [
        "Esta sección crecerá a partir de preguntas reales de viajeros, consultas recibidas y dudas detectadas durante nuestra investigación.",
        "La intención no es repetir información, sino resolver dudas concretas con respuestas claras y fuentes cuando corresponda.",
      ],

      status:
        "draft",
    },
  ];


  /* ============================================================
     NUMERACIÓN AUTOMÁTICA
     ============================================================ */

  const sections:
    GuideSection[] =
    rawSections.map(
      (section, index) => ({
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
        "Priorizar",

      description:
        "Pocas zonas y prioridades muy claras. El coste de añadir desplazamientos pesa mucho.",
    },

    {
      days:
        10,

      title:
        "Equilibrar",

      description:
        "Más margen para combinar naturaleza, costa y diferentes experiencias sin intentar abarcarlo todo.",
    },

    {
      days:
        14,

      title:
        "Profundizar",

      description:
        "Permite plantear un viaje más variado manteniendo un ritmo razonable.",

      featured:
        true,
    },

    {
      days:
        21,

      title:
        "Explorar",

      description:
        "Más profundidad y mucha más libertad para reducir sacrificios.",
    },
  ];


  /* ============================================================
     AVISOS
     ============================================================ */

  const alerts:
    TravelAlert[] = [];


  /* ============================================================
     MONITORIZACIÓN
     ============================================================
   *
   * Esto PREPARA el contrato de automatización.
   *
   * No significa que el Worker esté realizando todavía
   * estas comprobaciones automáticamente.
   */

  const monitoring:
    GuideMonitoringConfig = {
    enabled:
      true,

    cadence:
      "daily",

    sources: [
      sourceVisitCostaRica,
      sourceMigration,
      sourceHealth,
      sourceYellowFever,
    ],

    monitoredAlertTypes: [
      "carretera",
      "clima",
      "parque",
      "transporte",
      "entrada",
      "seguridad",
      "salud",
      "volcan",
      "otro",
    ],

    lastCheckedAt:
      LAST_REVIEWED,
  };


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

      source:
        sourceVisitCostaRica,
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

      source:
        sourceVisitCostaRica,
    },

    {
      question:
        "¿Necesito billete de salida?",

      answer:
        "Debe disponerse de la documentación de regreso o continuación del viaje exigida por las autoridades costarricenses en el supuesto aplicable.",

      category:
        "planning",

      reviewedAt:
        LAST_REVIEWED,

      source:
        sourceVisitCostaRica,
    },

    {
      question:
        "¿Cuánto tiempo puedo permanecer en Costa Rica?",

      answer:
        "La duración depende de la clasificación migratoria aplicable a la nacionalidad. La autoridad migratoria determina finalmente la estancia autorizada en el momento de entrada.",

      category:
        "planning",

      reviewedAt:
        LAST_REVIEWED,

      source:
        sourceVisitCostaRica,
    },

    {
      question:
        "¿Necesito coche para recorrer Costa Rica?",

      answer:
        "No necesariamente. Depende de las regiones que quieras combinar, del ritmo del viaje y de la flexibilidad que necesites. La decisión debe derivarse del viaje concreto.",

      category:
        "transport",
    },

    {
      question:
        "¿Es mejor intentar ver muchas zonas o concentrarse en unas pocas?",

      answer:
        "Depende del tiempo disponible y de las prioridades. Añadir regiones puede aumentar la variedad, pero también aumentar considerablemente los desplazamientos.",

      category:
        "planning",
    },

    {
      question:
        "¿La fiebre amarilla puede afectar a mi entrada?",

      answer:
        "Puede hacerlo dependiendo de la procedencia reciente y de las circunstancias aplicables. Costa Rica publica información específica sobre zonas de riesgo y certificados correspondientes.",

      category:
        "safety",

      reviewedAt:
        LAST_REVIEWED,

      source:
        sourceYellowFever,
    },
  ];


  /* ============================================================
     COMMERCIAL POSITIONING
     ============================================================ */

  const commercial:
    GuideCommercialPositioning = {
    publicPromise:
      "Ayudarte a entender el destino y tomar mejores decisiones antes de viajar.",

    premiumPromise:
      "Convertir investigación, preferencias, fechas, presupuesto y prioridades individuales en un viaje diseñado específicamente para ti.",

    publicDoesNotInclude: [
      "Itinerario personalizado día a día.",
      "Selección cerrada de alojamientos para tu caso concreto.",
      "Optimización individual de la ruta completa.",
      "Investigación privada de alternativas según tus circunstancias.",
      "Plan B personalizado ante cambios o imprevistos.",
    ],

    premiumIncludes: [
      "Investigación adaptada al viajero.",
      "Selección y priorización de opciones.",
      "Construcción de la ruta completa.",
      "Coordinación de tiempos y desplazamientos.",
      "Criterio aplicado a presupuesto, ritmo y preferencias.",
    ],
  };


  /* ============================================================
     GUÍA
     ============================================================ */

  export const costaRicaGuide:
    DestinationGuide = {

    slug:
      GUIDE_SLUG,

    title:
      "Costa Rica: guía para entender el destino antes de viajar",

    subtitle:
      "Investigación, información práctica y criterio para entender Costa Rica antes de tomar decisiones.",

    intro:
      "Costa Rica es uno de esos destinos en los que elegir bien importa tanto como saber qué visitar. La distancia entre regiones, el clima, la naturaleza, la fauna y la forma de desplazarse pueden cambiar por completo la experiencia. Esta guía reúne investigación y contexto para ayudarte a entender el destino sin convertirlo en un itinerario cerrado.",


    /* ----------------------------------------------------------
       EDITORIAL
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
        NEXT_REVIEW,
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
        "Muchas posibilidades para construir viajes diferentes.",
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
       ¿ENCAJA CONTIGO?
       ---------------------------------------------------------- */

    fit: {
      title:
        "¿Costa Rica encaja contigo?",

      intro:
        "No todos los destinos funcionan igual para todos los viajeros. Costa Rica suele gustar especialmente a quienes disfrutan de la naturaleza, cierta movilidad y la posibilidad de combinar experiencias diferentes.",

      goodFor: [
        "Te gusta la naturaleza y la fauna.",
        "Quieres combinar varias experiencias dentro de un mismo viaje.",
        "No te importa desplazarte para descubrir distintas zonas.",
        "Valoras la flexibilidad.",
        "Prefieres experiencias antes que coleccionar lugares.",
      ],

      notFor: [
        "Quieres pasar prácticamente todo el viaje en un único lugar.",
        "No quieres asumir apenas desplazamientos.",
        "Buscas principalmente una experiencia urbana.",
        "Prefieres un viaje completamente predecible y estructurado.",
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
       DURACIONES
       ---------------------------------------------------------- */

    durationOptions:
      durationOptions,


    /* ----------------------------------------------------------
       ALERTAS
       ---------------------------------------------------------- */

    alerts:
      alerts,


    /* ----------------------------------------------------------
       MONITORIZACIÓN
       ---------------------------------------------------------- */

    monitoring:
      monitoring,


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
    ],


    /* ----------------------------------------------------------
       VIAJE REAL
       ---------------------------------------------------------- */

    relatedTripSlug:
      "costa-rica",


    /* ----------------------------------------------------------
       POSICIONAMIENTO COMERCIAL
       ---------------------------------------------------------- */

    commercial:
      commercial,


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