# Landing de Kairu

Implementación de `KAIRU_LANDING.md` sobre Laravel, Inertia y React. La landing funciona sin base de datos: el formulario envía directamente por correo y no guarda consultas. Los textos y las opciones se centralizan en `resources/js/lib/kairu.ts`; los componentes están en `resources/js/components/kairu/` y la página en `resources/js/pages/welcome.tsx`.

## Configurar el contacto

Las variables ya están incluidas en `.env` y `.env.example`:

```dotenv
KAIRU_URL="${APP_URL}"
KAIRU_CONTACT_EMAIL=
KAIRU_WHATSAPP=
KAIRU_INSTAGRAM=
KAIRU_FACEBOOK=
KAIRU_TIKTOK=
KAIRU_LINKEDIN=
```

- `KAIRU_URL`: URL pública HTTPS del sitio, utilizada en canonical, Open Graph, robots y sitemap. En producción, define también `APP_URL` con el dominio real.
- `KAIRU_CONTACT_EMAIL`: correo visible y destinatario de las consultas.
- `KAIRU_WHATSAPP`: número completo con código de país, sin espacios ni `+`. También se normaliza en el servidor.
- Redes sociales: enlaces HTTPS completos. Solo se muestran las redes configuradas.

Si el número está vacío, los botones llevan al formulario. Si el correo está vacío, el formulario muestra un error y conserva los campos; nunca confirma un envío que no se realizó. Después de cambiar `.env`, ejecuta `php artisan config:clear` en desarrollo o `php artisan config:cache` en producción. No hace falta recompilar JavaScript.

## Formulario y correo

```dotenv
SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync
MAIL_MAILER=smtp
```

Estas opciones ya están configuradas en `.env` y `.env.example`. Las sesiones y los contadores de intentos utilizan archivos locales de Laravel, sin registrar el contenido de las consultas. No se necesitan migraciones, un servidor de base de datos ni un proceso de colas. `composer setup` no crea ni migra bases de datos, y `composer dev` no inicia trabajadores de colas.

Configura `KAIRU_CONTACT_EMAIL`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD` y `MAIL_FROM_ADDRESS` con tu proveedor SMTP. El correo se envía durante la solicitud; el formulario confirma el resultado cuando el transportador lo acepta. Si falta el destinatario o falla el servicio, devuelve un error y conserva los datos en pantalla para reintentar. No hay almacenamiento de consultas ni reintentos en segundo plano.

El formulario conserva validación en cliente y servidor, protección CSRF, un campo trampa y un límite de cinco intentos por minuto e IP. Las rutas públicas omiten la consulta de usuarios y equipos, incluso cuando existe una cookie de sesión anterior.

## Desarrollo y producción

```sh
composer dev
```

Para compilar y activar el HTML generado en el servidor:

```sh
npm run build:ssr
php artisan inertia:start-ssr
```

En producción, mantener SSR con el supervisor de procesos del servidor. Servir únicamente el directorio `public/`, usar HTTPS y `APP_DEBUG=false`. El renderizado SSR hace que los textos estén presentes en la respuesta HTML inicial. Inertia conserva el renderizado en cliente si SSR no está disponible.

Apache: `public/.htaccess` habilita compresión y caché cuando están disponibles `mod_deflate` y `mod_headers`. Para Nginx, integrar estas directivas en el bloque del sitio, junto con la configuración habitual de Laravel y PHP-FPM:

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css application/javascript application/json application/xml image/svg+xml;

location /build/assets/ {
    try_files $uri =404;
    add_header Cache-Control "public, max-age=31536000, immutable";
}

location ~* \.(woff2|png|ico|svg|webmanifest)$ {
    try_files $uri =404;
    add_header Cache-Control "public, max-age=86400";
}
```

El servidor de desarrollo de PHP no aplica `.htaccess`, compresión ni caché a archivos estáticos. Las mediciones de rendimiento deben hacerse con la compilación de producción, SSR y la configuración real de entrega de archivos.

## Marca y contenido

Se conserva el logo original en `public/kairu-logo.svg`. La variante encuadrada, los iconos y la imagen social de 1200 × 630 están en `public/brand/`. Inter se sirve localmente desde `public/fonts/`, sin peticiones a proveedores de fuentes.

Las tres demos son interfaces interactivas con datos de ejemplo, identificadas expresamente como tales. No se presentan como clientes o casos reales. El usuario puede explorar secciones y detalles dentro de cada demo. Sustituirlas por casos verificables cuando estén disponibles.

El sitio incluye navegación por teclado, menú móvil y diálogos con gestión del foco, errores asociados a cada campo y soporte para `prefers-reduced-motion`. La comprobación con emulación móvil no sustituye una revisión final en dispositivos físicos.

La dirección visual sigue la referencia de estudio: navegación compacta, hero centrado, fondo claro, botones azules redondeados y una composición de web, sistema de gestión y aplicación móvil sobre cuadrícula. Los iconos se agrupan con cada servicio del título y no se muestra una etiqueta promocional encima. Las interfaces ilustrativas aparecen por capas mediante una secuencia Anime.js en `use-landing-motion.ts`; se pausa fuera de pantalla y respeta la preferencia de movimiento reducido. Las secciones, demos y formulario conservan su funcionalidad.

## Verificación

```sh
npm run types:check
node_modules/.bin/vp lint
php artisan test
vendor/bin/phpstan analyse --memory-limit=1G
```

Las pruebas de `tests/Feature/ContactInquiryTest.php` se ejecutan con una conexión de base de datos no disponible. Cubren envío directo sin colas, campos opcionales, validación, spam, límite de intentos, fallos de correo, destinatario ausente, sesiones anteriores, configuración pública, sitemap y robots. Los correos de prueba se interceptan localmente.

Verificación local del 27 de septiembre de 2026:

- 102 pruebas PHP aprobadas; PHPStan, TypeScript y lint sin errores.
- Compilaciones de cliente y SSR completadas.
- Navegador: 375, 768, 1024, 1280 y 1440 px sin desbordamiento horizontal; menú, foco, Escape, demos, movimiento reducido y estados del formulario verificados.
- Formulario probado con `DB_CONNECTION=unavailable` y un receptor SMTP exclusivo de localhost: correo recibido, confirmación visible y campos limpiados. También se comprobó que un destinatario ausente devuelve error y conserva lo escrito.
- Lighthouse móvil, con SSR y una vista previa local que aplica gzip y caché equivalentes a las directivas anteriores: rendimiento **93**, accesibilidad **100**, buenas prácticas **100**, SEO **100**. Son mediciones locales; repetir sobre el dominio y servidor definitivos.

La demo del hero muestra escritorio, MacBook y móvil con un estado compartido: ventas, pedidos e inventario. Cambia cada 6,5 segundos; los tres dispositivos permanecen sincronizados. No muestra controles, etiquetas promocionales ni marco exterior; se detiene fuera de pantalla, con la pestaña oculta o con movimiento reducido. Usa datos locales de ejemplo, sin base de datos.

La entrada inicial (`code-intro.tsx`) escribe un fragmento ilustrativo con Anime.js y revela la landing en 2,4 segundos. Se puede saltar con el botón o Escape; se omite con movimiento reducido y enlaces a secciones. El contenido se entrega visible desde el servidor y solo queda temporalmente inerte durante la introducción JavaScript. Un límite de cuatro segundos garantiza su liberación.

Los módulos se superponen con un fundido de opacidad de 700 ms, sin desplazamientos. Los dispositivos ocupan una cuadrícula en el flujo del documento para que la separación inferior respete su altura. Verificado sin desbordamiento horizontal y con espacio hasta la divisoria entre 320 y 1920 px.

Los proyectos se presentan en `/proyectos`, una página pública independiente con las demos interactivas, metadatos canónicos y entrada en el sitemap. El menú y el hero enlazan a esa página; desde ella se vuelve a las secciones de la landing. La ruta no consulta la base de datos ni usa el layout autenticado. “A tu ritmo” mantiene su estructura y cinco etapas; proceso, nosotros, CTA y contacto comparten la tipografía, bordes y acentos azules del diseño.

El formulario muestra validaciones junto a los campos y un contador de caracteres, sin lista de requisitos. Valida nombre, correo, servicio, mensaje y WhatsApp opcional antes de enviar; WhatsApp admite 7–15 dígitos tanto en cliente como en servidor. Los errores y la confirmación entran con Anime.js (200 ms), respetando movimiento reducido. Se bloquean envíos simultáneos y se conservan los datos si falla el envío. Los flujos de éxito/error se verificaron con respuestas interceptadas, sin enviar correo real.

Tras una respuesta de envío exitosa, `sent-confirmation.tsx` muestra un panel azul dentro del recuadro del formulario con avión de papel y verificación animados con Anime.js. Conserva la altura del formulario y deja libre el resto de la página; «Enviar otra consulta» restaura los campos y el foco. Con movimiento reducido muestra la confirmación estática. Los fallos mantienen el formulario y sus datos. El selector de servicio usa posicionamiento con detección de bordes y resaltado de foco contenido.

El footer conserva un fondo liso sin cuadrícula, con columnas adaptadas a escritorio, tablet y móvil. La cuadrícula permanece en las otras secciones.

Los correos de consulta usan las vistas `mail/contact-inquiry` y `mail/contact-inquiry-text`, con logo PNG incrustado por CID, colores Kairu y acciones de respuesta. El número y el botón WhatsApp enlazan a `wa.me` con solo dígitos; los móviles peruanos de nueve dígitos que comienzan en 9 reciben el prefijo 51 y los internacionales conservan el suyo. La respuesta del cliente de correo se dirige al email del visitante mediante Reply-To. Los datos opcionales vacíos se omiten y el mensaje se escapa preservando saltos de línea. Validado mediante renderizado local y pruebas; no se enviaron correos reales.


### Reseñas y navegación

Las reseñas se configuran en `resources/js/lib/reviews.ts`, sin base de datos. Agrega comentarios reales autorizados a `clientReviews` con nombre, comentario y empresa opcional. Mientras esté vacío, se muestran tres ejemplos identificados como tales; al cargar reseñas reales, los ejemplos y el aviso desaparecen.

El menú incluye Servicios, Proyectos, Nosotros y Reseñas. A tu ritmo se conserva como sección, sin enlace en el menú. La sección activa se actualiza al desplazarse. Desde `/proyectos`, los enlaces de sección regresan a la landing y se alinean con el encabezado fijo, también en móvil.
