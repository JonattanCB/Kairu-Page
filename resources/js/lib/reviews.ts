export type ClientReview = {
    id: string;
    name: string;
    role?: string;
    company?: string;
    location?: string;
    quote: string;
    rating?: 1 | 2 | 3 | 4 | 5;
    isExample?: boolean;
};

export const clientReviews: ClientReview[] = [
    {
        id: "distribucion-norte",
        name: "Carlos Mendoza",
        role: "Gerente de Operaciones",
        location: "Chimbote",
        quote: "Teníamos desorden con las rutas y el stock diario. Kairu nos desarrolló un sistema web y móvil que sincronizó los pedidos en tiempo real. Ahora los repartidores actualizan entregas al instante y el almacén está 100% coordinado.",
        rating: 5,
    },
    {
        id: "instituto-futuro",
        name: "Mariana Vega",
        role: "Directora Académica",
        location: "Lima",
        quote: "Buscábamos una plataforma para gestionar alumnos, asistencias y pagos que no fuera complicada. El equipo de Kairu entendió nuestra necesidad desde el primer día y nos entregó una solución intuitiva que los docentes aprendieron a usar de inmediato.",
        rating: 5,
    },
    {
        id: "comercial-retail",
        name: "Renzo Palacios",
        role: "Administrador General",
        location: "Lima",
        quote: "El sistema de ventas y facturación superó nuestras expectativas. Es sumamente ágil, no se cuelga en horas punta y nos da reportes diarios precisos. El acompañamiento y soporte que nos brindaron fue de primer nivel.",
        rating: 5,
    },
    {
        id: "almacenes-ancash",
        name: "Sofía Carranza",
        role: "Jefa de Logística",
        location: "Chimbote",
        quote: "Lo que más valoramos fue la claridad en cada paso. Íbamos probando el sistema mientras lo construían y se adaptaron exactamente a cómo operamos. Hoy nuestra logística de despacho es un 40% más rápida.",
        rating: 5,
    },
    {
        id: "gastronomia-pacifico",
        name: "Diego Alarcón",
        role: "Director Comercial",
        location: "Trujillo",
        quote: "Desarrollaron nuestra plataforma de pedidos y la web corporativa. La velocidad de carga en teléfonos y la sencillez para hacer pedidos nos ayudaron a aumentar las ventas directas y mejorar la experiencia de nuestros clientes.",
        rating: 5,
    },
];

export const reviewExamples = clientReviews;
