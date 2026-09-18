/**
 * GENERATED FILE — do not edit by hand.
 * Updated by scripts/monitor-travel-intelligence.mjs.
 */

import type { TravelAlert } from "../guides/types";

export interface LiveGuideUpdate {
  checkedAt: string;
  rulesetVersion: string;
  sourceFingerprints: Record<string, string>;
  sourceAlerts: Record<string, TravelAlert[]>;
  alerts: TravelAlert[];
  sourceFailures?: string[];
}

export const liveGuideUpdates: Record<string, LiveGuideUpdate> = {
  "costa-rica": {
    "checkedAt": "2026-09-18T09:47:47.142Z",
    "sourceFingerprints": {
      "es-maec": "0b2f50634deec9ba5299fcf8526ea8470f66578a8921fc657287540cc1bb1137",
      "uk-fcdo": "bcfe05ae14461c4f605392d80d1a9f9ee916f7acaa96eba6831a7e5ca2c06ea3",
      "mopt": "b765c9e079927138266b6348e1b5a1c18f5fdb36f85b7c12f04094b4cedfdfbe",
      "imn": "87ef81f46c49bb1dca09ada003cbd637a9c604df726f0e8feb81653e5df3734b"
    },
    "sourceAlerts": {
      "es-maec": [
        {
          "id": "live-0f617f2aad7c2995",
          "date": "2026-09-18",
          "type": "carretera",
          "severity": "high",
          "title": "Carretera — información detectada",
          "description": "Producir inundaciones o deslizamientos de tierra.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Costa+Rica",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-09-18T09:47:47.142Z",
          "affectedAreas": [],
          "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
        }
      ],
      "uk-fcdo": [],
      "mopt": [],
      "imn": []
    },
    "alerts": [
      {
        "id": "live-0f617f2aad7c2995",
        "date": "2026-09-18",
        "type": "carretera",
        "severity": "high",
        "title": "Carretera — información detectada",
        "description": "Producir inundaciones o deslizamientos de tierra.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Costa+Rica",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-09-18T09:47:47.142Z",
        "affectedAreas": [],
        "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
      }
    ],
    "sourceFailures": [
      "us-state: HTTP 403",
      "cne: HTTP 403"
    ],
    "rulesetVersion": "2026-09-18-2"
  },
  "sudafrica": {
    "checkedAt": "2026-09-18T09:47:47.142Z",
    "sourceFingerprints": {
      "es-maec": "83ec0809642538093ceef9a45533bb64059962716abd90cc7ed7222eda757a18",
      "uk-fcdo": "bca2d4bea5e30ead20413b824d13af4ae19930233dc86d7ab85b396cec974e92",
      "gov-sa": "c3db0db0687c587cf1909f5f19641451dbacf45a70c0397c1c5d4e201f038a71"
    },
    "sourceAlerts": {
      "es-maec": [],
      "uk-fcdo": []
    },
    "alerts": [],
    "sourceFailures": [
      "us-state: HTTP 403",
      "fetch failed"
    ],
    "rulesetVersion": "2026-09-18-2"
  },
  "jordania": {
    "checkedAt": "2026-09-18T09:47:47.142Z",
    "sourceFingerprints": {
      "es-maec": "e8a927ec66558220a654eee4a154592fbaa4d38cae80dce75a0bf3d5b2dc3fcd",
      "uk-fcdo": "39ec8dc0301f62a4f1a5a3111c9b5d1d9e290ace42527809803544e17bc185f3"
    },
    "sourceAlerts": {
      "es-maec": [
        {
          "id": "live-8afa465fb26bb6eb",
          "date": "2026-09-18",
          "type": "seguridad",
          "severity": "high",
          "title": "Seguridad — información detectada",
          "description": "LA REGIÓN DE ORIENTE PRÓXIMO SE ENCUENTRA EN LA ACTUALIDAD AFECTADA POR UN CONFLICTO DE ALCANCE REGIONAL. SE ACONSEJA APLAZAR SU VIAJE A JORDANIA HASTA NUEVO AVISO.",
          "source": "https://exteriores.gob.es/Embajadas/amman/en/ViajarA/Paginas/Recomendaciones-de-viaje.aspx",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-09-18T09:47:47.142Z",
          "affectedAreas": [],
          "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
        }
      ],
      "uk-fcdo": []
    },
    "alerts": [
      {
        "id": "live-8afa465fb26bb6eb",
        "date": "2026-09-18",
        "type": "seguridad",
        "severity": "high",
        "title": "Seguridad — información detectada",
        "description": "LA REGIÓN DE ORIENTE PRÓXIMO SE ENCUENTRA EN LA ACTUALIDAD AFECTADA POR UN CONFLICTO DE ALCANCE REGIONAL. SE ACONSEJA APLAZAR SU VIAJE A JORDANIA HASTA NUEVO AVISO.",
        "source": "https://exteriores.gob.es/Embajadas/amman/en/ViajarA/Paginas/Recomendaciones-de-viaje.aspx",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-09-18T09:47:47.142Z",
        "affectedAreas": [],
        "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
      }
    ],
    "sourceFailures": [
      "us-state: HTTP 403"
    ],
    "rulesetVersion": "2026-09-18-2"
  },
  "grecia": {
    "checkedAt": "2026-09-18T09:47:47.142Z",
    "sourceFingerprints": {
      "es-maec": "a43450f2c857c09b6825f18bb408749b3919e14b4350880d0a06d6a1e810d038",
      "uk-fcdo": "7e2b7cd277fb8f34ef3623f30581ee4e9b00747d44fd2c252b604801bdc95317"
    },
    "sourceAlerts": {
      "es-maec": [
        {
          "id": "live-f50f63f4aea5f407",
          "date": "2026-09-18",
          "type": "carretera",
          "severity": "high",
          "title": "Carretera — información detectada",
          "description": "D urante el verano en Grecia aumenta considerablemente el riesgo y número de incendios forestales, la situación sobre el terreno puede cambiar rápid amente y a veces provocan el cierre de carreteras.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-09-18T09:47:47.142Z",
          "affectedAreas": [],
          "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
        },
        {
          "id": "live-97b180b4ede9a642",
          "date": "2026-09-18",
          "type": "transporte",
          "severity": "high",
          "title": "Transporte — información detectada",
          "description": "Las condiciones meteorológicas extremas pueden afectar a zonas de Grecia durante todo el año, incluido el largo periodo estival, lo que puede ocasionar cancelaciones de vuelos y/o ferris.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-09-18T09:47:47.142Z",
          "affectedAreas": [],
          "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
        }
      ],
      "uk-fcdo": []
    },
    "alerts": [
      {
        "id": "live-f50f63f4aea5f407",
        "date": "2026-09-18",
        "type": "carretera",
        "severity": "high",
        "title": "Carretera — información detectada",
        "description": "D urante el verano en Grecia aumenta considerablemente el riesgo y número de incendios forestales, la situación sobre el terreno puede cambiar rápid amente y a veces provocan el cierre de carreteras.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-09-18T09:47:47.142Z",
        "affectedAreas": [],
        "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
      },
      {
        "id": "live-97b180b4ede9a642",
        "date": "2026-09-18",
        "type": "transporte",
        "severity": "high",
        "title": "Transporte — información detectada",
        "description": "Las condiciones meteorológicas extremas pueden afectar a zonas de Grecia durante todo el año, incluido el largo periodo estival, lo que puede ocasionar cancelaciones de vuelos y/o ferris.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-09-18T09:47:47.142Z",
        "affectedAreas": [],
        "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
      }
    ],
    "sourceFailures": [
      "us-state: HTTP 403"
    ],
    "rulesetVersion": "2026-09-18-2"
  }
};
