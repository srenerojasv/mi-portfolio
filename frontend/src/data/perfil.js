// Edita este archivo para personalizar el contenido de tu portafolio.
// Los campos vacíos (email, linkedin) se ocultan automáticamente en la interfaz.
export const perfil = {
  nombre: 'Samuel René Rojas Villamarín',
  nombreCorto: 'Samuel Rojas',
  rol: 'Desarrollador Full Stack',
  ubicacion: 'Castilleja de la Cuesta, Sevilla, España',
  disponibilidad: 'Disponible para nuevos proyectos',
  resumen:
    'Desarrollo productos web de punta a punta: interfaces cuidadas, lógica de cliente rápida y backend con Supabase y Stripe. Trabajo con autenticación, PostgreSQL, RLS, Storage y Edge Functions, además de despliegues estáticos y CI/CD.',
  email: 'srene.rojasv@gmail.com',
  github: 'https://github.com/srenerojasv',
  linkedin: 'https://www.linkedin.com/in/samuel-rene-rojas-villamarin/',

  stack: ['Vue 3', 'React', 'Next.js', 'Supabase', 'Stripe', 'Rust + Wasm'],

  pilares: [
    { titulo: 'Frontend', detalle: 'Vue, React y Next.js' },
    { titulo: 'Backend', detalle: 'Supabase + PostgreSQL' },
    { titulo: 'Pagos', detalle: 'Stripe Checkout' },
  ],

  sobreMi: [
    'Soy desarrollador web y disfruto convertir ideas en productos completos: desde una landing de marca hasta una plataforma SaaS con agenda, inventario o cobros. Me interesa especialmente el rendimiento: cada kilobyte y cada render cuentan.',
    'He construido landings corporativas, un SaaS multitenant para negocios de servicios, un punto de venta con acceso biométrico y varias PWAs. En el backend he trabajado con Supabase Auth, PostgreSQL con políticas RLS, almacenamiento de archivos (logos y comprobantes de pago) y Edge Functions en Deno; también he integrado Stripe Checkout para cobros en línea. Este portafolio es también un experimento: Vue 3 para la interfaz, Tailwind para el diseño y Rust compilado a WebAssembly para la lógica de datos.',
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
      items: [
        'Supabase',
        'PostgreSQL',
        'Supabase Auth',
        'RLS',
        'Supabase Storage',
        'Edge Functions (Deno)',
        'Stripe Checkout',
        'Node.js',
        'APIs REST',
        'SQL',
        'Rust + Wasm',
      ],
    },
    {
      icono: '🛠️',
      categoria: 'Herramientas',
      items: ['Git', 'GitHub Actions', 'pnpm', 'ESLint', 'Prettier', 'Figma'],
    },
  ],

  experiencia: [
    {
      puesto: 'PideTuCita — SaaS de citas',
      empresa: 'Proyecto personal',
      periodo: '2026',
      descripcion:
        'Plataforma SaaS multitenant para negocios de servicios, con onboarding de cada negocio y gestión de agenda, personal e inventario.',
      logros: [
        'Modelo de datos multitenant en PostgreSQL (Supabase) con una función RPC que inserta en lote la configuración inicial de cada negocio.',
        'Bucket de Storage «tenant-assets» para logos y comprobantes de pago, con subida desde el onboarding y generación de URLs públicas.',
        'Ruta API en servidor con service role para registrar leads, separando el acceso privilegiado del código que corre en el cliente.',
      ],
    },
    {
      puesto: 'Luluvi Contigo — Sorteos',
      empresa: 'Proyecto personal',
      periodo: '2026',
      descripcion:
        'Landing de sorteo con compra de boletos y pago en línea mediante Stripe Checkout.',
      logros: [
        'Edge Function en Deno («create-checkout») que crea la sesión de pago de Stripe con el precio y las URLs de retorno.',
        'Invocación desde el frontend con «supabase.functions.invoke» y redirección a Stripe; estados de pago («pendiente_stripe», «pago_verificando») persistidos en la base de datos.',
        'Panel de administración para revisar referencias y verificar cada pago antes de validar la participación.',
      ],
    },
    {
      puesto: 'E-MANAGEMENT PRO — Gestión 360',
      empresa: 'Proyecto personal',
      periodo: '2026',
      descripcion:
        'Suite de gestión empresarial con dashboard, visión general, tareas y administración de equipos.',
      logros: [
        'Autenticación con Supabase Auth y sesión persistente en una PWA.',
        'Tablas y consultas en PostgreSQL para tareas, perfiles, asignaciones y notas.',
        'Políticas RLS para restringir el acceso a usuarios autenticados y proteger los datos de la aplicación.',
      ],
    },
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
