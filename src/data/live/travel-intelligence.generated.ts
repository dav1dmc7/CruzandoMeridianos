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
    "checkedAt": "2026-11-23T16:00:31.100Z",
    "sourceFingerprints": {
      "es-maec": "b3d58a351dac3cb016d225a55238d0001d9e52fcd55d18a14a35cb84eed7d1b3",
      "uk-fcdo": "852a068bacf2682ce41e51fe0d413ab7c2f5c19af8ee6d4be8aff8eb94356c7b",
      "mopt": "0c25756d31ccd02599a11941311911476b473f1455b443e829de7c0c83c83bc5",
      "imn": "9e176a37662ac3ad6a380dea41aefd4bb425e24c700c399ed4cc8f1cf7c10662"
    },
    "sourceAlerts": {
      "es-maec": [
        {
          "id": "live-0f617f2aad7c2995",
          "date": "2026-11-23",
          "type": "carretera",
          "severity": "high",
          "title": "Carretera — información detectada",
          "description": "Producir inundaciones o deslizamientos de tierra.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Costa+Rica",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-11-23T16:00:31.100Z",
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
        "date": "2026-11-23",
        "type": "carretera",
        "severity": "high",
        "title": "Carretera — información detectada",
        "description": "Producir inundaciones o deslizamientos de tierra.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Costa+Rica",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-11-23T16:00:31.100Z",
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
    "checkedAt": "2026-11-23T16:00:31.100Z",
    "sourceFingerprints": {
      "es-maec": "f8c95d183719b3673fc817a1a65eb0d6ffb60a39ca1c6900798f52b9733ad5c3",
      "uk-fcdo": "1281247eb7da4db49c75bd92356a888aab74369f266256b80efb34caf907eb83",
      "gov-sa": "5ed05462a3f57ac324a0ef11d26425a540653142256098293251537b60a39d0a"
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
    "checkedAt": "2026-11-23T16:00:31.100Z",
    "sourceFingerprints": {
      "es-maec": "f17ed57ad895d4b38b05a575784014dc810ff96d68fadedfd683f80d4b121666",
      "uk-fcdo": "79b224032031476d600e7819d7ef4dc146795d9165669d0cb2a82ebe06e763a2"
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
    "checkedAt": "2026-11-23T16:00:31.100Z",
    "sourceFingerprints": {
      "es-maec": "2f482e18901d913172062391d341d3ca3f815e65314dec990a379c758b3c82ea",
      "uk-fcdo": "5e861229a73812374958f9c982396ba2def84a51ac6cf7cf5c48b3d39acb1914"
    },
    "sourceAlerts": {
      "es-maec": [
        {
          "id": "live-f50f63f4aea5f407",
          "date": "2026-11-23",
          "type": "carretera",
          "severity": "high",
          "title": "Carretera — información detectada",
          "description": "D urante el verano en Grecia aumenta considerablemente el riesgo y número de incendios forestales, la situación sobre el terreno puede cambiar rápid amente y a veces provocan el cierre de carreteras.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-11-23T16:00:31.100Z",
          "affectedAreas": [],
          "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
        },
        {
          "id": "live-97b180b4ede9a642",
          "date": "2026-11-23",
          "type": "transporte",
          "severity": "high",
          "title": "Transporte — información detectada",
          "description": "Las condiciones meteorológicas extremas pueden afectar a zonas de Grecia durante todo el año, incluido el largo periodo estival, lo que puede ocasionar cancelaciones de vuelos y/o ferris.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-11-23T16:00:31.100Z",
          "affectedAreas": [],
          "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
        }
      ],
      "uk-fcdo": []
    },
    "alerts": [
      {
        "id": "live-f50f63f4aea5f407",
        "date": "2026-11-23",
        "type": "carretera",
        "severity": "high",
        "title": "Carretera — información detectada",
        "description": "D urante el verano en Grecia aumenta considerablemente el riesgo y número de incendios forestales, la situación sobre el terreno puede cambiar rápid amente y a veces provocan el cierre de carreteras.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-11-23T16:00:31.100Z",
        "affectedAreas": [],
        "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
      },
      {
        "id": "live-97b180b4ede9a642",
        "date": "2026-11-23",
        "type": "transporte",
        "severity": "high",
        "title": "Transporte — información detectada",
        "description": "Las condiciones meteorológicas extremas pueden afectar a zonas de Grecia durante todo el año, incluido el largo periodo estival, lo que puede ocasionar cancelaciones de vuelos y/o ferris.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-11-23T16:00:31.100Z",
        "affectedAreas": [],
        "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
      }
    ],
    "sourceFailures": [
      "us-state: HTTP 403"
    ]
  }
};
