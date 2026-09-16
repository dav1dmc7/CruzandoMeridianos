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
    "checkedAt": "2026-09-16T13:24:50.678Z",
    "sourceFingerprints": {
      "es-maec": "e1e29da01c82bd6150a0d4df44328614037d2588543530c6a7d6e80070a24977",
      "uk-fcdo": "d647c9ccf2bdbe672744063af8e9435636bec474b47c419c0422b918cfeab75e",
      "mopt": "2990d76fe0c88c3faadca7f16b200cb68f7eeb08aed1abb278e5e2f64a314226",
      "imn": "c85450e0ae020a2cfeccd26b69a7dcb0726dab92968269b2ba9318eaf2cd236f"
    },
    "sourceAlerts": {
      "es-maec": [
        {
          "id": "live-0f617f2aad7c2995",
          "date": "2026-09-16",
          "type": "carretera",
          "severity": "high",
          "title": "Carretera — información detectada",
          "description": "Producir inundaciones o deslizamientos de tierra.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Costa+Rica",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-09-16T13:24:50.678Z",
          "affectedAreas": [],
          "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
        },
        {
          "id": "live-c44257f359bd2ea0",
          "date": "2026-09-16",
          "type": "clima",
          "severity": "high",
          "title": "Clima — información detectada",
          "description": "Producir inundaciones o deslizamientos de tierra.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Costa+Rica",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-09-16T13:24:50.678Z",
          "affectedAreas": [],
          "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
        },
        {
          "id": "live-3d536958d2d6c1d4",
          "date": "2026-09-16",
          "type": "volcan",
          "severity": "high",
          "title": "Volcan — información detectada",
          "description": "En caso de terremotos o erupciones volcánicas, resulta esencial respetar en todo momento las indicaciones de seguridad que puedan establecer las autoridades locales, y seguir el desarrollo de la situación en los vínculos mencionados y en los medios de comunicación local.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Costa+Rica",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-09-16T13:24:50.678Z",
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
        "date": "2026-09-16",
        "type": "carretera",
        "severity": "high",
        "title": "Carretera — información detectada",
        "description": "Producir inundaciones o deslizamientos de tierra.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Costa+Rica",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-09-16T13:24:50.678Z",
        "affectedAreas": [],
        "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
      },
      {
        "id": "live-c44257f359bd2ea0",
        "date": "2026-09-16",
        "type": "clima",
        "severity": "high",
        "title": "Clima — información detectada",
        "description": "Producir inundaciones o deslizamientos de tierra.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Costa+Rica",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-09-16T13:24:50.678Z",
        "affectedAreas": [],
        "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
      },
      {
        "id": "live-3d536958d2d6c1d4",
        "date": "2026-09-16",
        "type": "volcan",
        "severity": "high",
        "title": "Volcan — información detectada",
        "description": "En caso de terremotos o erupciones volcánicas, resulta esencial respetar en todo momento las indicaciones de seguridad que puedan establecer las autoridades locales, y seguir el desarrollo de la situación en los vínculos mencionados y en los medios de comunicación local.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Costa+Rica",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-09-16T13:24:50.678Z",
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
    "checkedAt": "2026-09-16T13:24:50.678Z",
    "sourceFingerprints": {
      "es-maec": "4f54e397bea7ba2a9430c246b82b4dff8eb6ab3f85327a2d78340d5123bb9683",
      "uk-fcdo": "922782fa536358c0036b7e321fd93f32ca7c4192edc71064c61210079e2c505a"
    },
    "sourceAlerts": {
      "es-maec": [],
      "uk-fcdo": []
    },
    "alerts": [],
    "sourceFailures": [
      "us-state: HTTP 403",
      "fetch failed"
    ]
  },
  "jordania": {
    "checkedAt": "2026-09-16T13:24:50.678Z",
    "sourceFingerprints": {
      "es-maec": "a3802a0378d85822101322c8bee20879d6a4ea4f291b894010f35f53df467826",
      "uk-fcdo": "a3234aa21defd914bc7f06d77ee43089cf8e4bf7e219c770975c2430af2ba159"
    },
    "sourceAlerts": {
      "es-maec": [
        {
          "id": "live-309aabe6945b530e",
          "date": "2026-09-16",
          "type": "clima",
          "severity": "high",
          "title": "Clima — información detectada",
          "description": "Desastres naturales &#160; Jordania es un país de riesgo bajo en materia de desastres naturales.&#160;&#160;Sin embargo, conviene tener presente que en las pocas ocasiones en las que se producen lluvias intensas o nevadas, estas pueden ocasionar riadas o pequeñas inundaciones de algunos tramos de carreteras, y lo que es más peligroso, anegar rápidamente cañones y valles frecuentados por turistas.",
          "source": "https://exteriores.gob.es/Embajadas/amman/en/ViajarA/Paginas/Recomendaciones-de-viaje.aspx",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-09-16T13:24:50.678Z",
          "affectedAreas": [],
          "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
        }
      ],
      "uk-fcdo": []
    },
    "alerts": [
      {
        "id": "live-309aabe6945b530e",
        "date": "2026-09-16",
        "type": "clima",
        "severity": "high",
        "title": "Clima — información detectada",
        "description": "Desastres naturales &#160; Jordania es un país de riesgo bajo en materia de desastres naturales.&#160;&#160;Sin embargo, conviene tener presente que en las pocas ocasiones en las que se producen lluvias intensas o nevadas, estas pueden ocasionar riadas o pequeñas inundaciones de algunos tramos de carreteras, y lo que es más peligroso, anegar rápidamente cañones y valles frecuentados por turistas.",
        "source": "https://exteriores.gob.es/Embajadas/amman/en/ViajarA/Paginas/Recomendaciones-de-viaje.aspx",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-09-16T13:24:50.678Z",
        "affectedAreas": [],
        "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
      }
    ],
    "sourceFailures": [
      "us-state: HTTP 403"
    ]
  },
  "grecia": {
    "checkedAt": "2026-09-16T13:24:50.678Z",
    "sourceFingerprints": {
      "es-maec": "9e25c01b5303432a7cb233af2ac9ed40be9da81c3be16e839556f4e21f745ef1",
      "uk-fcdo": "47efa5458f202cbd44b83ba31327d6139d2a44803bb2ee0a391b3b1164ce603a"
    },
    "sourceAlerts": {
      "es-maec": [
        {
          "id": "live-97b180b4ede9a642",
          "date": "2026-09-16",
          "type": "transporte",
          "severity": "high",
          "title": "Transporte — información detectada",
          "description": "Las condiciones meteorológicas extremas pueden afectar a zonas de Grecia durante todo el año, incluido el largo periodo estival, lo que puede ocasionar cancelaciones de vuelos y/o ferris.",
          "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
          "sourceLabel": "España — Recomendaciones de viaje (ES)",
          "sourceType": "official",
          "active": true,
          "checkedAt": "2026-09-16T13:24:50.678Z",
          "affectedAreas": [],
          "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
        }
      ],
      "uk-fcdo": []
    },
    "alerts": [
      {
        "id": "live-97b180b4ede9a642",
        "date": "2026-09-16",
        "type": "transporte",
        "severity": "high",
        "title": "Transporte — información detectada",
        "description": "Las condiciones meteorológicas extremas pueden afectar a zonas de Grecia durante todo el año, incluido el largo periodo estival, lo que puede ocasionar cancelaciones de vuelos y/o ferris.",
        "source": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Grecia",
        "sourceLabel": "España — Recomendaciones de viaje (ES)",
        "sourceType": "official",
        "active": true,
        "checkedAt": "2026-09-16T13:24:50.678Z",
        "affectedAreas": [],
        "travelerAction": "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte."
      }
    ],
    "sourceFailures": [
      "us-state: HTTP 403"
    ]
  }
};
