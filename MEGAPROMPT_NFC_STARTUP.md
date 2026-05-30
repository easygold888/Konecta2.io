# MEGAPROMPT — NFC Startup Landing Page

---

## 1. NOMBRE & DOMINIO

**Nombre:** `Konecta2`
**Razón social:** `Konecta2.io S.A.S`

- Juego de palabras: fonéticamente idéntico a **"conectados"** en español
- Doble lectura: tecnología (`k`, `.io`) + comunidad (`conectados`)
- El `2` codifica el vínculo entre dos partes: negocio ↔ cliente
- Dominio objetivo: **konecta2.io**
- Marca registrable: la combinación `k` + `2` la hace distintiva y protegible

> ⚠️ Verificar disponibilidad en: [https://www.namecheap.com](https://www.namecheap.com) y [https://domains.google](https://domains.google) antes de registrar.

---

## 2. CONCEPTO DE MARCA

**Tagline:** *"Toca. Conectados."*
*(Versión en inglés para materiales internacionales: "One tap. Connected.")*

**Propuesta de valor core:**
NFC embebido en objetos físicos (tarjetas, stickers, placas) que elimina la fricción entre la intención del cliente y la acción: dejar una reseña, guardar un contacto, ver el menú, conectarse al WiFi, acceder a una oferta. Sin apps, sin QR, sin formularios.

**Casos de uso principales a comunicar en la landing:**
1. **Reseñas Google** — tap → abre directo el formulario de reseña de Google. Más reseñas = más visibilidad en búsquedas de Google Maps y LLMs (ChatGPT, Gemini, Perplexity).
2. **Tarjeta de contacto NFC** — tap → descarga vCard/contacto directo al celular. No más fotos de tarjetas que nadie abre.
3. **Menú digital sin QR** — tap → menú interactivo en el celular. No hay que abrir la cámara, enfocar, esperar.
4. **WiFi instantáneo** — tap → conecta a la red sin contraseñas.
5. **Links de pago / propinas** — tap → abre pasarela de pago directo.
6. **Perfil de redes sociales** — tap → abre Instagram/LinkedIn/TikTok del negocio.

---

## 3. EQUIPO PARA DISEÑAR LA LANDING

### Rol 1 — Creative Director / Brand Strategist
**Responsabilidad:** Define la dirección visual, el tono de voz y la jerarquía narrativa de la página. Decide qué emoción debe sentir el usuario en cada sección. Aprueba o veta cada decisión estética.

**Skills a activar:**
```
use antigravity-design-expert   → sistema glassmorphism, spatial UI, CSS weightless
use high-end-visual-design      → interfaces agency-grade, premium fonts, microinteractions
use product-design              → sistemas visuales, design tokens, UX flows, handoff
use canvas-design               → filosofía estética expresada visualmente, output .md/.png
use brand-guidelines            → voz de marca, tono del copy, UI text consistente
```

**Output esperado:** Moodboard, paleta de colores, tipografía principal, tono del copy (audaz, directo, sin jerga técnica), guía de voz de marca.

---

### Rol 2 — Motion & 3D Designer (Three.js / WebGL)
**Responsabilidad:** Construye la figura geométrica 3D flotante (dodecaedro / icosaedro geodésico similar a la imagen de referencia) en Three.js. Implementa el sistema de partículas y efectos de campo magnético NFC. Programa todos los scroll-triggered animations con GSAP ScrollTrigger.

**Skills a activar:**
```
use 3d-web-experience           → Three.js, React Three Fiber, WebGL, interactive 3D scenes
use threejs-fundamentals        → scene setup, cameras, renderer, Object3D hierarchy
use threejs-geometry            → IcosahedronGeometry, BufferGeometry, custom shapes
use threejs-materials           → PBR, MeshPhysicalMaterial, wireframe, transparency
use threejs-lighting            → PointLight, AmbientLight, environment lighting, glow
use threejs-shaders             → GLSL, ShaderMaterial, custom NFC pulse effect
use threejs-postprocessing      → bloom, glow, EffectComposer para el aura del objeto
use threejs-animation           → keyframe animation, morph targets (icosaedro → esfera)
use threejs-interaction         → raycasting, mouse parallax, hover states
use gpt-taste                   → GSAP-heavy pages, AIDA structure, scroll animations
use scroll-experience           → parallax storytelling, scroll-driven, cinematic web
use design-spells               → micro-interactions, "magic" details en hover y transiciones
```

**Output esperado:**
- Figura 3D con wireframe metálico / glassmorphism, rotación suave con mouse parallax
- Efecto de "pulse" radial simulando señal NFC al hacer hover
- Transiciones de sección con morfología del objeto (de icosaedro a esfera a plano)
- Partículas flotantes en el hero con Perlin noise

---

### Rol 3 — Frontend Engineer (JS Vanilla / Performance)
**Responsabilidad:** Arquitectura del HTML/CSS/JS. Implementa el sistema de glassmorphism, los scroll events, el layout responsive, y la performance (lazy loading, requestAnimationFrame, no bloquear el main thread con Three.js).

**Skills a activar:**
```
use antigravity-design-expert   → core UI/UX engineering, glassmorphism, GSAP
use antigravity-workflows       → orquestación de skills para SaaS/landing delivery
use high-end-visual-design      → fluid microinteractions, spatial rhythm, soft depth
use web-design-guidelines       → compliance con Web Interface Guidelines
use ux-flow                     → progressive disclosure, hub-and-spoke navigation
use core-components             → component library, design tokens, UI patterns
use ui-pattern                  → card sections, grids, glassmorphism wrappers
use brainstorming               → validar arquitectura antes de codear
```

**Output esperado:**
- Página 100% en JS vanilla (sin frameworks) o con módulos ES6
- CSS con variables para colores/glassmorphism consistente
- Scroll events fluidos: IntersectionObserver + GSAP
- Canvas WebGL separado del DOM, sincronizado por scroll position
- Lighthouse score > 85 en mobile

---

### Rol 4 — UX Copywriter / Conversion Specialist
**Responsabilidad:** Escribe todos los textos de la landing. Cada sección tiene una sola idea, un solo CTA. El copy debe ser impactante, corto, orientado a conversión. Habla en el idioma del dueño de restaurante, del freelancer, del gerente de hotel — no del tech nerd.

**Skills a activar:**
```
use copywriting                 → conversion-focused copy, landing pages, reglas anti-fabricación
use copy-editing                → pulir copy existente, passes de edición para conversión
use content-creator             → brand voice analysis, frameworks por plataforma
use product-inventor            → product thinking + storytelling + UX design integrado
```

**Output esperado:**
- Headline hero (max 8 palabras)
- Subheadline (max 20 palabras)
- Copy de cada sección de caso de uso (max 3 líneas)
- CTA principal: "Consigue tu Konecta2" o "Empieza gratis"
- Microcopy de formulario de contacto/waitlist

---

### Rol 5 — Growth / SEO Strategist
**Responsabilidad:** Estructura semántica HTML (H1/H2/H3), meta tags, OG tags, JSON-LD schema. Asegura que la landing sea indexable y rankeable para búsquedas como "tarjeta NFC reseñas Google", "placa NFC restaurante", "aumentar reseñas negocio NFC".

**Skills a activar:**
```
use seo-plan                    → strategic SEO, competitive analysis, content roadmap
use seo-aeo-landing-page-writer → landing page optimizada para SEO ranking + AEO (LLM citation)
use seo-aeo-content-cluster     → topical authority map, pillar page, cluster articles
use seo-aeo-internal-linking    → internal link map, anchor text, orphan page detection
use indexing-issue-auditor      → crawl budget, indexing errors, sitemap audit
use keyword-extractor           → extraer hasta 50 keywords relevantes del copy generado
use growth-engine               → growth hacking, SEO, viral loops, organic acquisition
use launch-strategy             → plan de lanzamiento, momentum, waitlist strategy
use competitor-alternatives     → páginas de comparación que rankean por búsquedas competitivas
use free-tool-strategy          → engineering-as-marketing, herramientas que generan leads orgánicos
```

**Output esperado:**
- Meta title / description optimizados
- Schema.org markup para el producto
- Sección de FAQ con keywords long-tail
- Estrategia de keywords para el blog/contenido

---

## 4. ESPECIFICACIONES TÉCNICAS DE LA LANDING

### Stack
```
- HTML5 / CSS3 / JavaScript ES6 (vanilla, sin React ni Vue)
- Three.js (r158+) — figura 3D
- GSAP 3 + ScrollTrigger — todos los scroll events
- Antigravity design system — sistema de componentes base
- Awesome Skills repo — utilidades / helpers
- Google Fonts: una display font con carácter (ej: "Syne", "Clash Display", "Cabinet Grotesk")
- Sin Bootstrap, sin Tailwind — CSS custom puro
```

### Paleta de colores (glassmorphism + claridad)
```css
:root {
  --bg-primary: #F0F4FF;         /* blanco azulado, no puro */
  --bg-glass: rgba(255,255,255,0.18);
  --border-glass: rgba(255,255,255,0.35);
  --blur-glass: blur(24px);
  --accent-1: #4F6EF7;           /* azul eléctrico */
  --accent-2: #00E5C4;           /* cian NFC */
  --accent-3: #A78BFA;           /* violeta suave */
  --text-primary: #0A0F2E;       /* casi negro azulado */
  --text-secondary: #5A6480;
  --glow-color: rgba(79,110,247,0.3);
}
```

### Secciones de la página (en orden de scroll)

#### HERO — fullscreen
- Figura 3D geodésica flotando a la derecha (dodecaedro wireframe metálico)
- Fondo: gradiente de malla (mesh gradient) suave entre --bg-primary y tonos de --accent-3
- Headline: `"Un toque. Listo."` (o en inglés si se decide mercado global)
- Subheadline: `"NFC inteligente que convierte cada interacción física en una acción digital instantánea"`
- CTA button con glow effect: `"Empieza con Konecta2 →"`
- Partículas flotantes suaves (Perlin noise)
- Al hacer scroll: figura se desplaza hacia el centro y explota en partículas que forman las íconos de los casos de uso

#### SECCIÓN 2 — "El problema"
- Scroll horizontal o sticky pin
- Cards glassmorphism mostrando el dolor:
  - "Solo el 4% de tus clientes satisfechos deja una reseña"
  - "Compartir tu contacto sigue siendo: foto → guardado manual → olvidado"
  - "Los QR requieren abrir la cámara, enfocar, esperar. Nadie tiene paciencia."
- Animación: los textos aparecen con un efecto de "glitch" o "typewriter" al entrar al viewport

#### SECCIÓN 3 — "La solución" (casos de uso)
- 6 cards en grid (3x2 desktop, 1x scroll mobile)
- Cada card es glassmorphism con ícono 3D pequeño
- Al hover: card se eleva, glow en --accent-1, aparece descripción expandida
- Casos:
  1. ⭐ Reseñas Google — "Tap → reseña abierta. Sin pasos intermedios."
  2. 👤 Contacto NFC — "Tap → contacto guardado. No más tarjetas ignoradas."
  3. 🍽️ Menú sin QR — "Tap → menú en pantalla. Sin cámara, sin espera."
  4. 📶 WiFi instantáneo — "Tap → conectado. Sin contraseñas, sin confusión."
  5. 💳 Link de pago — "Tap → pago directo. Cero fricción en la propina."
  6. 📱 Redes sociales — "Tap → tu perfil. Followers que sí convierten."

#### SECCIÓN 4 — "Por qué las reseñas importan más que nunca"
- Sección narrativa con scroll storytelling (texto aparece por líneas)
- Estadísticas con counter animation:
  - "93% de compradores lee reseñas antes de decidir"
  - "Los LLMs (ChatGPT, Gemini, Perplexity) citan negocios con +50 reseñas con 3x más frecuencia"
  - "Con Nudj, negocios reportan +340% más reseñas en 30 días"
- Visual: mockup de Google Maps con reseñas aumentando en tiempo real (animación CSS)

#### SECCIÓN 5 — "Tarjetas del pasado vs Nudj"
- Split screen animado
- Izquierda: tarjeta de papel (blanco y negro, efecto sepia, animación de "guardada en cajón")
- Derecha: tarjeta NFC Konecta2 (glassmorphism, glow, animación de tap → contacto guardado)
- Copy: `"Compartir tu contacto con papel es como mandar un fax. La tarjeta Konecta2 se añade directo al celular."`

#### SECCIÓN 6 — Industrias / "¿Para quién es?"
- Horizontal scroll con cards de industrias:
  - Restaurantes & Cafés
  - Hoteles & Hospedajes
  - Profesionales & Freelancers
  - Retail & Tiendas
  - Eventos & Conferencias
  - Clínicas & Salud

#### SECCIÓN 7 — Cómo funciona (3 pasos)
- Timeline animado horizontal
- Paso 1: "Elige tu Nudj" (sticker, tarjeta, placa)
- Paso 2: "Configura en 2 minutos" (dashboard web, sin apps)
- Paso 3: "Entrega o instala. Listo para siempre."

#### SECCIÓN 8 — Social proof / testimonios
- Cards glassmorphism con foto (placeholder), rating, texto corto
- Efecto de scroll infinito (marquee) en mobile

#### SECCIÓN 9 — CTA final / Waitlist
- Hero invertido: fondo oscuro (--text-primary), figura 3D de nuevo pero más grande
- Formulario de email minimalista con botón de glow
- Copy: `"Únete a la lista. Los primeros 100 negocios tienen precio de fundadores."`
- Subtext: `"konecta2.io — conectados desde el primer tap"`

#### FOOTER
- Links, redes, legal mínimo

---

## 5. SCROLL EVENTS REQUERIDOS

```
1. Hero → Sección 2: figura 3D fragmenta en partículas (GSAP + Three.js)
2. Sección 2: cards entran con stagger desde abajo (GSAP fromVars)
3. Sección 3: grid de casos de uso aparece con efecto de "matrix rain" → cards sólidas
4. Sección 4: contadores numéricos animan al entrar al viewport
5. Sección 5: split screen se revela con wipe horizontal
6. Sección 6: horizontal scroll con pinning (ScrollTrigger pin)
7. Sección 7: línea de timeline se dibuja (SVG stroke-dashoffset animation)
8. General: cursor personalizado con glow suave que sigue al mouse
9. General: parallax suave en todos los fondos de sección
10. Sección 9: figura 3D reaparece con efecto de "reconstitución" desde partículas
```

---

## 6. FIGURA 3D — ESPECIFICACIONES

Basado en la imagen de referencia (dodecaedro geodésico):

```javascript
// Three.js setup
const geometry = new THREE.IcosahedronGeometry(2, 1); // subdivisión 1 = geodésico
const material = new THREE.MeshPhysicalMaterial({
  color: 0x4F6EF7,
  metalness: 0.8,
  roughness: 0.1,
  transparent: true,
  opacity: 0.7,
  wireframe: false,
  envMapIntensity: 1.5,
});

// Wireframe overlay
const wireframeMat = new THREE.MeshBasicMaterial({
  color: 0xA78BFA,
  wireframe: true,
  transparent: true,
  opacity: 0.4,
});

// Comportamiento:
// - Rotación continua suave: X 0.002 rad/frame, Y 0.003 rad/frame
// - Mouse parallax: rotación adicional según posición del cursor (max ±15°)
// - Hover: aumenta scale a 1.05 con ease, activa "pulse" radial
// - Scroll: translateY sincronizado con scroll position
// - Iluminación: PointLight --accent-1 orbiting + AmbientLight suave
```

---

## 7. INSTRUCCIÓN DE ACTIVACIÓN PARA EL AGENTE

```
use antigravity-design-expert
use antigravity-workflows
use 3d-web-experience
use threejs-fundamentals
use threejs-geometry
use threejs-materials
use threejs-lighting
use threejs-shaders
use threejs-postprocessing
use threejs-animation
use threejs-interaction
use gpt-taste
use scroll-experience
use high-end-visual-design
use design-spells
use copywriting
use seo-aeo-landing-page-writer

TASK: Build the Konecta2 NFC startup landing page (konecta2.io S.A.S).

CONSTRAINTS:
- Pure JS (no frameworks), HTML5, CSS3
- Three.js for 3D geodesic figure (icosahedron subdivided)
- GSAP + ScrollTrigger for ALL scroll-driven animations
- Full glassmorphism system with CSS variables
- Light palette: white-blue base, electric blue + cyan + soft violet accents
- 9 sections as specified
- 10 scroll events as specified
- Custom cursor with glow
- Fully responsive (mobile-first)
- Reference aesthetic: https://qclay.design/
- No Bootstrap, no Tailwind, no React

OUTPUT: Single index.html file with embedded CSS and JS (or index.html + style.css + main.js if skill prefers modular)
```

---

## 8. REFERENCIAS VISUALES

- **Estética general:** https://qclay.design/ — scroll storytelling, partículas, tipografía audaz
- **Glassmorphism:** https://ui.glass/generator/
- **Figura 3D:** imagen adjunta (dodecaedro/icosaedro geodésico con wireframe)
- **Paleta de colores:** clara, transparente, sin fondos negros dominantes — proyecta rapidez y confianza

---

## 9. NOTAS FINALES

- **Idioma de la landing:** Español (mercado LATAM + España) con opción de toggle a inglés
- **El copy debe evitar** palabras como "innovador", "disruptivo", "solución integral" — demasiado genéricas
- **Tono:** directo, casi arrogante en la simplicidad — como Stripe, Linear o Raycast
- **El diferencial que la landing debe martillar:** no es que sea NFC, es que **elimina el paso de más** que hace que el cliente no actúe
- **SEO focus:** "aumentar reseñas Google negocio", "tarjeta NFC Colombia", "placa NFC restaurante", "NFC para negocios", "konecta2 NFC Colombia"
