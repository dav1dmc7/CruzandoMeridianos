import type { GuideSection, GuideSource } from "./types";

const REVIEWED_AT = "2026-09-16";

const visitGreeceSource: GuideSource = {
  label: "Visit Greece — Oficina Nacional de Turismo",
  url: "https://www.visitgreece.gr/",
  type: "official",
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

export const greciaSectionOverrides: SectionOverride[] = [
  section({
    id: "entender-el-destino",
    title: "Entender Grecia antes de reservar",
    category: "overview",
    intro:
      "Grecia no es un único tipo de viaje: continente e islas permiten construir experiencias muy distintas.",
    paragraphs: [
      "Atenas aporta una capa urbana, arqueológica y cultural que puede sostener un viaje por sí sola o funcionar como puerta de entrada a las islas. La propia oficina de turismo presenta barrios, museos, yacimientos y costa como partes diferentes de la ciudad.",
      "Las islas tampoco forman un bloque homogéneo. Cícladas, Jónicas, Creta, Dodecaneso, Espóradas y otras zonas tienen paisajes, ritmos y conexiones diferentes. Elegir isla por imagen puede producir un viaje menos coherente de lo esperado.",
      "También merece la pena mirar el continente: Meteora aporta una combinación singular de paisaje rocoso, monasterios y senderismo. Grecia permite, por tanto, diseñar viajes de playa, cultura, carretera, naturaleza o una mezcla de varios registros.",
    ],
    highlights: [
      {
        title: "Primero decide el tipo de Grecia",
        description:
          "Islas y costa, arqueología y ciudades, carretera por el continente o una combinación. El mapa cambia mucho según esa primera decisión.",
        type: "decision",
      },
      {
        title: "No todas las islas cumplen la misma función",
        description:
          "La vegetación, el tamaño, las playas, el ambiente y las conexiones hacen que dos islas aparentemente similares produzcan viajes diferentes.",
        type: "important",
      },
    ],
    blocks: [
      {
        type: "source",
        label: "Fuente oficial",
        title: visitGreeceSource.label,
        content:
          "La oficina nacional de turismo organiza Grecia por regiones continentales, grupos de islas y experiencias, una clasificación útil para empezar a comparar.",
        source: visitGreeceSource,
      },
    ],
    closing:
      "Elegir bien Grecia no consiste en encontrar la isla más famosa, sino en encontrar la combinación que encaja con el viaje.",
  }),

  section({
    id: "zonas-y-ritmo",
    title: "Zonas, islas y ritmo",
    category: "planning",
    intro:
      "En Grecia el transporte entre islas condiciona el diseño tanto como la distancia sobre el mapa.",
    paragraphs: [
      "Atenas y El Pireo forman una puerta natural hacia buena parte del Egeo. Pireo no es solo un punto de embarque: también es una ciudad portuaria con identidad propia, aunque para la mayoría de rutas funcionará como pieza logística.",
      "Las Cícladas permiten combinaciones muy conocidas, pero añadir demasiadas islas introduce cambios de puerto, horarios y alojamientos que consumen tiempo. Para una estancia corta suele ser más útil dar profundidad a pocas bases.",
      "Las Jónicas tienen otro carácter. Corfú combina casco histórico, fortificaciones, gastronomía y paisaje verde, mientras que islas como Cefalonia o Lefkada permiten construir viajes más centrados en costa y carretera.",
    ],
    highlights: [
      {
        title: "Dos o tres bases pueden ser suficientes",
        description:
          "Reducir ferris y cambios de alojamiento libera tiempo para playas, pueblos, comida y excursiones.",
        type: "tip",
      },
      {
        title: "Atenas puede ser más que una escala",
        description:
          "La ciudad combina patrimonio antiguo, barrios contemporáneos, museos y costa; la duración adecuada depende del peso que quieras dar a la parte cultural.",
        type: "decision",
      },
      {
        title: "El Pireo también condiciona la ruta",
        description:
          "Las conexiones marítimas hacen que la hora de llegada y salida pueda cambiar qué isla encaja mejor en el conjunto.",
        type: "important",
      },
    ],
    closing:
      "En Grecia conviene contar los desplazamientos como parte del viaje, no como huecos invisibles entre destinos.",
  }),

  section({
    id: "experiencias-que-merecen-espacio",
    title: "Qué ver y qué hacer",
    category: "experience",
    intro:
      "La riqueza del país permite construir días muy distintos sin salir del mismo viaje.",
    paragraphs: [
      "Atenas permite combinar patrimonio clásico con barrios, gastronomía, museos y vida urbana. Corfú aporta una mezcla particular de casco histórico, fortificaciones, paisaje verde y costa. Creta permite plantear un viaje mucho más amplio por tamaño y variedad.",
      "Meteora cambia completamente el registro: grandes formaciones rocosas, monasterios y senderos convierten el paisaje en parte fundamental de la experiencia. En las islas, la elección puede girar en torno a playas, pueblos, excursiones en barco, gastronomía o carretera.",
      "La clave está en no acumular actividades solo porque estén disponibles. Grecia funciona especialmente bien cuando alternas días de exploración con tiempo para comer, bañarte, caminar y descubrir sin horario cerrado.",
    ],
    highlights: [
      {
        title: "Atenas",
        description:
          "Arqueología, museos, barrios, gastronomía y costa. Tiene suficiente variedad para merecer tiempo propio.",
        type: "experience",
      },
      {
        title: "Meteora",
        description:
          "Paisaje de grandes monolitos, monasterios y senderos. Una opción especialmente interesante para introducir interior y montaña.",
        type: "experience",
      },
      {
        title: "Corfú",
        description:
          "Casco histórico, arquitectura, fortificaciones, paisaje verde y costa dentro de una misma isla.",
        type: "experience",
      },
      {
        title: "Creta",
        description:
          "Por escala y variedad admite un viaje más profundo con playas, pueblos, patrimonio, montaña y carretera.",
        type: "decision",
      },
    ],
    blocks: [
      {
        type: "source",
        label: "Fuente oficial",
        title: visitGreeceSource.label,
        content:
          "Visit Greece reúne experiencias de cultura, naturaleza, playas, gastronomía y actividades al aire libre en distintas regiones del país.",
        source: visitGreeceSource,
      },
    ],
    closing:
      "El mejor uso del tiempo en Grecia suele aparecer cuando las experiencias se complementan, no cuando se acumulan.",
  }),

  section({
    id: "errores-a-evitar",
    title: "Errores que empobrecen el viaje",
    category: "planning",
    intro:
      "El error clásico es intentar convertir un país diverso en una colección de postales.",
    paragraphs: [
      "Encadenar demasiadas islas puede hacer que el viaje se parezca más a una sucesión de puertos que a unas vacaciones. También es fácil elegir una isla por fama o fotografía sin comprobar su ambiente, tamaño, conexiones y relación con el resto de la ruta.",
      "Otro error es reservar el mismo tipo de día continuamente: playa tras playa o yacimiento tras yacimiento. Alternar costa, pueblos, gastronomía, senderismo y patrimonio suele dar más variedad sin necesidad de aumentar las distancias.",
      "Los horarios de ferris, accesos, entradas y temporadas de actividades deben comprobarse cerca de la fecha del viaje, especialmente cuando una conexión determina toda la jornada siguiente.",
    ],
    highlights: [
      {
        title: "No colecciones islas",
        description:
          "Cada cambio de isla tiene un coste de tiempo, logística y energía que debe aportar algo al viaje.",
        type: "warning",
      },
      {
        title: "No elijas solo por la foto",
        description:
          "Ambiente, tamaño, accesibilidad y tipo de experiencia importan tanto como el paisaje.",
        type: "decision",
      },
      {
        title: "Comprueba las conexiones",
        description:
          "Una ruta aparentemente sencilla puede depender de horarios concretos de ferris o vuelos.",
        type: "important",
      },
    ],
    closing:
      "Grecia gana cuando el viaje tiene espacio para vivir cada lugar, no solo para llegar a él.",
  }),
];
