# Cruzando Meridianos — Web

Sitio web de **Cruzando Meridianos**, proyecto especializado en el diseño de viajes a medida.

La web está planteada como una herramienta editorial y comercial para mostrar destinos, investigación, experiencia real y metodología de trabajo, y para captar solicitudes de diseño de viajes personalizados.

## Stack

* [Astro](https://astro.build/)
* TypeScript
* Cloudflare Workers
* Cloudflare D1
* Cloudflare KV
* Cloudflare Images
* Cloudflare Sessions
* Resend
* Git / GitHub

## Requisitos

* Node.js `>=22.12.0`
* npm

La versión de Node requerida está definida en `package.json`.

## Desarrollo local

Instalar dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Por defecto, Astro utiliza:

```text
http://localhost:4321
```

## Comprobaciones

Comprobar tipos y errores de Astro:

```bash
npx astro check
```

Generar tipos de Astro:

```bash
npx astro sync
```

Crear el build de producción:

```bash
npm run build
```

Previsualizar el build:

```bash
npm run preview
```

## Arquitectura

La aplicación utiliza Astro con salida `server` y el adaptador oficial de Cloudflare.

Estructura principal:

```text
/
├── migrations/
│   ├── 0001_create_travel_requests.sql
│   └── 0002_add_transport.sql
│
├── public/
│   ├── brujula.png
│   ├── email-logo.png
│   ├── isotipo.svg
│   ├── logo.svg
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── costa-rica/
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── travel/
│   │
│   ├── data/
│   │   ├── guides/
│   │   ├── our-trips/
│   │   ├── resources/
│   │   └── destinations.ts
│   │
│   ├── layouts/
│   │   └── Layout.astro
│   │
│   ├── pages/
│   │   ├── api/
│   │   ├── nuestros-viajes/
│   │   ├── como-trabajamos.astro
│   │   ├── contacto.astro
│   │   ├── cuentatuviaje.astro
│   │   ├── index.astro
│   │   └── viajes/
│   │
│   └── styles/
│       └── global.css
│
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── wrangler.jsonc
```

## Destinos

La información editorial de los destinos se mantiene separada de las páginas.

```text
src/data/destinations.ts
```

Este archivo contiene los datos generales de cada destino.

Las guías utilizan un sistema independiente:

```text
src/data/guides/
```

Actualmente existe una guía desarrollada para Costa Rica.

La guía incluye información como:

* investigación editorial
* fuentes oficiales
* requisitos del viajero
* regiones
* experiencias
* naturaleza
* transporte
* preguntas frecuentes
* alertas
* estado editorial
* fecha de revisión

La arquitectura permite añadir nuevos destinos sin convertir las páginas en archivos monolíticos de contenido.

## Nuestros viajes

La experiencia propia se mantiene separada de la información editorial:

```text
src/data/our-trips/
```

Esta capa permite distinguir entre:

* lugares realmente visitados
* lugares planificados pero no visitados
* información pendiente de verificar
* experiencia propia
* fuentes externas

El objetivo es no presentar una recomendación editorial como si fuera necesariamente experiencia personal.

## Recursos para viajar

Los recursos comerciales y de utilidad para viajeros se mantienen separados:

```text
src/data/resources/
```

El sistema está preparado para gestionar:

* categoría
* proveedor
* URL
* enlace de recomendación o afiliación
* estado
* destinos relevantes
* fecha de revisión
* ventajas
* limitaciones
* disclosure

Los recursos pueden mostrarse de forma global o contextual dentro de determinadas guías.

Los enlaces de recomendación o afiliación deben identificarse de forma transparente y no deben incorporarse enlaces comerciales sin verificar previamente que el programa y sus condiciones sean válidos.

## Formulario de viaje

La solicitud de viaje se gestiona mediante:

```text
src/pages/cuentatuviaje.astro
```

El formulario envía los datos a:

```text
POST /api/travel-request
```

La API:

1. valida los datos recibidos
2. normaliza la información
3. guarda la solicitud en Cloudflare D1
4. envía las notificaciones mediante Resend
5. devuelve el resultado al formulario

La persistencia en D1 se realiza antes del envío de correo para evitar perder una solicitud si el proveedor de correo falla.

## API y datos

Endpoint principal:

```text
src/pages/api/travel-request.ts
```

Base de datos:

```text
cruzandomeridianos-leads
```

Migraciones:

```text
migrations/
```

Cuando se añadan cambios de esquema a D1, deben incorporarse mediante una nueva migración en lugar de modificar una migración ya aplicada.

## Cloudflare

La configuración de despliegue está en:

```text
wrangler.jsonc
```

El proyecto utiliza actualmente bindings para:

* `SESSION`
* D1 (`cruzandomeridianos-leads`)
* `IMAGES`
* `ASSETS`

No deben almacenarse credenciales ni secretos en el repositorio.

## Variables y secretos

Las credenciales y secretos utilizados por servicios externos deben gestionarse mediante la configuración de Cloudflare/Wrangler correspondiente.

En particular, no deben versionarse:

* API keys
* tokens
* credenciales
* secretos de servicios externos

## Despliegue

Antes de desplegar:

```bash
npm run build
```

Si el build es correcto:

```bash
npx wrangler deploy
```

Después del despliegue conviene verificar las rutas principales y el funcionamiento del formulario.

## Flujo de trabajo recomendado

Para cambios de arquitectura o funcionalidad:

```text
1. Crear o cambiar código
2. npx astro check
3. npm run build
4. Revisar git diff
5. Commit
6. Push
7. Deploy
8. Verificar producción
```

Los cambios grandes deben dividirse en bloques pequeños y verificables.

## Principios del proyecto

Cruzando Meridianos no pretende funcionar como un catálogo genérico de viajes.

La propuesta se basa en:

* investigación
* experiencia
* criterio
* contexto
* transparencia sobre las fuentes
* diferenciación entre hechos y opinión
* diferenciación entre experiencia propia e información externa

La web pública debe demostrar la calidad de ese proceso sin sustituir el servicio personalizado de diseño de viajes.

## Dominio

Sitio público:

```text
https://www.cruzandomeridianos.com/
```

Repositorio:

```text
https://github.com/dav1dmc7/CruzandoMeridianos
```
