/**
 * GENERATED FILE — do not edit by hand.
 * Updated by scripts/monitor-travel-intelligence.mjs.
 */

import type { TravelAlert } from "../guides/types";

export interface LiveGuideUpdate {
  checkedAt: string;
  sourceFingerprints: Record<string, string>;
  sourceAlerts: Record<string, TravelAlert[]>;
  alerts: TravelAlert[];
  sourceFailures?: string[];
}

export const liveGuideUpdates: Record<string, LiveGuideUpdate> = {
  "costa-rica": {
    "checkedAt": "2026-10-13T12:44:11.145Z",
    "sourceFingerprints": {
      "es-maec": "77260272895eb381f4b466b69c7bc70f50b258deb27cc92049824f47896a5688",
      "uk-fcdo": "80a2b6cd7654935652b2a571dee58fd010b883b476b6dc0dbd7d8c486d7985ce",
      "mopt": "cd58a257499fcfccef7c688d9bbe85dd119c5b71b41bc72957d5711d3bc3ed6c",
      "imn": "4290cbb2b30df9d7b8b5df3291df127a4035188cb16a48286885f9d9f0424ae4"
    },
    "sourceAlerts": {
      "es-maec": [
        {
          "id": "live-0f617f2aad7c2995",
          "date": "2026-10-13",
          "type": "carretera",
          "severity": "high",
          "title": "Carretera — información detectada",
          "description": "Producir inundaciones o deslizamientos de tierra.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Costa+Rica",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-10-13T12:44:11.145Z",
          "affectedAreas": [],
          "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
        }
      ],
      "uk-fcdo": [],
      "imn": []
    },
    "alerts": [
      {
        "id": "live-0f617f2aad7c2995",
        "date": "2026-10-13",
        "type": "carretera",
        "severity": "high",
        "title": "Carretera — información detectada",
        "description": "Producir inundaciones o deslizamientos de tierra.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Costa+Rica",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-10-13T12:44:11.145Z",
        "affectedAreas": [],
        "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
      }
    ],
    "sourceFailures": [
      "us-state: HTTP 403",
      "cne: HTTP 403"
    ]
  },
  "sudafrica": {
    "checkedAt": "2026-10-13T12:44:11.145Z",
    "sourceFingerprints": {
      "es-maec": "fb121379dbc45cefc0e54911b85b5cb263042c07ea1926f2dba14bc454c7250f",
      "uk-fcdo": "809c89ed0a63d4fc14e1780b6dca841e3621d573a339ec9773c4f090bb43e43c",
      "gov-sa": "06bdcf41e7fe5d363b69f39d5dc3000cd582562e7d9a8af9784656d42d89e2f7"
    },
    "sourceAlerts": {
      "uk-fcdo": []
    },
    "alerts": [],
    "sourceFailures": [
      "es-maec: HTTP 503",
      "us-state: HTTP 403",
      "fetch failed"
    ]
  },
  "jordania": {
    "checkedAt": "2026-10-13T12:44:11.145Z",
    "sourceFingerprints": {
      "es-maec": "110cc3e7d176341fad23dbab51334ed14a367c9b9f30961dd4c66048112b60d9",
      "uk-fcdo": "a54314f876c6c8ef95168b8a8b89b83f0f7399ede78f5f41e17bd3321897954c"
    },
    "sourceAlerts": {
      "uk-fcdo": []
    },
    "alerts": [],
    "sourceFailures": [
      "es-maec: HTTP 503",
      "us-state: HTTP 403"
    ]
  },
  "grecia": {
    "checkedAt": "2026-10-13T12:44:11.145Z",
    "sourceFingerprints": {
      "es-maec": "dd04c2890b1f1a760b6b555d81992a43fcdf054f856449e62072d66e16354621",
      "uk-fcdo": "2efae26427b2053c17828725620b9c53705d13e291be45fa24c4743ad61a9d0d"
    },
    "sourceAlerts": {
      "es-maec": [
        {
          "id": "live-f50f63f4aea5f407",
          "date": "2026-10-13",
          "type": "carretera",
          "severity": "high",
          "title": "Carretera — información detectada",
          "description": "D urante el verano en Grecia aumenta considerablemente el riesgo y número de incendios forestales, la situación sobre el terreno puede cambiar rápid amente y a veces provocan el cierre de carreteras.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-10-13T12:44:11.145Z",
          "affectedAreas": [],
          "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
        },
        {
          "id": "live-97b180b4ede9a642",
          "date": "2026-10-13",
          "type": "transporte",
          "severity": "high",
          "title": "Transporte — información detectada",
          "description": "Las condiciones meteorológicas extremas pueden afectar a zonas de Grecia durante todo el año, incluido el largo periodo estival, lo que puede ocasionar cancelaciones de vuelos y/o ferris.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-10-13T12:44:11.145Z",
          "affectedAreas": [],
          "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
        }
      ],
      "uk-fcdo": []
    },
    "alerts": [
      {
        "id": "live-f50f63f4aea5f407",
        "date": "2026-10-13",
        "type": "carretera",
        "severity": "high",
        "title": "Carretera — información detectada",
        "description": "D urante el verano en Grecia aumenta considerablemente el riesgo y número de incendios forestales, la situación sobre el terreno puede cambiar rápid amente y a veces provocan el cierre de carreteras.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-10-13T12:44:11.145Z",
        "affectedAreas": [],
        "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
      },
      {
        "id": "live-97b180b4ede9a642",
        "date": "2026-10-13",
        "type": "transporte",
        "severity": "high",
        "title": "Transporte — información detectada",
        "description": "Las condiciones meteorológicas extremas pueden afectar a zonas de Grecia durante todo el año, incluido el largo periodo estival, lo que puede ocasionar cancelaciones de vuelos y/o ferris.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-10-13T12:44:11.145Z",
        "affectedAreas": [],
        "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
      }
    ],
    "sourceFailures": [
      "us-state: HTTP 403"
    ]
  }
};
