// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.cruzandomeridianos.com',
  output: 'server',
  integrations: [
    sitemap({
      // Las páginas de contenido dinámico se renderizan en servidor y no
      // forman parte del listado estático del sitemap. Las declaramos aquí
      // para que también puedan descubrirse desde buscadores.
      customPages: [
        'https://www.cruzandomeridianos.com/viajes/costa-rica',
        'https://www.cruzandomeridianos.com/nuestros-viajes/costa-rica',
        'https://www.cruzandomeridianos.com/viajes/costa-rica/mejor-epoca',
        'https://www.cruzandomeridianos.com/viajes/costa-rica/parques-nacionales',
        'https://www.cruzandomeridianos.com/viajes/costa-rica/alquilar-coche',
        'https://www.cruzandomeridianos.com/viajes/costa-rica/caribe-o-pacifico',
        'https://www.cruzandomeridianos.com/viajes/costa-rica/cuanto-tiempo',
      ],
    }),
  ],
  adapter: cloudflare(),
});
