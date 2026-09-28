type HeroServiceIconProps = { kind: 'web' | 'system' | 'app' };

/** Compact, filled marks sized for the hero's text baseline. */
export function HeroServiceIcon({ kind }: HeroServiceIconProps) {
    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            focusable="false"
        >
            {kind === 'web' && (
                <>
                    <path
                        d="M11 4H8a4 4 0 0 0-4 4v3m17-7h3a4 4 0 0 1 4 4v3M4 21v3a4 4 0 0 0 4 4h3"
                        stroke="currentColor"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                    />
                    <path
                        d="m14 12 13 7.5-6 1.5-2.5 6L12 14a1.5 1.5 0 0 1 2-2Z"
                        fill="currentColor"
                    />
                </>
            )}
            {kind === 'system' && (
                <>
                    <path
                        d="M7 4h18a4 4 0 0 1 4 4v10l-4-2.3V12H7v13h5l2 4H7a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z"
                        fill="currentColor"
                    />
                    <circle
                        cx="8"
                        cy="8"
                        r="1"
                        fill="var(--background, white)"
                    />
                    <circle
                        cx="12"
                        cy="8"
                        r="1"
                        fill="var(--background, white)"
                    />
                    <path
                        d="m16 15 13 7.5-6 1.5-2.5 6L14 17a1.5 1.5 0 0 1 2-2Z"
                        fill="currentColor"
                    />
                </>
            )}
            {kind === 'app' && (
                <path
                    d="M21.8 2c.3 2-1 4.3-2.5 5.6-1.2 1.1-2.9 1.8-4.5 1.6-.2-1.9 1-4 2.4-5.3C18.5 2.7 20.3 2 21.8 2ZM26.4 24c-.8 1.8-1.2 2.5-2.3 4.1-1.4 1.9-3.3 4.2-5.6 4-2-.2-2.5-1.3-5.2-1.3s-3.2 1.1-5.2 1.3c-2.2.2-3.9-1.9-5.2-3.8C-.8 23.1-1.4 15.8.9 12.2c1.6-2.6 4.2-4.1 6.7-4.1 2.1 0 3.5 1.2 5.3 1.2 1.7 0 2.8-1.2 5.3-1.2 2 0 4.1 1.1 5.7 3-5 2.7-4.2 9.7 2.5 12.9Z"
                    transform="translate(4 0) scale(.88)"
                    fill="currentColor"
                />
            )}
        </svg>
    );
}
