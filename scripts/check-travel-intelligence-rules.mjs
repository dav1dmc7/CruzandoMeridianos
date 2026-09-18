import assert from "node:assert/strict";

import { findTravelAlertMatch } from "./travel-intelligence.rules.mjs";

const expectType = (sentence, expectedType) => {
  const match = findTravelAlertMatch(sentence);
  assert(match, `expected a match for: ${sentence}`);
  assert.equal(match.type, expectedType, `expected ${expectedType}, got ${match.type}`);
};

const expectNoMatch = (sentence) => {
  assert.equal(
    findTravelAlertMatch(sentence),
    undefined,
    `unexpected alert match for: ${sentence}`,
  );
};

expectType(
  "A strike will affect flights and cause delays across the regional airport network.",
  "transporte",
);
expectType(
  "Las cancelaciones de vuelos afectan a viajeros con conexiones internacionales.",
  "transporte",
);
expectType(
  "Un brote sanitario obliga a reforzar las medidas de salud para los viajeros.",
  "salud",
);
expectType(
  "La actividad volcánica provoca una alerta y evacuaciones en la zona turística.",
  "volcan",
);
expectType(
  "El cierre de la carretera principal obliga a cambiar la ruta hacia la costa.",
  "carretera",
);
expectType(
  "Las nuevas normas de visado han sido introducidas y son obligatorias para entrar.",
  "entrada",
);
expectType(
  "Se aconseja aplazar viaje hasta nuevo aviso.",
  "seguridad",
);
expectType(
  "LA REGIÓN DE ORIENTE PRÓXIMO SE ENCUENTRA EN LA ACTUALIDAD AFECTADA POR UN CONFLICTO DE ALCANCE REGIONAL. SE ACONSEJA APLAZAR SU VIAJE A JORDANIA HASTA NUEVO AVISO.",
  "seguridad",
);

expectNoMatch("The government has previously discussed a national strike in parliament.");
expectNoMatch("The annual report mentions past flight cancellations during the winter season.");
expectNoMatch("The ministry published a historical overview of an outbreak from 2024.");
expectNoMatch("The country experienced a state of emergency in 2022 after severe flooding.");
expectNoMatch("The report describes volcanic activity measured over the last decade.");
expectNoMatch("The tourism ministry published general advice for visitors and transport users.");

console.log("Travel intelligence rule tests passed: contextual matches and false-positive guards are covered.");
