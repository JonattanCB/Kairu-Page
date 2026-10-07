import {
    ArrowRight,
    BookOpen,
    Calendar,
    Check,
    ChevronRight,
    Clock,
    FileText,
    GraduationCap,
    Key,
    LayoutDashboard,
    Loader2,
    LogOut,
    Mail,
    Megaphone,
    MessageSquare,
    Moon,
    Search,
    Sun,
    User,
    UserCheck,
    Users,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface EscuelaDemoProps {
    interactive?: boolean;
    onOpenFullScreen?: () => void;
    initialLoggedIn?: boolean;
}

type EscuelaRole = "school_admin" | "teacher" | "student";

type EscuelaTab =
    | "dashboard"
    | "asistencia"
    | "alumnos"
    | "docentes"
    | "horarios"
    | "noticias"
    | "mensajes";

const carouselPhotos = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1200",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200",
];

const roleAccounts: Record<
    EscuelaRole,
    { label: string; name: string; roleBadge: string; email: string; initials: string }
> = {
    school_admin: {
        label: "Dirección",
        name: "Lic. Mariana Paredes",
        roleBadge: "Dirección Académica",
        email: "direccion@innova.edu.pe",
        initials: "MP",
    },
    teacher: {
        label: "Docente",
        name: "Prof. Marcos Silva",
        roleBadge: "Docente de Matemáticas",
        email: "m.silva@innova.edu.pe",
        initials: "MS",
    },
    student: {
        label: "Alumno",
        name: "Valeria Ríos Morales",
        roleBadge: "Alumna · 3° Sec A",
        email: "valeria.rios@innova.edu.pe",
        initials: "VR",
    },
};

const initialAnnouncements = [
    {
        id: 1,
        title: "Inicio del Segundo Bimestre Escolar 2026",
        date: "28 de Septiembre, 2026",
        category: "Académico",
        description:
            "Recordamos a la plana docente y padres de familia que las evaluaciones mensuales inician la próxima semana. Horarios disponibles en plataforma.",
        important: true,
    },
    {
        id: 2,
        title: "Feria de Ciencias y Tecnología — Inscripciones Abiertas",
        date: "25 de Septiembre, 2026",
        category: "Institucional",
        description:
            "Los proyectos de 1° a 5° de Secundaria podrán inscribirse hasta el viernes 10 de octubre con sus respectivos tutores.",
        important: false,
    },
    {
        id: 3,
        title: "Reunión de Coordinación y Escuela de Padres",
        date: "22 de Septiembre, 2026",
        category: "Comunidad",
        description:
            "Sábado 09:00 am en el Auditorio Principal sobre hábitos de estudio y bienestar emocional escolar.",
        important: false,
    },
];

const initialClassesToday = [
    {
        id: 1,
        time: "08:00 - 09:30",
        course: "Álgebra y Funciones",
        grade: "3° Sec - A",
        teacher: "Prof. Marcos Silva",
        classroom: "Aula 204",
        status: "En curso",
    },
    {
        id: 2,
        time: "09:30 - 11:00",
        course: "Comunicación y Literatura",
        grade: "2° Sec - B",
        teacher: "Prof. Elena Robles",
        classroom: "Aula 102",
        status: "Próxima",
    },
    {
        id: 3,
        time: "11:30 - 13:00",
        course: "Biología y Ecosistemas",
        grade: "4° Sec - A",
        teacher: "Prof. David Quispe",
        classroom: "Lab Ciencias",
        status: "Programada",
    },
    {
        id: 4,
        time: "13:00 - 14:15",
        course: "Historia y Geografía",
        grade: "1° Sec - C",
        teacher: "Prof. Patricia Campos",
        classroom: "Aula 108",
        status: "Programada",
    },
];

const initialStudents = [
    {
        id: "ALU-1021",
        name: "Valeria Ríos Morales",
        grade: "3° Secundaria",
        section: "A",
        guardian: "Rosa Morales (Madre)",
        phone: "987 654 321",
        attendance: "Presente",
        average: 17.8,
        status: "Matriculado",
    },
    {
        id: "ALU-1022",
        name: "Mateo Fernández Solís",
        grade: "3° Secundaria",
        section: "A",
        guardian: "Carlos Fernández (Padre)",
        phone: "976 543 210",
        attendance: "Presente",
        average: 16.4,
        status: "Matriculado",
    },
    {
        id: "ALU-1023",
        name: "Luciana Carranza Vega",
        grade: "3° Secundaria",
        section: "A",
        guardian: "María Vega (Madre)",
        phone: "965 432 109",
        attendance: "Tarde",
        average: 18.2,
        status: "Matriculado",
    },
    {
        id: "ALU-1024",
        name: "Rodrigo Ramos Huamán",
        grade: "3° Secundaria",
        section: "A",
        guardian: "Julio Ramos (Padre)",
        phone: "954 321 098",
        attendance: "Justificada",
        average: 15.5,
        status: "Matriculado",
    },
    {
        id: "ALU-1025",
        name: "Camila Navarro Paz",
        grade: "3° Secundaria",
        section: "A",
        guardian: "Ana Paz (Madre)",
        phone: "943 210 987",
        attendance: "Presente",
        average: 19.0,
        status: "Matriculado",
    },
    {
        id: "ALU-1026",
        name: "Sebastián Mendoza Cruz",
        grade: "3° Secundaria",
        section: "A",
        guardian: "Laura Cruz (Madre)",
        phone: "932 109 876",
        attendance: "Falta",
        average: 14.2,
        status: "Matriculado",
    },
];

const initialTeachers = [
    {
        id: "DOC-01",
        name: "Prof. Marcos Silva",
        subject: "Matemáticas y Álgebra",
        grades: "3° y 4° Secundaria",
        email: "m.silva@innova.edu.pe",
        phone: "981 112 233",
        status: "Activo",
    },
    {
        id: "DOC-02",
        name: "Prof. Elena Robles",
        subject: "Comunicación y Lenguaje",
        grades: "1° a 3° Secundaria",
        email: "e.robles@innova.edu.pe",
        phone: "982 223 344",
        status: "Activo",
    },
    {
        id: "DOC-03",
        name: "Prof. David Quispe",
        subject: "Ciencias y Tecnología",
        grades: "3° a 5° Secundaria",
        email: "d.quispe@innova.edu.pe",
        phone: "983 334 455",
        status: "Activo",
    },
    {
        id: "DOC-04",
        name: "Prof. Patricia Campos",
        subject: "Ciencias Sociales e Historia",
        grades: "1° y 2° Secundaria",
        email: "p.campos@innova.edu.pe",
        phone: "984 445 566",
        status: "Activo",
    },
];

const scheduleGrid = [
    {
        time: "08:00 - 09:30",
        mon: { course: "Matemáticas", teacher: "Prof. Silva", room: "A-204" },
        tue: { course: "Comunicación", teacher: "Prof. Robles", room: "A-204" },
        wed: { course: "Matemáticas", teacher: "Prof. Silva", room: "A-204" },
        thu: { course: "Ciencias", teacher: "Prof. Quispe", room: "Lab" },
        fri: { course: "Inglés", teacher: "Prof. Stewart", room: "A-204" },
    },
    {
        time: "09:30 - 11:00",
        mon: { course: "Historia", teacher: "Prof. Campos", room: "A-204" },
        tue: { course: "Química", teacher: "Prof. Quispe", room: "Lab" },
        wed: { course: "Educ. Física", teacher: "Prof. Rojas", room: "Patio" },
        thu: { course: "Comunicación", teacher: "Prof. Robles", room: "A-204" },
        fri: { course: "Arte y Música", teacher: "Prof. Vera", room: "Taller" },
    },
    {
        time: "11:30 - 13:00",
        mon: { course: "Inglés", teacher: "Prof. Stewart", room: "A-204" },
        tue: { course: "Matemáticas", teacher: "Prof. Silva", room: "A-204" },
        wed: { course: "Historia", teacher: "Prof. Campos", room: "A-204" },
        thu: { course: "Tutoría", teacher: "Prof. Robles", room: "A-204" },
        fri: { course: "Computación", teacher: "Prof. Díaz", room: "Cómputo" },
    },
];

export function EscuelaDemo({
    interactive = false,
    onOpenFullScreen,
    initialLoggedIn,
}: EscuelaDemoProps) {
    // En vista miniatura (no interactiva) mostramos el dashboard, en modo interactivo iniciamos en el Login tal cual el proyecto real
    const [isLoggedIn, setIsLoggedIn] = useState(
        initialLoggedIn !== undefined ? initialLoggedIn : !interactive,
    );
    const [role, setRole] = useState<EscuelaRole>("school_admin");
    const [email, setEmail] = useState(roleAccounts.school_admin.email);
    const [password, setPassword] = useState("••••••••");
    const [remember, setRemember] = useState(true);
    const [authenticating, setAuthenticating] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDark, setIsDark] = useState(false);

    const [tab, setTab] = useState<EscuelaTab>("dashboard");
    const [searchStudent, setSearchStudent] = useState("");
    const [selectedStudent, setSelectedStudent] = useState<
        (typeof initialStudents)[0] | null
    >(null);
    const [students, setStudents] = useState(initialStudents);
    const [announcementIdx, setAnnouncementIdx] = useState(0);

    // Rotación de carrusel en Login
    useEffect(() => {
        if (isLoggedIn || !interactive) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselPhotos.length);
        }, 4500);
        return () => clearInterval(timer);
    }, [isLoggedIn, interactive]);

    const handleSelectRole = (newRole: EscuelaRole) => {
        setRole(newRole);
        setEmail(roleAccounts[newRole].email);
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

    const toggleAttendance = (studentId: string) => {
        const cycle: Array<(typeof initialStudents)[0]["attendance"]> = [
            "Presente",
            "Tarde",
            "Falta",
            "Justificada",
        ];
        setStudents((prev) =>
            prev.map((s) => {
                if (s.id !== studentId) return s;
                const nextIdx =
                    (cycle.indexOf(s.attendance) + 1) % cycle.length;
                return { ...s, attendance: cycle[nextIdx] };
            }),
        );
    };

    const filteredStudents = students.filter(
        (s) =>
            s.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
            s.id.toLowerCase().includes(searchStudent.toLowerCase()) ||
            s.grade.toLowerCase().includes(searchStudent.toLowerCase()),
    );

    const attendanceStats = {
        present: students.filter((s) => s.attendance === "Presente").length,
        late: students.filter((s) => s.attendance === "Tarde").length,
        absent: students.filter((s) => s.attendance === "Falta").length,
        justified: students.filter((s) => s.attendance === "Justificada").length,
    };

    const currentAccount = roleAccounts[role];

    // Módulos disponibles según el rol del colegio (NUNCA super_admin)
    const navItems =
        role === "student"
            ? [
                  { id: "dashboard", label: "Inicio", icon: LayoutDashboard },
                  { id: "horarios", label: "Mi Horario", icon: Calendar },
                  { id: "asistencia", label: "Mi Asistencia", icon: Check },
                  { id: "noticias", label: "Noticias", icon: FileText },
                  { id: "mensajes", label: "Mensajería", icon: MessageSquare },
              ]
            : role === "teacher"
              ? [
                    { id: "dashboard", label: "Inicio", icon: LayoutDashboard },
                    { id: "asistencia", label: "Asistencia", icon: Check },
                    { id: "alumnos", label: "Mis Alumnos", icon: User },
                    { id: "horarios", label: "Horarios", icon: Clock },
                    { id: "noticias", label: "Noticias", icon: FileText },
                    { id: "mensajes", label: "Mensajería", icon: MessageSquare },
                ]
              : [
                    { id: "dashboard", label: "Inicio", icon: LayoutDashboard },
                    { id: "asistencia", label: "Asistencia", icon: Check },
                    { id: "alumnos", label: "Alumnos", icon: User },
                    { id: "docentes", label: "Docentes", icon: Users },
                    { id: "horarios", label: "Horarios", icon: Clock },
                    { id: "noticias", label: "Comunicación", icon: Megaphone },
                    { id: "mensajes", label: "Mensajería", icon: MessageSquare },
                ];

    // =========================================================================
    // PANTALLA DE LOGIN DEL COLEGIO (IDÉNTICA A Login.jsx DE SCHOLE CON SCHOOL)
    // =========================================================================
    if (!isLoggedIn) {
        return (
            <div
                className={cn(
                    "flex flex-1 h-full min-h-[500px] w-full flex-col md:flex-row overflow-hidden rounded-xl border font-sans transition-colors duration-300",
                    isDark
                        ? "dark border-zinc-800 bg-zinc-950 text-zinc-50"
                        : "border-zinc-200 bg-zinc-50 text-zinc-900",
                )}
            >
                {/* Left Side: Images Carousel (60% width on md+) */}
                <div className="hidden md:flex md:w-[58%] relative bg-zinc-900 overflow-hidden items-center justify-center">
                    {carouselPhotos.map((photoUrl, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "absolute inset-0 transition-all duration-1000 ease-in-out",
                                idx === currentSlide
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-105 pointer-events-none",
                            )}
                        >
                            <img
                                src={photoUrl}
                                alt={"Innova Academy Slide " + (idx + 1)}
                                className="w-full h-full object-cover brightness-[0.35]"
                            />
                        </div>
                    ))}

                    {/* Bottom Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-90" />

                    {/* Floating Indicators / Navigation Dots */}
                    <div className="absolute bottom-5 left-8 flex gap-2 z-20">
                        {carouselPhotos.map((_, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setCurrentSlide(idx)}
                                className="h-1.5 rounded-full transition-all duration-300"
                                style={{
                                    width: idx === currentSlide ? "24px" : "6px",
                                    backgroundColor:
                                        idx === currentSlide
                                            ? "#0C447C"
                                            : "rgba(255, 255, 255, 0.4)",
                                }}
                                aria-label={"Ir a imagen " + (idx + 1)}
                            />
                        ))}
                    </div>

                    {/* School Info Overlay */}
                    <div className="absolute inset-x-0 bottom-12 px-8 text-white max-w-lg space-y-3 z-10">
                        <div
                            className="inline-flex px-3 py-1 backdrop-blur-md rounded-full border text-[10px] font-semibold uppercase tracking-wider text-white"
                            style={{
                                backgroundColor: "#0C447C55",
                                borderColor: "#3b82f6",
                            }}
                        >
                            Portal Institucional
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white shrink-0">
                                <GraduationCap className="size-5" />
                            </div>
                            <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight text-white">
                                Colegio Innova Academy
                            </h2>
                        </div>
                        <p className="text-zinc-300 text-xs leading-relaxed font-medium">
                            Educación de Calidad para el Éxito y Bienestar Estudiantil
                        </p>
                        <div className="pt-3 border-t border-white/10 flex items-center gap-5 text-[11px] text-zinc-400 font-semibold">
                            <span>admision@innova.edu.pe</span>
                            <span>(01) 480-2390</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form (42% width on md+) */}
                <div
                    className={cn(
                        "w-full md:w-[42%] flex flex-col justify-center items-center p-6 sm:p-8 relative flex-1",
                        isDark ? "bg-zinc-950" : "bg-zinc-50",
                    )}
                >
                    {/* Top Right Controls */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                        {onOpenFullScreen && (
                            <button
                                type="button"
                                onClick={onOpenFullScreen}
                                className={cn(
                                    "rounded-lg border px-2.5 py-1 text-[10px] font-semibold transition-colors",
                                    isDark
                                        ? "border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
                                        : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100",
                                )}
                            >
                                Pantalla completa ↗
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => setIsDark(!isDark)}
                            className={cn(
                                "rounded-full p-2 transition-colors",
                                isDark
                                    ? "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                                    : "text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-900",
                            )}
                            title={isDark ? "Modo claro" : "Modo oscuro"}
                        >
                            {isDark ? <Sun size={16} /> : <Moon size={16} />}
                        </button>
                    </div>

                    <div className="w-full max-w-xs space-y-4 flex flex-col items-center z-10">
                        {/* School Header */}
                        <div className="flex flex-col items-center text-center space-y-1.5">
                            <div
                                className={cn(
                                    "h-11 w-11 rounded-xl flex items-center justify-center shadow-sm border shrink-0",
                                    isDark
                                        ? "bg-zinc-900 border-zinc-800"
                                        : "bg-white border-zinc-200",
                                )}
                            >
                                <GraduationCap className="text-[#0C447C] dark:text-blue-400 size-6" />
                            </div>
                            <h1 className="text-xl font-extrabold tracking-tight mt-1">
                                Innova Academy
                            </h1>
                            <p
                                className={cn(
                                    "text-[11px] max-w-[250px]",
                                    isDark ? "text-zinc-400" : "text-zinc-500",
                                )}
                            >
                                Inicia sesión para ingresar a la plataforma de tu colegio.
                            </p>
                        </div>

                        {/* Selector rápido de Rol Escolar (Sin SuperAdmin) */}
                        <div className="w-full">
                            <span
                                className={cn(
                                    "block text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-center",
                                    isDark ? "text-zinc-400" : "text-zinc-500",
                                )}
                            >
                                Probar acceso como:
                            </span>
                            <div
                                className={cn(
                                    "grid grid-cols-3 gap-1 p-1 rounded-xl border",
                                    isDark
                                        ? "bg-zinc-900/90 border-zinc-800"
                                        : "bg-zinc-100 border-zinc-200/80",
                                )}
                            >
                                {(
                                    ["school_admin", "teacher", "student"] as EscuelaRole[]
                                ).map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => handleSelectRole(r)}
                                        className={cn(
                                            "py-1.5 px-2 rounded-lg text-[10px] font-semibold transition-all",
                                            role === r
                                                ? "bg-[#0C447C] text-white shadow-xs"
                                                : isDark
                                                  ? "text-zinc-400 hover:text-zinc-200"
                                                  : "text-zinc-600 hover:text-zinc-900",
                                        )}
                                    >
                                        {roleAccounts[r].label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Card Formulario */}
                        <div
                            className={cn(
                                "w-full rounded-2xl border shadow-lg backdrop-blur-md p-5",
                                isDark
                                    ? "border-zinc-800/80 bg-zinc-900/70"
                                    : "border-zinc-200/80 bg-white/80",
                            )}
                        >
                            <form onSubmit={handleLogin} className="space-y-3.5">
                                <div className="space-y-1">
                                    <label
                                        className={cn(
                                            "block text-[11px] font-semibold",
                                            isDark ? "text-zinc-300" : "text-zinc-600",
                                        )}
                                    >
                                        Correo Electrónico
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="ejemplo@correo.com"
                                            className={cn(
                                                "w-full pl-9 pr-3 h-9 rounded-lg border text-xs bg-transparent focus:outline-hidden focus:ring-1 focus:ring-[#0C447C]",
                                                isDark
                                                    ? "border-zinc-800 text-zinc-100"
                                                    : "border-zinc-200 text-zinc-800",
                                            )}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label
                                        className={cn(
                                            "block text-[11px] font-semibold",
                                            isDark ? "text-zinc-300" : "text-zinc-600",
                                        )}
                                    >
                                        Contraseña
                                    </label>
                                    <div className="relative">
                                        <Key className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className={cn(
                                                "w-full pl-9 pr-3 h-9 rounded-lg border text-xs bg-transparent focus:outline-hidden focus:ring-1 focus:ring-[#0C447C]",
                                                isDark
                                                    ? "border-zinc-800 text-zinc-100"
                                                    : "border-zinc-200 text-zinc-800",
                                            )}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 pt-0.5 select-none">
                                    <input
                                        id="escuela-remember"
                                        type="checkbox"
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                        className="rounded border-zinc-300 text-[#0C447C] focus:ring-[#0C447C]"
                                    />
                                    <label
                                        htmlFor="escuela-remember"
                                        className={cn(
                                            "text-[11px] font-semibold cursor-pointer",
                                            isDark ? "text-zinc-300" : "text-zinc-600",
                                        )}
                                    >
                                        Recordar sesión
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={authenticating}
                                    className="w-full mt-2 font-semibold text-xs h-9 rounded-lg shadow bg-[#0C447C] text-white hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    {authenticating ? (
                                        <>
                                            <Loader2 className="animate-spin size-3.5" />
                                            <span>Autenticando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="size-4 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                                <GraduationCap className="size-2.5 text-white" />
                                            </div>
                                            <span>Ingresar al Portal</span>
                                            <ArrowRight size={13} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // =========================================================================
    // PANEL ESCOLAR AUTENTICADO (DASHBOARD LAYOUT SIN SUPERADMIN)
    // =========================================================================
    return (
        <div
            className={cn(
                "flex flex-1 h-full min-h-[500px] w-full overflow-hidden rounded-xl border font-sans text-xs shadow-sm",
                isDark
                    ? "dark border-zinc-800 bg-zinc-950 text-zinc-100"
                    : "border-slate-200 bg-slate-50 text-slate-800",
            )}
        >
            {/* Sidebar escolar */}
            <aside className="flex w-48 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                {/* Branding escolar */}
                <div className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-3.5 dark:border-zinc-800/70">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-[#0C447C] font-bold text-white shadow-xs">
                        <GraduationCap className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1 leading-tight">
                        <span className="block truncate text-xs font-bold tracking-tight text-slate-900 dark:text-white">
                            Innova Academy
                        </span>
                        <span className="block text-[10px] text-slate-400 dark:text-zinc-400">
                            Año Escolar 2026
                        </span>
                    </div>
                </div>

                {/* Navegación por módulos escolares */}
                <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
                    <div className="px-2 pb-1 pt-1 text-[9px] font-semibold tracking-wider text-slate-400 uppercase dark:text-zinc-500">
                        {currentAccount.roleBadge}
                    </div>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = tab === item.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                disabled={!interactive}
                                onClick={() => interactive && setTab(item.id as EscuelaTab)}
                                className={cn(
                                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[11px] font-medium transition-colors cursor-pointer",
                                    active
                                        ? "bg-blue-50 text-[#0C447C] font-semibold shadow-xs dark:bg-blue-950/60 dark:text-blue-300"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100",
                                )}
                            >
                                <Icon
                                    className={cn(
                                        "size-3.5",
                                        active
                                            ? "text-[#0C447C] dark:text-blue-400"
                                            : "text-slate-400",
                                    )}
                                />
                                <span>{item.label}</span>
                                {item.id === "noticias" && (
                                    <span className="ml-auto rounded-full bg-blue-100 px-1.5 py-0.2 text-[9px] font-semibold text-[#0C447C] dark:bg-blue-900/60 dark:text-blue-300">
                                        3
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Perfil + Botón Cerrar Sesión */}
                <div className="border-t border-slate-100 p-2.5 space-y-1.5 dark:border-zinc-800">
                    <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 dark:bg-zinc-800/50">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#0C447C] text-[10px] font-bold text-white">
                            {currentAccount.initials}
                        </div>
                        <div className="min-w-0 flex-1 leading-tight">
                            <span className="block truncate text-[11px] font-semibold text-slate-800 dark:text-zinc-200">
                                {currentAccount.name}
                            </span>
                            <span className="block truncate text-[9px] text-emerald-600 font-medium dark:text-emerald-400">
                                {currentAccount.roleBadge}
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

            {/* Contenido principal */}
            <main className="flex flex-1 flex-col overflow-hidden">
                {/* Header superior */}
                <header className="flex h-12 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-slate-400 dark:text-zinc-500">
                            Innova Academy
                        </span>
                        <ChevronRight className="size-3 text-slate-300 dark:text-zinc-600" />
                        <span className="text-[11px] font-semibold text-slate-800 capitalize dark:text-zinc-200">
                            {tab}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {interactive && (
                            <div className="hidden sm:flex items-center gap-1 rounded-lg border border-slate-200 p-0.5 dark:border-zinc-800">
                                {(
                                    ["school_admin", "teacher", "student"] as EscuelaRole[]
                                ).map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => handleSelectRole(r)}
                                        className={cn(
                                            "rounded-md px-2 py-0.5 text-[9px] font-semibold transition-colors cursor-pointer",
                                            role === r
                                                ? "bg-[#0C447C] text-white"
                                                : "text-slate-500 hover:text-slate-900 dark:text-zinc-400",
                                        )}
                                    >
                                        {roleAccounts[r].label}
                                    </button>
                                ))}
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

                {/* Vista según pestaña activa */}
                <div className="flex-1 overflow-y-auto p-4">
                    {/* TAB: DASHBOARD */}
                    {tab === "dashboard" && (
                        <div className="space-y-4">
                            <div className="flex flex-col gap-0.5">
                                <h4 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                                    ¡Bienvenido de vuelta, {currentAccount.name}!
                                </h4>
                                <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                                    Colegio Innova Academy · Resumen del sistema para hoy.
                                </p>
                            </div>

                            {/* Banner de comunicado destacado rotativo */}
                            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#0C447C] via-blue-700 to-indigo-800 p-4 text-white shadow-sm">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="rounded-md bg-white/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                                                {initialAnnouncements[announcementIdx].category}
                                            </span>
                                            <span className="text-[10px] text-white/80">
                                                {initialAnnouncements[announcementIdx].date}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-bold tracking-tight text-white">
                                            {initialAnnouncements[announcementIdx].title}
                                        </h4>
                                        <p className="max-w-xl text-[11px] text-blue-100">
                                            {initialAnnouncements[announcementIdx].description}
                                        </p>
                                    </div>
                                    <div className="flex gap-1 shrink-0">
                                        {initialAnnouncements.map((_, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => setAnnouncementIdx(i)}
                                                className={cn(
                                                    "h-1.5 rounded-full transition-all",
                                                    announcementIdx === i
                                                        ? "w-5 bg-white"
                                                        : "w-1.5 bg-white/40",
                                                )}
                                                aria-label={"Ver anuncio " + (i + 1)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Métricas clave escolares */}
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {[
                                    {
                                        title: "Alumnos Matriculados",
                                        value: "485",
                                        note: "+12 este bimestre",
                                        icon: GraduationCap,
                                        tone: "text-blue-600 dark:text-blue-400",
                                    },
                                    {
                                        title: "Docentes en Aula",
                                        value: "28",
                                        note: "100% de asistencia",
                                        icon: Users,
                                        tone: "text-emerald-600 dark:text-emerald-400",
                                    },
                                    {
                                        title: "Asistencia de Hoy",
                                        value: "95.4%",
                                        note: "463 presentes hoy",
                                        icon: UserCheck,
                                        tone: "text-indigo-600 dark:text-indigo-400",
                                    },
                                    {
                                        title: "Clases Programadas",
                                        value: "36",
                                        note: "Horario regular",
                                        icon: Clock,
                                        tone: "text-amber-600 dark:text-amber-400",
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

                            {/* Dos columnas: Horario de hoy & Asistencia en vivo */}
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {/* Clases de hoy */}
                                <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
                                        <div className="flex items-center gap-2">
                                            <Clock className="size-4 text-blue-600 dark:text-blue-400" />
                                            <h4 className="font-semibold text-slate-900 dark:text-white">
                                                Clases en curso y del día
                                            </h4>
                                        </div>
                                        <span className="text-[10px] text-slate-400">
                                            Secundaria
                                        </span>
                                    </div>
                                    <div className="mt-2.5 space-y-2">
                                        {initialClassesToday.map((cls) => (
                                            <div
                                                key={cls.id}
                                                className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/70 p-2 transition-colors hover:bg-slate-50 dark:border-zinc-800/80 dark:bg-zinc-800/40"
                                            >
                                                <div className="space-y-0.5">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="font-semibold text-slate-900 dark:text-zinc-100">
                                                            {cls.course}
                                                        </span>
                                                        <span className="rounded bg-blue-100 px-1.5 py-0.2 text-[9px] font-medium text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                                                            {cls.grade}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                                        <span>{cls.teacher}</span>
                                                        <span>·</span>
                                                        <span>{cls.classroom}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block text-[10px] font-semibold text-slate-700 dark:text-zinc-300">
                                                        {cls.time}
                                                    </span>
                                                    <span
                                                        className={cn(
                                                            "text-[9px] font-medium",
                                                            cls.status === "En curso"
                                                                ? "text-emerald-600 dark:text-emerald-400"
                                                                : "text-slate-400",
                                                        )}
                                                    >
                                                        {cls.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Control rápido de Asistencia */}
                                <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
                                        <div className="flex items-center gap-2">
                                            <UserCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
                                            <h4 className="font-semibold text-slate-900 dark:text-white">
                                                Resumen de Asistencia
                                            </h4>
                                        </div>
                                        <span className="text-[10px] font-medium text-blue-600 dark:text-blue-400">
                                            3° Secundaria - Sección A
                                        </span>
                                    </div>

                                    {/* Barra de distribución */}
                                    <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800">
                                        <div
                                            style={{
                                                width: ((attendanceStats.present / students.length) * 100) + "%",
                                            }}
                                            className="bg-emerald-500"
                                            title="Presentes"
                                        />
                                        <div
                                            style={{
                                                width: ((attendanceStats.late / students.length) * 100) + "%",
                                            }}
                                            className="bg-amber-400"
                                            title="Tardanzas"
                                        />
                                        <div
                                            style={{
                                                width: ((attendanceStats.justified / students.length) * 100) + "%",
                                            }}
                                            className="bg-blue-400"
                                            title="Justificadas"
                                        />
                                        <div
                                            style={{
                                                width: ((attendanceStats.absent / students.length) * 100) + "%",
                                            }}
                                            className="bg-rose-500"
                                            title="Faltas"
                                        />
                                    </div>

                                    {/* Leyenda y contadores */}
                                    <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                                        <div className="rounded-lg bg-emerald-50/80 p-2 dark:bg-emerald-950/40">
                                            <span className="block text-xs font-bold text-emerald-700 dark:text-emerald-400">
                                                {attendanceStats.present}
                                            </span>
                                            <span className="text-[9px] text-emerald-600 dark:text-emerald-300">
                                                Presentes
                                            </span>
                                        </div>
                                        <div className="rounded-lg bg-amber-50/80 p-2 dark:bg-amber-950/40">
                                            <span className="block text-xs font-bold text-amber-700 dark:text-amber-400">
                                                {attendanceStats.late}
                                            </span>
                                            <span className="text-[9px] text-amber-600 dark:text-amber-300">
                                                Tardanzas
                                            </span>
                                        </div>
                                        <div className="rounded-lg bg-blue-50/80 p-2 dark:bg-blue-950/40">
                                            <span className="block text-xs font-bold text-blue-700 dark:text-blue-400">
                                                {attendanceStats.justified}
                                            </span>
                                            <span className="text-[9px] text-blue-600 dark:text-blue-300">
                                                Justificadas
                                            </span>
                                        </div>
                                        <div className="rounded-lg bg-rose-50/80 p-2 dark:bg-rose-950/40">
                                            <span className="block text-xs font-bold text-rose-700 dark:text-rose-400">
                                                {attendanceStats.absent}
                                            </span>
                                            <span className="text-[9px] text-rose-600 dark:text-rose-300">
                                                Faltas
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-3 text-center">
                                        <button
                                            type="button"
                                            onClick={() => setTab("asistencia")}
                                            className="text-[10px] font-semibold text-blue-600 hover:underline dark:text-blue-400"
                                        >
                                            Ver registro completo de asistencia →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: ASISTENCIA */}
                    {tab === "asistencia" && (
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-slate-900 dark:text-white">
                                        Toma de Asistencia Diaria
                                    </h4>
                                    <p className="text-[10px] text-slate-400">
                                        Haz click en la píldora de asistencia de cualquier alumno para alternar su estado.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                                        📅 Hoy: 29 de Septiembre
                                    </span>
                                    <span className="rounded-md bg-[#0C447C] px-2.5 py-1 text-[10px] font-semibold text-white">
                                        3° Sec - Aula A
                                    </span>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                                <table className="w-full text-left text-[11px]">
                                    <thead className="border-b border-slate-100 bg-slate-50 text-[10px] font-semibold text-slate-500 uppercase dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400">
                                        <tr>
                                            <th className="px-3 py-2">Código</th>
                                            <th className="px-3 py-2">Estudiante</th>
                                            <th className="px-3 py-2">Apoderado</th>
                                            <th className="px-3 py-2 text-center">Estado de Asistencia</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                                        {students.map((student) => (
                                            <tr key={student.id} className="hover:bg-slate-50/70 dark:hover:bg-zinc-800/40">
                                                <td className="px-3 py-2 font-mono text-[10px] text-slate-400">
                                                    {student.id}
                                                </td>
                                                <td className="px-3 py-2 font-medium text-slate-900 dark:text-zinc-100">
                                                    {student.name}
                                                </td>
                                                <td className="px-3 py-2 text-slate-500 dark:text-zinc-400">
                                                    {student.guardian}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleAttendance(student.id)}
                                                        title="Click para alternar estado"
                                                        className={cn(
                                                            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-transform active:scale-95 cursor-pointer",
                                                            student.attendance === "Presente" &&
                                                                "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
                                                            student.attendance === "Tarde" &&
                                                                "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
                                                            student.attendance === "Falta" &&
                                                                "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
                                                            student.attendance === "Justificada" &&
                                                                "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
                                                        )}
                                                    >
                                                        <span className="size-1.5 rounded-full bg-current" />
                                                        {student.attendance}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* TAB: ALUMNOS */}
                    {tab === "alumnos" && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                                <div className="relative flex-1 max-w-sm">
                                    <Search className="absolute left-2.5 top-2 size-3.5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Buscar por alumno, DNI o grado..."
                                        value={searchStudent}
                                        onChange={(e) => setSearchStudent(e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-[11px] placeholder:text-slate-400 focus:border-blue-500 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800"
                                    />
                                </div>
                                <span className="text-[10px] text-slate-500">
                                    Mostrando {filteredStudents.length} alumnos
                                </span>
                            </div>

                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {filteredStudents.map((student) => (
                                    <div
                                        key={student.id}
                                        onClick={() => setSelectedStudent(student)}
                                        className="cursor-pointer rounded-xl border border-slate-200 bg-white p-3 transition-all hover:border-blue-300 hover:shadow-xs dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-700"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-0.5">
                                                <h5 className="font-semibold text-slate-900 dark:text-white">
                                                    {student.name}
                                                </h5>
                                                <span className="block text-[10px] text-slate-400">
                                                    {student.grade} - Secc. {student.section}
                                                </span>
                                            </div>
                                            <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] text-slate-600 dark:bg-zinc-800 dark:text-zinc-300">
                                                {student.id}
                                            </span>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] dark:border-zinc-800">
                                            <span className="text-slate-500">
                                                Apoderado: {student.guardian.split(" ")[0]}
                                            </span>
                                            <span className="font-semibold text-blue-600 dark:text-blue-400">
                                                Prom: {student.average}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB: DOCENTES */}
                    {tab === "docentes" && (
                        <div className="space-y-3">
                            <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
                                <h4 className="font-bold text-slate-900 dark:text-white">
                                    Plana Docente Activa
                                </h4>
                                <p className="text-[10px] text-slate-400">
                                    28 docentes registrados y asignados a cursos bimestrales.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {initialTeachers.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="rounded-xl border border-slate-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <div className="flex size-8 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                                {doc.name.split(" ")[1]?.[0] || "D"}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h5 className="font-semibold text-slate-900 dark:text-white">
                                                    {doc.name}
                                                </h5>
                                                <span className="block text-[10px] text-blue-600 font-medium dark:text-blue-400">
                                                    {doc.subject}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-2.5 space-y-1 border-t border-slate-100 pt-2 text-[10px] text-slate-500 dark:border-zinc-800 dark:text-zinc-400">
                                            <div>Grados: {doc.grades}</div>
                                            <div className="truncate">Correo: {doc.email}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB: HORARIOS */}
                    {tab === "horarios" && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">
                                        Horario Semanal — 3° Secundaria A
                                    </h4>
                                    <p className="text-[10px] text-slate-400">
                                        Distribución de horas pedagógicas semanales.
                                    </p>
                                </div>
                                <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                    Turno: 08:00 - 14:15
                                </span>
                            </div>

                            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                                <table className="w-full min-w-[500px] text-left text-[10px]">
                                    <thead className="border-b border-slate-100 bg-slate-50 font-semibold text-slate-500 uppercase dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-400">
                                        <tr>
                                            <th className="p-2.5">Hora</th>
                                            <th className="p-2.5">Lunes</th>
                                            <th className="p-2.5">Martes</th>
                                            <th className="p-2.5">Miércoles</th>
                                            <th className="p-2.5">Jueves</th>
                                            <th className="p-2.5">Viernes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                                        {scheduleGrid.map((row, idx) => (
                                            <tr key={idx}>
                                                <td className="p-2 font-mono text-[9px] text-slate-400 bg-slate-50/50 dark:bg-zinc-800/30">
                                                    {row.time}
                                                </td>
                                                {[row.mon, row.tue, row.wed, row.thu, row.fri].map(
                                                    (block, bIdx) => (
                                                        <td key={bIdx} className="p-2">
                                                            <div className="rounded-md bg-blue-50/80 p-1.5 leading-tight dark:bg-blue-950/40">
                                                                <span className="font-semibold text-blue-900 dark:text-blue-200">
                                                                    {block.course}
                                                                </span>
                                                                <span className="block text-[9px] text-slate-500 dark:text-zinc-400">
                                                                    {block.room}
                                                                </span>
                                                            </div>
                                                        </td>
                                                    ),
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* TAB: NOTICIAS / COMUNICADOS */}
                    {tab === "noticias" && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">
                                        Circulares y Comunicados Oficiales
                                    </h4>
                                    <p className="text-[10px] text-slate-400">
                                        Canal institucional para dirección, docentes y padres de familia.
                                    </p>
                                </div>
                                <span className="rounded bg-[#0C447C] px-2 py-1 text-[10px] font-semibold text-white">
                                    3 Emitidas
                                </span>
                            </div>

                            <div className="space-y-2.5">
                                {initialAnnouncements.map((item) => (
                                    <div
                                        key={item.id}
                                        className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                                {item.category}
                                            </span>
                                            <span className="text-[10px] text-slate-400">
                                                {item.date}
                                            </span>
                                        </div>
                                        <h5 className="mt-1.5 font-bold text-slate-900 dark:text-white">
                                            {item.title}
                                        </h5>
                                        <p className="mt-1 text-[11px] text-slate-600 dark:text-zinc-300 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB: MENSAJES */}
                    {tab === "mensajes" && (
                        <div className="flex h-72 flex-col rounded-xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                            <div className="border-b border-slate-100 p-3 dark:border-zinc-800">
                                <h4 className="font-bold text-slate-900 dark:text-white">
                                    Canal de Comunicación Interna
                                </h4>
                                <span className="text-[10px] text-slate-400">
                                    Coordinación Académica - Plana Secundaria
                                </span>
                            </div>
                            <div className="flex-1 space-y-2.5 overflow-y-auto p-3">
                                <div className="max-w-[80%] rounded-lg bg-slate-100 p-2 text-[11px] text-slate-800 dark:bg-zinc-800 dark:text-zinc-200">
                                    <strong className="block text-[10px] text-blue-600 dark:text-blue-400">
                                        Prof. Marcos Silva:
                                    </strong>
                                    Estimada dirección, las notas de la práctica calificada de 3° A ya se encuentran en el sistema.
                                </div>
                                <div className="ml-auto max-w-[80%] rounded-lg bg-[#0C447C] p-2 text-[11px] text-white">
                                    <strong className="block text-[10px] text-blue-200">
                                        Dirección Académica:
                                    </strong>
                                    Excelente profesor Marcos, procedemos a habilitar la visualización para los apoderados.
                                </div>
                            </div>
                            <div className="border-t border-slate-100 p-2 dark:border-zinc-800">
                                <input
                                    type="text"
                                    placeholder="Escribe un mensaje de respuesta..."
                                    readOnly
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] placeholder:text-slate-400 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Modal de Ficha del Alumno */}
            {selectedStudent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                    {selectedStudent.name}
                                </h4>
                                <span className="font-mono text-[10px] text-slate-400">
                                    {selectedStudent.id} · {selectedStudent.grade} {selectedStudent.section}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedStudent(null)}
                                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
                            >
                                <X className="size-4" />
                            </button>
                        </div>
                        <div className="mt-3 space-y-2 border-t border-slate-100 pt-3 text-[11px] dark:border-zinc-800">
                            <div>
                                <span className="text-slate-400">Apoderado:</span>{" "}
                                <strong className="text-slate-700 dark:text-zinc-200">
                                    {selectedStudent.guardian}
                                </strong>
                            </div>
                            <div>
                                <span className="text-slate-400">Teléfono:</span>{" "}
                                <strong className="text-slate-700 dark:text-zinc-200">
                                    {selectedStudent.phone}
                                </strong>
                            </div>
                            <div>
                                <span className="text-slate-400">Promedio general:</span>{" "}
                                <strong className="text-blue-600 dark:text-blue-400">
                                    {selectedStudent.average} / 20
                                </strong>
                            </div>
                            <div>
                                <span className="text-slate-400">Estado de hoy:</span>{" "}
                                <span className="font-semibold text-emerald-600">
                                    {selectedStudent.attendance}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setSelectedStudent(null)}
                                className="rounded-lg bg-[#0C447C] px-3 py-1.5 text-[11px] font-semibold text-white hover:opacity-95"
                            >
                                Cerrar ficha
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
