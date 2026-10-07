import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { clientReviews } from "@/lib/reviews";
import { Container } from "./primitives";

function getInitials(name: string) {
    const cleanName = name.replace(/^(Dr\.|Dra\.|Ing\.|Lic\.)\s+/i, "");
    const parts = cleanName.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (parts[0]?.[0] || "K").toUpperCase();
}

export function Reviews() {
    const viewport = useRef<HTMLDivElement>(null);
    const [perPage, setPerPage] = useState(3);
    const [page, setPage] = useState(0);
    const groups = Array.from(
        { length: Math.ceil(clientReviews.length / perPage) },
        (_, index) =>
            clientReviews.slice(index * perPage, (index + 1) * perPage),
    );

    useEffect(() => {
        const mobile = matchMedia("(max-width: 640px)");
        const tablet = matchMedia("(max-width: 1000px)");
        const resize = () => {
            setPerPage(mobile.matches ? 1 : tablet.matches ? 2 : 3);
            setPage(0);
            viewport.current?.scrollTo({ left: 0, behavior: "instant" });
        };
        resize();
        mobile.addEventListener("change", resize);
        tablet.addEventListener("change", resize);
        return () => {
            mobile.removeEventListener("change", resize);
            tablet.removeEventListener("change", resize);
        };
    }, []);

    const goTo = (index: number, keyboard = false) => {
        const element = viewport.current;
        if (!element) return;
        element.scrollTo({
            left:
                Math.max(0, Math.min(index, groups.length - 1)) *
                element.clientWidth,
            behavior:
                keyboard ||
                matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "instant"
                    : "smooth",
        });
    };

    return (
        <section
            id="resenas"
            className="section reviews-section"
            aria-labelledby="reviews-title"
        >
            <Container>
                <div className="reviews-heading" data-reveal>
                    <span className="eyebrow">Testimonios de clientes</span>
                    <h2 id="reviews-title">
                        La experiencia de trabajar con Kairu.
                    </h2>
                    <p>
                        Opiniones y experiencias de clientes que confían en
                        Kairu para desarrollar sus sistemas y aplicaciones.
                    </p>
                </div>
                <div
                    className="reviews-carousel"
                    data-reveal
                    role="region"
                    aria-roledescription="carrusel"
                    aria-label="Reseñas de clientes"
                >
                    <div
                        id="reviews-viewport"
                        ref={viewport}
                        className="reviews-viewport"
                        tabIndex={0}
                        onScroll={(event) => {
                            const element = event.currentTarget;
                            setPage(
                                Math.round(
                                    element.scrollLeft / element.clientWidth,
                                ),
                            );
                        }}
                        onKeyDown={(event) => {
                            if (
                                event.key !== "ArrowLeft" &&
                                event.key !== "ArrowRight"
                            )
                                return;
                            event.preventDefault();
                            goTo(
                                page + (event.key === "ArrowRight" ? 1 : -1),
                                true,
                            );
                        }}
                    >
                        {groups.map((group, index) => (
                            <div
                                key={group[0].id}
                                className="reviews-grid reviews-page"
                                role="group"
                                aria-roledescription="diapositiva"
                                aria-label={`${index + 1} de ${groups.length}`}
                                inert={page !== index}
                            >
                                {group.map((review) => (
                                    <figure
                                        key={review.id}
                                        className="client-review"
                                    >
                                        <div className="client-review-header">
                                            {review.rating !== undefined ? (
                                                <div
                                                    className="review-rating"
                                                    role="img"
                                                    aria-label={`Calificación: ${review.rating} de 5 estrellas`}
                                                >
                                                    {Array.from({
                                                        length: 5,
                                                    }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`review-star${i < review.rating! ? "" : " review-star-empty"}`}
                                                            aria-hidden="true"
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="review-rating-pending">
                                                    Puntuación pendiente de
                                                    confirmar
                                                </span>
                                            )}
                                            <Quote
                                                className="review-quote-icon"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <blockquote>
                                            "{review.quote}"
                                        </blockquote>
                                        <figcaption>
                                            <span
                                                className="review-initial"
                                                aria-hidden="true"
                                            >
                                                {getInitials(review.name)}
                                            </span>
                                            <span className="review-meta">
                                                <strong className="review-author">
                                                    {review.name}
                                                </strong>
                                                <span className="review-company">
                                                    {review.role
                                                        ? `${review.role}`
                                                        : ""}
                                                    {review.role &&
                                                    review.location
                                                        ? " · "
                                                        : ""}
                                                    {review.location || ""}
                                                </span>
                                            </span>
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        ))}
                    </div>
                    {groups.length > 1 && (
                        <div className="reviews-controls">
                            <button
                                type="button"
                                className="reviews-arrow"
                                aria-label="Reseñas anteriores"
                                aria-controls="reviews-viewport"
                                disabled={page === 0}
                                onClick={(event) =>
                                    goTo(page - 1, event.detail === 0)
                                }
                            >
                                <ArrowLeft aria-hidden="true" />
                            </button>
                            <span
                                className="reviews-page-count"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {page + 1} / {groups.length}
                            </span>
                            <button
                                type="button"
                                className="reviews-arrow"
                                aria-label="Siguientes reseñas"
                                aria-controls="reviews-viewport"
                                disabled={page === groups.length - 1}
                                onClick={(event) =>
                                    goTo(page + 1, event.detail === 0)
                                }
                            >
                                <ArrowRight aria-hidden="true" />
                            </button>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}
