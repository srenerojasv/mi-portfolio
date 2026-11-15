# Frontend — Mi Portafolio

Aplicación **Vue 3 + Vite 8 + Tailwind CSS 4** del portafolio. Consume el módulo de Rust/WebAssembly generado en `../rust-api` y carga los proyectos desde `public/proyectos.json`.

La documentación completa del proyecto está en el [README principal](../README.md).

## Requisito previo

El módulo Wasm (`src/rust-pkg/`) se genera con `wasm-bindgen` y no se versiona. Antes del primer arranque, sigue los pasos de compilación del README principal.

## Comandos

```bash
pnpm install
pnpm dev      # http://localhost:5173/mi-portfolio/
pnpm build    # dist/
pnpm preview
pnpm lint
pnpm format
```

## Variables de entorno

No se requieren variables de entorno ni servicios externos. El sitio se publica como build estático.
