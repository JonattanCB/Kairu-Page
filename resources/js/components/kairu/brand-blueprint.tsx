import { animate } from 'animejs';
import { Check, Monitor, Wifi } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const modules = [
    {
        name: 'Ventas',
        title: 'Tus ventas, al día.',
        label: 'Ventas del mes',
        value: 'S/ 24,580',
        detail: '148 ventas registradas',
        rows: ['Venta #1048', 'Venta #1047', 'Venta #1046'],
        statuses: ['Pagada', 'Pagada', 'Pagada'],
        bars: [35, 56, 43, 72, 62, 91],
    },
    {
        name: 'Pedidos',
        title: 'Cada pedido en orden.',
        label: 'Pedidos en curso',
        value: '24',
        detail: '8 listos para entregar',
        rows: ['Pedido #2048', 'Pedido #2047', 'Pedido #2046'],
        statuses: ['En preparación', 'Listo', 'Entregado'],
        bars: [68, 45, 77, 54, 85, 65],
    },
    {
        name: 'Inventario',
        title: 'Todo en su lugar.',
        label: 'Productos disponibles',
        value: '386',
        detail: '12 productos repuestos',
        rows: ['Cuaderno A5', 'Mochila urbana', 'Botella térmica'],
        statuses: ['48 unidades', '26 unidades', '64 unidades'],
        bars: [78, 59, 87, 42, 69, 82],
    },
];

type Module = (typeof modules)[number];

function Program({
    module,
    compact = false,
}: {
    module: Module;
    compact?: boolean;
}) {
    return (
        <div className={`connected-program ${compact ? 'program-mobile' : ''}`}>
            <div className="program-top">
                <strong>Mi negocio</strong>
                <Wifi aria-hidden="true" />
            </div>
            <div className="program-workspace">
                {!compact && (
                    <div className="program-sidebar">
                        {modules.map((item) => (
                            <span
                                key={item.name}
                                className={
                                    item.name === module.name ? 'selected' : ''
                                }
                            >
                                {item.name}
                            </span>
                        ))}
                    </div>
                )}
                <div className="program-content">
                    <div className="program-module" data-module-content>
                        <p className="program-breadcrumb">
                            Mi negocio / {module.name}
                        </p>
                        <h3>{module.title}</h3>
                        <div className="program-metric">
                            <span>{module.label}</span>
                            <strong>{module.value}</strong>
                            <small>{module.detail}</small>
                        </div>
                        {!compact && (
                            <div className="program-chart" aria-hidden="true">
                                {module.bars.map((height, i) => (
                                    <span
                                        key={i}
                                        style={{ height: `${height}%` }}
                                    />
                                ))}
                            </div>
                        )}
                        <div className="program-rows">
                            {module.rows.slice(0, 2).map((row, i) => (
                                <div key={row}>
                                    <span>{row}</span>
                                    <small>{module.statuses[i]}</small>
                                    <Check aria-hidden="true" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Screen({
    index,
    compact = false,
}: {
    index: number;
    compact?: boolean;
}) {
    return (
        <div className="program-crossfade">
            <div className="program-layer program-layer-current">
                <Program module={modules[index]} compact={compact} />
            </div>
            <div className="program-layer program-layer-previous">
                <Program
                    module={
                        modules[(index + modules.length - 1) % modules.length]
                    }
                    compact={compact}
                />
            </div>
        </div>
    );
}

export function BrandBlueprint() {
    const root = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const [reduced, setReduced] = useState(true);
    const [visible, setVisible] = useState(false);
    const [tabVisible, setTabVisible] = useState(true);
    const lastAnimatedIndex = useRef(0);

    useEffect(() => {
        const preference = matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setReduced(preference.matches);
        const syncTab = () => setTabVisible(!document.hidden);
        sync();
        syncTab();
        preference.addEventListener('change', sync);
        document.addEventListener('visibilitychange', syncTab);
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.2 },
        );
        if (root.current) observer.observe(root.current);
        return () => {
            preference.removeEventListener('change', sync);
            document.removeEventListener('visibilitychange', syncTab);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (reduced || !visible || !tabVisible) return;
        const timer = window.setInterval(
            () => setIndex((current) => (current + 1) % modules.length),
            6500,
        );
        return () => window.clearInterval(timer);
    }, [reduced, visible, tabVisible, index]);

    useEffect(() => {
        if (reduced || !root.current || lastAnimatedIndex.current === index)
            return;
        lastAnimatedIndex.current = index;
        const outgoing = animate(
            root.current.querySelectorAll('.program-layer-previous'),
            {
                opacity: [1, 0],
                duration: 700,
                ease: 'linear',
            },
        );
        return () => {
            outgoing.revert();
        };
    }, [index, reduced]);

    return (
        <div
            ref={root}
            className="brand-blueprint connected-demo"
            role="region"
            aria-label="Demo con datos de ejemplo: programas conectados en escritorio, MacBook y móvil"
        >
            <div className="connected-stage" aria-hidden="true">
                <div className="connected-desktop blueprint-face">
                    <div className="desktop-frame">
                        <Screen index={index} />
                    </div>
                    <div className="desktop-chin">
                        <Monitor />
                    </div>
                    <div className="desktop-stand" />
                    <div className="desktop-foot" />
                </div>
                <div className="connected-macbook blueprint-depth">
                    <div className="macbook-lid">
                        <div className="macbook-camera" />
                        <Screen index={index} />
                    </div>
                    <div className="macbook-base">
                        <span />
                    </div>
                </div>
                <div className="connected-phone blueprint-depth">
                    <div className="phone-island" />
                    <Screen index={index} compact />
                    <div className="connected-home" />
                </div>
            </div>
        </div>
    );
}
