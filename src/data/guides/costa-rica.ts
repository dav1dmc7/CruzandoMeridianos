export interface GuideSection {
    id: string;
    number: string;
    title: string;
    intro?: string;
  }
  
  export interface TravelAlert {
    date: string;
    type: "carretera" | "clima" | "parque" | "transporte" | "entrada" | "otro";
    title: string;
    description: string;
    source?: string;
    sourceLabel?: string;
    active: boolean;
  }
  
  export interface FAQItem {
    question: string;
    answer: string;
  }
  
  export interface DestinationGuide {
    slug: string;
    title: string;
    subtitle: string;
    intro: string;
  
    sections: GuideSection[];
  
    alerts: TravelAlert[];
  
    faq: FAQItem[];
  
    cta: {
      title: string;
      description: string;
      buttonLabel: string;
      buttonHref: string;
    };
  }
  
  export const costaRicaGuide: DestinationGuide = {
    slug: "costa-rica",
  
    title: "Costa Rica: guía completa para organizar tu viaje",
  
    subtitle:
      "Todo lo que necesitas saber para entender el destino, valorar tus opciones y decidir cómo quieres viajar.",
  
    intro:
      "Costa Rica es uno de esos destinos en los que elegir bien importa tanto como saber qué visitar. La distancia entre regiones, el clima, la naturaleza, la fauna y la forma de desplazarse pueden cambiar por completo la experiencia. En esta guía reunimos la información que consideramos más útil para entender el país y tomar buenas decisiones antes de viajar.",
  
    sections: [
      {
        id: "costa-rica-de-un-vistazo",
        number: "01",
        title: "Costa Rica de un vistazo",
        intro:
          "Una primera visión del país para entender sus principales características antes de empezar a planificar."
      },
  
      {
        id: "cuando-viajar",
        number: "03",
        title: "Cuándo viajar",
        intro:
          "Temporadas, clima y diferencias entre regiones para entender cuándo tiene más sentido viajar."
      },
  
      {
        id: "cuantos-dias",
        number: "04",
        title: "Cuántos días necesitas",
        intro:
          "La duración del viaje condiciona directamente cuánto puedes conocer y cuánto tiempo dedicarás a los desplazamientos."
      },
  
      {
        id: "regiones-y-zonas",
        number: "05",
        title: "Regiones y zonas",
        intro:
          "Las principales regiones de Costa Rica y qué tipo de experiencia ofrece cada una."
      },
  
      {
        id: "que-ver-y-hacer",
        number: "06",
        title: "Qué ver y qué hacer",
        intro:
          "Naturaleza, aventura, cultura y experiencias que pueden formar parte de un viaje por Costa Rica."
      },
  
      {
        id: "fauna-y-naturaleza",
        number: "07",
        title: "Fauna y naturaleza",
        intro:
          "Uno de los grandes motivos para viajar a Costa Rica: ecosistemas, animales y experiencias relacionadas con la naturaleza."
      },
  
      {
        id: "parques-nacionales",
        number: "08",
        title: "Parques nacionales",
        intro:
          "Qué ofrecen los principales parques y qué conviene tener en cuenta antes de visitarlos."
      },
  
      {
        id: "playas",
        number: "09",
        title: "Playas",
        intro:
          "Las diferentes costas de Costa Rica y cómo elegir una zona de playa según el tipo de viaje."
      },
  
      {
        id: "como-moverse",
        number: "10",
        title: "Cómo moverse",
        intro:
          "Las principales opciones de transporte y sus ventajas e inconvenientes."
      },
  
      {
        id: "hace-falta-coche",
        number: "11",
        title: "¿Hace falta coche?",
        intro:
          "Cuándo creemos que un coche aporta libertad y cuándo puede no ser la mejor opción."
      },
  
      {
        id: "desplazamientos-y-tiempos",
        number: "12",
        title: "Desplazamientos y tiempos",
        intro:
          "Distancias, carreteras y tiempos reales de desplazamiento que conviene considerar al diseñar la ruta."
      },
  
      {
        id: "comida",
        number: "15",
        title: "Comida",
        intro:
          "Qué comer, cómo es la gastronomía local y qué esperar de la experiencia gastronómica."
      },
  
      {
        id: "documentacion-y-entrada",
        number: "16",
        title: "Documentación y entrada",
        intro:
          "Documentación, requisitos de entrada y aspectos administrativos que conviene comprobar antes de viajar."
      },
  
      {
        id: "seguro",
        number: "17",
        title: "Seguro",
        intro:
          "Qué aspectos valorar al contratar un seguro de viaje para Costa Rica."
      },
  
      {
        id: "salud",
        number: "18",
        title: "Salud",
        intro:
          "Información sanitaria y precauciones que conviene tener en cuenta antes y durante el viaje."
      },
  
      {
        id: "dinero-y-tarjetas",
        number: "19",
        title: "Dinero y tarjetas",
        intro:
          "Moneda, pagos con tarjeta, efectivo, cajeros y otros aspectos prácticos relacionados con el dinero."
      },
  
      {
        id: "internet-y-conectividad",
        number: "20",
        title: "Internet y conectividad",
        intro:
          "Opciones para mantenerse conectado durante el viaje."
      },
  
      {
        id: "seguridad",
        number: "21",
        title: "Seguridad",
        intro:
          "Aspectos de seguridad que conviene conocer para viajar con sentido común y tranquilidad."
      },
  
      {
        id: "equipaje",
        number: "22",
        title: "Equipaje",
        intro:
          "Qué llevar y cómo adaptar el equipaje al clima, las actividades y las diferentes regiones."
      },
  
      {
        id: "consejos-practicos",
        number: "23",
        title: "Consejos prácticos",
        intro:
          "Pequeños detalles que pueden marcar una diferencia importante durante el viaje."
      },
  
      {
        id: "errores-habituales",
        number: "24",
        title: "Errores habituales",
        intro:
          "Decisiones frecuentes que pueden complicar un viaje por Costa Rica y cómo evitarlas."
      },
  
      {
        id: "actualidad-y-avisos",
        number: "25",
        title: "Actualidad y avisos de viaje",
        intro:
          "Información reciente que pueda afectar directamente a viajeros: carreteras, parques, clima, transporte o restricciones temporales."
      },
  
      {
        id: "preguntas-frecuentes",
        number: "27",
        title: "Preguntas frecuentes",
        intro:
          "Respuestas a las dudas más habituales antes de viajar a Costa Rica."
      }
    ],
  
    alerts: [],
  
    faq: [],
  
    cta: {
      title: "¿Quieres que hagamos nosotros la investigación?",
  
      description:
        "Si ya sabes que quieres viajar a Costa Rica pero no quieres dedicar horas a investigar, comparar opciones y construir la ruta, podemos hacerlo contigo.",
  
      buttonLabel: "Cuéntanos tu viaje",
  
      buttonHref: "/cuentatuviaje"
    }
  };