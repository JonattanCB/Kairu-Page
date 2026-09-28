import {
    ArrowUpRight,
    BarChart3,
    Bell,
    Box,
    Check,
    ChevronDown,
    CircleHelp,
    GraduationCap,
    LayoutDashboard,
    MoreHorizontal,
    Package,
    Search,
    Settings2,
    ShoppingBag,
    Truck,
    Users,
} from "lucide-react";
import { useState } from "react";
import type { DemoKind } from "@/lib/kairu";
import { cn } from "@/lib/utils";
import { KairuLogo } from "./primitives";

const demoRows = {
    commerce: [
        {
            label: "Pedido #0048",
            detail: "Venta online",
            status: "Completado",
            amount: "S/ 240.00",
        },
        {
            label: "Pedido #0047",
            detail: "Venta en tienda",
            status: "Completado",
            amount: "S/ 185.00",
        },
        {
            label: "Pedido #0046",
            detail: "Venta online",
            status: "En proceso",
            amount: "S/ 320.00",
        },
    ],
    distribution: [
        {
            label: "Ruta norte",
            detail: "Pedido #0012",
            status: "En camino",
            amount: "09:30",
        },
        {
            label: "Ruta centro",
            detail: "Pedido #0011",
            status: "Entregado",
            amount: "10:15",
        },
        {
            label: "Ruta sur",
            detail: "Pedido #0010",
            status: "Preparando",
            amount: "11:00",
        },
    ],
    education: [
        {
            label: "Diseño de interfaces",
            detail: "Módulo 01",
            status: "Disponible",
            amount: "6 clases",
        },
        {
            label: "Fundamentos web",
            detail: "Módulo 02",
            status: "En curso",
            amount: "8 clases",
        },
        {
            label: "Proyecto práctico",
            detail: "Módulo 03",
            status: "Disponible",
            amount: "4 clases",
        },
    ],
};

export function DashboardPreview({
    kind = "commerce",
    interactive = false,
}: {
    kind?: DemoKind;
    interactive?: boolean;
}) {
    const [view, setView] = useState("Resumen");
    const [selected, setSelected] = useState<string | null>(null);
    const isEducation = kind === "education";
    const isDistribution = kind === "distribution";
    const sections = [
        { label: "Resumen", icon: LayoutDashboard },
        {
            label: isEducation ? "Clases" : "Pedidos",
            icon: isEducation ? GraduationCap : ShoppingBag,
        },
        {
            label: isEducation ? "Alumnos" : "Inventario",
            icon: isEducation ? Users : Box,
        },
    ];
    const rows =
        view === "Inventario"
            ? [
                  {
                      label: "Producto A",
                      detail: "SKU-001",
                      status: "Disponible",
                      amount: "48 unid.",
                  },
                  {
                      label: "Producto B",
                      detail: "SKU-002",
                      status: "Disponible",
                      amount: "26 unid.",
                  },
                  {
                      label: "Producto C",
                      detail: "SKU-003",
                      status: "Stock bajo",
                      amount: "3 unid.",
                  },
              ]
            : view === "Alumnos"
              ? [
                    {
                        label: "Alumno de ejemplo 01",
                        detail: "Diseño de interfaces",
                        status: "En curso",
                        amount: "60%",
                    },
                    {
                        label: "Alumno de ejemplo 02",
                        detail: "Fundamentos web",
                        status: "En curso",
                        amount: "45%",
                    },
                    {
                        label: "Alumno de ejemplo 03",
                        detail: "Proyecto práctico",
                        status: "Completado",
                        amount: "100%",
                    },
                ]
              : demoRows[kind];

    return (
        <div
            className={cn(
                "dashboard-preview",
                `dashboard-${kind}`,
                interactive && "dashboard-interactive",
            )}
        >
            <aside className="preview-sidebar">
                <KairuLogo />
                <div className="preview-workspace">
                    <span>{isEducation ? "A" : "N"}</span>
                    <div>
                        {isEducation ? "Mi academia" : "Mi negocio"}
                        <small>Espacio de trabajo</small>
                    </div>
                    <ChevronDown />
                </div>
                <span className="preview-nav-caption">PRINCIPAL</span>
                <div className="preview-nav">
                    {sections.map(({ label, icon: Icon }) =>
                        interactive ? (
                            <button
                                key={label}
                                type="button"
                                className={cn(view === label && "selected")}
                                onClick={() => {
                                    setView(label);
                                    setSelected(null);
                                }}
                                aria-pressed={view === label}
                            >
                                <Icon />
                                {label}
                            </button>
                        ) : (
                            <span
                                key={label}
                                className={cn(view === label && "selected")}
                            >
                                <Icon />
                                {label}
                            </span>
                        ),
                    )}
                    <span>
                        <Users />
                        Clientes
                    </span>
                    <span>
                        <BarChart3 />
                        Reportes
                    </span>
                </div>
                <div className="preview-sidebar-bottom">
                    <span>
                        <CircleHelp />
                        Ayuda
                    </span>
                    <span>
                        <Settings2 />
                        Configuración
                    </span>
                    <div className="preview-avatar">
                        <span>K</span>
                        <div>
                            Tu espacio<small>Todo en su lugar</small>
                        </div>
                    </div>
                </div>
            </aside>
            <div className="preview-main">
                <div className="preview-topbar">
                    <span>
                        {isEducation ? "Mi academia" : "Mi negocio"}{" "}
                        <span>/</span> {view}
                    </span>
                    <div>
                        <Search />
                        <Bell />
                        <span className="mini-avatar">K</span>
                    </div>
                </div>
                <div className="preview-content">
                    <div className="preview-greeting">
                        <div>
                            <small>Todo listo para un nuevo día</small>
                            <h3>
                                {view === "Resumen"
                                    ? isEducation
                                        ? "Aprender, más simple."
                                        : "Tu negocio, de un vistazo."
                                    : view}
                            </h3>
                        </div>
                        <span className="preview-period">
                            Este mes <ChevronDown />
                        </span>
                    </div>
                    <div className="preview-metrics">
                        {(isEducation
                            ? [
                                  {
                                      label: "Cursos activos",
                                      value: "12",
                                      note: "Todo organizado",
                                      icon: GraduationCap,
                                  },
                                  {
                                      label: "Clases disponibles",
                                      value: "48",
                                      note: "A tu ritmo",
                                      icon: LayoutDashboard,
                                  },
                                  {
                                      label: "Progreso",
                                      value: "68%",
                                      note: "Sigue aprendiendo",
                                      icon: BarChart3,
                                  },
                              ]
                            : [
                                  {
                                      label: isDistribution
                                          ? "Pedidos del día"
                                          : "Ventas del mes",
                                      value: isDistribution
                                          ? "24"
                                          : "S/ 24,580",
                                      note: "Vista de ejemplo",
                                      icon: ShoppingBag,
                                  },
                                  {
                                      label: isDistribution
                                          ? "En camino"
                                          : "Pedidos",
                                      value: isDistribution ? "8" : "148",
                                      note: "Todo bajo control",
                                      icon: Package,
                                  },
                                  {
                                      label: isDistribution
                                          ? "Entregados"
                                          : "Clientes",
                                      value: isDistribution ? "16" : "86",
                                      note: "Información al día",
                                      icon: Users,
                                  },
                              ]
                        ).map(({ label, value, note, icon: Icon }) => (
                            <div key={label}>
                                <span>
                                    {label}
                                    <Icon />
                                </span>
                                <strong>{value}</strong>
                                <small>
                                    <ArrowUpRight />
                                    {note}
                                </small>
                            </div>
                        ))}
                    </div>
                    {view === "Resumen" && (
                        <div className="preview-chart">
                            <div className="preview-panel-title">
                                <strong>
                                    {isEducation
                                        ? "Tu progreso de aprendizaje"
                                        : isDistribution
                                          ? "Pedidos de la semana"
                                          : "Resumen de ventas"}
                                </strong>
                                <span>
                                    Esta semana <ChevronDown />
                                </span>
                            </div>
                            <div className="chart-body">
                                <div className="chart-labels">
                                    <span>{isEducation ? "100%" : "8k"}</span>
                                    <span>{isEducation ? "50%" : "4k"}</span>
                                    <span>0</span>
                                </div>
                                <div className="chart-columns">
                                    {[38, 58, 45, 72, 56, 86, 69].map(
                                        (height, i) => (
                                            <div
                                                className="chart-column"
                                                key={i}
                                            >
                                                <span
                                                    style={{
                                                        height: `${height}%`,
                                                    }}
                                                />
                                                <small>
                                                    {
                                                        [
                                                            "L",
                                                            "M",
                                                            "M",
                                                            "J",
                                                            "V",
                                                            "S",
                                                            "D",
                                                        ][i]
                                                    }
                                                </small>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="preview-table">
                        <div className="preview-panel-title">
                            <strong>
                                {view === "Inventario"
                                    ? "Productos"
                                    : view === "Alumnos"
                                      ? "Alumnos de ejemplo"
                                      : isEducation
                                        ? "Continúa aprendiendo"
                                        : "Últimos pedidos"}
                            </strong>
                            <MoreHorizontal />
                        </div>
                        <div className="preview-table-heading">
                            <span>{isEducation ? "Contenido" : "Detalle"}</span>
                            <span>Estado</span>
                            <span>{isEducation ? "Clases" : "Total"}</span>
                        </div>
                        {rows.map((row) =>
                            interactive ? (
                                <button
                                    type="button"
                                    key={row.label}
                                    className="preview-table-row"
                                    onClick={() =>
                                        setSelected(
                                            selected === row.label
                                                ? null
                                                : row.label,
                                        )
                                    }
                                    aria-expanded={selected === row.label}
                                >
                                    <span>
                                        <span className="row-icon">
                                            {isEducation ? (
                                                <GraduationCap />
                                            ) : (
                                                <Package />
                                            )}
                                        </span>
                                        <span>
                                            {row.label}
                                            <small>{row.detail}</small>
                                        </span>
                                    </span>
                                    <span className="preview-status">
                                        <i />
                                        {row.status}
                                    </span>
                                    <strong>{row.amount}</strong>
                                </button>
                            ) : (
                                <div
                                    key={row.label}
                                    className="preview-table-row"
                                >
                                    <span>
                                        <span className="row-icon">
                                            {isEducation ? (
                                                <GraduationCap />
                                            ) : (
                                                <Package />
                                            )}
                                        </span>
                                        <span>
                                            {row.label}
                                            <small>{row.detail}</small>
                                        </span>
                                    </span>
                                    <span className="preview-status">
                                        <i />
                                        {row.status}
                                    </span>
                                    <strong>{row.amount}</strong>
                                </div>
                            ),
                        )}
                    </div>
                    {selected && (
                        <div className="preview-detail" role="status">
                            <Check />
                            {selected} ·{" "}
                            {rows.find((row) => row.label === selected)?.detail}
                            . Información de demostración.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function HeroDevices({
    motionEnabled: _motionEnabled,
}: {
    motionEnabled: boolean;
}) {
    return (
        <figure
            className="hero-devices"
            aria-label="Vista conceptual de un sistema empresarial en laptop y teléfono, con datos de ejemplo"
        >
            <div className="laptop" aria-hidden="true">
                <div className="laptop-camera" />
                <div className="laptop-screen">
                    <DashboardPreview />
                </div>
                <div className="laptop-base">
                    <span />
                </div>
            </div>
            <div className="phone" aria-hidden="true">
                <div className="phone-island" />
                <div className="phone-top">
                    <span>9:41</span>
                    <span>••• ▰</span>
                </div>
                <div className="phone-header">
                    <KairuLogo compact />
                    <Bell />
                </div>
                <small>Tu negocio contigo</small>
                <h3>Todo en orden.</h3>
                <div className="phone-total">
                    <span>
                        Ventas de hoy
                        <ArrowUpRight />
                    </span>
                    <strong>
                        S/ 1,280<span>.00</span>
                    </strong>
                    <small>Vista de ejemplo</small>
                </div>
                <div className="phone-section">
                    <span>Últimos movimientos</span>
                    <MoreHorizontal />
                </div>
                {[
                    {
                        label: "Nuevo pedido",
                        detail: "Venta online",
                        icon: ShoppingBag,
                    },
                    {
                        label: "Entrega lista",
                        detail: "Pedido #0048",
                        icon: Truck,
                    },
                    {
                        label: "Inventario al día",
                        detail: "Todo sincronizado",
                        icon: Box,
                    },
                ].map(({ label, detail, icon: Icon }) => (
                    <div className="phone-row" key={label}>
                        <span>
                            <Icon />
                        </span>
                        <div>
                            {label}
                            <small>{detail}</small>
                        </div>
                        <Check />
                    </div>
                ))}
                <div className="phone-nav">
                    <LayoutDashboard />
                    <ShoppingBag />
                    <Users />
                    <Settings2 />
                </div>
                <div className="phone-home" />
            </div>
        </figure>
    );
}
