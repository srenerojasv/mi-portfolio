# Mi Portafolio

Portafolio personal de **Samuel René Rojas Villamarín**, desarrollador Full Stack. Una landing estática, rápida y accesible que reúne proyectos reales, stack técnico, experiencia y vías de contacto.

[![Sitio en vivo](https://img.shields.io/badge/sitio-srenerojasv.github.io%2Fmi--portfolio-0ea5e9?style=flat-square)](https://srenerojasv.github.io/mi-portfolio/)
[![Vue 3](https://img.shields.io/badge/Vue-3-42b883?style=flat-square&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Rust + WebAssembly](https://img.shields.io/badge/Rust-WebAssembly-000000?style=flat-square&logo=rust&logoColor=white)](https://www.rust-lang.org/)

---

## Vista general

| | |
|---|---|
| **Sitio** | [srenerojasv.github.io/mi-portfolio](https://srenerojasv.github.io/mi-portfolio/) |
| **Autor** | Samuel René Rojas Villamarín |
| **Tipo** | Landing one-page / portafolio profesional |
| **Stack** | Vue 3, Vite 8, Tailwind CSS 4, Rust → WebAssembly |
| **Despliegue** | GitHub Pages con GitHub Actions |
| **Backend** | No requiere servidor ni base de datos |

El contenido del perfil vive en un único archivo (`frontend/src/data/perfil.js`) y los proyectos se cargan desde `frontend/public/proyectos.json`. La capa de datos se resuelve con un módulo de Rust compilado a WebAssembly, que hace la petición `fetch` y entrega el JSON a Vue.

---

## Características

- **One-page con navegación por anclas**: inicio, sobre mí, proyectos, skills, experiencia y contacto, con scroll-spy y menú móvil.
- **Catálogo de proyectos reales** con descripción, stack, enlace a la demo, enlace opcional al código y captura optimizada.
- **Filtro por tecnología** generado dinámicamente a partir de los proyectos cargados.
- **Animaciones de entrada al hacer scroll** mediante una directiva propia (`v-reveal`) basada en `IntersectionObserver`.
- **Tilt 3D** en las tarjetas de proyecto, activo solo con ratón y desactivado en pantallas táctiles.
- **Carga de datos vía WebAssembly**: `wasm-bindgen` + `web-sys` realizan la petición del JSON desde Rust.
- **Estados explícitos** de carga, error y reintento en la sección de proyectos.
- **Diseño responsive** probado a 390, 768 y 1440 px, sin desbordamiento horizontal.
- **Accesibilidad**: HTML semántico, enlace “Saltar al contenido”, foco visible, etiquetas ARIA y respeto por `prefers-reduced-motion`.
- **SEO y metadatos** básicos: `title`, `description`, Open Graph y `theme-color`.
- **Build 100 % estático**, desplegable en cualquier hosting de archivos.

---

## Stack

| Tecnología | Uso en el proyecto |
|---|---|
| **Vue 3** (`<script setup>`) | Componentes de la interfaz y estado reactivo. |
| **Vite 8** | Servidor de desarrollo, build y resolución de alias. |
| **Tailwind CSS 4** | Sistema de diseño, utilidades y responsive. |
| **Rust (edition 2021)** | Lógica de obtención del portafolio. |
| **WebAssembly + wasm-bindgen** | Puente entre Rust y JavaScript. |
| **web-sys / wasm-bindgen-futures** | `fetch` asíncrono desde Rust. |
| **pnpm 10** | Gestión de dependencias. |
| **GitHub Actions + Pages** | Compilación de Rust, build de Vite y publicación. |
| **ESLint / Oxlint / Prettier** | Calidad y formato del código. |

**Requisitos de entorno**

- Node.js `^22.18.0` o `>=24.12.0`
- pnpm 10
- Rust estable con el target `wasm32-unknown-unknown`
- `wasm-bindgen-cli` compatible con la versión de `wasm-bindgen` del proyecto

---

## Arquitectura

```
┌────────────────────────────────────────────────────────────┐
│ Vue 3                                                      │
│  ProjectsSection.vue                                       │
│    └─ useProyectos()                                       │
│         ├─ init()  ──► rust_api.js + rust_api_bg.wasm       │
│         └─ obtener_portafolio()                             │
└──────────────────────────┬─────────────────────────────────┘
                           │ llamada WASM
┌──────────────────────────▼─────────────────────────────────┐
│ Rust (rust-api/src/lib.rs)                                 │
│  web_sys::Request ──► fetch("./proyectos.json")             │
│  Response::json() ──► JsValue                              │
└──────────────────────────┬─────────────────────────────────┘
                           │ JSON
┌──────────────────────────▼─────────────────────────────────┐
│ frontend/public/proyectos.json                             │
│  → tarjetas, filtros y enlaces                             │
└────────────────────────────────────────────────────────────┘
```

La inicialización de Wasm se memoiza en `useProyectos.js`, de modo que el módulo se carga una sola vez durante toda la vida de la aplicación. Si la petición falla o el JSON no es un array, la interfaz muestra un mensaje de error y permite reintentar.

---

## Estructura del proyecto

```text
mi-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD: Rust + Vite → GitHub Pages
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── proyectos.json        # Datos de los proyectos
│   │   └── proyectos/            # Capturas optimizadas (JPEG)
│   ├── src/
│   │   ├── assets/               # CSS base, tema y logo
│   │   ├── components/           # Secciones y tarjetas
│   │   ├── composables/
│   │   │   └── useProyectos.js   # Init de Wasm + fetch + estados
│   │   ├── data/
│   │   │   └── perfil.js         # Perfil, contacto, skills y experiencia
│   │   ├── directives/
│   │   │   └── reveal.js         # Animación al entrar en viewport
│   │   ├── App.vue
│   │   └── main.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── rust-api/
│   ├── src/
│   │   └── lib.rs                # obtener_portafolio()
│   └── Cargo.toml
└── .gitignore
```

> `frontend/src/rust-pkg/` es código generado por `wasm-bindgen` y está ignorado por Git. Hay que generarlo antes del primer `pnpm dev`.

---

## Puesta en marcha

### 1. Clonar el repositorio

```bash
git clone https://github.com/srenerojasv/mi-portfolio.git
cd mi-portfolio
```

### 2. Preparar Rust y WebAssembly

```bash
rustup target add wasm32-unknown-unknown
cargo install wasm-bindgen-cli
```

### 3. Compilar el módulo Wasm

```bash
cargo build --manifest-path rust-api/Cargo.toml \
  --target wasm32-unknown-unknown --release

wasm-bindgen --target web \
  --out-dir frontend/src/rust-pkg \
  rust-api/target/wasm32-unknown-unknown/release/rust_api.wasm
```

> En PowerShell, usa Git Bash/WSL o ejecuta cada comando en una sola línea para evitar problemas con la continuación de línea `\`.

### 4. Instalar dependencias y arrancar

```bash
cd frontend
pnpm install
pnpm dev
```

El sitio queda disponible en:

```text
http://localhost:5173/mi-portfolio/
```

> Es importante mantener la barra final: Vite está configurado con `base: '/mi-portfolio/'` para que las rutas coincidan con GitHub Pages.

### Comandos disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Servidor de desarrollo con HMR. |
| `pnpm build` | Build de producción en `frontend/dist/`. |
| `pnpm preview` | Sirve el build local con la misma base. |
| `pnpm lint` | Ejecuta Oxlint y ESLint con corrección automática. |
| `pnpm format` | Formatea `src/` con Prettier. |

---

## Contenido y personalización

### Proyectos (`frontend/public/proyectos.json`)

El archivo es un array de objetos. Cada proyecto admite estos campos:

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `id` | `string` | Sí | Identificador único y estable. |
| `nombre` | `string` | Sí | Título visible de la tarjeta. |
| `descripcion` | `string` | Sí | Resumen del proyecto y sus funciones. |
| `tecnologias` | `string[]` | Sí | Alimenta el filtro por tecnología. |
| `url_proyecto` | `string` | Sí | Demo o sitio publicado. |
| `url_git` | `string` | No | Repositorio; añade el enlace “Código”. |
| `imagen` | `string` | Sí | Ruta pública de la captura. |

Ejemplo:

```json
{
  "id": "mi-proyecto",
  "nombre": "Mi Proyecto",
  "descripcion": "Una descripción breve, concreta y orientada a resultados.",
  "tecnologias": ["Vue 3", "Vite", "Tailwind CSS"],
  "url_proyecto": "https://mi-proyecto.vercel.app/",
  "url_git": "https://github.com/srenerojasv/mi-proyecto",
  "imagen": "/proyectos/mi-proyecto.jpg"
}
```

Notas:

- Las rutas de imagen son absolutas (`/proyectos/...`) y se prefijan en tiempo de ejecución con `import.meta.env.BASE_URL`, por lo que funcionan tanto en local como en GitHub Pages.
- También se admiten URLs externas (`https://...`) en `imagen`.
- El filtro se construye con la unión de todas las tecnologías. Si se elimina el proyecto que define el filtro activo, la vista vuelve a “Todas”.
- Al ser un archivo de `public/`, se puede editar sin recompilar el frontend.

### Capturas

- Formato recomendado: **JPEG**, 1200 × 750 px, calidad ~85.
- Peso orientativo: menos de 150 KB por imagen.
- Ubicación: `frontend/public/proyectos/`.
- Nombre de archivo estable, en minúsculas y sin espacios.

### Perfil (`frontend/src/data/perfil.js`)

Contiene los textos y datos que no dependen de los proyectos:

| Campo | Contenido |
|---|---|
| `nombre`, `nombreCorto` | Nombre completo y nombre visible en la cabecera. |
| `rol`, `ubicacion`, `disponibilidad` | Presentación principal. |
| `resumen`, `sobreMi`, `enfoque` | Bloques de texto de las secciones. |
| `email`, `github`, `linkedin` | Vías de contacto (los campos vacíos se ocultan). |
| `stack` | Tecnologías destacadas en el hero. |
| `pilares` | Tarjetas breves de enfoque técnico. |
| `skills` | Categorías e items de la sección de skills. |
| `experiencia` | Puestos, periodos, descripciones y logros. |

---

## Animaciones y accesibilidad

### `v-reveal`

Directiva registrada globalmente en `main.js`. Añade la clase `.reveal` al elemento montado y la clase `.is-visible` la primera vez que entra en el viewport, con un `IntersectionObserver` compartido (`threshold: 0.15`, `rootMargin: 0px 0px -60px 0px`). Admite un retraso en milisegundos:

```vue
<article v-reveal="indice * 80">...</article>
```

Se aplica a contenedores, no a las tarjetas que tienen tilt, para evitar conflictos entre transformaciones. Si el usuario tiene activado `prefers-reduced-motion: reduce`, la directiva no hace nada.

### Tilt 3D

`ProjectCard.vue` calcula la posición del puntero, actualiza las variables CSS `--giro-x` y `--giro-y` (máximo 8°) y restablece la transformación al salir. Solo se activa si:

- el dispositivo tiene hover y puntero fino (`hover: hover` y `pointer: fine`), y
- el usuario no ha pedido reducir el movimiento.

### Accesibilidad

- Enlace de salto al contenido principal.
- Secciones y encabezados con jerarquía semántica.
- Controles con etiquetas `aria-label` cuando el texto visible no es suficiente.
- Estados de foco visibles.
- Movimiento opcional y desactivado por preferencia del usuario.
- Contraste y tamaños de texto revisados en los tres anchos de referencia.

---

## Despliegue

El flujo de GitHub Actions vive en `.github/workflows/deploy.yml` y se ejecuta en cada push a `main` (también admite `workflow_dispatch`).

Pasos del workflow:

1. Descarga el código.
2. Instala el target `wasm32-unknown-unknown` y `wasm-bindgen-cli`.
3. Compila `rust-api` y genera `frontend/src/rust-pkg`.
4. Configura pnpm 10 y Node.js 22.
5. Ejecuta `pnpm install` y `pnpm build` dentro de `frontend/`.
6. Publica `frontend/dist` como artefacto de GitHub Pages.

Configuración necesaria en el repositorio:

- **Settings → Pages → Source**: *GitHub Actions*.
- **Settings → Actions → General → Workflow permissions**: lectura de contenidos y escritura en Pages (el propio workflow declara `contents: read`, `pages: write`, `id-token: write`).

### Cambiar de repositorio o dominio

`frontend/vite.config.js` define `base: '/mi-portfolio/'`. Si el repositorio cambia de nombre, actualiza ese valor para que los assets y las rutas de las imágenes sigan resolviéndose correctamente.

---

## Decisiones técnicas

- **Rust/Wasm como capa de datos**: el proyecto funciona sin backend y demuestra una integración real entre Rust, WebAssembly y Vue. La lógica de red queda fuera de los componentes.
- **JSON estático en `public/`**: permite actualizar proyectos sin tocar código ni recompilar.
- **Sin router**: es una one-page; el estado de navegación se resuelve con anclas y scroll-spy.
- **Sin dependencias de UI**: los componentes y estilos propios mantienen el bundle pequeño y el control del diseño.
- **Wasm generado, no versionado**: evita binarios obsoletos en el repositorio y garantiza que CI compile siempre desde la fuente Rust.

---

## Autor

**Samuel René Rojas Villamarín**
Desarrollador Full Stack · Castilleja de la Cuesta, Sevilla, España

- GitHub: [@srenerojasv](https://github.com/srenerojasv)
- LinkedIn: [samuel-rene-rojas-villamarin](https://www.linkedin.com/in/samuel-rene-rojas-villamarin/)
- Email: [srene.rojasv@gmail.com](mailto:srene.rojasv@gmail.com)

---

## Licencia

Código y contenido © Samuel René Rojas Villamarín. Este repositorio se publica con fines de portafolio; no se concede una licencia de código abierto. Las capturas de proyectos pertenecen a sus respectivos sitios.
