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
        "Antes de conectar lugares en un mapa hay que entender qué ofrece cada región.",

      paragraphs: [
        "Las principales zonas del país tienen personalidades diferentes. Algunas destacan por fauna, otras por playas, volcanes, bosques, aventura o combinaciones de varias experiencias.",
        "La selección que tenga sentido para un viajero no tiene por qué coincidir con la selección que tenga sentido para otro.",
        "La finalidad de esta sección será comparar regiones por experiencia, tiempo, accesibilidad y relación con el resto de la ruta.",
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
        "La guía irá distinguiendo qué aporta realmente cada experiencia, cuánto tiempo puede requerir, dónde encaja mejor y qué tipo de viaje puede justificarla.",
        "También diferenciaremos entre lugares que merecen un desplazamiento específico y lugares que funcionan especialmente bien como parte natural de una ruta.",
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
        "Explicaremos no solo dónde ir, sino qué tipo de experiencia puede esperarse realmente y qué decisiones pueden aumentar las posibilidades de disfrutarla.",
        "Seremos especialmente cuidadosos con cualquier afirmación del tipo aquí verás X. La fauna salvaje no funciona con garantías.",
      ],

      highlights: [
        {
          title:
            "No prometemos avistamientos",

          description:
            "La fauna es naturaleza, no un espectáculo garantizado. Explicaremos posibilidades y contexto, no certezas.",

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
        "También debemos distinguir entre un parque que merece una jornada completa y otro que puede tener sentido como parte de un recorrido más amplio.",
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
        "La decisión debería partir de lo que quieres conseguir durante esos días de costa y de cómo encaja la zona en el recorrido completo.",
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
        "Coche, transporte público, traslados privados, vehículos compartidos y otras opciones pueden tener sentido dependiendo de la ruta.",
        "La decisión debería hacerse después de conocer las regiones y los desplazamientos necesarios.",
        "En una ruta multidestino, la mejor solución puede ser incluso una combinación de diferentes medios.",
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
        "La necesidad de un vehículo depende de las regiones elegidas, la frecuencia de los desplazamientos y la flexibilidad que quieras tener.",
      ],

      highlights: [
        {
          title:
            "Primero la ruta, después el coche",

          description:
            "No queremos recomendar un vehículo por defecto. Queremos determinar si realmente mejora el viaje concreto.",

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
        "Una ruta puede parecer razonable sobre un mapa y resultar agotadora cuando se añaden carretera, tráfico, paradas, condiciones meteorológicas y tiempo perdido buscando o aparcando.",
        "Por eso esta sección está pensada para valorar tiempos reales y no únicamente kilómetros.",
        "También queremos distinguir entre el tiempo puramente necesario para desplazarse y el tiempo que merece la pena reservar para disfrutar del propio camino.",
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
        "Aquí reuniremos platos, tipos de establecimientos, experiencias gastronómicas y recomendaciones que podamos contrastar.",
        "Cuando demos precios o recomendaciones concretas, deberán llevar fecha o fuente para evitar presentar como permanentes datos que cambian.",
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
        "La seguridad debe explicarse de forma práctica, concreta y sin alarmismo.",

      paragraphs: [
        "Nos centraremos en los riesgos que realmente pueden afectar a un viajero: vehículo, aparcamiento, pertenencias, conducción, desplazamientos nocturnos, zonas aisladas y actividades de naturaleza.",
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
        "Pequeños detalles que pueden cambiar mucho la experiencia.",

      paragraphs: [
        "Aquí iremos concentrando aprendizajes contrastados que no encajan necesariamente en una sola región o actividad.",
        "La prioridad será que cada consejo responda a una situación real y aporte algo que el viajero pueda aplicar.",
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
        "Uno de los errores más habituales en viajes multidestino es intentar unir demasiados lugares sin valorar el coste real de los desplazamientos.",
        "Otro problema frecuente es diseñar la ruta alrededor de una lista de lugares populares y comprobar demasiado tarde si realmente encajan entre sí.",
        "Nuestra propia experiencia en Costa Rica será especialmente importante aquí porque podremos contrastar qué decisiones funcionaron sobre el terreno.",
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
        "Las mejores preguntas suelen aparecer durante la planificación real.",

      paragraphs: [
        "Esta sección crecerá a partir de preguntas reales de viajeros, consultas recibidas y dudas que surjan durante nuestra propia investigación.",
        "La idea no es repetir información, sino resolver dudas concretas con respuestas claras y fuentes cuando corresponda.",
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
        "Permite plantear una ruta considerablemente más variada y mantener un ritmo razonable.",

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