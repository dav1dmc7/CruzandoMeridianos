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

El workflow debe ejecutarse en `main` para formar parte de la producción. Esta rama de funcionalidad está creada desde `main` para poder integrarla sin mezclar la rama antigua de auditoría con los cambios locales que siguen en tu Mac.

## Secreto necesario

Crear en GitHub Actions el secreto:

```text
OPENAI_API_KEY
```

El workflow usa `gpt-5.6-luna` por coste y volumen. Puede sustituirse con `OPENAI_MODEL` si cambia la política de modelos.

OpenAI documenta Structured Outputs para obtener JSON conforme a un esquema y la Responses API como vía actual para llamadas de generación; el monitor usa `store: false` porque no necesita conservar la respuesta en OpenAI. citeturn930838search0turn930838search3turn930838search5turn930838search6

## Fuentes y mercados

La primera capa prioriza fuentes gubernamentales y consulares de España, Reino Unido y Estados Unidos, además de organismos oficiales del propio destino.

El registro inicial contempla España, México, Argentina, Colombia, Chile, Perú, Brasil, Estados Unidos, Reino Unido, Canadá, Australia, Alemania, Francia, Italia, Países Bajos y Portugal como mercados objetivo para ampliar progresivamente la capa de requisitos por nacionalidad.

Que un mercado figure como objetivo no significa que todos sus requisitos migratorios estén ya automatizados. Para eso necesitamos una fuente oficial adecuada para cada nacionalidad/destino o una fuente de datos de visados con licencia.

## Qué debe entrar en la capa automática

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

```text
Nivel 1 — fuentes oficiales + alertas diarias
Nivel 2 — requisitos de entrada por nacionalidad
Nivel 3 — clima y transporte casi en tiempo real mediante APIs
Nivel 4 — personalización según el itinerario del viajero
Nivel 5 — notificaciones durante el viaje
```

En una fase posterior podemos integrar APIs meteorológicas, carreteras, aeropuertos y fronteras. Es preferible usar APIs o feeds oficiales antes que depender de redes sociales o scraping frágil.
