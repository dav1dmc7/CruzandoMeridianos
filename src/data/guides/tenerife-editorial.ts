import type { GuideSection, GuideSource } from "./types";

const REVIEWED_AT = "2026-09-17";

const tourismTenerifeSource: GuideSource = {
  label: "Turismo de Tenerife — Zonas, rutas y Teide",
  url: "https://www.webtenerife.com/",
  type: "official",
  accessedAt: REVIEWED_AT,
};

const teideParkSource: GuideSource = {
  label: "MITECO — Parque Nacional del Teide",
  url: "https://www.miteco.gob.es/es/parques-nacionales-oapn/red-parques-nacionales/parques-nacionales/teide/guia-visitante.html",
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

export const tenerifeSectionOverrides: SectionOverride[] = [
  section({
    id: "entender-el-destino",
    title: "Entender Tenerife antes de reservar",
    category: "overview",
    intro:
      "Tenerife no es solo playa ni solo Teide: en pocos kilómetros cambia el paisaje, el clima y hasta el tipo de viaje.",
    paragraphs: [
      "Turismo de Tenerife divide la isla en grandes zonas con perfiles bastante distintos. El sur concentra buena parte del turismo de sol y playa; el norte combina paisaje, cultura, gastronomía y acceso al Teide; Santa Cruz y La Laguna aportan la dimensión urbana y cultural.",
      "El Teide ocupa el centro de la experiencia para muchos viajeros, pero no debería absorber toda la ruta. Anaga, el Valle de La Orotava, Isla Baja y los cascos históricos permiten construir un viaje mucho más variado.",
      "La decisión inicial es sencilla: ¿quieres una escapada de costa con excursiones, una ruta por la isla o un viaje centrado en naturaleza, senderismo y paisajes? La respuesta cambia dónde conviene dormir y cuánto desplazarte.",
    ],
    highlights: [
      {
        title: "Quiero playa y facilidad",
        description:
          "El sur encaja cuando el alojamiento, el sol y la costa tienen mucho peso y quieres utilizar la isla como base para algunas excursiones.",
        type: "decision",
      },
      {
        title: "Quiero paisaje y cultura",
        description:
          "El norte, con La Orotava, Puerto de la Cruz, Isla Baja y el acceso al Teide, permite un viaje más diverso y menos centrado en resort.",
        type: "decision",
      },
      {
        title: "Quiero naturaleza y caminar",
        description:
          "Anaga y el Teide son piezas fuertes, pero funcionan mejor cuando la ruta deja espacio para bosques, pueblos y cambios de paisaje.",
        type: "experience",
      },
    ],
    blocks: [
      {
        type: "source",
        label: "Fuente oficial",
        title: tourismTenerifeSource.label,
        content:
          "La web oficial de turismo diferencia el sur, norte, área metropolitana e Isla Baja y reúne rutas por carretera, senderismo y otros perfiles de viaje.",
        source: tourismTenerifeSource,
      },
    ],
    closing:
      "La isla se disfruta mejor cuando eliges una base y un ritmo coherentes con el paisaje que quieres conocer.",
  }),

  section({
    id: "zonas-y-ritmo",
    title: "Dónde alojarse y cómo repartir la isla",
    category: "planning",
    intro:
      "La geografía de Tenerife permite excursiones largas, pero eso no significa que convenga hacerlas todos los días.",
    paragraphs: [
      "El sur funciona bien como base cuando quieres priorizar playa, servicios y excursiones puntuales. El norte resulta más natural para quien quiere dedicar varios días a pueblos, gastronomía, paisaje verde y Teide. Santa Cruz y La Laguna tienen sentido cuando el interés cultural y urbano pesa más.",
      "Una ruta con coche permite aprovechar mejor los contrastes. Turismo de Tenerife propone recorridos que atraviesan el Teide y conectan diferentes zonas de la isla, lo que demuestra que el desplazamiento puede ser parte de la experiencia y no solo un coste logístico.",
      "Para una primera visita no hace falta dormir en muchas bases. Dos alojamientos bien elegidos pueden dar profundidad al viaje y reducir el tiempo perdido preparando maletas y cruzando la isla sin necesidad.",
    ],
    highlights: [
      {
        title: "Una base puede funcionar",
        description:
          "Especialmente en viajes cortos, una buena ubicación permite combinar costa y excursiones sin cambiar continuamente de alojamiento.",
        type: "tip",
      },
      {
        title: "Dos bases para profundizar",
        description:
          "Separar norte y sur puede tener sentido cuando quieres vivir ambos ambientes en lugar de visitarlos siempre como excursión desde el mismo sitio.",
        type: "decision",
      },
      {
        title: "Cuenta el trayecto",
        description:
          "Subir al Teide por una carretera y bajar por otra puede convertir el desplazamiento en una de las partes más interesantes del día.",
        type: "experience",
      },
    ],
    closing:
      "En Tenerife el mapa invita a recorrer; la planificación consiste en decidir qué recorridos realmente merecen ocupar un día.",
  }),

  section({
    id: "experiencias-que-merecen-espacio",
    title: "Qué ver y qué hacer",
    category: "experience",
    intro:
      "La isla tiene suficientes paisajes para construir un viaje completo sin llenar el calendario de atracciones.",
    paragraphs: [
      "El Parque Nacional del Teide es la pieza geológica central: el parque se sitúa alrededor de los 2.000 metros de altitud y el Pico del Teide alcanza 3.718 metros. Más que una visita puntual, el recorrido de acceso forma parte de la experiencia.",
      "Anaga ofrece un contraste radical con sus montañas, barrancos, bosques y pequeños enclaves costeros. La Reserva de la Biosfera permite introducir senderismo y paisaje húmedo en un viaje que también puede incluir zonas mucho más secas.",
      "El norte aporta La Orotava, Puerto de la Cruz, Garachico y la Isla Baja, mientras Santa Cruz y La Laguna concentran patrimonio, cultura, compras y gastronomía. El sur queda como la pieza más sencilla para playa, descanso y actividades costeras.",
    ],
    highlights: [
      {
        title: "Teide — el gran cambio de paisaje",
        description:
          "Volcanes, lava y altura. El acceso desde diferentes puntos permite plantear recorridos distintos por las Cañadas.",
        type: "experience",
      },
      {
        title: "Anaga — montaña + bosque + costa",
        description:
          "Una de las mejores piezas para introducir senderismo y paisaje muy diferente al del Teide.",
        type: "experience",
      },
      {
        title: "La Orotava + Puerto de la Cruz",
        description:
          "Una combinación natural para quien quiere patrimonio, gastronomía, paisaje verde y costa sin depender del modelo de resort.",
        type: "experience",
      },
      {
        title: "Garachico e Isla Baja",
        description:
          "Una zona interesante para recorrer con calma, especialmente si el viaje da peso a pueblos, costa y carretera.",
        type: "decision",
      },
      {
        title: "Sur — descanso y mar",
        description:
          "Tiene sentido cuando playa, hoteles, restauración y actividades costeras son parte central del viaje.",
        type: "decision",
      },
    ],
    blocks: [
      {
        type: "source",
        label: "Fuente oficial",
        title: teideParkSource.label,
        content:
          "MITECO mantiene la guía oficial del Parque Nacional del Teide, incluidos accesos, itinerarios, servicios y normas de visita.",
        source: teideParkSource,
      },
    ],
    closing:
      "Tenerife merece espacio para sus cambios de paisaje: costa, bosque, montaña, volcán y pueblos no deberían comprimirse en una lista de excursiones.",
  }),

  section({
    id: "errores-a-evitar",
    title: "Errores que empobrecen el viaje",
    category: "planning",
    intro:
      "El error habitual es tratar toda la isla como si tuviera el mismo clima, el mismo ritmo y la misma experiencia.",
    paragraphs: [
      "También es fácil quedarse únicamente en el sur y pensar que se ha conocido Tenerife. Esa zona cumple muy bien una función de descanso, pero el norte, Anaga y el interior aportan paisajes y experiencias completamente diferentes.",
      "Otro error es diseñar el Teide como una excursión rápida sin comprobar accesos, reservas, condiciones meteorológicas y normas del parque. El propio MITECO mantiene información específica de uso público y restricciones que conviene revisar antes de la visita.",
      "Por último, encadenar demasiadas carreteras y miradores puede convertir un viaje bonito en un calendario de desplazamientos. Es mejor elegir recorridos completos y dejar margen para parar cuando el paisaje lo merezca.",
    ],
    highlights: [
      {
        title: "No confundas Tenerife con su costa sur",
        description:
          "El norte, Anaga y el interior justifican tiempo propio si buscas conocer la isla más allá del descanso junto al mar.",
        type: "warning",
      },
      {
        title: "Comprueba el Teide antes de subir",
        description:
          "Accesos, itinerarios, reservas y condiciones pueden determinar qué parte del parque puedes visitar.",
        type: "important",
      },
      {
        title: "No conviertas la ruta en una carrera",
        description:
          "Un día con menos paradas puede dejar más espacio para caminar, comer en un pueblo o simplemente disfrutar del paisaje.",
        type: "tip",
      },
    ],
    blocks: [
      {
        type: "source",
        label: "Fuente oficial",
        title: teideParkSource.label,
        content:
          "Consulta MITECO para las condiciones oficiales del Parque Nacional del Teide antes de subir y para conocer sus normas de visita.",
        source: teideParkSource,
      },
    ],
    closing:
      "El valor de Tenerife está en sus contrastes. Una buena ruta deja que cada paisaje tenga su momento.",
  }),
];
