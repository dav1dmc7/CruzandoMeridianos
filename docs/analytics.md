# Analítica de negocio

La web registra únicamente eventos de interacción necesarios para medir el funnel de conversión. No se almacena la IP del visitante ni datos personales del formulario en `analytics_events`.

## Eventos

- `cta_travel_request`: clic en cualquier CTA que lleva a `/cuentatuviaje`.
- `travel_form_start`: primera interacción con el formulario.
- `travel_form_step`: avance desde cada paso del formulario.
- `travel_form_submit`: envío del formulario.
- `interaction`: evento genérico disponible mediante `data-track`.

## Atribución

Cuando existen, se conservan `utm_source`, `utm_medium` y `utm_campaign`, además de la ruta y el origen reducido a origen + pathname del referrer.

## Operación

Antes de desplegar la nueva versión hay que aplicar la migración D1 `0004_create_analytics_events.sql` sobre `cruzandomeridianos-leads`.
