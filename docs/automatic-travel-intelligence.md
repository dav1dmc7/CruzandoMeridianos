# Inteligencia de viaje automática

Cruzando Meridianos puede mantener una capa de actualidad diaria sin convertir la IA en una autoridad factual y sin depender de servicios de pago.

## Flujo actual sin coste

```text
Fuentes oficiales
      ↓
GitHub Actions (diario)
      ↓
fetch + huella de contenido
      ↓
reglas deterministas de detección
      ↓
alertas estructuradas con cita de la fuente
      ↓
src/data/live/travel-intelligence.generated.ts
      ↓
guide registry
      ↓
/viajes/<destino>
```

La monitorización descarga únicamente las fuentes configuradas, calcula una huella para detectar cambios y busca señales explícitas relacionadas con carreteras, clima, transporte, entrada, seguridad, salud, parques y actividad volcánica. El sistema no inventa información ni necesita una API de IA para funcionar.

## Coste

El proyecto es público, por lo que los runners estándar de GitHub Actions son gratuitos e ilimitados. El monitor no utiliza una API de IA de pago, así que esta capa no requiere API key ni método de pago. citeturn937986search0turn937986search3

La aplicación existente sigue pudiendo funcionar sobre los servicios gratuitos de Cloudflare dentro de sus límites; Workers Free y D1 Free incluyen cuotas diarias sin necesidad de pasar al plan de pago. citeturn937986search2turn937986search5

## Frecuencia

El workflow `.github/workflows/travel-intelligence.yml` se programa diariamente y también puede ejecutarse manualmente.

El workflow debe ejecutarse en `main` para formar parte de producción. Esta rama de funcionalidad está creada desde `main` para mantenerla aislada de cambios locales que todavía no se han subido.

## Fuentes y mercados

La primera capa prioriza fuentes gubernamentales y consulares de España, Reino Unido y Estados Unidos, además de organismos oficiales del propio destino.

El registro inicial contempla España, México, Argentina, Colombia, Chile, Perú, Brasil, Estados Unidos, Reino Unido, Canadá, Australia, Alemania, Francia, Italia, Países Bajos y Portugal como mercados objetivo para ampliar progresivamente la capa de requisitos por nacionalidad.

Que un mercado figure como objetivo no significa que todos sus requisitos migratorios estén ya automatizados. Para eso necesitamos una fuente oficial adecuada para cada nacionalidad y destino.

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

## Limitación deliberada

La capa gratuita actual detecta cambios mediante reglas y extrae las frases de la fuente que activan esas reglas. Es más conservadora que una IA generativa y puede producir falsos positivos o perder acontecimientos expresados de una forma inesperada.

Esto es intencionado: mientras el proyecto no tenga ingresos, preferimos un sistema gratuito y trazable antes que introducir una dependencia de pago o publicar un resumen generado por IA sin poder asumir su coste.

## Escalado recomendado

```text
Nivel 1 — fuentes oficiales + alertas diarias                 ← actual
Nivel 2 — requisitos de entrada por nacionalidad
Nivel 3 — clima y transporte casi en tiempo real mediante APIs
Nivel 4 — personalización según el itinerario del viajero
Nivel 5 — notificaciones durante el viaje
Nivel 6 — IA opcional cuando exista presupuesto
```

Cuando haya ingresos, podemos añadir una capa de IA que clasifique y redacte mejor los cambios detectados. Esa IA será una herramienta interna de Cruzando Meridianos, no el producto que se vende al cliente.
