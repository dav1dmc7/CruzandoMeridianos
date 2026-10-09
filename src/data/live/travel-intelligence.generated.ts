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
    "checkedAt": "2026-10-09T11:55:23.850Z",
    "sourceFingerprints": {
      "es-maec": "6a244fbdb47ed40770bb15a7913c3ed0409beb20be6bba23b899db086679f4a0",
      "uk-fcdo": "fd89ce301fc3ea94378022a3cd6ad801c2b8fb629b4cbea39c2fbf57be63ad93",
      "mopt": "cd58a257499fcfccef7c688d9bbe85dd119c5b71b41bc72957d5711d3bc3ed6c",
      "imn": "32da1d205c84c3e213b2d7f432e4d2ef1aae72b317250c4cbb8aee61a708ff94"
    },
    "sourceAlerts": {
      "es-maec": [
        {
          "id": "live-0f617f2aad7c2995",
          "date": "2026-10-09",
          "type": "carretera",
          "severity": "high",
          "title": "Carretera — información detectada",
          "description": "Producir inundaciones o deslizamientos de tierra.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Costa+Rica",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-10-09T11:55:23.850Z",
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
        "date": "2026-10-09",
        "type": "carretera",
        "severity": "high",
        "title": "Carretera — información detectada",
        "description": "Producir inundaciones o deslizamientos de tierra.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Costa+Rica",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-10-09T11:55:23.850Z",
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
    "checkedAt": "2026-10-09T11:55:23.850Z",
    "sourceFingerprints": {
      "es-maec": "c14b8b7ab8edd149fba0ede68f74e548b3071bcc2e10468dafd506fc0b009890",
      "uk-fcdo": "56e0f5ee528845246429435ce9c26826ab5c6dd4d1d64c8012f1d74043562fcb",
      "gov-sa": "dca71f202bd07d697817bc11be4146c44d3532c10bff85b0cd210d8e2771600b"
    },
    "sourceAlerts": {
      "es-maec": [],
      "uk-fcdo": [],
      "gov-sa": []
    },
    "alerts": [],
    "sourceFailures": [
      "us-state: HTTP 403"
    ]
  },
  "jordania": {
    "checkedAt": "2026-10-09T11:55:23.850Z",
    "sourceFingerprints": {
      "es-maec": "cec14ed9a09bf485eda0343ed534e767cccb0f452136712ecfae62a76c749c43",
      "uk-fcdo": "a5c0e120044264bc2e935866c1e10891bd8e4395fd0a0bd3e80a9a018cab0a49"
    },
    "sourceAlerts": {
      "es-maec": [],
      "uk-fcdo": []
    },
    "alerts": [],
    "sourceFailures": [
      "us-state: HTTP 403"
    ]
  },
  "grecia": {
    "checkedAt": "2026-10-09T11:55:23.850Z",
    "sourceFingerprints": {
      "es-maec": "2757f5fa443ab2f07cd0f656d4b5c5454ade0e0c019b8e7352f5f757540d0455",
      "uk-fcdo": "c55d2e78bfca483f8912eec5b374e431da4a904426984ea9bf891de88c413755"
    },
    "sourceAlerts": {
      "es-maec": [
        {
          "id": "live-f50f63f4aea5f407",
          "date": "2026-10-09",
          "type": "carretera",
          "severity": "high",
          "title": "Carretera — información detectada",
          "description": "D urante el verano en Grecia aumenta considerablemente el riesgo y número de incendios forestales, la situación sobre el terreno puede cambiar rápid amente y a veces provocan el cierre de carreteras.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-10-09T11:55:23.850Z",
          "affectedAreas": [],
          "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
        },
        {
          "id": "live-97b180b4ede9a642",
          "date": "2026-10-09",
          "type": "transporte",
          "severity": "high",
          "title": "Transporte — información detectada",
          "description": "Las condiciones meteorológicas extremas pueden afectar a zonas de Grecia durante todo el año, incluido el largo periodo estival, lo que puede ocasionar cancelaciones de vuelos y/o ferris.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-10-09T11:55:23.850Z",
          "affectedAreas": [],
          "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
        }
      ],
      "uk-fcdo": []
    },
    "alerts": [
      {
        "id": "live-f50f63f4aea5f407",
        "date": "2026-10-09",
        "type": "carretera",
        "severity": "high",
        "title": "Carretera — información detectada",
        "description": "D urante el verano en Grecia aumenta considerablemente el riesgo y número de incendios forestales, la situación sobre el terreno puede cambiar rápid amente y a veces provocan el cierre de carreteras.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-10-09T11:55:23.850Z",
        "affectedAreas": [],
        "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
      },
      {
        "id": "live-97b180b4ede9a642",
        "date": "2026-10-09",
        "type": "transporte",
        "severity": "high",
        "title": "Transporte — información detectada",
        "description": "Las condiciones meteorológicas extremas pueden afectar a zonas de Grecia durante todo el año, incluido el largo periodo estival, lo que puede ocasionar cancelaciones de vuelos y/o ferris.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-10-09T11:55:23.850Z",
        "affectedAreas": [],
        "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
      }
    ],
    "sourceFailures": [
      "us-state: HTTP 403"
    ]
  }
};
