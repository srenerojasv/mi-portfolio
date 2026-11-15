// Edita este archivo para personalizar el contenido de tu portafolio.
// Los campos vacíos (email, linkedin) se ocultan automáticamente en la interfaz.
export const perfil = {
  nombre: 'Samuel René Rojas Villamarín',
  nombreCorto: 'Samuel Rojas',
  rol: 'Desarrollador Full Stack',
  ubicacion: 'Castilleja de la Cuesta, Sevilla, España',
  disponibilidad: 'Disponible para nuevos proyectos',
  resumen:
    'Con más de 30 años en tecnología, desarrollo y despliego productos web de punta a punta: frontend, backend con Supabase y Stripe, CI/CD, y automatización de procesos con IA, PLC y CODESYS.',
  email: 'srene.rojasv@gmail.com',
  github: 'https://github.com/srenerojasv',
  linkedin: 'https://www.linkedin.com/in/samuel-rene-rojas-villamarin/',

  stack: [
    'Vue 3',
    'React',
    'Next.js',
    'Supabase',
    'Stripe',
    'Vercel',
    'GitHub Actions',
    'Rust + Wasm',
    'IA aplicada',
    'PLC · CODESYS',
  ],

  pilares: [
    { titulo: 'Frontend', detalle: 'Vue, React y Next.js' },
    { titulo: 'Backend & Pagos', detalle: 'Supabase · PostgreSQL · Stripe' },
    { titulo: 'Despliegue', detalle: 'Vercel · GitHub Pages · CI/CD' },
    { titulo: 'IA aplicada', detalle: 'ChatGPT · Gemini · Claude · Qwen' },
    { titulo: 'Automatización industrial', detalle: 'PLC · CODESYS' },
    { titulo: 'Análisis de datos', detalle: 'SQL · Reportes · Mejora de procesos' },
  ],

  sobreMi: [
    'Soy desarrollador web con más de 30 años de experiencia en tecnología. Empecé en soporte técnico, redes, servidores y bases de datos, y hoy construyo productos completos: desde una landing de marca hasta una plataforma SaaS con agenda, inventario o cobros. Me interesa especialmente el rendimiento: cada kilobyte y cada render cuentan.',
    'He construido landings corporativas, un SaaS multitenant para negocios de servicios, un punto de venta con acceso biométrico y varias PWAs. En el backend he trabajado con Supabase Auth, PostgreSQL con políticas RLS, almacenamiento de archivos (logos y comprobantes de pago) y Edge Functions en Deno; también he integrado Stripe Checkout para cobros en línea. En despliegue trabajo con GitHub para el control de versiones, Vercel para las aplicaciones y GitHub Pages + GitHub Actions para sitios estáticos y builds automatizados. Este portafolio es también un experimento: Vue 3 para la interfaz, Tailwind para el diseño y Rust compilado a WebAssembly para la lógica de datos.',
    'Mi experiencia previa en soporte, infraestructura, análisis de datos y automatización industrial (PLC, CODESYS) me enseñó a entender cómo funciona un negocio antes de escribir código. Esa base me permite adaptarme a procesos distintos, detectar cuellos de botella y automatizarlos con soluciones a medida, de forma efectiva y oportuna. Hoy incorporo IA generativa —ChatGPT, Gemini, Claude, Claude Code, Grok y Qwen— al análisis, la documentación, el prototipado y la automatización.',
  ],

  enfoque: [
    'Interfaces accesibles y responsive desde el primer boceto.',
    'Código mantenible, tipado cuando aporta y bien organizado.',
    'Rendimiento medible: menos JavaScript, mejores métricas.',
    'Despliegue continuo: de GitHub a Vercel o GitHub Pages sin pasos manuales.',
    'Automatización de procesos e industrial: PLC, CODESYS y lógica de control para reducir trabajo manual y mejorar tiempos.',
    'IA aplicada: uso ChatGPT, Gemini, Claude, Claude Code, Grok y Qwen para analizar, documentar y acelerar la entrega.',
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
        'Análisis de datos',
        'Automatización de procesos',
        'Rust + Wasm',
      ],
    },
    {
      icono: '🏭',
      categoria: 'Automatización Industrial',
      items: [
        'PLC',
        'CODESYS',
        'Automatización industrial',
        'Lógica de control',
        'Mejora de procesos',
        'Análisis de datos',
      ],
    },
    {
      icono: '🚀',
      categoria: 'Despliegue & DevOps',
      items: ['Git', 'GitHub', 'GitHub Actions', 'Vercel', 'GitHub Pages', 'CI/CD'],
    },
    {
      icono: '🤖',
      categoria: 'IA & Herramientas',
      items: [
        'ChatGPT',
        'Gemini',
        'Claude',
        'Claude Code',
        'Grok',
        'Qwen',
        'pnpm',
        'ESLint',
        'Prettier',
        'Figma',
      ],
    },
  ],

  experiencia: [
    {
      puesto: 'Desarrollador Full Stack & Consultor',
      empresa: 'Freelance / Consultoría internacional',
      periodo: '2024 — presente',
      descripcion:
        'Diseño, desarrollo y despliegue de plataformas web, e-commerce y PWAs para clientes internacionales, con frontend moderno y backend en Supabase.',
      logros: [
        'PideTuCita: SaaS multitenant en Next.js con PostgreSQL, RPC de onboarding, bucket de Storage «tenant-assets» para logos y comprobantes de pago, y API route con service role.',
        'Luluvi Contigo: Edge Function en Deno («create-checkout») que crea sesiones de Stripe Checkout y persiste los estados de pago para su verificación.',
        'E-MANAGEMENT PRO: autenticación con Supabase Auth, PostgreSQL y políticas RLS para proteger los datos.',
        'Otros proyectos: Luluvi (marca personal con i18n y PWA), Bazar Cristina (punto de venta con acceso biométrico), KFEXITO (landing corporativa), Quiniela Mundial 2026 (PWA de pronósticos) y este portafolio (Vue 3 + Rust/Wasm, publicado en GitHub Pages).',
        'Automatización de procesos y análisis de datos para clientes, con IA generativa como apoyo en documentación, prototipado y resolución de problemas.',
        'Despliegue continuo: Vercel para las aplicaciones, GitHub Pages para sitios estáticos y GitHub Actions para automatizar builds y publicaciones.',
        'PWAs con soporte offline y optimización de Web Vitals.',
      ],
    },
    {
      puesto: 'Desarrollador de Software',
      empresa: 'Tractopipe',
      periodo: '2023 — 2024',
      descripcion:
        'Software de alta precisión para procesar, visualizar y analizar datos de protección catódica en la industria petrolera y de ductos.',
      logros: [
        'Algoritmos para interpretar automáticamente métricas de protección de infraestructura crítica.',
        'Optimización del procesamiento de grandes volúmenes de datos industriales y de la generación de reportes.',
      ],
    },
    {
      puesto: 'Desarrollador Full Stack',
      empresa: 'JR MOTOS',
      periodo: '2021 — 2023',
      descripcion:
        'Ecosistema digital interno para inventario, compras y gestión de clientes en el sector de la motocicleta.',
      logros: [
        'CRM interno y sistema automatizado de control de inventario y compras, desarrollados desde cero.',
        'Integración de pasarelas de pago web y arquitectura de base de datos para stock y transacciones.',
      ],
    },
    {
      puesto: 'Desarrollador Web Front-End / Diseñador UI',
      empresa: 'COVICSAN',
      periodo: '2019 — 2021',
      descripcion:
        'Diseño y desarrollo del ecosistema digital corporativo, con foco en la tienda en línea y la identidad visual.',
      logros: [
        'Tienda en línea oficial desarrollada desde cero y optimizada para conversión.',
        'Diseño UI/UX, recursos gráficos y presencia digital de la marca.',
      ],
    },
    {
      puesto: 'Desarrollador Web & Diseñador Digital',
      empresa: 'E-MAX',
      periodo: '2018 — 2019',
      descripcion: 'Desarrollo web y estrategia de identidad digital para la marca.',
      logros: [
        'Tienda en línea completa con WordPress, HTML y CSS.',
        'Optimización de velocidad de carga y visualización en dispositivos móviles.',
      ],
    },
    {
      puesto: 'Sistemas, infraestructura, automatización y desarrollo a medida',
      empresa: 'Cencob · Grupo Ruvemaca · Transporte Hermanos García · CADELA',
      periodo: '1993 — 2018',
      descripcion:
        'Base técnica de 25 años en soporte, redes, servidores, bases de datos, automatización industrial y desarrollo de sistemas para empresas de seguros, cobranza y transporte.',
      logros: [
        'Administración de bases de datos MySQL de alta transaccionalidad y plataformas web de cobranza para aseguradoras.',
        'Redes LAN/WAN para 14 sedes, servidores Linux y telefonía IP (Asterisk/Elastix).',
        'Automatización industrial con PLC y CODESYS en proyectos de control de procesos y mejora operativa.',
        'Desarrollo de sistemas a medida en Clipper y dBase, y coordinación de equipos de soporte de niveles 1 a 3.',
        'Automatización de procesos administrativos y de cobranza, y análisis de datos operativos para detectar cuellos de botella y mejorar tiempos.',
      ],
    },
  ],
}
