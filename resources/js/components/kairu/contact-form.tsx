import { SentConfirmation } from './sent-confirmation';
import { ArrowUpRight, Mail, MapPin, MessageCircle } from 'lucide-react';
import { animate, cubicBezier } from 'animejs';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { serviceOptions, siteConfig, whatsappUrl } from '@/lib/kairu';
import type { ContactConfig } from '@/lib/kairu';
import { Container, KairuButton, SectionHeader } from './primitives';

function Field({
    name,
    label,
    optional,
    error,
    children,
}: {
    name: string;
    label: string;
    optional?: boolean;
    error?: string;
    children: ReactNode;
}) {
    return (
        <div className="kairu-field" data-invalid={error ? true : undefined}>
            <Label htmlFor={name}>
                {label}
                {optional && <span>Opcional</span>}
            </Label>
            {children}
            {error && (
                <p className="field-error" id={`${name}-error`}>
                    {error}
                </p>
            )}
        </div>
    );
}

export function ContactForm({
    contact,
    service,
    onServiceChange,
}: {
    contact: ContactConfig;
    service: string;
    onServiceChange: (value: string) => void;
}) {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [failure, setFailure] = useState('');
    const [draft, setDraft] = useState<Record<string, string>>({});
    const sending = useRef(false);
    const pending = status === 'loading';

    const validate = (values: Record<string, string>) => {
        const result: Record<string, string> = {};
        if ((values.name ?? '').trim().length < 2)
            result.name = 'Cuéntanos cómo te llamas (al menos 2 caracteres).';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((values.email ?? '').trim()))
            result.email = 'Ingresa un correo válido.';
        if (!serviceOptions.includes(service))
            result.service = 'Selecciona el tipo de solución que necesitas.';
        if ((values.message ?? '').trim().length < 10)
            result.message = 'Cuéntanos un poco más (al menos 10 caracteres).';
        const phone = (values.whatsapp ?? '').trim();
        if (
            phone &&
            (!/^\+?[\d\s().-]+$/.test(phone) ||
                phone.replace(/\D/g, '').length < 7 ||
                phone.replace(/\D/g, '').length > 15)
        )
            result.whatsapp =
                'Usa entre 7 y 15 dígitos; puedes incluir +, espacios o guiones.';
        for (const [key, max] of Object.entries({
            name: 120,
            company: 160,
            email: 255,
            whatsapp: 30,
            message: 5000,
        })) {
            if ((values[key] ?? '').length > max)
                result[key] = `Usa un máximo de ${max} caracteres.`;
        }
        return result;
    };

    const focusError = (items: Record<string, string>) => {
        const first = Object.keys(items)[0];
        requestAnimationFrame(() => document.getElementById(first)?.focus());
    };

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (sending.current) return;
        const values = Object.fromEntries(
            Array.from(new FormData(event.currentTarget), ([key, value]) => [
                key,
                typeof value === 'string' ? value : '',
            ]),
        );
        const invalid = validate(values);
        setErrors(invalid);
        if (Object.keys(invalid).length) {
            setStatus('idle');
            focusError(invalid);
            return;
        }
        sending.current = true;
        setStatus('loading');
        setFailure('');
        try {
            const response = await fetch('/contacto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN':
                        document.querySelector<HTMLMetaElement>(
                            'meta[name="csrf-token"]',
                        )?.content ?? '',
                },
                body: JSON.stringify({ ...values, service }),
            });
            if (response.status === 422) {
                const data = (await response.json()) as {
                    errors: Record<string, string[]>;
                };
                const fieldErrors = Object.fromEntries(
                    Object.entries(data.errors).map(([key, messages]) => [
                        key,
                        messages[0],
                    ]),
                );
                setErrors(fieldErrors);
                focusError(fieldErrors);
                throw new Error(
                    'Revisa los campos indicados e intenta nuevamente.',
                );
            }
            if (response.status === 429)
                throw new Error(
                    'Has enviado varios mensajes. Espera un minuto e intenta nuevamente.',
                );
            if (response.status === 419)
                throw new Error(
                    'Tu sesión ha expirado. Recarga la página e intenta nuevamente.',
                );
            if (!response.ok)
                throw new Error(
                    'No pudimos enviar el mensaje. Intenta nuevamente.',
                );
            formRef.current?.reset();
            onServiceChange('');
            setDraft({});
            setStatus('success');
        } catch (error) {
            const message =
                error instanceof Error && !(error instanceof TypeError)
                    ? error.message
                    : 'No pudimos enviar el mensaje. Intenta nuevamente.';
            setStatus('error');
            setFailure(message);
            toast.error(message);
        } finally {
            sending.current = false;
        }
    };

    const attributes = (name: string) => ({
        'aria-invalid': Boolean(errors[name]),
        'aria-describedby':
            [
                name === 'message' ? 'message-hint' : '',
                errors[name] ? `${name}-error` : '',
            ]
                .filter(Boolean)
                .join(' ') || undefined,
    });

    useEffect(() => {
        if (
            matchMedia('(prefers-reduced-motion: reduce)').matches ||
            !formRef.current
        )
            return;
        const feedback = formRef.current.querySelectorAll(
            '.field-error, .form-success, .form-failure',
        );
        if (!feedback.length) return;
        const motion = animate(feedback, {
            opacity: [0, 1],
            translateY: [4, 0],
            duration: 200,
            ease: cubicBezier(0.23, 1, 0.32, 1),
        });
        return () => {
            motion.revert();
        };
    }, [errors, status]);

    const readValues = () =>
        Object.fromEntries(
            Array.from(new FormData(formRef.current!), ([key, value]) => [
                key,
                typeof value === 'string' ? value : '',
            ]),
        );

    return (
        <section id="contacto" className="section contact-section">
            <Container className="contact-layout">
                <div className="contact-copy">
                    <SectionHeader
                        eyebrow="Hablemos"
                        title={
                            <>
                                Tu próximo paso
                                <br />
                                empieza aquí.
                            </>
                        }
                        description="No necesitas tener todo resuelto. Cuéntanos qué tienes en mente y encontremos un buen punto de partida."
                    />
                    <div className="contact-details" data-reveal>
                        {contact.email && (
                            <a href={`mailto:${contact.email}`}>
                                <Mail aria-hidden="true" />
                                <span>
                                    Escríbenos<em>{contact.email}</em>
                                </span>
                                <ArrowUpRight aria-hidden="true" />
                            </a>
                        )}
                        {contact.whatsapp && (
                            <a
                                href={whatsappUrl(contact)}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageCircle aria-hidden="true" />
                                <span>
                                    Conversemos por WhatsApp
                                    <em>+{contact.whatsapp}</em>
                                </span>
                                <ArrowUpRight aria-hidden="true" />
                            </a>
                        )}
                        <div>
                            <MapPin aria-hidden="true" />
                            <span>
                                Desde Chimbote, para tu negocio
                                <em>{siteConfig.location}</em>
                            </span>
                        </div>
                    </div>
                    <div className="contact-note">
                        <span />
                        Primero escuchamos. Después construimos.
                    </div>
                </div>
                <form
                    ref={formRef}
                    onSubmit={(event) => void submit(event)}
                    className="contact-form"
                    noValidate
                    aria-label="Cuéntanos qué necesitas"
                    aria-busy={pending}
                    onInput={(event) => {
                        const values = readValues();
                        setDraft(values);
                        if (status === 'success' || status === 'error')
                            setStatus('idle');
                        const name =
                            (event.target as HTMLElement).getAttribute(
                                'name',
                            ) ?? '';
                        if (errors[name])
                            setErrors((current) => {
                                const next = { ...current };
                                const issue = validate(values)[name];
                                if (issue) next[name] = issue;
                                else delete next[name];
                                return next;
                            });
                    }}
                    onBlur={(event) => {
                        const name =
                            (event.target as HTMLElement).getAttribute(
                                'name',
                            ) ?? '';
                        if (
                            ![
                                'name',
                                'email',
                                'whatsapp',
                                'company',
                                'message',
                            ].includes(name) ||
                            pending
                        )
                            return;
                        const issue = validate(readValues())[name];
                        setErrors((current) => {
                            const next = { ...current };
                            if (issue) next[name] = issue;
                            else delete next[name];
                            return next;
                        });
                    }}
                >
                    <div
                        className="contact-form-body"
                        inert={status === 'success'}
                        style={
                            status === 'success'
                                ? { visibility: 'hidden' }
                                : undefined
                        }
                    >
                        <div className="form-heading">
                            <h3>Cuéntanos qué necesitas</h3>
                            <p>
                                Los campos marcados como opcionales pueden
                                quedar vacíos.
                            </p>
                        </div>
                        <div className="form-fields">
                            <div className="form-pair">
                                <Field
                                    name="name"
                                    label="Nombre"
                                    error={errors.name}
                                >
                                    <Input
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        placeholder="Tu nombre"
                                        required
                                        maxLength={120}
                                        disabled={pending}
                                        {...attributes('name')}
                                    />
                                </Field>
                                <Field
                                    name="company"
                                    label="Empresa"
                                    optional
                                    error={errors.company}
                                >
                                    <Input
                                        id="company"
                                        name="company"
                                        autoComplete="organization"
                                        placeholder="Nombre de tu empresa"
                                        maxLength={160}
                                        disabled={pending}
                                        {...attributes('company')}
                                    />
                                </Field>
                            </div>
                            <div className="form-pair">
                                <Field
                                    name="email"
                                    label="Correo"
                                    error={errors.email}
                                >
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="tu@empresa.com"
                                        required
                                        maxLength={255}
                                        disabled={pending}
                                        {...attributes('email')}
                                    />
                                </Field>
                                <Field
                                    name="whatsapp"
                                    label="WhatsApp"
                                    optional
                                    error={errors.whatsapp}
                                >
                                    <Input
                                        id="whatsapp"
                                        name="whatsapp"
                                        type="tel"
                                        autoComplete="tel"
                                        placeholder="+51"
                                        maxLength={30}
                                        disabled={pending}
                                        {...attributes('whatsapp')}
                                    />
                                </Field>
                            </div>
                            <Field
                                name="service"
                                label="¿Qué necesitas?"
                                error={errors.service}
                            >
                                <Select
                                    value={service}
                                    onValueChange={(value) => {
                                        onServiceChange(value);
                                        setErrors((current) => {
                                            const next = { ...current };
                                            delete next.service;
                                            return next;
                                        });
                                        if (status === 'success')
                                            setStatus('idle');
                                    }}
                                    disabled={pending}
                                >
                                    <SelectTrigger
                                        id="service"
                                        aria-required="true"
                                        {...attributes('service')}
                                    >
                                        <SelectValue placeholder="Selecciona una opción" />
                                    </SelectTrigger>
                                    <SelectContent
                                        className="kairu-theme contact-service-options"
                                        position="popper"
                                        sideOffset={8}
                                        align="start"
                                        avoidCollisions
                                        collisionPadding={16}
                                    >
                                        <SelectGroup>
                                            {serviceOptions.map((option) => (
                                                <SelectItem
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                            <Field
                                name="message"
                                label="Mensaje"
                                error={errors.message}
                            >
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="¿Cómo trabajas hoy y qué te gustaría simplificar?"
                                    required
                                    minLength={10}
                                    maxLength={5000}
                                    disabled={pending}
                                    {...attributes('message')}
                                />
                                <p className="message-hint" id="message-hint">
                                    <span>Mínimo 10 caracteres.</span>
                                    <span>
                                        {(draft.message ?? '').length} / 5000
                                    </span>
                                </p>
                            </Field>
                        </div>
                        <div className="contact-honeypot" aria-hidden="true">
                            <label htmlFor="website">
                                Deja este campo vacío
                            </label>
                            <input
                                id="website"
                                name="website"
                                tabIndex={-1}
                                autoComplete="off"
                            />
                        </div>
                        <p className="form-privacy">
                            Usaremos tus datos únicamente para atender tu
                            consulta.
                        </p>
                        <KairuButton size="lg" type="submit" disabled={pending}>
                            {pending ? (
                                <>
                                    <Spinner data-icon="inline-start" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    Enviar mensaje
                                    <ArrowUpRight data-icon="inline-end" />
                                </>
                            )}
                        </KairuButton>
                        <div aria-live="polite" aria-atomic="true">
                            {status === 'error' && (
                                <p className="form-failure" role="alert">
                                    {failure}
                                </p>
                            )}
                        </div>
                    </div>
                    {status === 'success' && (
                        <SentConfirmation
                            onClose={() => {
                                setStatus('idle');
                                requestAnimationFrame(() =>
                                    formRef.current
                                        ?.querySelector<HTMLInputElement>(
                                            '#name',
                                        )
                                        ?.focus({ preventScroll: true }),
                                );
                            }}
                        />
                    )}
                </form>
            </Container>
        </section>
    );
}
