import { ArrowUpRight, ChevronDown, ExternalLink, Maximize2, Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { demos, whatsappUrl } from "@/lib/kairu";
import type { ContactConfig, DemoKind } from "@/lib/kairu";
import { DashboardPreview } from "./dashboard-preview";
import { Container, KairuButton, SectionHeader, WhatsAppIcon } from "./primitives";

export function Projects({ contact }: { contact?: ContactConfig }) {
    const [selected, setSelected] = useState<DemoKind | null>(null);
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("Todas");
    const [limit, setLimit] = useState(6);
    const normalize = (value: string) =>
        value
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    const categories = [
        "Todas",
        ...new Set(demos.map((item) => item.category.split(" · ")[0])),
    ];
    const filtered = demos.filter(
        (item) =>
            (category === "Todas" ||
                item.category.split(" · ")[0] === category) &&
            normalize(
                `${item.title} ${item.description} ${item.category}`,
            ).includes(normalize(query.trim())),
    );
    const trigger = useRef<HTMLButtonElement | null>(null);
    const demo = demos.find((item) => item.id === selected);

    return (
        <section id="proyectos" className="section projects-section">
            <Container>
                <div className="section-topline">
                    <SectionHeader
                        eyebrow="Soluciones, en la práctica"
                        title={
                            <>
                                Explora lo que podemos
                                <br />
                                construir contigo.
                            </>
                        }
                    />
                    <p className="section-side-note" data-reveal>
                        Abre un prototipo y pruébalo. <br />
                        Recorre sus módulos y descubre cómo funciona cada sistema.
                    </p>
                </div>
                <div className="projects-toolbar" data-reveal>
                    <label className="projects-search">
                        <Search aria-hidden="true" />
                        <input
                            type="search"
                            aria-label="Buscar prototipos"
                            placeholder="Buscar un prototipo…"
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value);
                                setLimit(6);
                            }}
                        />
                    </label>
                    <div className="projects-filter">
                        <select
                            value={category}
                            aria-label="Filtrar por área"
                            onChange={(event) => {
                                setCategory(event.target.value);
                                setLimit(6);
                            }}
                        >
                            {categories.map((value) => (
                                <option key={value} value={value}>
                                    {value === "Todas"
                                        ? "Todas las áreas"
                                        : value.charAt(0) +
                                          value.slice(1).toLowerCase()}
                                </option>
                            ))}
                        </select>
                        <ChevronDown aria-hidden="true" />
                    </div>
                    <p className="projects-result-count" role="status">
                        {filtered.length}{" "}
                        {filtered.length === 1 ? "prototipo" : "prototipos"}
                    </p>
                </div>
                <div className="projects-grid">
                    {filtered.slice(0, limit).map((item) => (
                        <article
                            className={`project project-${item.id}`}
                            key={item.id}
                            data-reveal
                        >
                            <div className="project-visual">
                                <div
                                    className="project-screen"
                                    aria-hidden="true"
                                >
                                    <DashboardPreview kind={item.id} />
                                </div>
                                <button
                                    type="button"
                                    className="project-preview-trigger"
                                    onClick={(event) => {
                                        trigger.current = event.currentTarget;
                                        setSelected(item.id);
                                    }}
                                    aria-label={`Demo de interfaz: ${item.title}. Explorar`}
                                >
                                    <span className="demo-tag">
                                        Prototipo interactivo
                                    </span>
                                    <span className="project-open">
                                        <ArrowUpRight aria-hidden="true" />
                                    </span>
                                </button>
                            </div>
                            <div className="project-copy">
                                <span className="project-category">
                                    {item.category}
                                </span>
                                <h3>
                                    <button
                                        type="button"
                                        onClick={(event) => {
                                            trigger.current =
                                                event.currentTarget;
                                            setSelected(item.id);
                                        }}
                                    >
                                        {item.title}
                                        <ArrowUpRight aria-hidden="true" />
                                    </button>
                                </h3>
                                <p>{item.description}</p>
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <KairuButton
                                        variant="primary"
                                        size="sm"
                                        onClick={(event) => {
                                            trigger.current = event.currentTarget;
                                            setSelected(item.id);
                                        }}
                                        aria-label={`Probar prototipo: ${item.title}`}
                                    >
                                        Probar prototipo{" "}
                                        <ArrowUpRight data-icon="inline-end" />
                                    </KairuButton>
                                    <KairuButton
                                        variant="secondary"
                                        size="sm"
                                        asChild
                                    >
                                        <Link href={`/proyectos/${item.id}`}>
                                            Pantalla completa{" "}
                                            <ExternalLink data-icon="inline-end" className="size-3.5" />
                                        </Link>
                                    </KairuButton>
                                    <KairuButton
                                        variant="secondary"
                                        size="sm"
                                        className="kairu-whatsapp-buy-btn"
                                        asChild
                                    >
                                        <a
                                            href={whatsappUrl(
                                                contact,
                                                `Hola Kairu, me interesa adquirir el sistema "${item.title}". ¿Podrían brindarme más información?`,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <WhatsAppIcon data-icon="inline-start" className="size-4" />
                                            Comprar por WhatsApp
                                        </a>
                                    </KairuButton>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                {filtered.length === 0 && (
                    <div className="projects-empty">
                        <h3>No encontramos ese prototipo.</h3>
                        <p>Prueba otra búsqueda o consulta todas las áreas.</p>
                        <KairuButton
                            variant="secondary"
                            onClick={() => {
                                setQuery("");
                                setCategory("Todas");
                            }}
                        >
                            Ver todos
                        </KairuButton>
                    </div>
                )}
                {filtered.length > limit && (
                    <div className="projects-load-more">
                        <KairuButton
                            variant="secondary"
                            onClick={() => setLimit((value) => value + 6)}
                        >
                            Ver más prototipos
                        </KairuButton>
                    </div>
                )}
                <p className="demo-disclaimer" data-reveal>
                    Prototipos funcionales basados en proyectos de software construidos por Kairu.
                </p>
            </Container>
            <Dialog
                open={selected !== null}
                onOpenChange={(open) => !open && setSelected(null)}
            >
                <DialogContent
                    className="kairu-theme kairu-demo-dialog max-w-4xl"
                    closeLabel="Cerrar demo"
                    onCloseAutoFocus={(event) => {
                        event.preventDefault();
                        trigger.current?.focus({ preventScroll: true });
                    }}
                >
                    <DialogHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                                <DialogTitle>{demo?.title}</DialogTitle>
                                <DialogDescription>
                                    {demo?.label} Explora los diferentes módulos en la barra lateral para interactuar.
                                </DialogDescription>
                            </div>
                            {selected && (
                                <Link
                                    href={`/proyectos/${selected}`}
                                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                                >
                                    <Maximize2 className="size-3.5" />
                                    Pantalla completa ↗
                                </Link>
                            )}
                        </div>
                    </DialogHeader>
                    {selected && (
                        <div className="interactive-demo-viewport">
                            <DashboardPreview
                                key={selected}
                                kind={selected}
                                interactive
                                onOpenFullScreen={() => {
                                    window.location.href = `/proyectos/${selected}`;
                                }}
                            />
                        </div>
                    )}
                    <div className="demo-dialog-footer">
                        <p>Prototipo interactivo en vivo · datos de ejemplo</p>
                        <div className="flex flex-wrap items-center gap-2">
                            {demo && (
                                <KairuButton
                                    variant="secondary"
                                    size="sm"
                                    className="kairu-whatsapp-buy-btn"
                                    asChild
                                >
                                    <a
                                        href={whatsappUrl(
                                            contact,
                                            `Hola Kairu, acabo de probar el prototipo de "${demo.title}" y me interesa adquirirlo.`,
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <WhatsAppIcon data-icon="inline-start" className="size-4" />
                                        Comprar por WhatsApp
                                    </a>
                                </KairuButton>
                            )}
                            {selected && (
                                <KairuButton
                                    variant="secondary"
                                    size="sm"
                                    asChild
                                >
                                    <Link href={`/proyectos/${selected}`}>
                                        <ExternalLink data-icon="inline-start" className="size-3.5" />
                                        Pantalla completa
                                    </Link>
                                </KairuButton>
                            )}
                            <KairuButton
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelected(null)}
                            >
                                <X data-icon="inline-start" />
                                Cerrar demo
                            </KairuButton>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}
