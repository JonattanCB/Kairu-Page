import { ArrowUpRight, MapPin } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { siteConfig, whatsappUrl } from '@/lib/kairu';
import type { ContactConfig } from '@/lib/kairu';
import { Container, KairuLogo, WhatsAppIcon } from './primitives';

export function Footer({
    contact,
    projectsPage = false,
}: {
    contact: ContactConfig;
    projectsPage?: boolean;
}) {
    const sectionHref = (href: string) => (projectsPage ? `/${href}` : href);
    return (
        <>
            <footer className="kairu-footer">
                <Container>
                    <div className="footer-main">
                        <div className="footer-brand">
                            <a
                                href={sectionHref('#inicio')}
                                aria-label="Kairu, volver al inicio"
                            >
                                <KairuLogo />
                            </a>
                            <p>{siteConfig.description}</p>
                            <div className="footer-socials">
                                {Object.entries(contact.socials)
                                    .filter(([, url]) =>
                                        /^https?:\/\//.test(url),
                                    )
                                    .map(([name, url]) => (
                                        <a
                                            key={name}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {name}
                                            <ArrowUpRight aria-hidden="true" />
                                        </a>
                                    ))}
                            </div>
                        </div>
                        <nav aria-label="Servicios">
                            <h3>Servicios</h3>
                            {[
                                'Sistemas empresariales',
                                'Desarrollo web',
                                'Aplicaciones',
                                'Software a medida',
                            ].map((item) => (
                                <a href={sectionHref('#servicios')} key={item}>
                                    {item}
                                </a>
                            ))}
                        </nav>
                        <nav aria-label="Empresa">
                            <h3>Empresa</h3>
                            <a href={sectionHref('#nosotros')}>Nosotros</a>
                            <a href="/proyectos">Proyectos</a>
                            <a href={sectionHref('#resenas')}>Reseñas</a>
                            <a href={sectionHref('#contacto')}>Contacto</a>
                        </nav>
                        <div className="footer-location">
                            <h3>Desde Perú</h3>
                            <MapPin aria-hidden="true" />
                            <p>
                                Chimbote, Áncash. <br />
                                Perú.
                            </p>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <span>© {new Date().getFullYear()} Kairu.</span>
                        <span>
                            Diseñado y desarrollado en Perú.
                            <span className="footer-blue-dot" />
                        </span>
                    </div>
                </Container>
            </footer>
            <Tooltip>
                <TooltipTrigger asChild>
                    <a
                        className="floating-contact"
                        href={whatsappUrl(contact)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Hablar con Kairu por WhatsApp"
                    >
                        <WhatsAppIcon aria-hidden="true" />
                    </a>
                </TooltipTrigger>
                <TooltipContent side="left">Hablar por WhatsApp</TooltipContent>
            </Tooltip>
        </>
    );
}
