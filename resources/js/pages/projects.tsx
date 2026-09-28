import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { Navbar } from '@/components/kairu/navbar';
import { Footer } from '@/components/kairu/footer';
import { Projects } from '@/components/kairu/projects';
import { Container, KairuButton } from '@/components/kairu/primitives';
import { refreshTheme } from '@/hooks/use-appearance';
import type { ContactConfig } from '@/lib/kairu';

export default function ProjectsPage({ contact }: { contact: ContactConfig }) {
    useEffect(() => {
        const language = document.documentElement.lang;
        document.documentElement.lang = 'es-PE';
        document.documentElement.dataset.kairu = 'true';
        refreshTheme();
        return () => {
            document.documentElement.lang = language;
            delete document.documentElement.dataset.kairu;
            refreshTheme();
        };
    }, []);
    return (
        <div className="kairu-theme kairu-site kairu-studio projects-page">
            <Head title="Proyectos y demos | Kairu" />
            <a href="#contenido" className="skip-link">
                Saltar al contenido
            </a>
            <Navbar projectsPage />
            <main id="contenido" tabIndex={-1}>
                <Projects />
                <section className="projects-contact">
                    <Container>
                        <h2>¿Construimos el tuyo?</h2>
                        <p>Cuéntanos qué necesita tu negocio.</p>
                        <KairuButton asChild>
                            <a href="/#contacto">Hablemos de tu proyecto</a>
                        </KairuButton>
                    </Container>
                </section>
            </main>
            <Footer contact={contact} projectsPage />
        </div>
    );
}
