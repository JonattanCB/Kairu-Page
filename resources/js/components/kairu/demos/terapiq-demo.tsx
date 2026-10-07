import {
    Activity,
    Calendar,
    CalendarDays,
    Clock3,
    DollarSign,
    Eye,
    EyeOff,
    LayoutDashboard,
    Loader2,
    LogOut,
    Moon,
    Plus,
    Search,
    Shield,
    Stethoscope,
    Sun,
    UserRound,
    Users,
    X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface TerapiqDemoProps {
    interactive?: boolean;
    onOpenFullScreen?: () => void;
    initialLoggedIn?: boolean;
}

type TerapiqRole = "PSICOLOGIST" | "ADMIN";
type TerapiqTab = "dashboard" | "citas" | "pacientes" | "historial" | "usuarios";

type AppointmentStatus = "PENDING" | "COMPLETED" | "CANCELLED" | "NO_SHOW";

const initialAppointments = [
    {
        id: 1,
        time: "09:00 - 09:50",
        patientName: "Mateo Rodríguez Vera",
        patientAge: 24,
        type: "Terapia Cognitivo-Conductual",
        reason: "Manejo de ansiedad laboral y estrés",
        duration: "50 min",
        status: "COMPLETED" as AppointmentStatus,
        date: "Hoy",
    },
    {
        id: 2,
        time: "10:15 - 11:05",
        patientName: "Camila Valdivia Rojas",
        patientAge: 19,
        type: "Terapia Individual",
        reason: "Autoestima y habilidades sociales",
        duration: "50 min",
        status: "COMPLETED" as AppointmentStatus,
        date: "Hoy",
    },
    {
        id: 3,
        time: "11:30 - 12:20",
        patientName: "Jorge & Lucía Benítez",
        patientAge: 32,
        type: "Terapia de Pareja",
        reason: "Comunicación asertiva y resolución de conflictos",
        duration: "50 min",
        status: "PENDING" as AppointmentStatus,
        date: "Hoy",
    },
    {
        id: 4,
        time: "15:00 - 15:50",
        patientName: "Andrés Flores Quispe",
        patientAge: 29,
        type: "Terapia Individual",
        reason: "Fobia social y reestructuración cognitiva",
        duration: "50 min",
        status: "PENDING" as AppointmentStatus,
        date: "Hoy",
    },
    {
        id: 5,
        time: "16:30 - 17:20",
        patientName: "Sofía Morales Castro",
        patientAge: 21,
        type: "Evaluación Inicial",
        reason: "Primera consulta de diagnóstico",
        duration: "50 min",
        status: "PENDING" as AppointmentStatus,
        date: "Hoy",
    },
];

const initialPatients = [
    {
        id: 1,
        name: "Mateo Rodríguez Vera",
        age: 24,
        phone: "+51 987 123 456",
        email: "mateo.rodriguez@email.com",
        reason: "Ansiedad y estrés laboral",
        sessions: 8,
        active: "ACTIVE",
        lastVisit: "Hoy, 09:00 am",
        diagnosis: "F41.1 Trastorno de ansiedad generalizada (en remisión parcial)",
    },
    {
        id: 2,
        name: "Camila Valdivia Rojas",
        age: 19,
        phone: "+51 976 234 567",
        email: "camila.valdivia@email.com",
        reason: "Autoestima y relaciones interpersonales",
        sessions: 6,
        active: "ACTIVE",
        lastVisit: "Hoy, 10:15 am",
        diagnosis: "Z73.0 Problemas relacionados con el manejo de la vida",
    },
    {
        id: 3,
        name: "Andrés Flores Quispe",
        age: 29,
        phone: "+51 965 345 678",
        email: "andres.flores@email.com",
        reason: "Fobia social",
        sessions: 12,
        active: "ACTIVE",
        lastVisit: "Hace 6 días",
        diagnosis: "F40.1 Fobia social específica",
    },
    {
        id: 4,
        name: "Luciana Morales Carrillo",
        age: 34,
        phone: "+51 954 456 789",
        email: "luciana.morales@email.com",
        reason: "Duelo y adaptación",
        sessions: 15,
        active: "INACTIVE",
        lastVisit: "Alta terapéutica (hace 1 mes)",
        diagnosis: "Z63.4 Desaparición y muerte de un miembro de la familia (Alta)",
    },
    {
        id: 5,
        name: "Diego Sánchez Pardo",
        age: 27,
        phone: "+51 943 567 890",
        email: "diego.sanchez@email.com",
        reason: "Insomnio y sobrecarga cognitiva",
        sessions: 4,
        active: "ACTIVE",
        lastVisit: "Hace 4 días",
        diagnosis: "G47.0 Trastornos del inicio del sueño asociados a estrés",
    },
];

// Componente Waves exacto de TerapiQ (components/(auth)/login/Waves.tsx)
function TerapiqWaves() {
    return (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 overflow-hidden">
            <svg
                viewBox="0 0 600 96"
                preserveAspectRatio="none"
                className="absolute bottom-0 h-full w-[200%] text-blue-500/30 dark:text-blue-900/55"
                aria-hidden="true"
            >
                <path
                    fill="currentColor"
                    d="M0,56 C50,36 100,76 150,56 C200,36 250,76 300,56 C350,36 400,76 450,56 C500,36 550,76 600,56 L600,96 L0,96 Z"
                >
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        from="0 0"
                        to="-300 0"
                        dur="9s"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>
            <svg
                viewBox="0 0 600 96"
                preserveAspectRatio="none"
                className="absolute bottom-0 h-full w-[200%] text-blue-400/20 dark:text-blue-800/40"
                aria-hidden="true"
            >
                <path
                    fill="currentColor"
                    d="M0,66 C60,46 120,82 180,66 C240,46 300,82 360,66 C420,46 480,82 540,66 C570,60 585,60 600,66 L600,96 L0,96 Z"
                >
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        from="-300 0"
                        to="0 0"
                        dur="13s"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>
        </div>
    );
}

export function TerapiqDemo({
    interactive = false,
    onOpenFullScreen,
    initialLoggedIn,
}: TerapiqDemoProps) {
    // En vista miniatura (no interactiva) mostramos el dashboard, en modo interactivo iniciamos en el Login tal cual TerapiQ
    const [isLoggedIn, setIsLoggedIn] = useState(
        initialLoggedIn !== undefined ? initialLoggedIn : !interactive,
    );
    const [role, setRole] = useState<TerapiqRole>("PSICOLOGIST");
    const [email, setEmail] = useState("carlos.mendoza@arvien.com");
    const [password, setPassword] = useState("terapiq2026");
    const [showPassword, setShowPassword] = useState(false);
    const [authenticating, setAuthenticating] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const [tab, setTab] = useState<TerapiqTab>("dashboard");
    const [appointments, setAppointments] = useState(initialAppointments);
    const [patients] = useState(initialPatients);
    const [searchPatient, setSearchPatient] = useState("");
    const [selectedPatient, setSelectedPatient] = useState<
        (typeof initialPatients)[0] | null
    >(null);
    const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
    const [selectedHistorySoap, setSelectedHistorySoap] = useState<
        (typeof initialPatients)[0] | null
    >(null);

    const handleSelectRole = (newRole: TerapiqRole) => {
        setRole(newRole);
        setEmail(
            newRole === "PSICOLOGIST"
                ? "carlos.mendoza@arvien.com"
                : "admin@arvien.com",
        );
        setTab("dashboard");
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setAuthenticating(true);
        setTimeout(() => {
            setAuthenticating(false);
            setIsLoggedIn(true);
            setTab("dashboard");
        }, 450);
    };

    const toggleAppointmentStatus = (id: number) => {
        setAppointments((prev) =>
            prev.map((app) => {
                if (app.id !== id) return app;
                const nextStatus: AppointmentStatus =
                    app.status === "PENDING"
                        ? "COMPLETED"
                        : app.status === "COMPLETED"
                          ? "CANCELLED"
                          : "PENDING";
                return { ...app, status: nextStatus };
            }),
        );
    };

    const statusBadge = (status: AppointmentStatus) => {
        switch (status) {
            case "COMPLETED":
                return {
                    label: "Completada",
                    className:
                        "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
                };
            case "PENDING":
                return {
                    label: "Pendiente",
                    className:
                        "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
                };
            case "CANCELLED":
                return {
                    label: "Cancelada",
                    className:
                        "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
                };
            case "NO_SHOW":
                return {
                    label: "No asistió",
                    className:
                        "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300",
                };
        }
    };

    const filteredPatients = patients.filter(
        (p) =>
            p.name.toLowerCase().includes(searchPatient.toLowerCase()) ||
            p.reason.toLowerCase().includes(searchPatient.toLowerCase()),
    );

    // =========================================================================
    // PANTALLA DE LOGIN DE TERAPIQ (IDÉNTICA A app/(auth)/login/page.tsx)
    // =========================================================================
    if (!isLoggedIn) {
        return (
            <div
                className={cn(
                    "relative flex flex-1 h-full min-h-[500px] w-full items-center justify-center overflow-hidden rounded-xl border p-4 pb-20 font-sans transition-colors duration-300",
                    isDark
                        ? "dark border-zinc-800 bg-zinc-950 text-zinc-50"
                        : "border-slate-200 bg-white text-slate-900",
                )}
            >
                {/* Controles superiores derecha */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                    {onOpenFullScreen && (
                        <button
                            type="button"
                            onClick={onOpenFullScreen}
                            className={cn(
                                "rounded-lg border px-2.5 py-1 text-[10px] font-semibold transition-colors cursor-pointer",
                                isDark
                                    ? "border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
                                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100",
                            )}
                        >
                            Pantalla completa ↗
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => setIsDark(!isDark)}
                        className={cn(
                            "rounded-lg border p-2 transition-colors cursor-pointer",
                            isDark
                                ? "border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100",
                        )}
                        title={isDark ? "Modo claro" : "Modo oscuro"}
                    >
                        {isDark ? <Sun size={15} /> : <Moon size={15} />}
                    </button>
                </div>

                {/* Card de Login exacta de TerapiQ */}
                <div
                    className={cn(
                        "relative z-10 w-full max-w-sm rounded-xl border p-6 shadow-md",
                        isDark
                            ? "border-zinc-800 bg-zinc-900/95"
                            : "border-slate-200/90 bg-white/95",
                    )}
                >
                    <div className="mb-4 flex flex-col items-center gap-2">
                        <div
                            className={cn(
                                "flex size-14 items-center justify-center rounded-md p-2",
                                isDark ? "bg-zinc-800/60" : "bg-slate-100/80",
                            )}
                        >
                            <img
                                src="/demos/terapiq-logo.png"
                                alt="TerapiQ"
                                className="h-11 w-11 object-contain"
                            />
                        </div>
                        <p
                            className={cn(
                                "text-xs tracking-tight",
                                isDark ? "text-zinc-400" : "text-slate-500",
                            )}
                        >
                            TerapiQ
                        </p>
                        <h3 className="text-lg font-semibold text-center">
                            Iniciar Sesión
                        </h3>
                    </div>

                    {/* Selector rápido de Rol en Demo */}
                    <div className="mb-4">
                        <span
                            className={cn(
                                "block text-[10px] font-medium mb-1 text-center",
                                isDark ? "text-zinc-400" : "text-slate-500",
                            )}
                        >
                            Seleccionar perfil de prueba:
                        </span>
                        <div
                            className={cn(
                                "grid grid-cols-2 gap-1 p-1 rounded-lg border",
                                isDark
                                    ? "bg-zinc-950 border-zinc-800"
                                    : "bg-slate-100 border-slate-200",
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => handleSelectRole("PSICOLOGIST")}
                                className={cn(
                                    "py-1 px-2 rounded-md text-[10px] font-semibold transition-all cursor-pointer",
                                    role === "PSICOLOGIST"
                                        ? "bg-blue-600 text-white shadow-2xs"
                                        : isDark
                                          ? "text-zinc-400 hover:text-zinc-200"
                                          : "text-slate-600 hover:text-slate-900",
                                )}
                            >
                                Psicólogo Clínico
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSelectRole("ADMIN")}
                                className={cn(
                                    "py-1 px-2 rounded-md text-[10px] font-semibold transition-all cursor-pointer",
                                    role === "ADMIN"
                                        ? "bg-blue-600 text-white shadow-2xs"
                                        : isDark
                                          ? "text-zinc-400 hover:text-zinc-200"
                                          : "text-slate-600 hover:text-slate-900",
                                )}
                            >
                                Administrador
                            </button>
                        </div>
                    </div>

                    <form className="space-y-3.5" onSubmit={handleLogin}>
                        <div className="space-y-1">
                            <label
                                htmlFor="terapiq-email"
                                className="block text-xs font-medium"
                            >
                                Correo Electrónico
                            </label>
                            <input
                                id="terapiq-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="correo@arvien.com"
                                className={cn(
                                    "w-full rounded-lg border px-3 py-2 text-xs shadow-none focus:outline-hidden focus:ring-2 focus:ring-blue-500",
                                    isDark
                                        ? "border-zinc-700 bg-zinc-950 text-zinc-100"
                                        : "border-slate-200 bg-white text-slate-900",
                                )}
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label
                                htmlFor="terapiq-password"
                                className="block text-xs font-medium"
                            >
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    id="terapiq-password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Contraseña"
                                    className={cn(
                                        "w-full rounded-lg border pl-3 pr-9 py-2 text-xs shadow-none focus:outline-hidden focus:ring-2 focus:ring-blue-500",
                                        isDark
                                            ? "border-zinc-700 bg-zinc-950 text-zinc-100"
                                            : "border-slate-200 bg-white text-slate-900",
                                    )}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 cursor-pointer"
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-4" />
                                    ) : (
                                        <Eye className="size-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={authenticating}
                            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center text-white transition-colors flex items-center justify-center gap-2"
                        >
                            {authenticating ? (
                                <>
                                    <Loader2 className="size-3.5 animate-spin" />
                                    <span>Iniciando sesión...</span>
                                </>
                            ) : (
                                <span>Iniciar Sesión</span>
                            )}
                        </button>
                    </form>
                </div>

                {/* Ondas animadas inferiores originales de TerapiQ */}
                <TerapiqWaves />
            </div>
        );
    }

    // =========================================================================
    // PANEL PROTEGIDO DE TERAPIQ (PSICÓLOGO / ADMIN)
    // =========================================================================
    const navItems =
        role === "ADMIN"
            ? [
                  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                  { id: "usuarios", label: "Usuarios", icon: Users },
              ]
            : [
                  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                  { id: "pacientes", label: "Listado Pacientes", icon: UserRound },
                  { id: "historial", label: "Historial Pacientes", icon: Clock3 },
                  { id: "citas", label: "Citas", icon: Calendar },
              ];

    return (
        <div
            className={cn(
                "flex flex-1 h-full min-h-[500px] w-full overflow-hidden rounded-xl border font-sans text-xs shadow-sm",
                isDark
                    ? "dark border-zinc-800 bg-zinc-950 text-zinc-100"
                    : "border-slate-200 bg-slate-50 text-slate-800",
            )}
        >
            {/* Sidebar TerapiQ */}
            <aside className="flex w-48 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                {/* Branding TerapiQ */}
                <div className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-3.5 dark:border-zinc-800/70">
                    <div className="flex size-8 items-center justify-center overflow-hidden rounded-lg bg-slate-100 border border-slate-200/60 dark:border-zinc-700 dark:bg-zinc-800">
                        <img
                            src="/demos/terapiq-logo.png"
                            alt="TerapiQ"
                            className="size-6 object-contain"
                        />
                    </div>
                    <div className="min-w-0 flex-1 leading-tight">
                        <span className="block truncate text-xs font-bold tracking-tight text-slate-900 dark:text-white">
                            TerapiQ
                        </span>
                        <span className="block text-[9px] text-slate-400 uppercase tracking-wide">
                            Gestión Clínica
                        </span>
                    </div>
                </div>

                {/* Navegación TerapiQ */}
                <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
                    <div className="px-2 pb-1 pt-1 text-[9px] font-semibold tracking-wider text-slate-400 uppercase dark:text-zinc-500">
                        {role === "ADMIN" ? "Administración" : "Consulta Psicológica"}
                    </div>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = tab === item.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                disabled={!interactive}
                                onClick={() =>
                                    interactive && setTab(item.id as TerapiqTab)
                                }
                                className={cn(
                                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[11px] font-medium transition-colors cursor-pointer",
                                    active
                                        ? "bg-blue-50 text-blue-700 font-semibold shadow-xs dark:bg-blue-950/60 dark:text-blue-300"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100",
                                )}
                            >
                                <Icon
                                    className={cn(
                                        "size-3.5",
                                        active
                                            ? "text-blue-600 dark:text-blue-400"
                                            : "text-slate-400",
                                    )}
                                />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Perfil + Botón Cerrar sesión */}
                <div className="border-t border-slate-100 p-2.5 space-y-1.5 dark:border-zinc-800">
                    <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 dark:bg-zinc-800/50">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                            {role === "ADMIN" ? "AD" : "CM"}
                        </div>
                        <div className="min-w-0 flex-1 leading-tight">
                            <span className="block truncate text-[11px] font-semibold text-slate-800 dark:text-zinc-200">
                                {role === "ADMIN" ? "Admin General" : "Dr. C. Mendoza"}
                            </span>
                            <span className="block text-[9px] text-blue-600 font-medium dark:text-blue-400">
                                {role === "ADMIN" ? "ADMIN" : "PSICÓLOGO"}
                            </span>
                        </div>
                    </div>
                    {interactive && (
                        <button
                            type="button"
                            onClick={() => setIsLoggedIn(false)}
                            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-rose-200/80 bg-rose-50/50 py-1.5 text-[10px] font-semibold text-rose-600 hover:bg-rose-100/70 transition-colors cursor-pointer dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-400"
                        >
                            <LogOut className="size-3" />
                            <span>Cerrar sesión (Ver Login)</span>
                        </button>
                    )}
                </div>
            </aside>

            {/* Contenido principal TerapiQ */}
            <main className="flex flex-1 flex-col overflow-hidden">
                {/* Header superior */}
                <header className="flex h-12 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-slate-400 dark:text-zinc-500">
                            TerapiQ
                        </span>
                        <span className="text-slate-300 dark:text-zinc-600">/</span>
                        <span className="text-[11px] font-semibold text-slate-800 capitalize dark:text-zinc-200">
                            {tab === "dashboard"
                                ? role === "ADMIN"
                                    ? "Centro de Control"
                                    : "Panel Clínico"
                                : tab === "citas"
                                  ? "Agenda de Citas"
                                  : tab === "pacientes"
                                    ? "Listado de Pacientes"
                                    : tab === "historial"
                                      ? "Historial Pacientes"
                                      : "Usuarios"}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {interactive && (
                            <div className="hidden sm:flex items-center gap-1 rounded-lg border border-slate-200 p-0.5 dark:border-zinc-800">
                                <button
                                    type="button"
                                    onClick={() => handleSelectRole("PSICOLOGIST")}
                                    className={cn(
                                        "rounded-md px-2 py-0.5 text-[9px] font-semibold transition-colors cursor-pointer",
                                        role === "PSICOLOGIST"
                                            ? "bg-blue-600 text-white"
                                            : "text-slate-500 hover:text-slate-900 dark:text-zinc-400",
                                    )}
                                >
                                    Psicólogo
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSelectRole("ADMIN")}
                                    className={cn(
                                        "rounded-md px-2 py-0.5 text-[9px] font-semibold transition-colors cursor-pointer",
                                        role === "ADMIN"
                                            ? "bg-blue-600 text-white"
                                            : "text-slate-500 hover:text-slate-900 dark:text-zinc-400",
                                    )}
                                >
                                    Admin
                                </button>
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={() => setIsDark(!isDark)}
                            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                            title="Cambiar tema"
                        >
                            {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
                        </button>
                        {onOpenFullScreen && (
                            <button
                                type="button"
                                onClick={onOpenFullScreen}
                                className="rounded-md border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                            >
                                Pantalla completa ↗
                            </button>
                        )}
                    </div>
                </header>

                {/* Vistas según pestaña y rol */}
                <div className="flex-1 overflow-y-auto p-4">
                    {/* VISTA ADMIN */}
                    {role === "ADMIN" && tab === "dashboard" && (
                        <div className="space-y-4">
                            <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                                Centro de Control
                                            </h3>
                                            <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-1.5 py-0.2 text-[9px] font-bold text-slate-700 dark:border-zinc-700 dark:text-zinc-300">
                                                <Shield className="size-3" /> ADMIN
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-slate-500 dark:text-zinc-400">
                                            Monitoreo ejecutivo del negocio, suscripciones y actividad de psicólogos.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setTab("usuarios")}
                                        className="rounded-lg bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-blue-700"
                                    >
                                        Gestionar usuarios
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {[
                                    { title: "Psicólogos activos", value: "14", note: "De 16 registrados" },
                                    { title: "Nuevos este mes", value: "4", note: "2 en últimos 7 días" },
                                    { title: "Ingresos activos", value: "$686.00", note: "Sobre suscripciones" },
                                    { title: "Por vencer", value: "2", note: "En próximos 7 días" },
                                ].map((s) => (
                                    <div key={s.title} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
                                        <span className="text-[10px] text-slate-500">{s.title}</span>
                                        <div className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{s.value}</div>
                                        <span className="text-[9px] text-slate-400">{s.note}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {role === "ADMIN" && tab === "usuarios" && (
                        <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-zinc-800 dark:bg-zinc-900">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                                Psicólogos Registrados en TerapiQ
                            </h4>
                            <div className="space-y-2">
                                {[
                                    { name: "Dr. Carlos Mendoza", email: "carlos.mendoza@arvien.com", plan: "ACTIVE · $49.00", status: "Activo" },
                                    { name: "Dra. Elena Vargas", email: "elena.vargas@arvien.com", plan: "ACTIVE · $49.00", status: "Activo" },
                                    { name: "Lic. Roberto Paz", email: "roberto.paz@arvien.com", plan: "ACTIVE · $49.00", status: "Activo" },
                                ].map((u) => (
                                    <div key={u.email} className="flex items-center justify-between rounded-lg border border-slate-100 p-2.5 dark:border-zinc-800">
                                        <div>
                                            <p className="font-semibold text-slate-900 dark:text-white">{u.name}</p>
                                            <p className="text-[10px] text-slate-400">{u.email} · Suscripción: {u.plan}</p>
                                        </div>
                                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                            {u.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB: DASHBOARD CLÍNICO (PSICÓLOGO) */}
                    {role === "PSICOLOGIST" && tab === "dashboard" && (
                        <div className="space-y-4">
                            <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="space-y-0.5">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                                Panel clínico
                                            </h3>
                                            <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-1.5 py-0.2 text-[9px] font-bold text-slate-700 dark:border-zinc-700 dark:text-zinc-300">
                                                <Stethoscope className="size-3" /> PSICÓLOGO
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-slate-500 dark:text-zinc-400">
                                            Sigue tu jornada, pacientes activos y estado de tus citas en tiempo real.
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setTab("pacientes")}
                                            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                                        >
                                            Ver pacientes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setTab("citas")}
                                            className="rounded-lg bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-2xs hover:bg-blue-700"
                                        >
                                            Abrir agenda
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjetas de métricas del consultorio */}
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {[
                                    {
                                        title: "Pacientes activos",
                                        value: "38",
                                        note: "De 42 pacientes asignados",
                                        icon: UserRound,
                                        tone: "text-blue-600 dark:text-blue-400",
                                    },
                                    {
                                        title: "Citas para hoy",
                                        value: "5",
                                        note: "2 completadas, 3 pendientes",
                                        icon: CalendarDays,
                                        tone: "text-teal-600 dark:text-teal-400",
                                    },
                                    {
                                        title: "Sesiones de la semana",
                                        value: "22",
                                        note: "Últimos 7 días",
                                        icon: Activity,
                                        tone: "text-indigo-600 dark:text-indigo-400",
                                    },
                                    {
                                        title: "Tasa de asistencia",
                                        value: "94%",
                                        note: "Cumplimiento terapéutico",
                                        icon: DollarSign,
                                        tone: "text-emerald-600 dark:text-emerald-400",
                                    },
                                ].map((stat) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div
                                            key={stat.title}
                                            className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900"
                                        >
                                            <div className="flex items-center justify-between text-slate-500">
                                                <span className="text-[10px] font-medium">
                                                    {stat.title}
                                                </span>
                                                <Icon className={cn("size-3.5", stat.tone)} />
                                            </div>
                                            <div className="mt-1 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                                {stat.value}
                                            </div>
                                            <span className="text-[9px] text-slate-400 dark:text-zinc-500">
                                                {stat.note}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Lista de citas de hoy */}
                            <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 dark:border-zinc-800">
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">
                                            Próximas citas en agenda
                                        </h4>
                                        <span className="text-[10px] text-slate-400">
                                            Haz click en el estado de una cita para actualizarlo
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-medium text-blue-600 dark:text-blue-400">
                                        5 sesiones hoy
                                    </span>
                                </div>
                                <div className="mt-3 space-y-2">
                                    {appointments.map((app) => {
                                        const badge = statusBadge(app.status);
                                        return (
                                            <div
                                                key={app.id}
                                                className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/70 p-2.5 transition-colors hover:bg-slate-50 dark:border-zinc-800/80 dark:bg-zinc-800/40"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                                                        {app.patientName.charAt(0)}
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold text-slate-900 dark:text-white">
                                                                {app.patientName}
                                                            </span>
                                                            <span className="text-[10px] text-slate-400">
                                                                ({app.patientAge} años)
                                                            </span>
                                                        </div>
                                                        <div className="text-[10px] text-slate-500 dark:text-zinc-400">
                                                            <span>{app.type}</span> ·{" "}
                                                            <span>{app.reason}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-mono text-slate-600 dark:text-zinc-300">
                                                        {app.time}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleAppointmentStatus(app.id)}
                                                        title="Alternar estado"
                                                        className={cn(
                                                            "rounded-full px-2 py-0.5 text-[9px] font-semibold transition-transform active:scale-95 cursor-pointer",
                                                            badge.className,
                                                        )}
                                                    >
                                                        {badge.label}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: CITAS / AGENDA */}
                    {tab === "citas" && (
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-slate-900 dark:text-white">
                                        Gestiona tus citas programadas
                                    </h4>
                                    <p className="text-[10px] text-slate-400">
                                        Organiza y administra las citas de tu consulta.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowNewAppointmentModal(true)}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-2xs hover:bg-blue-700 cursor-pointer"
                                >
                                    <Plus className="size-3.5" /> Nueva Cita
                                </button>
                            </div>

                            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                                <table className="w-full text-left text-[11px]">
                                    <thead className="border-b border-slate-100 bg-slate-50 text-[10px] font-semibold text-slate-500 uppercase dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400">
                                        <tr>
                                            <th className="px-3 py-2">Horario</th>
                                            <th className="px-3 py-2">Paciente</th>
                                            <th className="px-3 py-2">Tipo de Terapia</th>
                                            <th className="px-3 py-2">Duración</th>
                                            <th className="px-3 py-2 text-center">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                                        {appointments.map((app) => {
                                            const badge = statusBadge(app.status);
                                            return (
                                                <tr key={app.id} className="hover:bg-slate-50/70 dark:hover:bg-zinc-800/40">
                                                    <td className="px-3 py-2.5 font-mono text-[10px] text-slate-600 dark:text-zinc-300">
                                                        {app.time}
                                                    </td>
                                                    <td className="px-3 py-2.5 font-medium text-slate-900 dark:text-zinc-100">
                                                        {app.patientName}
                                                    </td>
                                                    <td className="px-3 py-2.5 text-slate-500 dark:text-zinc-400">
                                                        {app.type}
                                                    </td>
                                                    <td className="px-3 py-2.5 text-slate-400 font-mono text-[10px]">
                                                        {app.duration}
                                                    </td>
                                                    <td className="px-3 py-2.5 text-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleAppointmentStatus(app.id)}
                                                            className={cn(
                                                                "rounded-full px-2 py-0.5 text-[9px] font-semibold transition-transform active:scale-95 cursor-pointer",
                                                                badge.className,
                                                            )}
                                                        >
                                                            {badge.label}
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* TAB: PACIENTES */}
                    {tab === "pacientes" && (
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                <div className="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-zinc-800 dark:bg-zinc-900">
                                    <span className="text-[10px] text-slate-400">Pacientes registrados</span>
                                    <strong className="block text-lg font-bold text-slate-900 dark:text-white">
                                        42
                                    </strong>
                                </div>
                                <div className="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-zinc-800 dark:bg-zinc-900">
                                    <span className="text-[10px] text-blue-600 dark:text-blue-400">En seguimiento</span>
                                    <strong className="block text-lg font-bold text-blue-700 dark:text-blue-300">
                                        36
                                    </strong>
                                </div>
                                <div className="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-zinc-800 dark:bg-zinc-900">
                                    <span className="text-[10px] text-slate-400">Inactivos</span>
                                    <strong className="block text-lg font-bold text-slate-600 dark:text-zinc-400">
                                        6
                                    </strong>
                                </div>
                                <div className="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-zinc-800 dark:bg-zinc-900">
                                    <span className="text-[10px] text-slate-400">Edad promedio</span>
                                    <strong className="block text-lg font-bold text-slate-900 dark:text-white">
                                        27 años
                                    </strong>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                                <div className="relative flex-1 max-w-sm">
                                    <Search className="absolute left-2.5 top-2 size-3.5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Buscar paciente o motivo de consulta..."
                                        value={searchPatient}
                                        onChange={(e) => setSearchPatient(e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-[11px] placeholder:text-slate-400 focus:border-blue-500 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800"
                                    />
                                </div>
                                <span className="text-[10px] text-slate-400">
                                    {filteredPatients.length} pacientes listados
                                </span>
                            </div>

                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {filteredPatients.map((patient) => (
                                    <div
                                        key={patient.id}
                                        onClick={() => setSelectedPatient(patient)}
                                        className="cursor-pointer rounded-xl border border-slate-200 bg-white p-3 transition-all hover:border-blue-300 hover:shadow-xs dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-700"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-0.5">
                                                <h5 className="font-semibold text-slate-900 dark:text-white">
                                                    {patient.name}
                                                </h5>
                                                <span className="block text-[10px] text-slate-400">
                                                    {patient.age} años · {patient.sessions} sesiones realizadas
                                                </span>
                                            </div>
                                            <span
                                                className={cn(
                                                    "rounded-full px-2 py-0.5 text-[9px] font-medium",
                                                    patient.active === "ACTIVE"
                                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                                                        : "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400",
                                                )}
                                            >
                                                {patient.active === "ACTIVE" ? "En seguimiento" : "Inactivo"}
                                            </span>
                                        </div>
                                        <div className="mt-2.5 border-t border-slate-100 pt-2 text-[10px] text-slate-500 dark:border-zinc-800 dark:text-zinc-400">
                                            <div className="truncate">
                                                <span className="text-slate-400">Motivo:</span> {patient.reason}
                                            </div>
                                            <div>
                                                <span className="text-slate-400">Última sesión:</span> {patient.lastVisit}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB: HISTORIAL CLÍNICO */}
                    {tab === "historial" && (
                        <div className="space-y-3">
                            <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
                                <h4 className="font-bold text-slate-900 dark:text-white">
                                    Historial de Pacientes
                                </h4>
                                <p className="text-[10px] text-slate-400">
                                    Revisa el historial de tus pacientes atendidos, evolución por sesiones y notas SOAP.
                                </p>
                            </div>

                            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                                <table className="w-full text-left text-[11px]">
                                    <thead className="border-b border-slate-100 bg-slate-50 text-[10px] font-semibold text-slate-500 uppercase dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400">
                                        <tr>
                                            <th className="px-3 py-2">Paciente</th>
                                            <th className="px-3 py-2">Sesiones</th>
                                            <th className="px-3 py-2">Diagnóstico / Enfoque</th>
                                            <th className="px-3 py-2">Última atención</th>
                                            <th className="px-3 py-2 text-right">Evolución</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                                        {patients.map((p) => (
                                            <tr key={p.id} className="hover:bg-slate-50/70 dark:hover:bg-zinc-800/40">
                                                <td className="px-3 py-2.5 font-medium text-slate-900 dark:text-zinc-100">
                                                    {p.name}
                                                </td>
                                                <td className="px-3 py-2.5 font-mono text-[10px] text-slate-500">
                                                    {p.sessions} sesiones
                                                </td>
                                                <td className="px-3 py-2.5 text-slate-500 dark:text-zinc-400 max-w-[200px] truncate">
                                                    {p.diagnosis}
                                                </td>
                                                <td className="px-3 py-2.5 text-slate-400 text-[10px]">
                                                    {p.lastVisit}
                                                </td>
                                                <td className="px-3 py-2.5 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedHistorySoap(p)}
                                                        className="rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-800 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 cursor-pointer"
                                                    >
                                                        Ver SOAP ↗
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Modal Ficha Paciente */}
            {selectedPatient && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                    {selectedPatient.name}
                                </h4>
                                <span className="text-[10px] text-slate-400">
                                    {selectedPatient.age} años · {selectedPatient.email}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedPatient(null)}
                                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
                            >
                                <X className="size-4" />
                            </button>
                        </div>
                        <div className="mt-3 space-y-2 border-t border-slate-100 pt-3 text-[11px] dark:border-zinc-800">
                            <div>
                                <span className="text-slate-400">Teléfono:</span>{" "}
                                <strong className="text-slate-700 dark:text-zinc-200">
                                    {selectedPatient.phone}
                                </strong>
                            </div>
                            <div>
                                <span className="text-slate-400">Motivo de consulta:</span>{" "}
                                <strong className="text-slate-700 dark:text-zinc-200">
                                    {selectedPatient.reason}
                                </strong>
                            </div>
                            <div>
                                <span className="text-slate-400">Diagnóstico preliminar:</span>
                                <p className="mt-0.5 rounded bg-slate-50 p-2 text-[10px] text-slate-600 dark:bg-zinc-800 dark:text-zinc-300">
                                    {selectedPatient.diagnosis}
                                </p>
                            </div>
                            <div>
                                <span className="text-slate-400">Sesiones acumuladas:</span>{" "}
                                <span className="font-semibold text-blue-600">
                                    {selectedPatient.sessions} sesiones registradas
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setSelectedPatient(null)}
                                className="rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-blue-700"
                            >
                                Cerrar ficha
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Evolución Clínica SOAP */}
            {selectedHistorySoap && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Expediente Clínico · {selectedHistorySoap.name}
                                </h4>
                                <span className="text-[10px] text-blue-600 font-medium dark:text-blue-400">
                                    Evolución SOAP — Sesión #{selectedHistorySoap.sessions}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedHistorySoap(null)}
                                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        <div className="mt-3 space-y-2.5 border-t border-slate-100 pt-3 text-[11px] dark:border-zinc-800">
                            <div className="rounded-lg bg-slate-50 p-2 dark:bg-zinc-800/50">
                                <span className="font-bold text-blue-700 dark:text-blue-400">
                                    [S] Subjetivo:
                                </span>
                                <p className="text-slate-600 dark:text-zinc-300">
                                    Paciente refiere menor nivel de reactividad ante situaciones de presión en su entorno cotidiano.
                                </p>
                            </div>
                            <div className="rounded-lg bg-slate-50 p-2 dark:bg-zinc-800/50">
                                <span className="font-bold text-blue-700 dark:text-blue-400">
                                    [O] Objetivo:
                                </span>
                                <p className="text-slate-600 dark:text-zinc-300">
                                    Discurso fluido, afecto congruente, puntuación en escala de ansiedad reducida a niveles leves.
                                </p>
                            </div>
                            <div className="rounded-lg bg-slate-50 p-2 dark:bg-zinc-800/50">
                                <span className="font-bold text-blue-700 dark:text-blue-400">
                                    [A] Análisis:
                                </span>
                                <p className="text-slate-600 dark:text-zinc-300">
                                    Buena adherencia a técnicas de respiración diafragmática y registro de pensamientos automáticos.
                                </p>
                            </div>
                            <div className="rounded-lg bg-slate-50 p-2 dark:bg-zinc-800/50">
                                <span className="font-bold text-blue-700 dark:text-blue-400">
                                    [P] Plan:
                                </span>
                                <p className="text-slate-600 dark:text-zinc-300">
                                    Continuar con exposición graduada. Próxima sesión programada para la siguiente semana.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setSelectedHistorySoap(null)}
                                className="rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-blue-700"
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Nueva Cita */}
            {showNewAppointmentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="flex items-start justify-between">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                Agendar Nueva Cita
                            </h4>
                            <button
                                type="button"
                                onClick={() => setShowNewAppointmentModal(false)}
                                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
                            >
                                <X className="size-4" />
                            </button>
                        </div>
                        <div className="mt-3 space-y-2.5 border-t border-slate-100 pt-3 text-[11px] dark:border-zinc-800">
                            <div>
                                <label className="block font-medium text-slate-600 dark:text-zinc-300">
                                    Paciente:
                                </label>
                                <select className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-[11px] dark:border-zinc-700 dark:bg-zinc-800">
                                    {patients.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.name} ({p.age} años)
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium text-slate-600 dark:text-zinc-300">
                                    Tipo de sesión:
                                </label>
                                <select className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-[11px] dark:border-zinc-700 dark:bg-zinc-800">
                                    <option>Terapia Cognitivo-Conductual (50 min)</option>
                                    <option>Terapia de Pareja (50 min)</option>
                                    <option>Evaluación Inicial y Diagnóstico (60 min)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium text-slate-600 dark:text-zinc-300">
                                    Horario:
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Mañana, 11:00 am - 11:50 am"
                                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-[11px] dark:border-zinc-700 dark:bg-zinc-800"
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowNewAppointmentModal(false)}
                                className="rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-300"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowNewAppointmentModal(false)}
                                className="rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-blue-700"
                            >
                                Guardar cita
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
