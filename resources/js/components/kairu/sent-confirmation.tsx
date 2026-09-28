import { createTimeline, cubicBezier } from 'animejs';
import { Check, Send } from 'lucide-react';
import { useEffect, useRef } from 'react';

function ConfirmationContent() {
    const root = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (
            !root.current ||
            matchMedia('(prefers-reduced-motion: reduce)').matches
        )
            return;
        const motion = createTimeline({
            defaults: { ease: cubicBezier(0.23, 1, 0.32, 1) },
        });
        motion
            .add(root.current, { opacity: [0, 1], duration: 450 }, 0)
            .add(
                root.current.querySelector('.sent-plane')!,
                {
                    opacity: [1, 0],
                    translateX: [0, 42],
                    translateY: [0, -42],
                    duration: 550,
                },
                250,
            )
            .add(
                root.current.querySelector('.sent-check')!,
                { opacity: [0, 1], scale: [0.9, 1], duration: 450 },
                600,
            )
            .add(
                root.current.querySelector('.sent-copy')!,
                { opacity: [0, 1], translateY: [8, 0], duration: 450 },
                750,
            );
        return () => {
            motion.revert();
        };
    }, []);
    return (
        <div ref={root} className="sent-animation">
            <div className="sent-symbol" aria-hidden="true">
                <Send className="sent-plane" />
                <Check className="sent-check" />
            </div>
            <div className="sent-copy">
                <h3 id="sent-title">Mensaje enviado.</h3>
                <p id="sent-description">
                    Gracias por contarnos tu idea. Recibimos tu consulta y te
                    responderemos al correo que indicaste.
                </p>
            </div>
        </div>
    );
}

export function SentConfirmation({ onClose }: { onClose: () => void }) {
    const panel = useRef<HTMLDivElement>(null);
    useEffect(() => {
        panel.current?.focus({ preventScroll: true });
    }, []);
    return (
        <div
            ref={panel}
            className="sent-panel"
            role="region"
            aria-labelledby="sent-title"
            aria-describedby="sent-description"
            tabIndex={-1}
        >
            <div className="sent-panel-inner">
                <ConfirmationContent />
                <button
                    type="button"
                    className="sent-continue"
                    onClick={onClose}
                >
                    Enviar otra consulta
                </button>
            </div>
        </div>
    );
}
