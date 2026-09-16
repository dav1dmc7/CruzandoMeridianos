import type { GuideSection, GuideSource } from "./types";

const REVIEWED_AT = "2026-09-16";
const jordanTourismSource: GuideSource = {
  label: "Jordan Tourism Board — Visit Jordan",
  url: "https://sp.visitjordan.com/",
  type: "official",
  accessedAt: REVIEWED_AT,
};

type SectionOverride = Omit<GuideSection, "number">;
const section = (value: Omit<GuideSection, "number" | "reviewedAt" | "status">): SectionOverride => ({
  ...value,
  status: "published",
  reviewedAt: REVIEWED_AT,
});

export const jordaniaSectionOverrides: SectionOverride[] = [
  section({
    id: "entender-el-destino",
    title: "Entender Jordania antes de reservar",
    category: "overview",
    intro: "Jordania funciona especialmente bien cuando entiendes el viaje como una secuencia de contrastes y no como una visita a Petra con extras alrededor.",
    paragraphs: [
      "Petra es la gran referencia histórica, pero el viaje cambia mucho cuando añades Wadi Rum, Amán, el Mar Muerto, Jerash, Dana o Aqaba. La decisión importante es qué contraste quieres que tenga más peso.",
      "El país permite unir arqueología, desierto, senderismo, bienestar y costa sin necesidad de convertir cada día en una mudanza.",
      "Una ruta con sentido suele reservar tiempo suficiente para Petra y Wadi Rum y después elegir un complemento: historia en el norte, naturaleza en Dana, descanso en el Mar Muerto o mar Rojo en Aqaba.",
    ],
    highlights: [
      { title: "El viaje no es solo Petra", description: "Petra puede ser el eje, pero Wadi Rum cambia completamente el paisaje; el resto debe entrar porque aporta algo distinto, no por llenar el mapa.", type: "decision" },
      { title: "Contrastes que se complementan", description: "Arqueología + desierto + naturaleza + descanso producen un viaje más variado sin saltar continuamente entre lugares.", type: "experience" },
    ],
    blocks: [{ type: "source", label: "Fuente oficial", title: jordanTourismSource.label, content: "Visit Jordan organiza el destino alrededor de Petra, Wadi Rum, Amán, Mar Muerto, Aqaba y otras zonas con perfiles diferentes.", source: jordanTourismSource }],
    closing: "La clave no es acumular lugares: es decidir qué experiencia quieres que recuerdes cuando vuelvas.",
  }),
  section({
    id: "zonas-y-ritmo",
    title: "Zonas, distancias y ritmo",
    category: "planning",
    intro: "Jordania es compacta sobre el mapa, pero cada cambio de zona cambia el ritmo del viaje.",
    paragraphs: [
      "Amán funciona bien como puerta de entrada y permite explorar el norte, mientras que Petra pide tiempo real para caminar y entender la escala del recinto.",
      "Wadi Rum merece tratarse como una experiencia propia, normalmente vinculada a una noche en el desierto. El Mar Muerto encaja mejor como pausa que como otra casilla que tachar.",
      "En el sur, Aqaba introduce el mar Rojo. Dana y Wadi Mujib permiten cambiar el viaje hacia senderismo y paisaje, por lo que conviene no encadenar actividades exigentes todos los días.",
    ],
    highlights: [
      { title: "Petra necesita espacio", description: "No conviene diseñarla como una parada de unas horas si es uno de los motivos principales del viaje.", type: "important" },
      { title: "Wadi Rum no es un traslado", description: "Desierto, campamento, paisaje y cielo nocturno forman una experiencia distinta que gana cuando se le da tiempo.", type: "experience" },
      { title: "El sur admite una pausa", description: "Mar Muerto o Aqaba pueden funcionar como cambio de ritmo después de varios días de historia, carretera y caminatas.", type: "decision" },
    ],
  }),
  section({
    id: "experiencias-que-merecen-espacio",
    title: "Qué ver y qué hacer",
    category: "experience",
    intro: "Aquí Jordania deja de ser una colección de monumentos y empieza a convertirse en un viaje.",
    paragraphs: [
      "Petra merece tiempo para recorrer no solo el Siq y la Tesorería, sino también otras rutas a pie. Wadi Rum aporta paisaje de arenisca, excursiones y una experiencia nocturna distinta.",
      "Amán y Jerash introducen historia y vida urbana. Dana y Wadi Mujib cambian el viaje hacia naturaleza y senderismo. El Mar Muerto aporta descanso, mientras Aqaba permite terminar junto al mar Rojo.",
      "El Jordan Trail añade una dimensión más profunda para quien quiere caminar: algunos tramos conectan Petra, Wadi Rum y Aqaba y convierten el desplazamiento en parte de la experiencia.",
    ],
    highlights: [
      { title: "Petra", description: "Arquitectura nabatea, desfiladeros y rutas a pie; es la pieza histórica central.", type: "experience" },
      { title: "Wadi Rum", description: "Paisajes de arenisca, excursiones en 4x4, campamento y cielos nocturnos.", type: "experience" },
      { title: "Jerash", description: "Una incorporación natural si quieres ampliar la parte arqueológica más allá de Petra.", type: "experience" },
      { title: "Dana y Wadi Mujib", description: "Opciones para introducir senderismo y naturaleza cuando el viaje necesita algo más que patrimonio.", type: "experience" },
      { title: "Mar Muerto y Aqaba", description: "Dos formas distintas de bajar el ritmo: bienestar junto al Mar Muerto o costa y mar Rojo en Aqaba.", type: "decision" },
    ],
    blocks: [{ type: "source", label: "Fuente oficial", title: jordanTourismSource.label, content: "Visit Jordan recoge las principales atracciones y experiencias del país, además de información específica sobre Petra, Wadi Rum y el Jordan Trail.", source: jordanTourismSource }],
    closing: "La riqueza del viaje aparece cuando las experiencias no se pisan entre sí: historia, desierto, naturaleza y descanso tienen que repartirse bien los días.",
  }),
  section({
    id: "errores-a-evitar",
    title: "Errores que empobrecen el viaje",
    category: "planning",
    intro: "En Jordania el error más fácil es pensar que, por estar todo relativamente cerca, todo cabe.",
    paragraphs: [
      "Tratar Petra como una excursión rápida suele dejar fuera parte de la experiencia. Lo mismo ocurre con Wadi Rum cuando se visita solo para hacerse una foto y salir.",
      "También puede empobrecer el viaje introducir demasiadas paradas arqueológicas seguidas sin cambiar de registro. Jerash, Madaba, Monte Nebo, Karak y otros lugares pueden ser interesantes, pero no todos tienen que entrar en la misma ruta.",
      "Entradas, accesos, horarios y condiciones de senderos deben comprobarse en fuentes oficiales antes de desplazarse.",
    ],
    highlights: [
      { title: "No conviertas Petra en una foto", description: "Reserva tiempo suficiente para caminar y recorrer más allá de la primera imagen del Siq y la Tesorería.", type: "warning" },
      { title: "No llenes la ruta de ruinas", description: "Alternar patrimonio con paisaje, naturaleza, comida o descanso suele producir un ritmo más variado.", type: "tip" },
      { title: "Comprueba la actualidad", description: "La información operativa puede cambiar; verifica antes de reservar o desplazarte.", type: "important" },
    ],
    blocks: [{ type: "source", label: "Fuente oficial", title: jordanTourismSource.label, content: "Visit Jordan mantiene páginas específicas para atracciones, tarifas y actividades; deben prevalecer para la comprobación operativa.", source: jordanTourismSource }],
    closing: "Jordania funciona mejor cuando cada parada tiene una razón clara y el tiempo suficiente para vivirla.",
  }),
];
