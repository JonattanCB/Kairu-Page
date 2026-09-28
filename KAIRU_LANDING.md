# KAIRU — LANDING PAGE MASTER BRIEF

## Objetivo

Desarrollar la landing page oficial de **Kairu**, una empresa de desarrollo de software ubicada en Chimbote, Áncash, Perú.

La página no debe sentirse como una plantilla genérica de startup ni como una web creada enteramente por IA.

Debe transmitir que Kairu es una empresa real, moderna, técnica, minimalista, profesional y cuidadosa con los pequeños detalles.

La web debe comunicar de forma clara:

- Qué hace Kairu
- Cómo trabaja
- Qué servicios ofrece
- Qué filosofía tiene
- Qué tipo de soluciones desarrolla
- Por qué su software busca simplificar el trabajo de las empresas
- Cómo contactar con Kairu

---

# 1. MARCA

## Nombre

Kairu

## Tipo de empresa

Empresa de desarrollo de software.

## Ubicación

Chimbote, Áncash, Perú.

## Concepto principal

Kairu desarrolla:

- Sistemas empresariales
- Aplicaciones móviles
- Plataformas web
- Software a medida
- Soluciones digitales
- Automatización de procesos
- Integraciones empresariales

## Filosofía

La tecnología debe facilitar el trabajo, no agregar complejidad.

El software debe adaptarse al negocio y no obligar al negocio a adaptarse al software.

Kairu busca crear herramientas que puedan comenzar resolviendo una necesidad concreta y evolucionar conforme el negocio crece.

## Mensaje principal

**Software que hace el trabajo más simple.**

## Personalidad de marca

La marca debe sentirse:

- Minimalista
- Moderna
- Profesional
- Precisa
- Tecnológica
- Sobria
- Humana
- Detallista
- Ordenada
- Confiable

## Evitar

No utilizar:

- Estética futurista exagerada
- Robots
- Cerebros de inteligencia artificial
- Circuitos
- Hologramas
- Exceso de gradientes
- Morado típico de startups IA
- Glassmorphism excesivo
- Partículas flotantes
- Animaciones innecesarias
- Efectos exagerados
- Exceso de tarjetas
- Demasiados colores
- Interfaces saturadas
- Frases corporativas genéricas

Evitar textos como:

- “Transformamos tus ideas en soluciones digitales”
- “Innovamos el futuro”
- “Revolucionamos la tecnología”
- “Potenciamos tu negocio con IA”

Kairu debe sentirse más como una empresa de producto e ingeniería que como una agencia genérica.

---

# 2. IDENTIDAD VISUAL

## Logo

Utilizar el isotipo geométrico oficial de Kairu.

El símbolo principal representa una **K geométrica**.

Características:

- Azul intenso
- Parte superior izquierda en azul oscuro o negro
- Diseño geométrico
- Minimalista
- Sin círculo alrededor
- Sin efectos 3D
- Sin sombras fuertes

## Uso del logo

### Header

Mostrar:

[K] kairu

El isotipo a la izquierda y el nombre `kairu` en minúsculas.

### Favicon

Usar solamente el isotipo K.

### Redes sociales

Usar la K sola para avatar o foto de perfil.

### Footer

Puede utilizarse nuevamente:

[K] kairu

---

# 3. PALETA DE COLORES

## Primary

`#245BFF`

Uso:

- CTA principal
- Links
- Detalles
- Indicadores
- Elementos importantes
- Palabras resaltadas

## Primary Hover

`#1948D8`

## Primary Soft

`#EEF3FF`

## Primary Light

`#F5F7FF`

## Heading

`#0B1220`

## Dark

`#111827`

## Text

`#374151`

## Muted

`#6B7280`

## Border

`#E5E7EB`

## Background

`#FAFAF8`

## Surface

`#FFFFFF`

## Distribución visual aproximada

- 70% blanco y neutros
- 20% negro y grises
- 10% azul Kairu

El azul debe utilizarse como acento.

No llenar toda la web de azul.

---

# 4. VARIABLES CSS

```css
:root {
    --color-primary: #245bff;
    --color-primary-hover: #1948d8;
    --color-primary-soft: #eef3ff;
    --color-primary-light: #f5f7ff;

    --color-heading: #0b1220;
    --color-dark: #111827;
    --color-text: #374151;
    --color-muted: #6b7280;

    --color-border: #e5e7eb;
    --color-background: #fafaf8;
    --color-surface: #ffffff;
}
```

5. TIPOGRAFÍA
   Usar:
   Inter
   Fallback:
   font-family:
   "Inter",
   -apple-system,
   BlinkMacSystemFont,
   "Segoe UI",
   sans-serif;

Pesos

- 400 Regular
- 500 Medium
- 600 SemiBold
- 700 Bold
  No abusar de 700.
  Evitar 800 y 900 salvo que exista una razón muy específica.

6. ESCALA TIPOGRÁFICA
   Desktop

- Hero H1: 64px
- H2: 44px
- H3: 24px
- Body Large: 20px
- Body: 16px
- Small: 14px
  Mobile
- Hero H1: 42px
- H2: 32px
- H3: 21px
- Body Large: 18px
- Body: 16px
- Small: 14px
  Hero
  Máximo:
  max-width: 760px;

Los títulos deben ser grandes pero no exagerados. 7. ESPACIADO
Utilizar una escala consistente:

- 4px
- 8px
- 12px
- 16px
- 24px
- 32px
- 48px
- 64px
- 80px
- 96px
- 120px
  Secciones
  Desktop:
  padding-block: 96px;

Mobile:
padding-block: 64px;

Container
max-width: 1200px;
margin: 0 auto;
padding-inline: 24px;

8. BORDES Y RADIOS
   Botones
   10px a 12px
   Cards
   16px
   Mockups
   20px a 24px
   Inputs
   10px
   Evitar que todos los elementos sean excesivamente redondeados.
9. SOMBRAS
   Usar sombras muy suaves.
   Ejemplo:
   box-shadow:
   0 1px 2px rgba(15, 23, 42, 0.04),
   0 8px 30px rgba(15, 23, 42, 0.06);

Evitar:

- sombras negras fuertes
- glow
- neon
- sombras azules exageradas

10. HEADER
    Debe ser sticky.
    Desktop
    Estructura:
    [K] kairu

- Inicio
- Soluciones
- Servicios
- Nosotros
- Contacto
  Botón:
  Hablemos
  Altura
  72px
  Estado inicial
  background: transparent;

Al hacer scroll
background: rgba(255,255,255,.88);
backdrop-filter: blur(16px);
border-bottom: 1px solid #E5E7EB;

Mobile
Mostrar:
[K] kairu ☰
Crear un menú limpio.
Puede ser:

- dropdown
- drawer lateral
- panel móvil
  No usar un menú exagerado.

11. HERO
    Esta es la sección más importante.
    Eyebrow
    Software · Aplicaciones · Soluciones digitales
    H1
    Software que hace el trabajo más simple.
    Resaltar:
    simple
    con color:
    #245BFF
    Descripción
    Creamos sistemas, aplicaciones y soluciones digitales que se adaptan a la forma en que trabaja tu negocio y pueden evolucionar contigo.
    CTA principal
    Cuéntanos qué necesitas
    CTA secundario
    Conoce Kairu
    Visual
    Mostrar:

- laptop
- smartphone
- dashboard empresarial
- interfaz limpia
- datos ordenados
  El dashboard puede mostrar:
- Ventas
- Clientes
- Pedidos
- Inventario
- Reportes
  No utilizar:
- código flotando
- terminales
- números binarios
- hologramas
- imágenes genéricas de programación
  La idea es mostrar software siendo utilizado.

12. FRANJA DE CAPACIDADES
    Debajo del hero puede mostrarse una línea discreta con:

- Web
- Mobile
- Desktop
- Automatización
  Sin logos falsos de empresas.
  Sin estadísticas inventadas.

13. FILOSOFÍA
    Eyebrow
    Nuestra forma de pensar
    Título
    La tecnología debería ayudarte, no complicarte.
    Texto
    En Kairu creemos que un buen software no termina cuando se entrega. Evoluciona junto al negocio, se adapta a nuevas necesidades y se convierte en una herramienta que facilita el trabajo diario.
    Principios
    Simple
    Menos pasos, menos fricción y herramientas fáciles de entender.
    Adaptable
    Empieza con lo que necesitas y evoluciona conforme tu negocio crece.
    Cuidado
    Cada interacción, pantalla y detalle tiene una razón de existir.
14. SERVICIOS
    Título
    Construimos herramientas para trabajar mejor.
    Mostrar cuatro servicios principales.
    Sistemas empresariales
    Ventas, inventarios, clientes, operaciones, reportes y administración.
    Desarrollo web
    Plataformas empresariales y aplicaciones web rápidas, modernas y adaptables.
    Aplicaciones móviles
    Aplicaciones para clientes, colaboradores y operaciones internas.
    Software a medida
    Soluciones construidas alrededor de los procesos reales de cada empresa.
    Iconos
    Usar Lucide Icons.
    No usar emojis.
    Los iconos deben ser:

- lineales
- discretos
- consistentes
- simples

15. SECCIÓN DE CRECIMIENTO
    Fondo:
    #F5F7FF
    Título
    Empieza con lo que necesitas hoy. Crece cuando estés listo.
    Texto
    No necesitas construir todo desde el primer día. Una solución puede comenzar resolviendo una necesidad concreta y evolucionar conforme tu empresa avance.
    Visual
    Mostrar una progresión:
    Inicio
    ↓
    Sistema base
    ↓
    Nuevas funciones
    ↓
    Integraciones
    ↓
    Automatización
    Debe verse como una evolución natural.
    No usar una timeline demasiado compleja.
16. PROCESO DE TRABAJO
    Título
    De una necesidad a una herramienta que realmente uses.
    Paso 01
    Entendemos
    Primero conocemos cómo funciona actualmente tu negocio.
    Paso 02
    Diseñamos
    Buscamos la forma más sencilla de resolver el problema.
    Paso 03
    Construimos
    Desarrollamos una solución clara, rápida y escalable.
    Paso 04
    Lanzamos
    Implementamos el software y acompañamos su adopción.
    Paso 05
    Evolucionamos
    Incorporamos nuevas capacidades cuando realmente sean necesarias.
17. PROYECTOS
    No inventar clientes.
    No inventar métricas.
    No inventar logos.
    Mostrar proyectos propios, demos o casos reales únicamente si existen.
    Proyecto 1
    Sistema de distribución
    Aplicación móvil + panel administrativo para gestionar pedidos y operaciones.
    Proyecto 2
    Plataforma educativa
    Gestión de alumnos, clases, contenido y administración.
    Proyecto 3
    Sistema comercial
    Ventas, clientes, inventarios y reportes centralizados.
    Diseño
    Cada proyecto puede mostrar:

- mockup
- nombre
- descripción
- tipo de solución
- tecnologías en pequeño
  No convertir tecnologías en el elemento principal.
  Primero mostrar el problema y la solución.

18. SOBRE KAIRU
    Título
    Software construido desde Perú.
    Texto
    Kairu nace en Chimbote con una idea sencilla: crear software que facilite el trabajo de las personas.
    Segundo texto
    Diseñamos y desarrollamos sistemas cuidando tanto la ingeniería como la experiencia de quien los utilizará todos los días.
    Ubicación
    Mostrar discretamente:

- Chimbote
- Áncash
- Perú

19. CTA FINAL
    Fondo:
    #245BFF
    Texto blanco.
    Título
    ¿Hay algo en tu negocio que podría funcionar mejor?
    Descripción
    Cuéntanos cómo trabajas actualmente y veamos cómo podemos simplificarlo.
    Botón
    Conversemos
    El botón puede dirigir inicialmente a WhatsApp.
20. CONTACTO
    Campos

- Nombre
- Empresa
- Correo
- WhatsApp
- ¿Qué necesitas?
- Mensaje
  CTA
  Enviar mensaje
  Estados
  Crear:
- idle
- loading
- success
- error
  Nunca dejar el formulario sin feedback.
  Mensajes
  Loading
  Enviando...
  Success
  Mensaje enviado correctamente.
  Error
  No pudimos enviar el mensaje. Intenta nuevamente.

21. WHATSAPP FLOTANTE
    Agregar botón discreto abajo a la derecha.
    Tooltip:
    Hablar con Kairu
    No debe:

- tapar contenido
- ser demasiado grande
- tener animaciones constantes
  En móvil debe respetar safe areas.

22. FOOTER
    Mostrar:
    [K] kairu
    Texto:
    Software pensado para hacer el trabajo más simple.
    Sección Servicios

- Sistemas empresariales
- Desarrollo web
- Aplicaciones
- Software a medida
  Sección Empresa
- Nosotros
- Proyectos
- Contacto
  Ubicación
  Chimbote, Áncash, Perú.
  Texto final
  Diseñado y desarrollado en Perú.
  © 2026 Kairu.

23. ANIMACIONES
    Las animaciones deben ser suaves.
    Usar principalmente:

- opacity
- translateY
- scale muy pequeño
  Duración
  200ms a 500ms.
  Entrada en viewport
  opacity: 0;
  transform: translateY(16px);

a:
opacity: 1;
transform: translateY(0);

Evitar

- Bounce
- Rotate
- Flash
- Zoom exagerado
- Parallax fuerte
- Animaciones infinitas
- Elementos flotando sin razón

24. BOTONES
    Primary
    Background:
    #245BFF
    Hover:
    #1948D8
    Hover animation:
    transform: translateY(-1px);

Secondary
Puede ser:

- fondo blanco
- borde #E5E7EB
- texto oscuro
  Estados obligatorios
- default
- hover
- focus
- active
- disabled
- loading

25. INTERACCIONES
    Las interacciones deben sentirse rápidas.
    Duración recomendada:
    transition:
    color 200ms ease,
    background 200ms ease,
    border-color 200ms ease,
    transform 250ms ease,
    opacity 250ms ease;

26. RESPONSIVE
    Diseñar mobile first.
    Breakpoints de referencia

- 375px
- 768px
- 1024px
- 1280px
- 1440px
  Mobile
  Hero en una columna.
  Orden:

1. texto
2. botones
3. visual
   Cards apiladas.
   Menú hamburguesa.
   Botones full-width cuando tenga sentido.
   Evitar:

- texto demasiado pequeño
- contenido cortado
- scroll horizontal
- mockups gigantes

27. ACCESIBILIDAD
    Objetivo:
    WCAG AA
    Requisitos

- HTML semántico
- navegación por teclado
- focus visible
- contraste suficiente
- labels en formularios
- alt en imágenes
- aria solo cuando sea necesario
- no depender únicamente del color
  Estructura HTML
  Usar:
      <header>
      <nav>
      <main>
      <section>
      <footer>

Evitar divs innecesarios. 28. SEO
Title
Kairu | Desarrollo de software en Perú
Meta Description
Creamos sistemas, aplicaciones y soluciones digitales que simplifican la forma de trabajar de tu negocio.
Keywords

- desarrollo de software
- software Perú
- software Chimbote
- sistemas empresariales
- desarrollo de aplicaciones
- desarrollo web
- software a medida
- automatización de procesos
  OpenGraph
  Título:
  Kairu
  Descripción:
  Software pensado para hacer el trabajo más simple.
  Crear
- canonical
- OpenGraph
- Twitter Cards
- sitemap.xml
- robots.txt
- favicon

29. PERFORMANCE
    Objetivo:
    Lighthouse >= 90
    Optimizar

- imágenes
- scripts
- fuentes
- componentes
- dependencias
  Imágenes
  Preferir:
- WebP
- AVIF
  Usar lazy loading cuando corresponda.
  Evitar
- videos pesados en hero
- librerías enormes
- dependencias innecesarias
- animaciones pesadas

30. ESTRUCTURA DE COMPONENTES
    La página debe dividirse en componentes reutilizables.
    Ejemplo:
    components/
    Navbar
    Hero
    BrandStatement
    Services
    GrowthSection
    Process
    Projects
    About
    Contact
    FinalCTA
    Footer

ui/
Button
Container
SectionHeader
ServiceCard
Input
Textarea

No colocar toda la página en un único archivo. 31. DETALLES DE CALIDAD
Text selection
::selection {
background: #245BFF;
color: white;
}

Smooth scroll
html {
scroll-behavior: smooth;
}

Focus
:focus-visible {
outline: 2px solid #245BFF;
outline-offset: 3px;
}

No usar cursor personalizado. 32. EXPERIENCIA DE USUARIO
La página debe ser fácil de recorrer.
El usuario debe entender rápidamente:

1. qué es Kairu
2. qué problema resuelve
3. qué servicios ofrece
4. cómo trabaja
5. cómo contactarla
   Evitar textos largos innecesarios.
   Cada sección debe tener una función clara.
6. TONO DE COMUNICACIÓN
   Debe ser:

- directo
- claro
- profesional
- natural
- humano
- sobrio
  Evitar:
- exageraciones
- lenguaje corporativo artificial
- demasiadas palabras técnicas
- promesas imposibles
- frases de marketing vacías

34. EJEMPLOS DE COPY
    Hero
    Software que hace el trabajo más simple.
    Creamos sistemas, aplicaciones y soluciones digitales que se adaptan a la forma en que trabaja tu negocio y pueden evolucionar contigo.
    Filosofía
    La tecnología debería ayudarte, no complicarte.
    Servicios
    Construimos herramientas para trabajar mejor.
    Growth
    Empieza con lo que necesitas hoy. Crece cuando estés listo.
    Proceso
    De una necesidad a una herramienta que realmente uses.
    About
    Software construido desde Perú.
    CTA final
    ¿Hay algo en tu negocio que podría funcionar mejor?
35. NO INVENTAR INFORMACIÓN
    Muy importante.
    No inventar:

- clientes
- testimonios
- empresas
- estadísticas
- años de experiencia
- número de proyectos
- ingresos
- usuarios
- premios
- certificaciones
- partners
  Si no existe información real, simplemente no mostrarla.

36. FUTURA EXPANSIÓN
    La arquitectura debe permitir agregar posteriormente:

- Blog
- Casos de estudio
- Portal de clientes
- Productos propios
- SaaS
- Soporte
- Centro de ayuda
- Integraciones
- Panel administrativo
- Multi idioma
  La landing debe estar preparada para crecer.

37. EXPERIENCIA VISUAL DE KAIRU
    La sensación general debe ser:
    “Una empresa pequeña pero muy cuidada.”
    No intentar aparentar que Kairu tiene cientos de empleados.
    La web debe transmitir:

- precisión
- confianza
- orden
- ingeniería
- simplicidad
- cuidado por el usuario

38. CONTENIDO VISUAL
    Evitar imágenes de stock demasiado genéricas.
    Priorizar:

- interfaces reales
- mockups realistas
- laptops
- smartphones
- dashboards
- pequeñas empresas
- personas reales trabajando
- reuniones pequeñas
- escenas profesionales naturales
  Las personas deben verse naturales.
  Evitar:
- poses artificiales
- sonrisas exageradas
- equipos mirando directamente a cámara
- oficinas futuristas
- escenas demasiado perfectas

39. DIRECCIÓN DE FOTOGRAFÍA
    Si se utilizan fotografías:

- iluminación natural
- ambientes de oficina reales
- pequeños negocios
- escritorios limpios pero no irreales
- colores neutros
- presencia discreta del azul Kairu
  No convertir la web en una galería de fotografías.

40. MOCKUPS DE SOFTWARE
    Los mockups deben representar interfaces reales de Kairu.
    Ejemplos de módulos:

- Dashboard
- Ventas
- Clientes
- Inventario
- Pedidos
- Reportes
- Configuración
- Usuarios
  Los dashboards deben utilizar la identidad de Kairu.
  Diseño de dashboard
- Sidebar clara
- Header simple
- Cards de métricas
- Gráficas discretas
- Tablas limpias
- Espacios amplios
- Azul Kairu como acento
- Fondo gris muy claro
- Tipografía Inter
  No saturar los dashboards.

41. NAVBAR UX
    El navbar debe permitir scroll hacia secciones de la misma landing.
    Ejemplo:

- Inicio → #inicio
- Soluciones → #soluciones
- Servicios → #servicios
- Nosotros → #nosotros
- Contacto → #contacto
  Al hacer click:
- desplazamiento suave
- respetar header sticky
- actualizar estado activo si es posible

42. MENÚ MOBILE
    El menú móvil debe:

- abrir y cerrar suavemente
- bloquear scroll del body cuando esté abierto
- cerrar al seleccionar un enlace
- cerrar al presionar Escape
- ser accesible con teclado
  Botón hamburguesa:
- aria-label correcto
- estado abierto/cerrado
- animación sencilla

43. CONTACTO POR WHATSAPP
    El CTA de WhatsApp puede usar una URL construida desde configuración.
    No hardcodear múltiples veces el número.
    Centralizar:
    const WHATSAPP_NUMBER = "";

Si el número aún no está definido, dejar el CTA preparado sin inventarlo.
Mensaje sugerido:
Hola Kairu, quisiera información sobre una solución de software para mi negocio.

44. EMAIL
    No inventar un correo definitivo si todavía no está definido.
    Preparar una variable configurable.
    Ejemplo:
    const CONTACT_EMAIL = "";

Luego podrá reemplazarse por:
contacto@kairu.pe

o el correo oficial que se defina. 45. REDES SOCIALES
Preparar espacio para enlaces a:

- Instagram
- Facebook
- TikTok
- LinkedIn
  No mostrar enlaces si todavía no existen.
  Los iconos deben aparecer únicamente cuando haya URL real.

46. FORMULARIO DE CONTACTO
    Validar campos.
    Nombre
    Obligatorio.
    Correo
    Obligatorio y formato válido.
    WhatsApp
    Opcional o configurable.
    Empresa
    Opcional.
    Servicio
    Puede ser select.
    Opciones:

- Sistema empresarial
- Desarrollo web
- Aplicación móvil
- Software a medida
- Automatización
- Otro
  Mensaje
  Obligatorio.

47. ESTADO DE FORMULARIO
    Mientras se envía:

- desactivar botón
- mostrar spinner pequeño
- mostrar “Enviando...”
  Success:
- limpiar formulario
- mostrar confirmación
  Error:
- conservar datos
- mostrar mensaje claro

48. VALIDACIÓN UX
    Los errores deben mostrarse debajo del campo.
    Ejemplo:
    Ingresa un correo válido.

No utilizar alert() del navegador. 49. PROYECTOS
Las tarjetas de proyectos deben sentirse más editoriales que comerciales.
Cada proyecto puede tener:

- categoría
- nombre
- descripción
- mockup
- tecnologías
- CTA opcional
  Ejemplo:
  Sistema empresarial

Sistema de distribución

Aplicación móvil y panel administrativo para organizar pedidos y operaciones.

50. STACK TECNOLÓGICO
    No mostrar tecnologías en el hero.
    Si se muestran dentro de proyectos, hacerlo discretamente.
    Ejemplo:
    Laravel · Flutter · PostgreSQL

No convertir el sitio en un CV técnico. 51. SECCIÓN DE TECNOLOGÍA
No es necesaria inicialmente.
Si se agrega posteriormente:
Título:
Tecnología elegida según el problema.
Texto:
No utilizamos una tecnología solo porque esté de moda. Elegimos herramientas según las necesidades reales de cada proyecto. 52. AUTOMATIZACIÓN E IA
Kairu puede trabajar con automatización e inteligencia artificial, pero no debe ser el centro de la marca.
Si se menciona:
Automatización inteligente
Integramos automatizaciones y herramientas de inteligencia artificial cuando realmente aportan valor al proceso.

No utilizar:

- AI Powered
- AI First
- Future of AI
  como mensajes principales.

53. MICROINTERACCIONES
    Agregar pequeñas respuestas al usuario.
    Ejemplos:

- icono de flecha que se desplaza 2px
- card que sube 2px
- borde que cambia suavemente
- botones con respuesta al click
- navegación activa
  Nada debe llamar demasiado la atención.

54. REDUCED MOTION
    Respetar:
    @media (prefers-reduced-motion: reduce) {
    _,
    _::before,
    \*::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
    }
    }

55. ESTADOS VACÍOS
    Si una sección dinámica no tiene datos, no dejar bloques vacíos.
    Ejemplo:
    Si no existen proyectos suficientes, ocultar la sección o mostrar solo proyectos reales.
56. IMÁGENES RESPONSIVE
    Usar:
    <picture>

cuando corresponda.
Definir:

- width
- height
- aspect-ratio
  para evitar layout shift.

57. LOADING
    Evitar loaders grandes.
    La web debe cargar contenido rápidamente.
    Si un componente demora:

- skeleton discreto
- spinner pequeño

58. ICONOGRAFÍA
    Preferir Lucide Icons.
    Configuración visual:

- stroke: 1.5 o 1.75
- tamaño: 20px a 24px
- color según contexto
  No mezclar diferentes librerías de iconos.

59. CARDS
    No todos los elementos deben ser cards.
    Usar cards únicamente cuando ayuden a separar contenido.
    Evitar:

- card dentro de card
- 20 tarjetas iguales
- bordes en absolutamente todo

60. BACKGROUNDS
    Alternar sutilmente:

- blanco
- #FAFAF8
- #F5F7FF
  No utilizar una tonalidad diferente por cada sección.

61. DECORACIONES
    Se pueden usar pequeñas formas geométricas basadas en la K.
    Ejemplos:

- líneas
- cuadrados
- bloques
- pequeñas piezas geométricas
  Muy discretas.
  No deben competir con el contenido.

62. LOGO COMO MOTIVO VISUAL
    La geometría de la K puede inspirar:

- separadores
- máscaras
- esquinas
- pequeños elementos de fondo
  Pero nunca repetir el logo decenas de veces.

63. LAYOUT
    Preferir layouts:

- grid
- split screen
- editorial
- mucho espacio negativo
  Evitar layouts excesivamente centrados en todas las secciones.

64. HERO RESPONSIVE
    Desktop:
    Texto Mockup
    Texto Laptop
    CTAs Smartphone

Mobile:
Eyebrow
Título
Descripción
CTA
CTA
Mockup

65. MAX WIDTH DE TEXTO
    Párrafos:
    max-width: 640px;

Evitar líneas excesivamente largas. 66. LINE HEIGHT
Headings:
line-height: 1.05 - 1.15;

Body:
line-height: 1.6 - 1.7;

67. LETTER SPACING
    Hero:
    letter-spacing: -0.03em;

H2:
letter-spacing: -0.02em;

Body:
normal. 68. BUTTON HEIGHT
Desktop:
48px a 52px.
Mobile:
48px mínimo. 69. TOUCH TARGETS
Elementos interactivos mínimo:
44x44px. 70. FORM INPUTS
Altura:
48px a 52px.
Textarea:
mínimo 140px.
Fondo:
#FFFFFF.
Borde:
#E5E7EB.
Focus:
azul Kairu. 71. PLACEHOLDERS
No depender únicamente del placeholder como label.
Siempre usar label visible. 72. ERROR COLORS
Agregar:
--color-error: #DC2626;
--color-success: #16A34A;
--color-warning: #D97706;

Usarlos de manera discreta. 73. COMPONENTE BUTTON
Crear variantes:
primary
secondary
ghost
link

Tamaños:
sm
md
lg

74. COMPONENTE CONTAINER
    Centralizar medidas.
    No repetir:
    max-width: 1200px;
    margin: auto;

por todos los componentes. 75. COMPONENTE SECTION HEADER
Debe admitir:

- eyebrow
- title
- description
- alignment

76. CONFIGURACIÓN CENTRAL
    Crear archivo de configuración para la marca.
    Ejemplo:
    export const siteConfig = {
    name: "Kairu",
    description:
    "Software pensado para hacer el trabajo más simple.",
    location: "Chimbote, Áncash, Perú",
    email: "",
    whatsapp: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    linkedin: "",
    };

Evitar repetir valores manualmente en múltiples componentes. 77. COPY CENTRALIZADO
Si es posible, mantener contenido en estructura separada.
Ejemplo:
export const services = [
{
title: "Sistemas empresariales",
description:
"Ventas, inventarios, clientes, operaciones, reportes y administración."
}
];

Esto permitirá editar contenido sin modificar componentes. 78. ANALYTICS
No instalar analytics por defecto si no se ha definido proveedor.
Dejar preparado para integrar posteriormente:

- Google Analytics
- Plausible
- Umami

79. COOKIES
    No mostrar un banner de cookies si no existen cookies no esenciales.
    Si posteriormente se instala analytics que lo requiera, implementar consentimiento correctamente.
80. SECURITY
    Si existe formulario backend:

- validar server-side
- sanitizar entradas
- protección CSRF cuando aplique
- rate limiting
- evitar exponer secrets en frontend

81. CAPTCHA
    No agregar CAPTCHA inicialmente salvo que exista spam.
    Si posteriormente se necesita, preferir soluciones discretas.
82. PAGE SPEED
    Evitar:

- autoplay de videos pesados
- fondos en video
- imágenes 4K innecesarias
- librerías JS gigantes

83. FUENTES
    Cargar únicamente pesos utilizados.
    Ideal:
    400
    500
    600
    700
    Usar font-display: swap.
84. FAVICON
    Preparar:

- favicon.ico
- favicon.svg
- apple-touch-icon
- manifest icon
  Basados en la K oficial.

85. MANIFEST
    Preparar un manifest básico si corresponde.
    Nombre:
    Kairu
    Short name:
    Kairu
    Theme color:
    #245BFF
    Background:
    #FAFAF8
86. THEME COLOR
Agregar:
<meta name="theme-color" content="#245BFF">

87. OPEN GRAPH IMAGE
    Diseño:

- fondo blanco / azul muy claro
- logo Kairu
- nombre Kairu
- frase:
  “Software pensado para hacer el trabajo más simple.”
  Tamaño recomendado:
  1200x630.

88. SOCIAL PREVIEW
    La tarjeta al compartir la página debe verse limpia y legible.
    No colocar demasiado texto.
89. URLS
    Usar URLs limpias.
    Ejemplo:
    /
    #servicios
    #proyectos
    #nosotros
    #contacto

Cuando existan páginas:
/proyectos
/proyectos/nombre
/blog
/contacto

90. ARQUITECTURA FUTURA
    La landing debe permitir evolucionar posteriormente hacia:
    /
    ├── servicios
    ├── proyectos
    ├── nosotros
    ├── blog
    ├── contacto
    ├── soporte
    └── productos

91. PRINCIPIO DE DISEÑO
    Antes de agregar cualquier elemento preguntarse:
    ¿Ayuda al usuario a entender o utilizar mejor la página?
    Si la respuesta es no, probablemente no debe existir.
92. PRINCIPIO DE PRODUCTO
    Kairu debe transmitir:
    Menos elementos, mejor pensados.
    No:
    Más efectos para parecer moderno.
93. PRINCIPIO DE CONTENIDO
    La página debe hablar principalmente de los problemas del cliente.
    No debe hablar todo el tiempo sobre Kairu.
    Ejemplo correcto:
    Organiza ventas, clientes y operaciones desde una sola herramienta.

Ejemplo menos recomendable:
Somos expertos innovadores en soluciones tecnológicas.

94. PRINCIPIO COMERCIAL
    No vender tecnología.
    Vender resultados concretos como:

- mejor organización
- procesos más simples
- información centralizada
- menos tareas manuales
- herramientas adaptadas al negocio

95. MENSAJE CENTRAL
    Si el usuario recuerda una sola cosa después de visitar la web, debería ser:
    Kairu crea software que hace más simple trabajar.
96. CTA PRINCIPAL GLOBAL
    Usar principalmente:
    Cuéntanos qué necesitas
    o
    Conversemos
    Evitar llenar la web con:
    Comprar ahora
    porque Kairu ofrece inicialmente servicios personalizados.
97. COPY NATURAL
    No utilizar demasiados signos de admiración.
    No escribir frases comerciales exageradas.
    Ejemplo:
    Correcto:
    Cuéntanos cómo trabajas y veamos cómo podemos simplificarlo.

Evitar:
¡Lleva tu negocio al siguiente nivel hoy mismo!

98. ORIGEN DE LA MARCA
    Mencionar Chimbote y Perú con discreción.
    No convertir el origen peruano en una estética turística.
    No usar:

- Machu Picchu
- llamas
- banderas gigantes
- patrones culturales sin contexto
  La identidad peruana debe sentirse principalmente mediante:
  Diseñado y desarrollado en Perú.

99. TONO PERUANO
    Usar español latino neutro.
    Evitar lenguaje excesivamente local que pueda limitar a Kairu cuando crezca fuera de Chimbote.
100. INSTRUCCIÓN FINAL PARA CODEX
     Construye esta landing como si fuera el sitio oficial de una empresa real de software.
     No generes simplemente una plantilla bonita.
     Piensa en:

- identidad
- jerarquía
- UX
- responsive
- accesibilidad
- performance
- mantenibilidad
- SEO
- componentes
- consistencia visual
- calidad de código
- claridad comercial
  Todos los elementos deben seguir el mismo sistema visual.
  La página debe sentirse:
- minimalista
- moderna
- limpia
- profesional
- humana
- técnicamente bien construida
- cuidada en los pequeños detalles
  No debe parecer una web genérica generada por IA.
  Debe parecer un producto diseñado cuidadosamente por Kairu.
  Antes de terminar:

1. Revisa responsive en móvil, tablet y desktop.
2. Revisa accesibilidad.
3. Revisa estados hover/focus/active.
4. Revisa errores de consola.
5. Revisa Lighthouse.
6. Revisa SEO.
7. Revisa que no existan textos inventados.
8. Revisa consistencia de colores.
9. Revisa consistencia de espaciado.
10. Revisa que la experiencia se sienta simple.

---

# 103. SHADCN — BOTONES

Crear variantes alineadas con Kairu.

Ejemplo conceptual:

````tsx
<Button variant="default">
  Cuéntanos qué necesitas
</Button>

<Button variant="outline">
  Conoce Kairu
</Button>

<Button variant="ghost">
  Ver más
</Button>

Primary:
- background: #245BFF
- hover: #1948D8
- texto blanco
Outline:
- fondo blanco
- borde #E5E7EB
- texto #111827
Ghost:
- transparente
- hover muy suave
No utilizar estilos agresivos.
104. SHADCN — FORMULARIOS
Usar shadcn para:
- Label
- Input
- Textarea
- Select
- FormMessage
Los formularios deben:
- mostrar errores inline
- ser accesibles
- tener focus visible
- usar labels reales
- no depender del placeholder
Ejemplo:
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Correo</FormLabel>
      <FormControl>
        <Input placeholder="correo@empresa.com" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

105. SHADCN — MENÚ MÓVIL
Preferir:
- Sheet
- Drawer
para navegación móvil.
Ejemplo conceptual:
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon">
      <Menu />
    </Button>
  </SheetTrigger>

  <SheetContent>
    ...
  </SheetContent>
</Sheet>

El menú debe:
- cerrar al navegar
- poder cerrarse con Escape
- bloquear scroll de fondo
- mantener navegación por teclado
106. SHADCN — MODALES
Usar Dialog únicamente cuando sea necesario.
Ejemplos válidos:
- formulario de contacto rápido
- detalle de proyecto
- confirmación de acción
No abrir modales automáticamente al entrar.
No usar popups comerciales agresivos.
107. SHADCN — TOOLTIPS
Usar Tooltip para:
- iconos sin texto
- botones de redes
- acciones secundarias
No utilizar tooltips para contenido esencial.
108. SHADCN — ACCORDION
Puede usarse posteriormente para:
- preguntas frecuentes
- detalles de servicios
- soporte
No usar accordion en secciones que deberían estar visibles directamente.
109. ANIMATE.CSS
Animate.css puede utilizarse para animaciones simples de entrada.
Debe utilizarse de forma limitada.
Animaciones recomendadas:
- fadeIn
- fadeInUp
- fadeInDown
- fadeInLeft
- fadeInRight
Evitar:
- bounce
- rubberBand
- flash
- tada
- wobble
- heartBeat
- rotateIn exagerado
No usar Animate.css en todos los componentes.
110. ANIMATE.CSS — DURACIÓN
Sobrescribir duraciones cuando sea necesario.
Ejemplo:
.animate__animated {
  --animate-duration: 500ms;
}

Para elementos pequeños:
.animate-fast {
  --animate-duration: 300ms;
}

Para secciones:
.animate-section {
  --animate-duration: 600ms;
}

No exceder normalmente 700ms.
111. ANIMATE.CSS — USO RECOMENDADO
Puede utilizarse en:
- Hero
- SectionHeader
- CTA
- Mockups
- elementos que aparecen por primera vez
No usar animación cada vez que el usuario hace scroll arriba y abajo.
Preferir animar una sola vez.
112. ANIME.JS
Anime.js debe utilizarse para animaciones más personalizadas donde CSS no sea suficiente.
Casos recomendados:
- entrada del logo Kairu
- animación del mockup del hero
- pequeños desplazamientos de UI
- progresión visual de módulos
- timelines
- microinteracciones
- animaciones SVG
- contadores reales si existen datos reales
No usar Anime.js para animar toda la página.
113. ANIME.JS — LOGO
La K de Kairu puede tener una animación inicial muy sutil.
Ejemplo conceptual:
anime({
  targets: '.kairu-logo',
  opacity: [0, 1],
  translateY: [8, 0],
  scale: [0.98, 1],
  duration: 600,
  easing: 'easeOutExpo'
});

No hacer:
- rotaciones completas
- rebotes
- zoom agresivo
- animación permanente
114. ANIME.JS — HERO
El hero puede utilizar una secuencia.
Ejemplo conceptual:
anime.timeline({
  easing: 'easeOutExpo'
})
.add({
  targets: '.hero-eyebrow',
  opacity: [0, 1],
  translateY: [10, 0],
  duration: 400
})
.add({
  targets: '.hero-title',
  opacity: [0, 1],
  translateY: [18, 0],
  duration: 500
}, '-=200')
.add({
  targets: '.hero-description',
  opacity: [0, 1],
  translateY: [14, 0],
  duration: 450
}, '-=250')
.add({
  targets: '.hero-actions',
  opacity: [0, 1],
  translateY: [10, 0],
  duration: 400
}, '-=200')
.add({
  targets: '.hero-mockup',
  opacity: [0, 1],
  translateX: [20, 0],
  scale: [0.98, 1],
  duration: 650
}, '-=350');

La animación debe sentirse rápida y natural.
115. ANIME.JS — SECCIÓN DE CRECIMIENTO
Puede animarse el recorrido:
Inicio
→ Sistema base
→ Nuevas funciones
→ Integraciones
→ Automatización
Animar progresivamente:
- línea
- nodos
- labels
Ejemplo:
anime({
  targets: '.growth-step',
  opacity: [0, 1],
  translateY: [12, 0],
  delay: anime.stagger(120),
  duration: 450,
  easing: 'easeOutQuad'
});

No repetir infinitamente.
116. ANIME.JS — MOCKUPS
Los mockups de laptop y smartphone pueden tener movimiento muy sutil.
Ejemplo:
anime({
  targets: '.device-mockup',
  translateY: [6, -6],
  direction: 'alternate',
  loop: true,
  duration: 4000,
  easing: 'easeInOutSine'
});

Usar solo si visualmente mejora el hero.
El movimiento debe ser casi imperceptible.
Si distrae, eliminarlo.
117. ANIME.JS — HOVER
Preferir CSS para hover.
Anime.js solo debe utilizarse para microinteracciones que realmente lo necesiten.
No llamar Anime.js para algo que CSS puede resolver con:
transition: transform 200ms ease;

118. INTERSECTION OBSERVER
No animar elementos apenas carga toda la página.
Usar IntersectionObserver para detectar cuándo una sección entra al viewport.
Ejemplo conceptual:
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, {
  threshold: 0.15
});

Animar una sola vez.
119. REDUCED MOTION
Muy importante.
Las animaciones deben respetar:
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

Si prefers-reduced-motion está activo:
- no ejecutar timelines complejas de Anime.js
- evitar animaciones decorativas
- mostrar directamente el estado final
Ejemplo:
const reduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!reduceMotion) {
  // ejecutar anime.js
}

120. REGLA DE ELECCIÓN DE ANIMACIONES
Usar esta prioridad:
Nivel 1
CSS transitions
Para:
- hover
- focus
- botones
- cards
- links
Nivel 2
Animate.css
Para:
- entradas simples
- fade
- desplazamientos sencillos
Nivel 3
Anime.js
Solo para:
- secuencias
- SVG
- timelines
- progresiones
- animaciones coordinadas
- microinteracciones personalizadas
No utilizar Anime.js si CSS o Animate.css resuelven correctamente el efecto.
121. NO MEZCLAR ANIMACIONES SIN NECESIDAD
Un mismo elemento no debe tener simultáneamente:
- Animate.css
- Anime.js
- CSS animation
salvo que exista una razón clara.
Evitar conflictos entre transformaciones.
122. PERFORMANCE DE ANIMACIONES
Animar preferentemente:
- transform
- opacity
Evitar animar:
- width
- height
- top
- left
- box-shadow de forma continua
- filtros pesados
Esto permite mantener mejor rendimiento.
123. COMPONENTES SHADCN PERSONALIZADOS
Crear wrappers propios cuando sea necesario.
Ejemplo:
components/ui/
  button.tsx
  input.tsx
  textarea.tsx
  sheet.tsx

components/kairu/
  KairuButton.tsx
  SectionHeader.tsx
  ServiceCard.tsx
  ContactForm.tsx
  MobileNavigation.tsx

No editar directamente todos los componentes sin una estrategia.
124. DESIGN TOKENS + SHADCN
Los componentes shadcn deben consumir los tokens de Kairu.
Si el proyecto usa variables HSL, mapearlas correctamente.
Ejemplo conceptual:
:root {
  --primary: 224 100% 57%;
  --primary-foreground: 0 0% 100%;

  --background: 40 17% 98%;
  --foreground: 222 47% 11%;

  --border: 220 13% 91%;
}

La fuente de verdad sigue siendo la paleta oficial definida en este documento.
125. ICONOS
Si shadcn ya utiliza Lucide, mantener Lucide como única librería de iconos principal.
No mezclar:
- Font Awesome
- Material Icons
- Heroicons
- Lucide
sin razón.
126. EJEMPLO DE HERO CON LIBRERÍAS
Implementación esperada conceptualmente:
<section id="inicio">
  <div className="container">
    <div className="hero-copy">

      <Badge
        variant="secondary"
        className="hero-eyebrow"
      >
        Software · Aplicaciones · Soluciones digitales
      </Badge>

      <h1 className="hero-title">
        Software que hace el trabajo más
        <span className="text-primary"> simple.</span>
      </h1>

      <p className="hero-description">
        Creamos sistemas, aplicaciones y soluciones digitales
        que se adaptan a la forma en que trabaja tu negocio
        y pueden evolucionar contigo.
      </p>

      <div className="hero-actions">

        <Button size="lg">
          Cuéntanos qué necesitas
        </Button>

        <Button
          size="lg"
          variant="outline"
        >
          Conoce Kairu
        </Button>

      </div>

    </div>

    <div className="hero-mockup">
      ...
    </div>
  </div>
</section>

Después utilizar Anime.js únicamente para la entrada coordinada de:
- eyebrow
- H1
- descripción
- botones
- mockup
127. EJEMPLO DE SERVICE CARD
Puede utilizar componentes shadcn como base.
<Card className="service-card">
  <CardHeader>
    <div className="service-icon">
      <Boxes />
    </div>

    <CardTitle>
      Sistemas empresariales
    </CardTitle>
  </CardHeader>

  <CardContent>
    <p>
      Ventas, inventarios, clientes, operaciones,
      reportes y administración.
    </p>
  </CardContent>
</Card>

No todas las cards necesitan sombra.
Puede utilizarse:
- borde
- fondo blanco
- cambio muy suave en hover
128. EJEMPLO DE HOVER DE CARD
Preferir CSS:
.service-card {
  transition:
    transform 250ms ease,
    border-color 250ms ease,
    box-shadow 250ms ease;
}

.service-card:hover {
  transform: translateY(-3px);
  border-color: rgba(36, 91, 255, 0.22);
  box-shadow:
    0 12px 32px rgba(15, 23, 42, 0.07);
}

No usar Anime.js para este caso.
129. EJEMPLO DE CTA
Usar shadcn Button.
Anime.js puede utilizarse cuando el CTA entra al viewport.
No animar permanentemente el botón.
No utilizar pulsaciones infinitas para llamar la atención.
130. MENÚ MÓVIL CON SHADCN
Preferir Sheet.
Debe incluir:
- logo
- enlaces
- CTA
- redes si existen
El diseño debe ser limpio.
Ejemplo visual:
[K] kairu                    X

Inicio

Soluciones

Servicios

Nosotros

Contacto

[ Cuéntanos qué necesitas ]

131. DIALOG DE CONTACTO OPCIONAL
Si el CTA "Hablemos" abre un modal:
Utilizar shadcn Dialog.
Dentro:
- nombre
- correo
- WhatsApp
- mensaje
Pero mantener también una sección Contacto en la página.
No depender únicamente del modal.
132. TOASTS
Si el proyecto ya tiene Sonner mediante shadcn:
Usarlo para:
- mensaje enviado
- error de envío
Ejemplo:
toast.success("Mensaje enviado correctamente");

No mostrar toasts para cada interacción pequeña.
133. ACCORDION FAQ FUTURO
Si posteriormente se agrega FAQ:
Utilizar shadcn Accordion.
Ejemplos:
- ¿Cuánto tarda desarrollar un sistema?
- ¿Trabajan con empresas pequeñas?
- ¿Pueden mejorar un sistema existente?
- ¿Desarrollan aplicaciones móviles?
No inventar respuestas comerciales específicas si todavía no se han definido.
134. ANIMACIONES DEL NAVBAR
Navbar:
- no animar continuamente
- únicamente transición de fondo al hacer scroll
Ejemplo:
.navbar {
  transition:
    background-color 250ms ease,
    border-color 250ms ease,
    backdrop-filter 250ms ease;
}

135. ANIMACIÓN DE LINKS
Puede utilizarse underline sutil.
Ejemplo:
.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 1px;
  background: #245BFF;

  transform: scaleX(0);
  transform-origin: right;
  transition: transform 250ms ease;
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

136. ANIMACIÓN DEL ISOTIPO
Puede aprovechar la geometría de la K.
Si el logo se construye en SVG, Anime.js puede animar ligeramente sus piezas.
Ejemplo:
- pieza oscura entra desde arriba
- pieza azul entra desde abajo
- ambas terminan formando la K
Duración total:
500ms a 700ms.
Ejecutar solo una vez al cargar.
No realizar loop.
137. NO BLOQUEAR EL CONTENIDO POR ANIMACIONES
Todo el contenido debe existir en el DOM desde el principio.
No retrasar lectura o navegación esperando que termine una animación.
Las animaciones son mejora visual, no requisito funcional.
138. JAVASCRIPT PROGRESIVO
La landing debe seguir siendo usable aunque una animación falle.
Anime.js no debe ser necesario para:
- navegación
- lectura
- formulario
- CTA
- accesibilidad
139. LA PRIORIDAD ES EL PRODUCTO
Utilizar:
shadcn/ui
Animate.css
Anime.js
como herramientas.
No convertirlas en la identidad del sitio.
La identidad sigue siendo:
Kairu
y sus principios:
- simple
- adaptable
- cuidado
- funcional
- minimalista
140. INSTRUCCIÓN FINAL SOBRE LAS LIBRERÍAS
Al implementar la landing:
1. Reutiliza los componentes de shadcn/ui existentes antes de crear componentes duplicados.
2. Personaliza shadcn según el sistema visual de Kairu.
3. Usa CSS transitions para microinteracciones simples.
4. Usa Animate.css para entradas sencillas.
5. Usa Anime.js únicamente para secuencias o animaciones personalizadas.
6. Respeta prefers-reduced-motion.
7. No sacrifiques rendimiento por animaciones.
8. No sobrecargues la interfaz.
9. Mantén animaciones entre 200ms y 700ms salvo casos excepcionales.
10. El resultado debe sentirse fluido, no animado en exceso.
La tecnología debe permanecer detrás de la experiencia.
El usuario debe percibir una web rápida, limpia y cuidada, no una demostración de efectos.

Y puedes añadir al final del prompt para Codex:

```text
IMPORTANTE:

El proyecto ya tiene instalados shadcn/ui, Animate.css y Anime.js.

Antes de crear componentes nuevos, revisa qué componentes shadcn ya existen en el proyecto y reutilízalos.

No reinstales estas dependencias si ya están disponibles.

Usa:
- shadcn/ui para UI y componentes reutilizables.
- CSS transitions para interacciones pequeñas.
- Animate.css para animaciones simples de entrada.
- Anime.js para timelines, SVG y animaciones coordinadas.

No sobreutilices ninguna librería.

Mantén la estética minimalista de Kairu y prioriza accesibilidad, rendimiento y claridad.
````
