export const TRAVEL_INTELLIGENCE_RULES = [
  {
    type: "carretera",
    severity: "high",
    patterns: [
      /road\s+(is\s+)?closed/i,
      /road\s+closure/i,
      /carretera[s]?\s+(cerrada|cerrado|cerradas|cerrados)/i,
      /via[s]?\s+(cerrada|cerrado|cerradas|cerrados)/i,
      /deslizamiento[s]?/i,
      /landslide[s]?/i,
      /bridge\s+(is\s+)?closed/i,
      /puente\s+(cerrad|afectad)/i,
    ],
  },
  {
    type: "clima",
    severity: "high",
    patterns: [
      /flood(?:ing)?\s+(warning|risk|affect|disrupt|closed)/i,
      /inundacion(?:es)?\s+(afectan|afecta|provocan|provoca|obligan|obliga)/i,
      /inundación(?:es)?\s+(afectan|afecta|provocan|provoca|obligan|obliga)/i,
      /tormenta[s]?\s+(severa|fuerte|tropical).*(afect|interrump|cerr|evacu)/i,
      /severe\s+(weather|storm|rain).*(travel|road|airport|closure|disruption)/i,
      /tropical\s+storm.*(travel|road|airport|warning|closure)/i,
      /hurricane.*(travel|road|airport|warning|closure)/i,
      /cicl[oó]n.*(viaje|carretera|aeropuerto|alerta|cierre)/i,
      /huracan.*(viaje|carretera|aeropuerto|alerta|cierre)/i,
      /huracán.*(viaje|carretera|aeropuerto|alerta|cierre)/i,
      /aviso\s+meteorologic.*(afect|riesgo|alerta|viaje)/i,
      /weather\s+warning.*(travel|road|airport|closure)/i,
    ],
  },
  {
    type: "parque",
    severity: "medium",
    patterns: [
      /park\s+(is\s+)?closed/i,
      /national\s+park\s+closed/i,
      /parque\s+nacional.*cerrad/i,
      /cerrad[oa].*parque/i,
      /trail\s+(is\s+)?closed/i,
      /sendero.*cerrad/i,
    ],
  },
  {
    type: "transporte",
    severity: "high",
    patterns: [
      /airport\s+(is\s+)?closed/i,
      /airport\s+disruption/i,
      /flight\s+disruption/i,
      /flight[s]?\s+(cancelled|canceled|delayed)/i,
      /ferry\s+(is\s+)?cancelled/i,
      /transport\s+disruption/i,
      /strike.*(affect|disrupt|cancel|delay).*(flight|ferry|train|bus|transport)/i,
      /huelga.*(afect|interrump|cancel|retras|vuelo|ferry|tren|autob[uú]s|transporte)/i,
      /cancelaciones?.*(vuelo|vuelos|ferry|tren|autob[uú]s|transporte)/i,
      /servicios?\s+(cancelados|canceladas|suspendidos|suspendidas).*transporte/i,
      /cancelled\s+services?.*(flight|ferry|train|bus|transport)/i,
    ],
  },
  {
    type: "entrada",
    severity: "high",
    patterns: [
      /entry\s+requirements?\s+(have\s+)?changed/i,
      /visa\s+requirements?.*(change|new|introduced|updated)/i,
      /entry\s+permit.*(required|new|changed|introduced)/i,
      /visado.*(cambio|nuevo|obligatorio|cambiado|actualizado)/i,
      /permiso.*entrada.*(obligatorio|nuevo|cambiado|actualizado)/i,
      /permit.*entry.*(required|new|changed|updated)/i,
    ],
  },
  {
    type: "seguridad",
    severity: "high",
    patterns: [
      /do\s+not\s+travel/i,
      /avoid\s+all\s+travel/i,
      /avoid\s+travel/i,
      /reconsider\s+travel/i,
      /no\s+se\s+recomienda\s+viajar/i,
      /se\s+desaconseja\s+el\s+viaje/i,
      /aplazar\s+el\s+viaje/i,
      /evitar\s+viajes?/i,
      /estado\s+de\s+emergencia.*(viaje|movilidad|evacuaci[oó]n)/i,
      /emergency\s+state.*(travel|movement|evacuation)/i,
    ],
  },
  {
    type: "salud",
    severity: "medium",
    patterns: [
      /health\s+(alert|restriction).*travel/i,
      /outbreak.*(travel|health|cases|measures)/i,
      /epidemic.*(travel|health|cases|measures)/i,
      /sanitary\s+measures?.*(travel|entry|border)/i,
      /alerta\s+sanitaria.*(viaje|entrada|frontera)/i,
      /brote.*(viaje|casos|medidas|sanitarias|salud)/i,
      /epidemia.*(viaje|casos|medidas|sanitarias|salud)/i,
      /medidas\s+sanitarias?.*(viaje|entrada|frontera)/i,
    ],
  },
  {
    type: "volcan",
    severity: "high",
    patterns: [
      /volcanic\s+activity.*(alert|evac|closure|travel)/i,
      /volcano\s+alert/i,
      /eruption.*(alert|evac|closure|travel)/i,
      /erupcion.*(alerta|evacu|cierre|viaje)/i,
      /erupción.*(alerta|evacu|cierre|viaje)/i,
      /actividad\s+volcanica.*(alerta|evacu|cierre|viaje)/i,
      /actividad\s+volcánica.*(alerta|evacu|cierre|viaje)/i,
    ],
  },
];

export const findRuleMatch = (rule, sentence) =>
  rule.patterns.some((pattern) => pattern.test(sentence));

export const findTravelAlertMatch = (sentence) =>
  TRAVEL_INTELLIGENCE_RULES.find((rule) => findRuleMatch(rule, sentence));
