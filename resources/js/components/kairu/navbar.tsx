import { ArrowUpRight, Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { navigation } from '@/lib/kairu';
import { cn } from '@/lib/utils';
import { Container, KairuButton, KairuLogo } from './primitives';

export function Navbar({ projectsPage = false }: { projectsPage?: boolean }) {
    const sectionHref = (href: string) =>
        projectsPage && href.startsWith('#') ? `/${href}` : href;
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
    const lastScrollY = useRef(0);
    const [active, setActive] = useState(
        projectsPage ? '/proyectos' : '#inicio',
    );
    const sectionNavigation = useRef(false);
    const menuOpen = useRef(false);
    useEffect(() => {
        menuOpen.current = open;
    }, [open]);
    const pendingSection = useRef<{ href: string; until: number } | null>(null);

    useEffect(() => {
        let frame = 0;
        let cancelled = false;
        const update = () => {
            if (menuOpen.current) return;
            const currentY = window.scrollY;
            if (Math.abs(currentY - lastScrollY.current) > 4) {
                setScrollDirection(currentY > lastScrollY.current && currentY > 24 ? 'down' : 'up');
                lastScrollY.current = currentY;
            }
            setScrolled(currentY > 12);
            if (projectsPage) {
                setActive('/proyectos');
                return;
            }
            // Keep the chosen link active while smooth scrolling past other sections.
            if (
                pendingSection.current &&
                performance.now() < pendingSection.current.until
            ) {
                setActive(pendingSection.current.href);
                return;
            }
            pendingSection.current = null;
            const threshold =
                (document
                    .querySelector('.kairu-navbar')
                    ?.getBoundingClientRect().height ?? 80) + 48;
            const sections = [
                '#inicio',
                ...navigation
                    .filter((item) => item.href.startsWith('#'))
                    .map((item) => item.href),
                '#contacto',
            ]
                .map((href) => ({
                    href,
                    top: document
                        .getElementById(href.slice(1))
                        ?.getBoundingClientRect().top,
                }))
                .filter(
                    (section): section is { href: string; top: number } =>
                        section.top !== undefined && section.top <= threshold,
                )
                .sort((a, b) => b.top - a.top);
            setActive(sections[0]?.href ?? '#inicio');
        };
        const onScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(update);
        };
        const finishNavigation = () => {
            pendingSection.current = null;
            onScroll();
        };
        const alignHash = () => {
            if (projectsPage || !location.hash) return;
            const target = document.getElementById(
                decodeURIComponent(location.hash.slice(1)),
            );
            if (target) {
                target.scrollIntoView({ behavior: 'instant', block: 'start' });
                update();
            }
        };
        update();
        // Font loading can change section positions after returning from /proyectos.
        void document.fonts.ready.then(() => {
            if (!cancelled) {
                alignHash();
                update();
            }
        });
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        window.addEventListener('wheel', finishNavigation, { passive: true });
        window.addEventListener('touchstart', finishNavigation, {
            passive: true,
        });
        window.addEventListener('keydown', finishNavigation);
        window.addEventListener('hashchange', alignHash);
        window.addEventListener('pageshow', update);
        const resize = new ResizeObserver(onScroll);
        resize.observe(document.body);
        return () => {
            cancelled = true;
            cancelAnimationFrame(frame);
            resize.disconnect();
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            window.removeEventListener('wheel', finishNavigation);
            window.removeEventListener('touchstart', finishNavigation);
            window.removeEventListener('keydown', finishNavigation);
            window.removeEventListener('hashchange', alignHash);
            window.removeEventListener('pageshow', update);
        };
    }, [projectsPage]);

    const navigateSection = (
        event: React.MouseEvent<HTMLAnchorElement>,
        href: string,
    ) => {
        if (
            projectsPage ||
            !href.startsWith('#') ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        )
            return;
        const target = document.getElementById(href.slice(1));
        if (!target) return;
        event.preventDefault();
        pendingSection.current = { href, until: performance.now() + 2000 };
        setActive(href);
        sectionNavigation.current = open;
        setOpen(false);
        history.pushState(null, '', href);
        requestAnimationFrame(() => {
            target.scrollIntoView({
                behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'instant'
                    : 'smooth',
                block: 'start',
            });
            target.tabIndex = -1;
            target.focus({ preventScroll: true });
        });
    };

    return (
        <header className={cn('kairu-navbar', scrolled && 'is-scrolled')} data-scroll-direction={scrollDirection}>
            <Container className="navbar-inner">
                <a
                    href={sectionHref('#inicio')}
                    onClick={(event) => navigateSection(event, '#inicio')}
                    aria-label="Kairu, inicio"
                >
                    <KairuLogo />
                </a>
                <nav
                    className="desktop-navigation"
                    aria-label="Navegación principal"
                >
                    {navigation.map(({ label, href }) => (
                        <a
                            key={href}
                            href={sectionHref(href)}
                            onClick={(event) => navigateSection(event, href)}
                            className={cn(
                                'nav-link',
                                active === href && 'is-active',
                            )}
                            aria-current={
                                active === href
                                    ? href.startsWith('/')
                                        ? 'page'
                                        : 'location'
                                    : undefined
                            }
                        >
                            {label}
                        </a>
                    ))}
                </nav>
                <div className="navbar-actions">
                    <KairuButton asChild size="sm" className="nav-cta">
                        <a
                            href={sectionHref('#contacto')}
                            onClick={(event) =>
                                navigateSection(event, '#contacto')
                            }
                            aria-current={
                                active === '#contacto' ? 'location' : undefined
                            }
                        >
                            Hablemos <ArrowUpRight data-icon="inline-end" />
                        </a>
                    </KairuButton>
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <KairuButton
                                variant="ghost"
                                className="mobile-menu-trigger"
                                aria-label="Abrir menú"
                                aria-expanded={open}
                            >
                                <Menu />
                            </KairuButton>
                        </SheetTrigger>
                        <SheetContent
                            className="kairu-theme kairu-mobile-menu"
                            side="right"
                            closeLabel="Cerrar menú"
                            onCloseAutoFocus={(event) => {
                                if (sectionNavigation.current) {
                                    event.preventDefault();
                                    sectionNavigation.current = false;
                                }
                            }}
                            aria-describedby="mobile-menu-description"
                        >
                            <SheetHeader>
                                <SheetTitle>
                                    <KairuLogo />
                                </SheetTitle>
                                <SheetDescription
                                    id="mobile-menu-description"
                                    className="sr-only"
                                >
                                    Navegación de Kairu
                                </SheetDescription>
                            </SheetHeader>
                            <nav aria-label="Navegación móvil">
                                {navigation.map(({ label, href }) => (
                                    <SheetClose asChild key={href}>
                                        <a
                                            href={sectionHref(href)}
                                            onClick={(event) =>
                                                navigateSection(event, href)
                                            }
                                            aria-current={
                                                active === href
                                                    ? 'location'
                                                    : undefined
                                            }
                                        >
                                            {label}
                                            <ArrowUpRight aria-hidden="true" />
                                        </a>
                                    </SheetClose>
                                ))}
                            </nav>
                            <SheetClose asChild>
                                <KairuButton asChild>
                                    <a
                                        href={sectionHref('#contacto')}
                                        onClick={(event) =>
                                            navigateSection(event, '#contacto')
                                        }
                                    >
                                        Hablemos de tu proyecto{' '}
                                        <ArrowUpRight data-icon="inline-end" />
                                    </a>
                                </KairuButton>
                            </SheetClose>
                            <p className="mobile-menu-location">
                                Chimbote, Áncash, Perú.
                            </p>
                        </SheetContent>
                    </Sheet>
                </div>
            </Container>
        </header>
    );
}
