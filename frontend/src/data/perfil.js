// Edita este archivo para personalizar el contenido de tu portafolio.
// Los campos vacíos (email, linkedin) se ocultan automáticamente en la interfaz.
export const perfil = {
  nombre: 'Samuel René Rojas Villamarín',
  nombreCorto: 'Samuel Rojas',
  rol: 'Desarrollador Full Stack',
  ubicacion: 'Castilleja de la Cuesta, Sevilla, España',
  disponibilidad: 'Disponible para nuevos proyectos',
  resumen:
    'Desarrollo productos web de punta a punta: landings de marca, SaaS multitenant, puntos de venta y PWAs. Combino interfaces cuidadas con lógica de cliente rápida y despliegues estáticos.',
  email: 'srene.rojasv@gmail.com',
  github: 'https://github.com/srenerojasv',
  linkedin: 'https://www.linkedin.com/in/samuel-rene-rojas-villamarin/',

  stack: ['Vue 3', 'React', 'Next.js', 'Rust + Wasm', 'Tailwind CSS'],

  pilares: [
    { titulo: 'Wasm', detalle: 'Lógica en el cliente' },
    { titulo: 'Estático', detalle: 'Sin servidor ni base de datos' },
    { titulo: 'GitHub Pages', detalle: 'Despliegue automático' },
  ],

  sobreMi: [
    'Soy desarrollador web y disfruto convertir ideas en productos completos: desde una landing de marca hasta una plataforma SaaS con agenda, inventario o cobros. Me interesa especialmente el rendimiento: cada kilobyte y cada render cuentan.',
    'He construido landings corporativas, un SaaS multitenant para negocios de servicios, un punto de venta con acceso biométrico, dashboards con Supabase y varias PWAs. Este portafolio es también un experimento: Vue 3 para la interfaz, Tailwind para el diseño y Rust compilado a WebAssembly para la lógica de datos.',
  ],

  enfoque: [
    'Interfaces accesibles y responsive desde el primer boceto.',
    'Código mantenible, tipado cuando aporta y bien organizado.',
    'Rendimiento medible: menos JavaScript, mejores métricas.',
  ],

  skills: [
    {
      icono: '🎨',
      categoria: 'Frontend',
      items: ['Vue 3', 'JavaScript', 'HTML semántico', 'Tailwind CSS', 'Vite', 'CSS moderno'],
    },
    {
      icono: '⚙️',
      categoria: 'Backend & Datos',
      items: ['Rust', 'WebAssembly', 'Node.js', 'APIs REST', 'JSON', 'SQL'],
    },
    {
      icono: '🛠️',
      categoria: 'Herramientas',
      items: ['Git', 'GitHub Actions', 'pnpm', 'ESLint', 'Prettier', 'Figma'],
    },
  ],

  experiencia: [
    {
      puesto: 'Portafolio con Rust + WebAssembly',
      empresa: 'Proyecto personal',
      periodo: '2026',
      descripcion:
        'Landing dinámica que carga su contenido a través de un módulo de Rust compilado a WebAssembly.',
      logros: [
        'Integración de wasm-bindgen con Vue 3 y Vite sin dependencias de backend.',
        'Pipeline de CI/CD que compila Rust y publica en GitHub Pages en cada push.',
        'Diseño responsive con Tailwind v4 y manejo explícito de estados de carga y error.',
      ],
    },
  ],
}
