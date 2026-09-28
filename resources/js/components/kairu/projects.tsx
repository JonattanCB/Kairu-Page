import { ArrowUpRight, ChevronDown, Search, X } from "lucide-react";
import { useRef, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { demos } from "@/lib/kairu";
import type { DemoKind } from "@/lib/kairu";
import { DashboardPreview } from "./dashboard-preview";
import { Container, KairuButton, SectionHeader } from "./primitives";

export function Projects() {
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
                        Recorre sus módulos y descubre cómo funciona.
                    </p>
                </div>
                <div className="projects-toolbar">
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
                                <KairuButton
                                    variant="secondary"
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
                <p className="demo-disclaimer">
                    Demos conceptuales con datos de ejemplo. No representan
                    proyectos de clientes.
                </p>
            </Container>
            <Dialog
                open={selected !== null}
                onOpenChange={(open) => !open && setSelected(null)}
            >
                <DialogContent
                    className="kairu-theme kairu-demo-dialog"
                    closeLabel="Cerrar demo"
                    onCloseAutoFocus={(event) => {
                        event.preventDefault();
                        trigger.current?.focus({ preventScroll: true });
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>{demo?.title}</DialogTitle>
                        <DialogDescription>
                            {demo?.label} Prueba las secciones del menú y
                            selecciona una fila para ver su detalle.
                        </DialogDescription>
                    </DialogHeader>
                    {selected && (
                        <div className="interactive-demo-viewport">
                            <DashboardPreview
                                key={selected}
                                kind={selected}
                                interactive
                            />
                        </div>
                    )}
                    <div className="demo-dialog-footer">
                        <p>Interfaz de demostración · datos de ejemplo</p>
                        <KairuButton
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelected(null)}
                        >
                            <X data-icon="inline-start" />
                            Cerrar demo
                        </KairuButton>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}
