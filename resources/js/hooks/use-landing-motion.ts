import { createTimeline, cubicBezier, stagger } from 'animejs';
import { useEffect } from 'react';
import type { RefObject } from 'react';

type Motion = ReturnType<typeof createTimeline>;

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
            const revealItems = Array.from(
                element.querySelectorAll<HTMLElement>('[data-reveal]'),
            );

            if (preference.matches) {
                revealItems.forEach((item) => {
                    delete item.dataset.revealState;
                    item.style.removeProperty('--reveal-delay');
                });
                return;
            }

            const motions = new Set<Motion>();
            const track = <T extends Motion>(motion: T): T => {
                motions.add(motion);
                return motion;
            };

            const heroH1 = element.querySelector<HTMLElement>('.hero-copy h1');
            const heroP = element.querySelector<HTMLElement>('.hero-copy > p');
            const heroActions =
                element.querySelector<HTMLElement>('.hero-actions');

            let copyTimeline: ReturnType<typeof createTimeline> | undefined;
            const playHeroCopy = () => {
                if (!heroH1 || !heroP || !heroActions) return;
                if (copyTimeline) {
                    copyTimeline.restart();
                    return;
                }
                copyTimeline = track(
                    createTimeline({ defaults: { ease, duration: 600 } }),
                );
                copyTimeline
                    .add(
                        heroH1,
                        { opacity: [0, 1], translateY: [20, 0] },
                        0,
                    )
                    .add(
                        heroP,
                        { opacity: [0, 1], translateY: [16, 0] },
                        60,
                    )
                    .add(
                        heroActions,
                        { opacity: [0, 1], translateY: [14, 0], duration: 500 },
                        120,
                    );
            };

            playHeroCopy();

            const heroSection =
                element.querySelector<HTMLElement>('.hero-section');
            let heroWasOutOfView = false;
            const heroObserver = heroSection
                ? new IntersectionObserver(
                      ([entry]) => {
                          if (!entry.isIntersecting) {
                              heroWasOutOfView = true;
                          } else if (heroWasOutOfView && !document.hidden) {
                              heroWasOutOfView = false;
                              playHeroCopy();
                          }
                      },
                      { threshold: 0.15 },
                  )
                : null;
            if (heroSection && heroObserver) {
                heroObserver.observe(heroSection);
            }

            const devices =
                element.querySelector<HTMLElement>('.brand-blueprint');
            let demonstration: ReturnType<typeof createTimeline> | undefined;
            let visible = false;

            const playDevices = () => {
                if (!devices) return;
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
                if (!devices) return;
                if (visible && !document.hidden && !demonstration) playDevices();
                if (!demonstration || demonstration.completed) return;
                if (visible && !document.hidden) demonstration.resume();
                else demonstration.pause();
            };

            let devicesWereOutOfView = false;
            const deviceObserver = devices
                ? new IntersectionObserver(
                      ([entry]) => {
                          visible = entry.isIntersecting;
                          if (!visible) {
                              devicesWereOutOfView = true;
                          } else if (
                              !document.hidden &&
                              (!demonstration || devicesWereOutOfView)
                          ) {
                              devicesWereOutOfView = false;
                              playDevices();
                          }
                          syncVisibility();
                      },
                      { threshold: 0.2 },
                  )
                : null;

            if (devices && deviceObserver) {
                deviceObserver.observe(devices);
                document.addEventListener('visibilitychange', syncVisibility);
            }

            // Bidirectional scroll reveal (animates when scrolling down AND when scrolling up)
            const primeRevealState = (item: HTMLElement) => {
                const rect = item.getBoundingClientRect();
                const viewportHeight =
                    window.innerHeight || document.documentElement.clientHeight;
                if (rect.bottom <= 0) {
                    item.dataset.revealState = 'above';
                } else if (rect.top >= viewportHeight) {
                    item.dataset.revealState = 'below';
                } else {
                    item.dataset.revealState = 'visible';
                }
            };

            const revealObserver = new IntersectionObserver(
                (entries) => {
                    const entering = entries.filter(
                        (entry) => entry.isIntersecting,
                    );
                    const leaving = entries.filter(
                        (entry) => !entry.isIntersecting,
                    );

                    entering.forEach((entry, index) => {
                        const target = entry.target as HTMLElement;
                        target.style.setProperty(
                            '--reveal-delay',
                            `${(index % 4) * 55}ms`,
                        );
                        target.dataset.revealState = 'visible';
                    });

                    leaving.forEach((entry) => {
                        const target = entry.target as HTMLElement;
                        target.style.setProperty('--reveal-delay', '0ms');
                        // Si salió por arriba al bajar el scroll -> 'above'; si salió por abajo al subir el scroll -> 'below'
                        target.dataset.revealState =
                            entry.boundingClientRect.top < 0
                                ? 'above'
                                : 'below';
                    });
                },
                {
                    threshold: 0.12,
                    rootMargin: '0px 0px -6% 0px',
                },
            );

            const observed = new WeakSet<Element>();
            const observeRevealItem = (item: HTMLElement) => {
                if (observed.has(item)) return;
                observed.add(item);
                primeRevealState(item);
                revealObserver.observe(item);
            };

            revealItems.forEach(observeRevealItem);

            // Observe dynamically added [data-reveal] items (e.g., filtering or loading more projects)
            const mutationObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (!(node instanceof HTMLElement)) return;
                        if (node.hasAttribute('data-reveal')) {
                            observeRevealItem(node);
                        }
                        node.querySelectorAll<HTMLElement>('[data-reveal]').forEach(
                            observeRevealItem,
                        );
                    });
                });
            });
            mutationObserver.observe(element, {
                childList: true,
                subtree: true,
            });

            dispose = () => {
                heroObserver?.disconnect();
                deviceObserver?.disconnect();
                revealObserver.disconnect();
                mutationObserver.disconnect();
                document.removeEventListener(
                    'visibilitychange',
                    syncVisibility,
                );
                motions.forEach((motion) => motion.revert());
                motions.clear();
                if (devices) {
                    delete devices.dataset.motion;
                }
                element
                    .querySelectorAll<HTMLElement>('[data-reveal]')
                    .forEach((item) => {
                        delete item.dataset.revealState;
                        item.style.removeProperty('--reveal-delay');
                    });
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
