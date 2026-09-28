import { Reviews } from '@/components/kairu/reviews';
import { CodeIntro } from '@/components/kairu/code-intro';
import { Head } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ContactForm } from '@/components/kairu/contact-form';
import { Footer } from '@/components/kairu/footer';
import { Navbar } from '@/components/kairu/navbar';
import { refreshTheme } from '@/hooks/use-appearance';
import { useLandingMotion } from '@/hooks/use-landing-motion';
import {
    About,
    GrowthSection,
    Hero,
    Philosophy,
    Services,
} from '@/components/kairu/sections';
import { siteConfig } from '@/lib/kairu';
import type { ContactConfig } from '@/lib/kairu';

export default function Welcome({ contact }: { contact: ContactConfig }) {
    const root = useRef<HTMLDivElement>(null);
    const [service, setService] = useState('');
    const content = useRef<HTMLDivElement>(null);
    const [introComplete, setIntroComplete] = useState(false);
    const finishIntro = useCallback(() => setIntroComplete(true), []);
    useLandingMotion(root, introComplete);

    useEffect(() => {
        const element = root.current;
        if (!element) return;
        const previousLanguage = document.documentElement.lang;
        document.documentElement.lang = 'es-PE';
        document.documentElement.dataset.kairu = 'true';
        refreshTheme();
        return () => {
            document.documentElement.lang = previousLanguage;
            delete document.documentElement.dataset.kairu;
            refreshTheme();
        };
    }, []);

    return (
        <div ref={root} className="kairu-theme kairu-site kairu-studio">
            <Head title={siteConfig.title} />
            <CodeIntro content={content} onComplete={finishIntro} />
            <div ref={content}>
                <a href="#contenido" className="skip-link">
                    Saltar al contenido
                </a>
                <Navbar />
                <main id="contenido" tabIndex={-1}>
                    <Hero />
                    <Philosophy />
                    <Services onSelectService={setService} />
                    <GrowthSection />
                    <About />
                    <Reviews />
                    <ContactForm
                        contact={contact}
                        service={service}
                        onServiceChange={setService}
                    />
                </main>
                <Footer contact={contact} />
            </div>
        </div>
    );
}
