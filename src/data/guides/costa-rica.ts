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
 *   GuideTemplate
 *          ↓
 *   /viajes/costa-rica
 *
 * PRINCIPIOS
 * ------------------------------------------------------------
 *
 * 1. No inventar datos.
 * 2. Separar contenido editorial de información temporal.
 * 3. Información administrativa/sanitaria → fuente oficial.
 * 4. Cada dato temporal debe tener fecha de revisión.
 * 5. El criterio editorial se diferencia de los hechos oficiales.
 * 6. La estructura debe poder reutilizarse con otros destinos.
 * 7. Las alertas quedan preparadas para futura automatización.
 *
 * FUTUROS DESTINOS
 * ------------------------------------------------------------
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
    GuideSection,
    GuideSource,
    TravelerRequirement,
    TravelAlert,
  } from "./types";


  /* ============================================================
     CONSTANTES EDITORIALES
     ============================================================ */

  const GUIDE_SLUG =
    "costa-rica";

  const LAST_REVIEWED =
    "2026-08-26";


  /* ============================================================
     FUENTES
     ============================================================
   *
   * Las fuentes oficiales están centralizadas para que:
   *
   * - no repitamos URLs;
   * - podamos actualizarlas fácilmente;
   * - podamos reutilizarlas en diferentes bloques;
   * - podamos construir posteriormente un sistema de fuentes.
   */

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
      "Ministerio de Salud — Zonas de riesgo de fiebre amarilla",

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
   * IMPORTANTE:
   *
   * No llenamos todavía artificialmente todos los países de Europa,
   * Sudamérica y Centroamérica. El modelo está preparado para ello,
   * pero cada nacionalidad debe contrastarse con las Directrices
   * Generales de Visas vigentes.
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

        visaGroup:
          "group-1",

        visaRequirement:
          "none",

        maximumStay:
          "Hasta 180 días naturales, no renovables, para nacionalidades del primer grupo.",

        passportRequirement:
          "Pasaporte o documento de viaje válido conforme a las directrices de las autoridades costarricenses.",

        returnTicketRequired:
          true,

        proofOfMeansRequired:
          true,

        yellowFeverRelevant:
          true,

        notes: [
          "España es la nacionalidad predeterminada de esta guía.",
          "Visit Costa Rica indica que las nacionalidades del primer grupo pueden obtener hasta 180 días naturales de permanencia, no renovables.",
          "La duración concreta autorizada la determina el agente de inmigración al entrar.",
          "Puede solicitarse acreditación de medios económicos, con una referencia mínima de 100 USD por mes o fracción de estancia legal.",
          "Debe disponerse de billete de regreso al país de origen o de continuación hacia el siguiente destino.",
          "La obligación relacionada con fiebre amarilla depende, entre otros factores, de la procedencia reciente del viajero desde determinadas zonas de riesgo.",
        ],

        source:
          sourceVisitCostaRica,

        lastReviewed:
          LAST_REVIEWED,
      },
    ];


  /* ============================================================
     MODELO DE REQUISITOS
     ============================================================ */

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
        "Los requisitos migratorios y sanitarios pueden cambiar. Esta información sirve para orientarte y debe comprobarse siempre en las fuentes oficiales antes de viajar. La autoridad costarricense competente determina finalmente la entrada y la permanencia autorizada.",
    };


  /* ============================================================
     SECCIONES DE LA GUÍA
     ============================================================ */

  const sections:
    GuideSection[] = [

    /* ==========================================================
       01 — COSTA RICA DE UN VISTAZO
       ========================================================== */

    {
      id:
        "costa-rica-de-un-vistazo",

      number:
        "01",

      title:
        "Costa Rica de un vistazo",

      intro:
        "Antes de decidir una ruta, conviene entender qué tipo de destino tienes delante.",

      paragraphs: [
        "Costa Rica permite combinar selva, fauna, volcanes, bosque nuboso, aventura y costa dentro de un mismo viaje. Esa variedad es una de sus grandes virtudes, pero también hace que la planificación tenga más importancia de la que parece.",
        "No existe una única manera correcta de recorrer el país. La mejor combinación dependerá del tiempo disponible, de las experiencias que quieras priorizar y de cuánto desplazamiento estés dispuesto a asumir.",
        "Nuestro objetivo no es decirte qué ruta debes hacer. Primero queremos darte las piezas necesarias para que entiendas el destino y después puedas decidir qué encaja contigo.",
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
        "Antes de construir una ruta, entiende primero el país. Después decide qué quieres sacrificar y qué quieres conservar.",

      status:
        "draft",
    },


    /* ==========================================================
       03 — CUÁNDO VIAJAR
       ========================================================== */

    {
      id:
        "cuando-viajar",

      number:
        "03",

      title:
        "Cuándo viajar",

      intro:
        "La fecha importa, pero no debería analizarse separada de la ruta que quieres hacer.",

      paragraphs: [
        "Costa Rica presenta diferencias climáticas importantes entre regiones. Por eso no creemos que baste con decir que existe una temporada seca y otra lluviosa.",
        "La decisión correcta depende de la zona que quieras visitar, las actividades que quieras realizar y de cuánto margen tengas para adaptarte a las condiciones del momento.",
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
            "Las condiciones pueden variar mucho entre vertientes y zonas, por lo que una conclusión válida para una región puede no serlo para otra.",

          type:
            "important",
        },
      ],

      closing:
        "No preguntes solamente '¿cuándo es mejor viajar a Costa Rica?'. Pregunta '¿cuándo es mejor hacer el viaje que yo quiero hacer?'.",

      status:
        "draft",
    },


    /* ==========================================================
       04 — CUÁNTOS DÍAS
       ========================================================== */

    {
      id:
        "cuantos-dias",

      number:
        "04",

      title:
        "Cuántos días necesitas",

      intro:
        "No existe una duración perfecta. La pregunta útil es qué tipo de viaje quieres construir con el tiempo disponible.",

      paragraphs: [
        "Una semana obliga a seleccionar con bastante dureza. Diez días ofrecen más margen para combinar zonas. Catorce días permiten plantear una ruta notablemente más variada. Tres semanas reducen la presión por tener que descartar constantemente.",
        "No queremos convertir estos números en itinerarios cerrados. Son marcos para entender cómo cambia el viaje cuando aumenta el tiempo disponible.",
        "Tener más días no significa automáticamente añadir más lugares. También puede significar conducir menos, dormir más noches en una misma zona y dejar espacio para improvisar.",
      ],

      highlights: [
        {
          title:
            "7 días",

          description:
            "Necesitas concentrarte en muy pocas prioridades.",

          type:
            "decision",
        },

        {
          title:
            "10 días",

          description:
            "Empieza a existir margen para combinar experiencias diferentes.",

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
        "No queremos darte cuatro rutas prefabricadas. Queremos darte el criterio para entender qué sacrificios implica cada duración.",

      status:
        "draft",
    },


    /* ==========================================================
       05 — REGIONES
       ========================================================== */

    {
      id:
        "regiones-y-zonas",

      number:
        "05",

      title:
        "Regiones y zonas",

      intro:
        "Antes de conectar lugares en un mapa hay que entender qué ofrece cada región.",

      paragraphs: [
        "Las principales zonas del país tienen personalidades muy diferentes. Algunas destacan por fauna, otras por playas, volcanes, bosques nubosos, aventura o una combinación de varias experiencias.",
        "La selección que tenga sentido para un viajero no tiene por qué coincidir con la selección que tenga sentido para otro.",
        "Esta sección crecerá hasta convertirse en una herramienta comparativa: qué aporta cada zona, cuánto tiempo merece, cómo se conecta con otras regiones y para qué tipo de viaje tiene más sentido.",
      ],

      status:
        "draft",
    },


    /* ==========================================================
       06 — QUÉ VER
       ========================================================== */

    {
      id:
        "que-ver-y-hacer",

      number:
        "06",

      title:
        "Qué ver y qué hacer",

      intro:
        "Una visión amplia de las posibilidades para que puedas decidir qué merece formar parte de tu viaje.",

      paragraphs: [
        "No queremos crear una lista de cincuenta cosas que hacer y dejar al viajero solo frente al problema de elegir.",
        "La guía irá explicando qué aporta realmente cada experiencia, cuánto tiempo puede requerir, dónde encaja mejor y qué tipo de viajero puede disfrutarla más.",
        "También distinguiremos entre lugares que justifican un desplazamiento específico y lugares que funcionan especialmente bien como parte natural de una ruta.",
      ],

      status:
        "draft",
    },


    /* ==========================================================
       07 — FAUNA
       ========================================================== */

    {
      id:
        "fauna-y-naturaleza",

      number:
        "07",

      title:
        "Fauna y naturaleza",

      intro:
        "La naturaleza es uno de los principales motivos para viajar a Costa Rica, pero observarla no funciona como una atracción programada.",

      paragraphs: [
        "La posibilidad de ver animales depende de la zona, el ecosistema, la época, el horario y la actividad elegida. También existe un componente inevitable de azar.",
        "Por eso queremos explicar no solo dónde ir, sino qué tipo de experiencia puede esperarse realmente y qué decisiones pueden aumentar las posibilidades de disfrutarla.",
        "Nuestro criterio será especialmente cuidadoso con cualquier afirmación del tipo 'aquí verás X'. La fauna salvaje no funciona con garantías.",
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


    /* ==========================================================
       08 — PARQUES
       ========================================================== */

    {
      id:
        "parques-nacionales",

      number:
        "08",

      title:
        "Parques nacionales",

      intro:
        "La fama de un parque no debería ser el único criterio para incluirlo.",

      paragraphs: [
        "Accesibilidad, tiempo necesario, condiciones meteorológicas, experiencia de visita, biodiversidad y encaje dentro de la ruta son variables que deben analizarse conjuntamente.",
        "También debemos distinguir entre un parque que merece una jornada completa y otro que tiene sentido como parte de un recorrido más amplio.",
      ],

      status:
        "draft",
    },


    /* ==========================================================
       09 — PLAYAS
       ========================================================== */

    {
      id:
        "playas",

      number:
        "09",

      title:
        "Playas",

      intro:
        "Costa Rica tiene dos costas y muchas formas diferentes de vivirlas.",

      paragraphs: [
        "No buscamos declarar una única playa como la mejor. Una playa puede ser interesante por paisaje, fauna, surf, ambiente, accesibilidad, tranquilidad o por su relación con el resto de la ruta.",
        "La decisión debería partir del tipo de viaje que quieres hacer y de lo que esperas conseguir de esos días de costa.",
      ],

      status:
        "draft",
    },


    /* ==========================================================
       10 — TRANSPORTE
       ========================================================== */

    {
      id:
        "como-moverse",

      number:
        "10",

      title:
        "Cómo moverse",

      intro:
        "El transporte es una decisión estructural del viaje, no un detalle logístico.",

      paragraphs: [
        "Coche, transporte público, traslados privados, vehículos compartidos y otras opciones pueden tener sentido dependiendo de la ruta.",
        "La decisión debería hacerse después de conocer las regiones y los desplazamientos necesarios.",
        "En una ruta multidestino, el mejor sistema puede incluso ser una combinación de varios medios en lugar de una única solución durante todo el viaje.",
      ],

      status:
        "draft",
    },


    /* ==========================================================
       11 — COCHE
       ========================================================== */

    {
      id:
        "hace-falta-coche",

      number:
        "11",

      title:
        "¿Hace falta coche?",

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
            "No queremos alquilar un coche por defecto. Queremos saber si realmente mejora el viaje concreto.",

          type:
            "decision",
        },
      ],

      status:
        "draft",
    },


    /* ==========================================================
       12 — TIEMPOS
       ========================================================== */

    {
      id:
        "desplazamientos-y-tiempos",

      number:
        "12",

      title:
        "Desplazamientos y tiempos",

      intro:
        "El tiempo que pasas moviéndote también forma parte de la experiencia.",

      paragraphs: [
        "Una ruta puede parecer razonable sobre un mapa y resultar agotadora cuando se añaden carretera, tráfico, paradas, condiciones meteorológicas y tiempo perdido buscando o aparcando.",
        "Por eso queremos que esta sección sea especialmente práctica y ayude a pensar en tiempos reales, no únicamente en kilómetros.",
        "También queremos distinguir entre el tiempo puramente necesario para desplazarse y el tiempo que merece la pena reservar para disfrutar del propio camino.",
      ],

      status:
        "draft",
    },


    /* ==========================================================
       15 — COMIDA
       ========================================================== */

    {
      id:
        "comida",

      number:
        "15",

      title:
        "Comida",

      intro:
        "La gastronomía también forma parte de cómo se conoce un destino.",

      paragraphs: [
        "Aquí reuniremos platos, tipos de establecimientos, experiencias gastronómicas y recomendaciones que podamos contrastar.",
        "Cuando demos precios o recomendaciones concretas, deberán llevar fecha o fuente para evitar presentar como permanentes datos que cambian.",
      ],

      status:
        "draft",
    },


    /* ==========================================================
       16 — DOCUMENTACIÓN
       ========================================================== */

    {
      id:
        "documentacion-y-entrada",

      number:
        "16",

      title:
        "Documentación y entrada",

      intro:
        "La información migratoria debe estar siempre vinculada a una fuente oficial y a una fecha de revisión.",

      paragraphs: [
        "Las autoridades costarricenses establecen requisitos de entrada que incluyen documento de viaje válido, visado cuando corresponda, medios económicos y prueba de regreso o continuación del viaje.",
        "La duración de la estancia autorizada depende del grupo migratorio al que pertenezca el país de origen y la autorización final corresponde al control migratorio de entrada.",
        "Por eso hemos construido aquí un sistema de requisitos por nacionalidad que podrá ampliarse progresivamente a Europa, Sudamérica, Centroamérica y otros países.",
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
            "Nuestra guía sirve para entender el requisito. La autoridad oficial es la referencia definitiva para la situación concreta del viajero.",
        },
      ],

      status:
        "reviewed",

      reviewedAt:
        LAST_REVIEWED,
    },


    /* ==========================================================
       17 — SEGURO
       ========================================================== */

    {
      id:
        "seguro",

      number:
        "17",

      title:
        "Seguro",

      intro:
        "No existe una póliza universalmente correcta para todos los viajeros.",

      paragraphs: [
        "La cobertura debería analizarse en función de duración, actividades, transporte, equipaje, cancelación y necesidades médicas.",
        "No queremos convertir esta sección en una caja de afiliación disfrazada de asesoramiento. Primero explicaremos qué debe tener una buena cobertura y después podremos comparar opciones.",
      ],

      status:
        "draft",
    },


    /* ==========================================================
       18 — SALUD
       ========================================================== */

    {
      id:
        "salud",

      number:
        "18",

      title:
        "Salud",

      intro:
        "La información sanitaria requiere especial cuidado porque puede cambiar y depender del itinerario.",

      paragraphs: [
        "No queremos convertir esta sección en un listado genérico de enfermedades. Nos centraremos en aquello que realmente puede afectar a una persona que prepara un viaje.",
        "La fiebre amarilla es un buen ejemplo de por qué el itinerario importa. El Ministerio de Salud contempla condiciones específicas para viajeros que hayan estado recientemente en determinadas zonas de riesgo.",
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
            "El Ministerio de Salud mantiene información específica sobre las zonas geográficas consideradas de riesgo y sobre los requisitos de certificación. El itinerario y la procedencia reciente pueden cambiar la situación aplicable a cada viajero.",

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


    /* ==========================================================
       19 — DINERO
       ========================================================== */

    {
      id:
        "dinero-y-tarjetas",

      number:
        "19",

      title:
        "Dinero y tarjetas",

      intro:
        "Una buena planificación financiera también consiste en reducir puntos de fallo.",

      paragraphs: [
        "La sección analizará moneda, tarjetas, efectivo, cajeros, posibles comisiones y situaciones en las que conviene disponer de una alternativa de pago.",
        "Cuando demos cifras o comisiones concretas, deberán revisarse porque pueden depender del banco, del proveedor o de las condiciones vigentes.",
      ],

      status:
        "draft",
    },


    /* ==========================================================
       20 — CONECTIVIDAD
       ========================================================== */

    {
      id:
        "internet-y-conectividad",

      number:
        "20",

      title:
        "Internet y conectividad",

      intro:
        "La conectividad puede ser especialmente importante cuando se conduce y se depende de mapas, reservas o comunicaciones.",

      paragraphs: [
        "Compararemos SIM local, eSIM y otras alternativas teniendo en cuenta cobertura, facilidad de instalación, coste y utilidad real durante el recorrido.",
        "La recomendación deberá basarse en la ruta concreta y no simplemente en qué producto tenga más popularidad.",
      ],

      status:
        "draft",
    },


    /* ==========================================================
       21 — SEGURIDAD
       ========================================================== */

    {
      id:
        "seguridad",

      number:
        "21",

      title:
        "Seguridad",

      intro:
        "La seguridad debe explicarse de forma práctica, concreta y sin alarmismo.",

      paragraphs: [
        "Nos centraremos en los riesgos que realmente pueden afectar a un viajero: vehículo, aparcamiento, pertenencias, conducción, desplazamientos nocturnos, zonas aisladas y actividades de naturaleza.",
        "Cuando una recomendación provenga de nuestra experiencia, la diferenciaremos claramente de una advertencia oficial.",
      ],

      status:
        "draft",
    },


    /* ==========================================================
       22 — EQUIPAJE
       ========================================================== */

    {
      id:
        "equipaje",

      number:
        "22",

      title:
        "Equipaje",

      intro:
        "El equipaje debe responder a la ruta y a las actividades, no a una lista genérica.",

      paragraphs: [
        "Un viaje que combina selva, costa, carretera y posibles zonas de montaña requiere equilibrio entre protección, comodidad y peso.",
        "La lista definitiva debería construirse después de conocer la ruta concreta.",
      ],

      status:
        "draft",
    },


    /* ==========================================================
       23 — CONSEJOS
       ========================================================== */

    {
      id:
        "consejos-practicos",

      number:
        "23",

      title:
        "Consejos prácticos",

      intro:
        "Pequeños detalles que pueden cambiar mucho la experiencia.",

      paragraphs: [
        "Aquí iremos concentrando aprendizajes contrastados que no encajan necesariamente en una sola región o actividad.",
        "La prioridad será que cada consejo responda a una situación real y aporte algo que el viajero pueda aplicar.",
      ],

      status:
        "draft",
    },


    /* ==========================================================
       24 — ERRORES
       ========================================================== */

    {
      id:
        "errores-habituales",

      number:
        "24",

      title:
        "Errores habituales",

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
            "Primero hay que entender las relaciones entre zonas, después decidir qué lugares tienen sentido dentro de ellas.",

          type:
            "decision",
        },
      ],

      status:
        "draft",
    },


    /* ==========================================================
       25 — ACTUALIDAD
       ========================================================== */

    {
      id:
        "actualidad-y-avisos",

      number:
        "25",

      title:
        "Actualidad y avisos de viaje",

      intro:
        "Solo publicaremos información reciente cuando pueda afectar realmente a una decisión de viaje.",

      paragraphs: [
        "Esta sección no pretende convertirse en un periódico de Costa Rica.",
        "Nos interesan únicamente incidencias operativas: carreteras cerradas o afectadas, parques con acceso restringido, fenómenos meteorológicos relevantes, problemas de transporte, cambios migratorios, alertas sanitarias y otras situaciones con una consecuencia práctica para viajeros.",
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


    /* ==========================================================
       27 — FAQ
       ========================================================== */

    {
      id:
        "preguntas-frecuentes",

      number:
        "27",

      title:
        "Preguntas frecuentes",

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
     AVISOS DE VIAJE
     ============================================================
   *
   * Vacío intencionadamente.
   *
   * NO inventamos alertas.
   *
   * Este array será posteriormente alimentado por el sistema
   * automático de monitorización.
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
        "Las autoridades costarricenses exigen un pasaporte o documento de viaje válido y, cuando corresponda, el visado correspondiente. También pueden solicitarse medios económicos y prueba de salida o continuación del viaje.",

      category:
        "planning",

      reviewedAt:
        LAST_REVIEWED,
    },

    {
      question:
        "¿Necesito demostrar que tengo dinero para entrar?",

      answer:
        "Visit Costa Rica indica un mínimo de 100 USD por mes o fracción de mes de estancia legal. La autoridad migratoria puede solicitar la acreditación correspondiente.",

      category:
        "planning",

      reviewedAt:
        LAST_REVIEWED,
    },

    {
      question:
        "¿Necesito billete de salida?",

      answer:
        "Sí. La información oficial indica que debe disponerse de un boleto de regreso al país de origen o de un plan de viaje que incluya el próximo destino.",

      category:
        "planning",

      reviewedAt:
        LAST_REVIEWED,
    },

    {
      question:
        "¿Cuánto tiempo puedo permanecer en Costa Rica?",

      answer:
        "Depende del grupo migratorio correspondiente a tu nacionalidad. Para el primer grupo, Visit Costa Rica indica hasta 180 días naturales no renovables; para otros grupos se aplican periodos diferentes. La estancia finalmente autorizada la determina el agente de inmigración al entrar.",

      category:
        "planning",

      reviewedAt:
        LAST_REVIEWED,
    },

    {
      question:
        "¿Necesito coche para recorrer Costa Rica?",

      answer:
        "No necesariamente. Depende de las regiones que quieras combinar, de tu ritmo y de cuánto valor tenga para ti la flexibilidad. Nuestra recomendación es diseñar primero la ruta y decidir después el transporte.",

      category:
        "transport",
    },

    {
      question:
        "¿Es mejor intentar ver muchas zonas o concentrarse en unas pocas?",

      answer:
        "Depende de tu tiempo y de tu forma de viajar, pero Costa Rica recompensa especialmente bien una selección coherente. Añadir regiones puede parecer atractivo sobre el mapa y, sin embargo, hacer que el viaje pierda demasiado tiempo en desplazamientos.",

      category:
        "planning",
    },

    {
      question:
        "¿La fiebre amarilla puede afectar a mi entrada?",

      answer:
        "Puede hacerlo dependiendo de la procedencia reciente y del itinerario. El Ministerio de Salud de Costa Rica mantiene una relación de zonas de riesgo y requisitos relacionados con el certificado internacional de vacunación.",

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
      "Todo lo que necesitas saber para entender el destino, valorar tus opciones y decidir cómo quieres viajar.",

    intro:
      "Costa Rica es uno de esos destinos en los que elegir bien importa tanto como saber qué visitar. La distancia entre regiones, el clima, la naturaleza, la fauna y la forma de desplazarse pueden cambiar por completo la experiencia. En esta guía reunimos investigación, información práctica y criterio para ayudarte a tomar mejores decisiones antes de viajar.",


    /* ==========================================================
       ESTADO EDITORIAL
       ========================================================== */

    editorial: {

      status:
        "in-review",

      updatedAt:
        LAST_REVIEWED,

      author:
        "Cruzando Meridianos",

      nextReviewAt:
        "2026-09-26",
    },


    /* ==========================================================
       RESUMEN DEL DESTINO
       ========================================================== */

    snapshot: {

      climateSummary:
        "Costa Rica presenta contrastes climáticos entre regiones. La temporada debe analizarse junto con la zona y las experiencias que quieras priorizar.",

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

      idealFor: [
        "Viajeros que disfrutan de naturaleza y fauna.",
        "Personas que quieren combinar varias regiones.",
        "Viajes activos.",
        "Personas cómodas conduciendo.",
        "Viajeros que valoran la flexibilidad.",
      ],

      notIdealFor: [
        "Quien quiera minimizar desplazamientos.",
        "Quien busque un viaje completamente estático.",
        "Quien quiera centrarse exclusivamente en ciudad y cultura urbana.",
      ],
    },


    /* ==========================================================
       REQUISITOS
       ========================================================== */

    entryRequirements:
      entryRequirements,


    /* ==========================================================
       SECCIONES
       ========================================================== */

    sections:
      sections,


    /* ==========================================================
       ALERTAS
       ========================================================== */

    alerts:
      alerts,


    /* ==========================================================
       FAQ
       ========================================================== */

    faq:
      faq,


    /* ==========================================================
       FUENTES
       ========================================================== */

    sources: [
      sourceVisitCostaRica,
      sourceMigration,
      sourceHealth,
      sourceYellowFever,
    ],


    /* ==========================================================
       CTA
       ========================================================== */

    cta: {

      title:
        "¿Quieres que hagamos nosotros la investigación?",

      description:
        "Si sabes que quieres viajar a Costa Rica pero no quieres dedicar horas a investigar, comparar opciones y construir la ruta, podemos hacerlo contigo.",

      buttonLabel:
        "Cuéntanos tu viaje",

      buttonHref:
        "/cuentatuviaje",
    },
  };