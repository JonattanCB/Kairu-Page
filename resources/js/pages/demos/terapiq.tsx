import { Head, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { TerapiqDemo } from "@/components/kairu/demos/terapiq-demo";
import { KairuButton, WhatsAppIcon } from "@/components/kairu/primitives";
import { refreshTheme } from "@/hooks/use-appearance";
import { whatsappUrl } from "@/lib/kairu";
import type { ContactConfig } from "@/lib/kairu";

export default function TerapiqPage({ contact }: { contact: ContactConfig }) {
    useEffect(() => {
        const language = document.documentElement.lang;
        document.documentElement.lang = "es-PE";
        document.documentElement.dataset.kairu = "true";
        refreshTheme();
        return () => {
            document.documentElement.lang = language;
            delete document.documentElement.dataset.kairu;
            refreshTheme();
        };
    }, []);

    return (
        <div className="h-dvh bg-slate-900 text-slate-100 flex flex-col font-sans overflow-hidden">
            <Head title="TerapiQ — Gestión para Psicólogos | Prototipo Kairu" />

            <header className="h-14 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <Link
                        href="/proyectos"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="size-3.5" /> Volver a proyectos
                    </Link>
                    <div className="hidden sm:flex items-center gap-2 border-l border-slate-800 pl-3">
                        <span className="flex size-2 rounded-full bg-teal-500 animate-pulse" />
                        <span className="text-xs font-semibold text-white">
                            TerapiQ — Software de Gestión Clínica y Psicología
                        </span>
                        <span className="rounded bg-teal-900/60 text-teal-300 border border-teal-800 text-[10px] px-2 py-0.5 font-medium">
                            Dr. Carlos Mendoza
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2.5">
                    <a
                        href={whatsappUrl(
                            contact,
                            'Hola Kairu, me interesa adquirir el sistema "TerapiQ — Gestión para Psicólogos". ¿Podrían brindarme más información?',
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#15803d] hover:bg-[#166534] text-white px-3.5 py-1.5 text-xs font-semibold transition-colors shadow-xs"
                    >
                        <WhatsAppIcon className="size-3.5" />
                        <span>Comprar por WhatsApp</span>
                    </a>
                    <KairuButton asChild size="sm" className="hidden sm:inline-flex">
                        <a href="/#contacto">
                            ¿Construimos el tuyo?
                        </a>
                    </KairuButton>
                </div>
            </header>

            <main className="flex-1 min-h-0 p-2 sm:p-3 bg-slate-950 flex flex-col overflow-hidden">
                <div className="flex-1 min-h-0 rounded-xl overflow-hidden shadow-2xl border border-slate-800/80 flex flex-col bg-slate-900">
                    <TerapiqDemo interactive />
                </div>
            </main>
        </div>
    );
}
