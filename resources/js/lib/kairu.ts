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

export function whatsappUrl(contact?: ContactConfig) {
    const rawNumber = contact?.whatsapp || '51991886936';
    const cleanNumber = rawNumber.replace(/\D/g, '');
    return cleanNumber
        ? `https://wa.me/${cleanNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
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
        id: 'distribution',
        category: 'OPERACIONES · WEB + MÓVIL',
        title: 'Sistema de distribución',
        description:
            'Aplicación móvil y panel administrativo para organizar pedidos y operaciones.',
        label: 'Pedidos en orden. Entregas bajo control.',
    },
    {
        id: 'education',
        category: 'EDUCACIÓN · PLATAFORMA WEB',
        title: 'Plataforma educativa',
        description:
            'Gestión de alumnos, clases, contenido y administración en un mismo espacio.',
        label: 'Más espacio para aprender.',
    },
    {
        id: 'commerce',
        category: 'GESTIÓN · SISTEMA EMPRESARIAL',
        title: 'Sistema comercial',
        description:
            'Ventas, clientes, inventarios y reportes centralizados para el trabajo diario.',
        label: 'La información que necesitas, a mano.',
    },
] as const;

export type DemoKind = (typeof demos)[number]['id'];
