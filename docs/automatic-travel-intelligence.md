# Inteligencia de viaje automática

Cruzando Meridianos puede mantener una capa de actualidad diaria sin convertir la IA en una autoridad factual.

## Flujo

```text
Fuentes oficiales
      ↓
GitHub Actions (diario)
      ↓
fetch + huella de contenido
      ↓
OpenAI Responses API
      ↓
JSON estructurado de alertas
      ↓
src/data/live/travel-intelligence.generated.ts
      ↓
guide registry
      ↓
/viajes/<destino>
```

La monitorización solo publica hechos que estén respaldados por las fuentes descargadas. La IA clasifica, resume y normaliza; no debe inventar cierres, visados, permisos ni recomendaciones.

## Frecuencia

El workflow `.github/workflows/travel-intelligence.yml` se programa diariamente y también puede ejecutarse manualmente.

El workflow debe estar en `main` para que el disparador programado funcione como parte del flujo de producción. Esta rama de auditoría contiene la implementación preparada para integrarse en `main`.

## Secreto necesario

Crear en GitHub Actions el secreto:

```text
OPENAI_API_KEY
```

El modelo se configura en el workflow como `gpt-5.6-luna` por coste y volumen. Puede sustituirse mediante `OPENAI_MODEL` si la política de modelos del proyecto cambia.

OpenAI documenta Structured Outputs para obtener JSON conforme a un esquema y la Responses API como la vía actual para las llamadas de generación. Para esta tarea usamos `store: false` porque el monitor no necesita conservar el estado de la respuesta en OpenAI. citeturn930838search0turn930838search3turn930838search5turn930838search6

## Fuentes y mercados

La primera capa prioriza fuentes gubernamentales y consulares de:

- España
- Reino Unido
- Estados Unidos
- fuentes gubernamentales del propio destino

El registro inicial contempla además España, México, Argentina, Colombia, Chile, Perú, Brasil, Estados Unidos, Reino Unido, Canadá, Australia, Alemania, Francia, Italia, Países Bajos y Portugal como mercados objetivo para ampliar progresivamente la capa de requisitos por nacionalidad.

La existencia de un mercado no implica que sus requisitos migratorios ya estén automatizados. Para eso necesitamos una fuente oficial adecuada para cada nacionalidad/destino o una fuente de datos de visados con licencia.

## Qué debe entrar en la capa automática

La prioridad es detectar:

- carreteras cerradas o con restricciones
- inundaciones, lluvias intensas, deslizamientos y otros riesgos meteorológicos
- actividad volcánica y cierres de parques
- aeropuertos, fronteras y transporte afectados
- cambios de visado, permisos o requisitos de entrada
- alertas sanitarias oficiales
- huelgas o restricciones operativas con impacto real
- cambios en recomendaciones consulares

Una noticia genérica o un artículo turístico no se convierte automáticamente en una alerta.

## Escalado recomendado

La evolución natural del sistema es:

```text
Nivel 1 — fuentes oficiales + alertas diarias
Nivel 2 — requisitos de entrada por nacionalidad
Nivel 3 — clima y transporte casi en tiempo real mediante APIs
Nivel 4 — personalización según el itinerario del viajero
Nivel 5 — notificaciones durante el viaje
```

En una fase posterior podemos añadir APIs meteorológicas, datos de carreteras, aeropuertos y fuentes de fronteras. Es preferible integrarlas mediante feeds o APIs oficiales antes que raspar redes sociales.
