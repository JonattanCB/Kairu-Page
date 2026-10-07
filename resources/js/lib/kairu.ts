export const siteConfig = {
    name: 'Kairu',
    title: 'Kairu | Desarrollo de software en Perú',
    description: 'Software pensado para hacer el trabajo más simple.',
    location: 'Chimbote, Áncash, Perú',
    whatsappMessage:
        'Hola Kairu, quisiera información sobre una solución de software para mi negocio.',
};

export type ContactConfig = {
    email: string;
    whatsapp: string;
    socials: Record<string, string>;
};

export function whatsappUrl(contact?: ContactConfig, customMessage?: string) {
    const rawNumber = contact?.whatsapp || '51991886936';
    const cleanNumber = rawNumber.replace(/\D/g, '');
    const message = customMessage || siteConfig.whatsappMessage;
    return cleanNumber
        ? `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
        : '#contacto';
}

export const navigation = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Reseñas', href: '#resenas' },
];

export const services = [
    {
        title: 'Sistemas empresariales',
        description:
            'Ventas, inventarios, clientes, operaciones, reportes y administración.',
        detail: 'Tu operación, en un mismo lugar.',
        type: 'Sistema empresarial',
    },
    {
        title: 'Desarrollo web',
        description:
            'Plataformas empresariales y aplicaciones web rápidas, modernas y adaptables.',
        detail: 'Accesible desde donde trabajes.',
        type: 'Desarrollo web',
    },
    {
        title: 'Aplicaciones móviles',
        description:
            'Aplicaciones para clientes, colaboradores y operaciones internas.',
        detail: 'Tu negocio también se mueve.',
        type: 'Aplicación móvil',
    },
    {
        title: 'Software a medida',
        description:
            'Soluciones construidas alrededor de los procesos reales de cada empresa.',
        detail: 'Diseñado para tu forma de trabajar.',
        type: 'Software a medida',
    },
];

export const serviceOptions = [
    'Sistema empresarial',
    'Desarrollo web',
    'Aplicación móvil',
    'Software a medida',
    'Automatización',
    'Otro',
];

export const principles = [
    {
        title: 'Simple',
        description:
            'Menos pasos, menos fricción y herramientas fáciles de entender.',
    },
    {
        title: 'Adaptable',
        description:
            'Empieza con lo que necesitas y evoluciona conforme tu negocio crece.',
    },
    {
        title: 'Cuidado',
        description:
            'Cada interacción, pantalla y detalle tiene una razón de existir.',
    },
];

export const processSteps = [
    {
        title: 'Entendemos',
        description: 'Primero conocemos cómo funciona actualmente tu negocio.',
    },
    {
        title: 'Diseñamos',
        description: 'Buscamos la forma más sencilla de resolver el problema.',
    },
    {
        title: 'Construimos',
        description: 'Desarrollamos una solución clara, rápida y escalable.',
    },
    {
        title: 'Lanzamos',
        description: 'Implementamos el software y acompañamos su adopción.',
    },
    {
        title: 'Evolucionamos',
        description:
            'Incorporamos nuevas capacidades cuando realmente sean necesarias.',
    },
];

export const demos = [
    {
        id: 'escuela',
        category: 'EDUCACIÓN · GESTIÓN ESCOLAR',
        title: 'AulaMental — Gestión Escolar',
        description:
            'Plataforma integral para colegios: control de asistencia diaria, horarios interactivos, directorio docente, alumnos y comunicados escolares.',
        label: 'Gestión escolar clara y organizada para directivos, docentes y familias.',
    },
    {
        id: 'terapiq',
        category: 'SALUD MENTAL · CONSULTA CLÍNICA',
        title: 'TerapiQ — Gestión para Psicólogos',
        description:
            'Software clínico especializado: agenda médica, expediente confidencial de pacientes, historial clínico por sesiones y métricas de consultorio.',
        label: 'Consultas al día, pacientes en seguimiento continuo y evolución clínica estructurada.',
    },
] as const;

export type DemoKind = (typeof demos)[number]['id'];
