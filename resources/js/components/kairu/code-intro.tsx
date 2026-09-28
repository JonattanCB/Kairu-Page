import { animate, createTimeline, cubicBezier } from 'animejs';
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

const code = [
    '// Cada proyecto empieza con una idea.',
    'const proyecto = crear({',
    '  web: true,',
    '  sistemas: true,',
    '  apps: true,',
    '});',
    '',
    'await proyecto.hacerRealidad();',
].join('\n');

export function CodeIntro({
    content,
    onComplete,
}: {
    content: RefObject<HTMLDivElement | null>;
    onComplete: () => void;
}) {
    const overlay = useRef<HTMLDivElement>(null);
    const output = useRef<HTMLElement>(null);
    const skip = useRef<() => void>(() => {});

    useEffect(() => {
        const element = overlay.current;
        const page = content.current;
        if (!element || !page) {
            onComplete();
            return;
        }
        const preference = matchMedia('(prefers-reduced-motion: reduce)');
        if (preference.matches || location.hash) {
            onComplete();
            return;
        }
        let finished = false;
        const previousOverflow = document.documentElement.style.overflow;
        element.hidden = false;
        page.inert = true;
        document.documentElement.style.overflow = 'hidden';
        const cursor = { characters: 0 };
        const writing = animate(cursor, {
            characters: code.length,
            duration: 1700,
            ease: 'linear',
            onUpdate: () => {
                if (output.current)
                    output.current.textContent = code.slice(
                        0,
                        Math.floor(cursor.characters),
                    );
            },
        });
        const reveal = createTimeline({ autoplay: false });
        const finish = () => {
            if (finished) return;
            finished = true;
            writing.pause();
            reveal.pause();
            const hadFocus = element.contains(document.activeElement);
            element.hidden = true;
            page.inert = false;
            document.documentElement.style.overflow = previousOverflow;
            onComplete();
            if (hadFocus)
                page.querySelector<HTMLElement>('.skip-link')?.focus({
                    preventScroll: true,
                });
        };
        skip.current = finish;
        reveal.add(
            element,
            {
                opacity: [1, 0],
                duration: 450,
                ease: cubicBezier(0.23, 1, 0.32, 1),
                onComplete: finish,
            },
            1950,
        );
        reveal.play();
        const fallback = window.setTimeout(finish, 4000);
        const keydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') finish();
        };
        document.addEventListener('keydown', keydown);
        preference.addEventListener('change', finish);
        return () => {
            clearTimeout(fallback);
            document.removeEventListener('keydown', keydown);
            preference.removeEventListener('change', finish);
            writing.revert();
            reveal.revert();
            page.inert = false;
            element.hidden = true;
            document.documentElement.style.overflow = previousOverflow;
        };
    }, [content, onComplete]);

    return (
        <div ref={overlay} className="code-intro" hidden>
            <div className="code-intro-inner">
                <div className="code-intro-top">
                    <span>
                        kairu<span className="text-brand">.</span>
                    </span>
                    <span aria-hidden="true">inicio.ts</span>
                </div>
                <pre aria-hidden="true">
                    <code ref={output} />
                    <span className="code-intro-cursor">▍</span>
                </pre>
                <p className="sr-only" role="status">
                    Preparando la presentación de Kairu.
                </p>
                <button type="button" onClick={() => skip.current()}>
                    Saltar introducción <span aria-hidden="true">↗</span>
                </button>
            </div>
        </div>
    );
}
