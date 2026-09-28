import { useEffect, useRef } from 'react';
import {
    ArrowUpRight,
    Blocks,
    Boxes,
    Check,
    Code2,
    Combine,
    Globe2,
    Layers3,
    MapPin,
    MousePointer2,
    Plus,
    Smartphone,
    MessagesSquare,
    PanelsTopLeft,
    CheckCheck,
    Workflow,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { principles, services, siteConfig } from '@/lib/kairu';
import { HeroServiceIcon } from './hero-service-icon';
import { BrandBlueprint } from './brand-blueprint';
import { Container, KairuButton, SectionHeader } from './primitives';

export function Hero() {
    const devicesSlot = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const slot = devicesSlot.current;
        const devices = slot?.querySelector<HTMLElement>('.brand-blueprint');
        if (!slot || !devices) return;
        const fit = () => {
            const scale = Math.min(
                1,
                slot.clientHeight / Math.max(1, devices.offsetHeight),
            );
            devices.style.setProperty('--hero-device-scale', String(scale));
        };
        const observer = new ResizeObserver(fit);
        observer.observe(slot);
        observer.observe(devices);
        fit();
        return () => observer.disconnect();
    }, []);
    return (
        <section
            id="inicio"
            className="hero-section"
            aria-labelledby="hero-title"
        >
            <Container className="hero-layout">
                <div className="hero-copy">
                    <h1 id="hero-title">
                        <span className="hero-title-line hero-services-line">
                            <span className="hero-service">
                                <HeroServiceIcon kind="web" />
                                Webs,
                            </span>{' '}
                            <span className="hero-service">
                                <HeroServiceIcon kind="system" />
                                sistemas
                            </span>{' '}
                            <span className="hero-service-join">y</span>{' '}
                            <span className="hero-service">
                                <HeroServiceIcon kind="app" />
                                apps.
                            </span>
                        </span>
                        <span className="hero-title-line">
                            Pensados para tu negocio.
                        </span>
                    </h1>
                    <p>
                        Desde la primera idea hasta el día que lo usas. <br />
                        Diseñamos y desarrollamos contigo, de principio a fin.
                    </p>
                    <div className="hero-actions">
                        <KairuButton asChild size="lg">
                            <a href="#contacto">
                                Hablemos de tu proyecto{' '}
                                <ArrowUpRight aria-hidden="true" />
                            </a>
                        </KairuButton>
                        <KairuButton asChild variant="secondary" size="lg">
                            <a href="/proyectos">Ver proyectos</a>
                        </KairuButton>
                    </div>
                </div>
                <div className="hero-devices-slot" ref={devicesSlot}>
                    <BrandBlueprint />
                </div>
            </Container>
        </section>
    );
}

export function Philosophy() {
    const icons = [MousePointer2, Layers3, Check];
    return (
        <section
            id="soluciones"
            className="section philosophy-section"
            aria-labelledby="philosophy-title"
        >
            <Container>
                <div className="philosophy-intro" data-reveal>
                    <p className="philosophy-label">Nuestra forma de pensar</p>
                    <h2 id="philosophy-title">
                        La tecnología debería ayudarte,
                        <br /> no complicarte.
                    </h2>
                    <p className="philosophy-description">
                        Creamos software fácil de usar, que se adapta a tu
                        negocio y sigue creciendo contigo después de la entrega.
                    </p>
                </div>
                <div className="principles philosophy-principles">
                    {principles.map(({ title, description }, i) => {
                        const Icon = icons[i];
                        return (
                            <article key={title} data-reveal>
                                <span className="principle-icon">
                                    <Icon aria-hidden="true" />
                                </span>
                                <div>
                                    <h3>{title}</h3>
                                    <p>{description}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
                <div className="philosophy-action">
                    <KairuButton asChild variant="secondary">
                        <a href="#servicios">
                            Conoce lo que hacemos{' '}
                            <ArrowUpRight aria-hidden="true" />
                        </a>
                    </KairuButton>
                </div>
            </Container>
        </section>
    );
}

export function Services({
    onSelectService,
}: {
    onSelectService: (service: string) => void;
}) {
    const icons = [Boxes, Globe2, Smartphone, Code2];
    return (
        <section id="servicios" className="section services-section">
            <Container>
                <div className="section-topline">
                    <SectionHeader
                        eyebrow="Lo que hacemos"
                        title={
                            <>
                                Construimos herramientas <br />
                                para trabajar mejor.
                            </>
                        }
                    />
                    <p className="section-side-note" data-reveal>
                        Cada negocio tiene su forma de hacer las cosas. <br />
                        El software también debería tenerla.
                    </p>
                </div>
                <div className="services-grid">
                    {services.map(({ title, description, detail, type }, i) => {
                        const Icon = icons[i];
                        return (
                            <Card
                                className="service-card"
                                key={title}
                                data-reveal
                            >
                                <CardHeader>
                                    <div className="service-icon">
                                        <Icon aria-hidden="true" />
                                    </div>
                                    <span className="service-number">
                                        0{i + 1}
                                    </span>
                                    <CardTitle>
                                        <h3>{title}</h3>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{description}</p>
                                    <a
                                        className="service-link"
                                        href="#contacto"
                                        onClick={() => onSelectService(type)}
                                    >
                                        <span>{detail}</span>
                                        <ArrowUpRight aria-hidden="true" />
                                        <span className="sr-only">
                                            {' '}
                                            Consultar sobre {title}
                                        </span>
                                    </a>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
                <p className="services-footnote">
                    <Combine aria-hidden="true" />
                    También conectamos tus herramientas y automatizamos tareas
                    repetitivas.
                </p>
            </Container>
        </section>
    );
}

export function GrowthSection() {
    const steps = [
        {
            title: 'Inicio',
            detail: 'Una necesidad concreta',
            icon: MousePointer2,
        },
        {
            title: 'Sistema base',
            detail: 'Lo esencial, bien resuelto',
            icon: Layers3,
        },
        { title: 'Nuevas funciones', detail: 'Más posibilidades', icon: Plus },
        {
            title: 'Integraciones',
            detail: 'Herramientas conectadas',
            icon: Blocks,
        },
        {
            title: 'Automatización',
            detail: 'Menos tareas manuales',
            icon: Workflow,
        },
    ];
    return (
        <section id="evolucion" className="section growth-section">
            <Container>
                <div className="growth-heading">
                    <SectionHeader
                        eyebrow="A tu ritmo"
                        title={
                            <>
                                Empieza con lo que necesitas hoy.
                                <br />
                                <span className="text-brand">
                                    Crece cuando estés listo.
                                </span>
                            </>
                        }
                    />
                    <p data-reveal>
                        No necesitas construir todo desde el primer día. Una
                        solución puede comenzar resolviendo una necesidad
                        concreta y evolucionar conforme tu empresa avance.
                    </p>
                </div>
                <ol
                    className="growth-steps"
                    aria-label="Evolución de tu solución"
                >
                    {steps.map(({ title, detail, icon: Icon }, i) => (
                        <li key={title} data-reveal>
                            <div className="growth-node">
                                <Icon aria-hidden="true" />
                                {i === 0 && (
                                    <span className="growth-start-dot" />
                                )}
                            </div>
                            <h3>{title}</h3>
                            <p>{detail}</p>
                        </li>
                    ))}
                </ol>
                <div className="growth-caption">
                    <Check aria-hidden="true" />
                    El siguiente paso tiene sentido cuando tu negocio lo
                    necesita.
                </div>
            </Container>
        </section>
    );
}

export function About() {
    const ways = [
        {
            icon: MessagesSquare,
            title: 'Conversamos contigo',
            description:
                'Entendemos cómo trabajas, qué te quita tiempo y qué necesitas resolver primero.',
        },
        {
            icon: PanelsTopLeft,
            title: 'Revisamos avances juntos',
            description:
                'Ves cómo toma forma tu sistema. Probamos las pantallas contigo y ajustamos lo necesario.',
        },
        {
            icon: CheckCheck,
            title: 'Te acompañamos al empezar',
            description:
                'Preparamos la entrega y te ayudamos a usar la herramienta en el trabajo de cada día.',
        },
    ];
    return (
        <section
            id="nosotros"
            className="section about-section about-collaboration"
            aria-labelledby="about-title"
        >
            <Container>
                <div className="collaboration-layout">
                    <div className="collaboration-intro" data-reveal>
                        <span className="eyebrow">Detrás de Kairu</span>
                        <h2 id="about-title">
                            Tu forma de trabajar. <br />
                            Nuestro punto de partida.
                        </h2>
                        <p>
                            Somos Kairu, un estudio de desarrollo de software en
                            Chimbote. Trabajamos contigo para convertir una
                            necesidad de tu negocio en una herramienta que
                            puedas usar todos los días.
                        </p>
                        <a href="#evolucion" className="text-action">
                            Conoce nuestro proceso{' '}
                            <ArrowUpRight aria-hidden="true" />
                        </a>
                    </div>
                    <div className="collaboration-ways">
                        {ways.map(({ icon: Icon, title, description }) => (
                            <article key={title} data-reveal>
                                <span className="collaboration-icon">
                                    <Icon aria-hidden="true" />
                                </span>
                                <div>
                                    <h3>{title}</h3>
                                    <p>{description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
                <div className="collaboration-signature">
                    <span className="collaboration-brand">
                        <img
                            src="/brand/kairu-mark.svg"
                            alt=""
                            width="28"
                            height="30"
                            loading="lazy"
                        />
                        Software hecho contigo.
                    </span>
                    <span>
                        <MapPin aria-hidden="true" />
                        {siteConfig.location}
                    </span>
                </div>
            </Container>
        </section>
    );
}
