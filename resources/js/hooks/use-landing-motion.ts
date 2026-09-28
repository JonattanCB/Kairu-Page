import { animate, createTimeline, cubicBezier, stagger } from 'animejs';
import { useEffect } from 'react';
import type { RefObject } from 'react';

type Motion = ReturnType<typeof animate> | ReturnType<typeof createTimeline>;

export function useLandingMotion(
    root: RefObject<HTMLDivElement | null>,
    enabled = true,
) {
    useEffect(() => {
        if (!enabled) return;
        const element = root.current;
        if (!element) return;
        const preference = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        );
        const ease = cubicBezier(0.23, 1, 0.32, 1);
        let dispose = () => {};

        const configure = () => {
            dispose();
            if (preference.matches) return;

            const motions = new Set<Motion>();
            const track = <T extends Motion>(motion: T): T => {
                motions.add(motion);
                return motion;
            };
            const copy = track(
                createTimeline({ defaults: { ease, duration: 600 } }),
            );
            copy.add(
                element.querySelector('.hero-copy h1')!,
                { translateY: [20, 0] },
                0,
            )
                .add(
                    element.querySelector('.hero-copy > p')!,
                    { opacity: [0, 1], translateY: [16, 0] },
                    60,
                )
                .add(
                    element.querySelector('.hero-actions')!,
                    { opacity: [0, 1], translateY: [14, 0], duration: 500 },
                    120,
                );

            const devices =
                element.querySelector<HTMLElement>('.brand-blueprint')!;
            let demonstration: ReturnType<typeof createTimeline> | undefined;
            let visible = false;

            const play = () => {
                if (demonstration) {
                    demonstration.restart();
                    return;
                }
                demonstration = track(
                    createTimeline({
                        defaults: { ease, duration: 700 },
                        onBegin: () => {
                            devices.dataset.motion = 'playing';
                        },
                        onComplete: () => {
                            devices.dataset.motion = 'complete';
                        },
                    }),
                );
                demonstration
                    .add(
                        devices.querySelectorAll('.blueprint-depth'),
                        {
                            opacity: [0, 1],
                            translateX: [-32, 0],
                            translateY: [-24, 0],
                            duration: 1100,
                            delay: stagger(70),
                        },
                        0,
                    )
                    .add(
                        devices.querySelector('.blueprint-face')!,
                        {
                            opacity: [0, 1],
                            translateY: [32, 0],
                            duration: 1200,
                        },
                        180,
                    )
                    .add(
                        devices.querySelectorAll('.program-chart'),
                        {
                            opacity: [0, 1],
                            duration: 450,
                            delay: stagger(60),
                        },
                        800,
                    );
            };

            const syncVisibility = () => {
                if (visible && !document.hidden && !demonstration) play();
                if (!demonstration || demonstration.completed) return;
                if (visible && !document.hidden) demonstration.resume();
                else demonstration.pause();
            };
            const deviceObserver = new IntersectionObserver(
                ([entry]) => {
                    visible = entry.isIntersecting;
                    if (visible && !document.hidden && !demonstration) play();
                    syncVisibility();
                },
                { threshold: 0.2 },
            );
            deviceObserver.observe(devices);
            document.addEventListener('visibilitychange', syncVisibility);

            const revealObserver = new IntersectionObserver(
                (entries) => {
                    const entering = entries.filter(
                        (entry) => entry.isIntersecting,
                    );
                    entering.forEach((entry, index) => {
                        track(
                            animate(entry.target, {
                                opacity: [0, 1],
                                translateY: [24, 0],
                                duration: 600,
                                delay: (index % 4) * 60,
                                ease,
                            }),
                        );
                        revealObserver.unobserve(entry.target);
                    });
                },
                { threshold: 0.15 },
            );
            element
                .querySelectorAll('[data-reveal]')
                .forEach((item) => revealObserver.observe(item));

            dispose = () => {
                deviceObserver.disconnect();
                revealObserver.disconnect();
                document.removeEventListener(
                    'visibilitychange',
                    syncVisibility,
                );
                motions.forEach((motion) => motion.revert());
                motions.clear();
                delete devices.dataset.motion;
            };
        };

        configure();
        preference.addEventListener('change', configure);
        return () => {
            preference.removeEventListener('change', configure);
            dispose();
        };
    }, [root, enabled]);
}
