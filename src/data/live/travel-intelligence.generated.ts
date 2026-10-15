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
    "checkedAt": "2026-10-15T09:57:45.919Z",
    "sourceFingerprints": {
      "es-maec": "358ffae1e41c33e6c357d228de6a1286b56a7c940ed770b423690f8f84d336cc",
      "uk-fcdo": "31b1eeb1df1f0fdb7d40653b3ce9e3b57d62f779dcc69b9fcd548c272516f81b",
      "mopt": "5c5c7f3ebed5d4eb0b1855fdbbc95380fb962c5d538993c785597b01dbb2fb22",
      "imn": "cb7d7330a680b92976d53f50c264c0080d0f848f26ddd4da33f57d63484f22b0"
    },
    "sourceAlerts": {
      "es-maec": [
        {
          "id": "live-0f617f2aad7c2995",
          "date": "2026-10-15",
          "type": "carretera",
          "severity": "high",
          "title": "Carretera — información detectada",
          "description": "Producir inundaciones o deslizamientos de tierra.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Costa+Rica",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-10-15T09:57:45.919Z",
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
        "date": "2026-10-15",
        "type": "carretera",
        "severity": "high",
        "title": "Carretera — información detectada",
        "description": "Producir inundaciones o deslizamientos de tierra.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Costa+Rica",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-10-15T09:57:45.919Z",
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
    "checkedAt": "2026-10-15T09:57:45.919Z",
    "sourceFingerprints": {
      "es-maec": "8c9173b0998c6ede58c97e6d579abf9970e6cf9bceee4e6697b893b7a98ddb85",
      "uk-fcdo": "1f12d5e3ab07075048f4dce819d058a3f030cd95743643527200db098039b58c",
      "gov-sa": "41d2abbd795b8852280ccfe928e3ed14f1d6d6948448568e27126c1fbc0c78ff"
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
    "checkedAt": "2026-10-15T09:57:45.919Z",
    "sourceFingerprints": {
      "es-maec": "6ad22411e5390b8747d28c4f43bc72eb7a8d4f585343d3f89fee3e34a48fdfd1",
      "uk-fcdo": "f08599c82d528f854dd84921b224daae2b8b5491d8ed2f372ea13329e5514a79"
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
    "checkedAt": "2026-10-15T09:57:45.919Z",
    "sourceFingerprints": {
      "es-maec": "5d79f1437c5849c82eda1b7a1bfd707ddb134f506ff1db0260ca18d120eb4e04",
      "uk-fcdo": "6efbfaf08e540b059f2a08c4e84b0342a4e8a1fbcb3624508341d04155ebeac9"
    },
    "sourceAlerts": {
      "es-maec": [
        {
          "id": "live-f50f63f4aea5f407",
          "date": "2026-10-15",
          "type": "carretera",
          "severity": "high",
          "title": "Carretera — información detectada",
          "description": "D urante el verano en Grecia aumenta considerablemente el riesgo y número de incendios forestales, la situación sobre el terreno puede cambiar rápid amente y a veces provocan el cierre de carreteras.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-10-15T09:57:45.919Z",
          "affectedAreas": [],
          "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
        },
        {
          "id": "live-97b180b4ede9a642",
          "date": "2026-10-15",
          "type": "transporte",
          "severity": "high",
          "title": "Transporte — información detectada",
          "description": "Las condiciones meteorológicas extremas pueden afectar a zonas de Grecia durante todo el año, incluido el largo periodo estival, lo que puede ocasionar cancelaciones de vuelos y/o ferris.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-10-15T09:57:45.919Z",
          "affectedAreas": [],
          "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
        }
      ],
      "uk-fcdo": []
    },
    "alerts": [
      {
        "id": "live-f50f63f4aea5f407",
        "date": "2026-10-15",
        "type": "carretera",
        "severity": "high",
        "title": "Carretera — información detectada",
        "description": "D urante el verano en Grecia aumenta considerablemente el riesgo y número de incendios forestales, la situación sobre el terreno puede cambiar rápid amente y a veces provocan el cierre de carreteras.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-10-15T09:57:45.919Z",
        "affectedAreas": [],
        "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
      },
      {
        "id": "live-97b180b4ede9a642",
        "date": "2026-10-15",
        "type": "transporte",
        "severity": "high",
        "title": "Transporte — información detectada",
        "description": "Las condiciones meteorológicas extremas pueden afectar a zonas de Grecia durante todo el año, incluido el largo periodo estival, lo que puede ocasionar cancelaciones de vuelos y/o ferris.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-10-15T09:57:45.919Z",
        "affectedAreas": [],
        "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
      }
    ],
    "sourceFailures": [
      "us-state: HTTP 403"
    ]
  }
};
