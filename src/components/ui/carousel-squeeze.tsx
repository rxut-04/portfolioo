"use client";

import {
    type ComponentProps,
    type CSSProperties,
    type KeyboardEvent,
    type ReactNode,
    useCallback,
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   slides                                   */
/* -------------------------------------------------------------------------- */

export type SqueezeSlide = {
    /** Stable key. Falls back to the position in the array. */
    id?: string | number;
    /** The dark opening line under the panels. */
    title: string;
    /** The grey sentence that runs on from the title. */
    description?: string;
    /** Picture for the panel. It crops from the middle as the panel narrows. */
    image?: string;
    /** Alt text for that picture. Leave it out and the picture reads as decoration. */
    imageAlt?: string;
    /** Video for the panel (mp4 / webm). Takes precedence over image when provided. */
    video?: string;
    /** Video preview poster image. */
    poster?: string;
    /** Any CSS background — a gradient, a colour, layers. Used when there is no picture. */
    background?: string;
    /** Sits in the corner of the open panel: a wordmark, a logo, a caption. */
    overlay?: ReactNode;
    /** Text on the button. No text, no button. */
    action?: string;
    /** Where the button goes. */
    href?: string;
    /** Opens the link in a new tab. */
    target?: string;
    /** Runs instead of following `href`. */
    onAction?: () => void;
};

/* -------------------------------------------------------------------------- */
/*                                  geometry                                  */
/* -------------------------------------------------------------------------- */

/** A number is read as pixels; a string goes through as written, `2rem` and all. */
type Size = number | string;

const size = (value: Size) => (typeof value === "number" ? `${value}px` : value);

const clamp = (value: number, low: number, high: number) =>
    Math.max(low, Math.min(high, value));

/**
 * The row is four columns and a tail of slats, and it is a strip that slides
 * rather than a ring that turns.
 */
const SHARES = [-0.06, 0.61, 0.3, 0.15];

/** The hovered column takes more room. */
const STRETCHED = [0, 0.71, 0.4, 0.25];

/** Its neighbours give a little up to pay for it. */
const SQUEEZED = [-0.12, 0.59, 0.28, 0.13];

/** One card in the strip. `key` keeps React on the same node as the strip grows. */
type Card = { key: number; slide: number };

/* -------------------------------------------------------------------------- */
/*                                    hooks                                   */
/* -------------------------------------------------------------------------- */

/** True while the reader asks for less movement. */
function useReducedMotion(): boolean {
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        const read = () => setReduced(query.matches);
        read();
        query.addEventListener("change", read);
        return () => query.removeEventListener("change", read);
    }, []);

    return reduced;
}

/* -------------------------------------------------------------------------- */
/*                                 component                                  */
/* -------------------------------------------------------------------------- */

const GEIST = `
@font-face{font-family:"Geist";font-style:normal;font-weight:100 900;font-display:swap;
src:url(https://cdn.21st.dev/assets/mirror/9b/9b6f5ff45b278c744b5f379a2c4ecbaf858a842b8eaf82ac8d21b699ca16c608.woff2) format("woff2");
unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:"Geist";font-style:normal;font-weight:100 900;font-display:swap;
src:url(https://cdn.21st.dev/assets/mirror/58/58a6b173d5ca1dec92166ea3c6cb1a84a4144556d10928ac14e8e6b40e4787bd.woff2) format("woff2");
unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:"Geist";font-style:normal;font-weight:100 900;font-display:swap;
src:url(https://cdn.21st.dev/assets/mirror/61/6129fc8571c3e0cb0a4c41f5160c974a843b055009dc4ad8858bd808e18a2d86.woff2) format("woff2");
unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}
`;

export type SqueezeCarouselProps = {
    /** The panels, in the order they are read. */
    slides: SqueezeSlide[];
    /** Which panel starts open. Default `0`. */
    defaultIndex?: number;
    /** Called with the panel that just opened. */
    onIndexChange?: (index: number) => void;
    /** Height of the row. Default `clamp(180px, 32cqi, 340px)`. */
    height?: Size;
    /** Width of a slat in the tail. Default `8`. */
    slatWidth?: Size;
    /** Space between slats. Default `8`. */
    slatGap?: Size;
    /** Space between the four columns. Default `16`. */
    gap?: Size;
    /** Corner rounding on a panel. Default `6`. */
    radius?: Size;
    /** Milliseconds the slide takes. Default `1000`. */
    duration?: number;
    /** Widen the panel under the pointer. Default `true`. */
    hoverGrow?: boolean;
    /** Step on by itself. Default `false`. */
    autoplay?: boolean;
    /** Milliseconds a panel stays open under autoplay. Default `6000`. */
    interval?: number;
    /** Show the two arrow buttons. Default `true`. */
    controls?: boolean;
    /** Fill behind the button, the arrows and the focus ring. Defaults to the theme's primary. */
    accent?: string;
    /** What sits on top of that fill — the label and the arrow heads. */
    accentForeground?: string;
    /** What a screen reader calls the carousel. Default `"Featured"`. */
    label?: string;
    /** Extra classes for a single panel. */
    panelClassName?: string;
} & Omit<ComponentProps<"div">, "onSelect">;

/**
 * A carousel that gives one panel the room and squeezes the rest into slats
 * down the right-hand side. Opening a slat widens it and slides the row along;
 * the copy and the button underneath cross-fade to match.
 */
export function SqueezeCarousel({
    slides,
    defaultIndex = 0,
    onIndexChange,
    height = "clamp(200px, 32cqi, 340px)",
    slatWidth = 8,
    slatGap = 8,
    gap = 16,
    radius = 10,
    duration = 1000,
    hoverGrow = true,
    autoplay = false,
    interval = 6000,
    controls = true,
    accent = "var(--sq-accent, var(--color-foreground, #09090b))",
    accentForeground = "var(--sq-accent-foreground, var(--color-background, #ffffff))",
    label = "Featured",
    panelClassName,
    className,
    style,
    ...props
}: SqueezeCarouselProps) {
    const count = slides.length;
    const wrap = (i: number) => ((i % count) + count) % count;

    // Four columns plus a tail of slats. Fewer slides, shorter tail.
    const slats = clamp(count - 4, 1, 3);
    const visible = 4 + slats;

    const reduced = useReducedMotion();
    const ms = reduced ? 0 : duration;

    const ids = useId();
    const seed = useRef(0);
    const strip = useRef<HTMLDivElement>(null);

    /* --- the strip -------------------------------------------------------- */

    const window0 = () =>
        Array.from({ length: visible }, (_, p) => ({
            key: seed.current++,
            slide: wrap(defaultIndex + p),
        }));

    const [cards, setCards] = useState<Card[]>(window0);
    const [column, setColumn] = useState(0);
    const columnRef = useRef(0);
    const forward = useRef(true);
    const [slid, setSlid] = useState(0);
    const [still, setStill] = useState(false);
    const [hover, setHover] = useState(-1);

    const open = cards[-column]?.slide ?? defaultIndex;
    const timers = useRef<number[]>([]);

    useEffect(() => () => timers.current.forEach(clearTimeout), []);

    const settle = useCallback(() => {
        setCards((strip) =>
            forward.current ? strip.slice(-visible) : strip.slice(0, visible),
        );
        columnRef.current = 0;
        setColumn(0);
        setSlid(0);
        setStill(true);
    }, [visible]);

    useLayoutEffect(() => {
        if (!still) return;
        const id = requestAnimationFrame(() => setStill(false));
        return () => cancelAnimationFrame(id);
    }, [still]);

    const step = useCallback(
        (by: number) => {
            if (count < 2 || by === 0) return;

            timers.current.forEach(clearTimeout);
            timers.current = [];
            forward.current = by > 0;

            if (by > 0) {
                setCards((strip) => [
                    ...strip,
                    ...Array.from({ length: by }, (_, k) => ({
                        key: seed.current++,
                        slide: wrap(strip[strip.length - 1].slide + 1 + k),
                    })),
                ]);
                columnRef.current -= by;
                setColumn(columnRef.current);
                setSlid((s) => s - by);
            } else {
                setCards((strip) => [
                    ...Array.from({ length: -by }, (_, k) => ({
                        key: seed.current++,
                        slide: wrap(strip[0].slide - (-by - k)),
                    })),
                    ...strip,
                ]);
                setSlid((s) => s + by);
                setStill(true);
                timers.current.push(window.setTimeout(() => setSlid(0), 0));
            }

            timers.current.push(window.setTimeout(settle, ms + 20));
        },
        [count, ms, settle],
    );

    useEffect(() => {
        onIndexChange?.(open);
    }, [open, onIndexChange]);

    /* --- autoplay --------------------------------------------------------- */

    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (!autoplay || paused || reduced || count < 2) return;
        const timer = window.setTimeout(() => step(1), interval);
        return () => clearTimeout(timer);
    }, [autoplay, paused, reduced, count, open, interval, step]);

    /* --- keyboard --------------------------------------------------------- */

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const moves: Record<string, number | undefined> = { ArrowRight: 1, ArrowLeft: -1 };
        const by = moves[event.key];
        if (by === undefined) return;
        event.preventDefault();
        step(by);
    };

    if (!count) return null;

    /* --- render ----------------------------------------------------------- */

    const slat = size(slatWidth);
    const shares = hoverGrow && hover >= 0 && hover <= 3 && !reduced ? null : SHARES;

    const shareOf = (col: number) => {
        if (shares) return SHARES[col];
        return hover === col ? STRETCHED[col] : SQUEEZED[col];
    };

    const widthOf = (col: number) => {
        if (col < 0 || col > 3) return slat;
        if (col === 0) return `calc(var(--sq-hero) + var(--sq-room) * ${shareOf(0)})`;
        return `calc(var(--sq-room) * ${shareOf(col)})`;
    };

    const vars = {
        "--sq-h": size(height),
        "--sq-gap": size(gap),
        "--sq-slat-gap": size(slatGap),
        "--sq-radius": size(radius),
        "--sq-ms": `${ms}ms`,
        "--sq-ease": "cubic-bezier(0.16, 1, 0.3, 1)",
        "--sq-fill": accent,
        "--sq-on-fill": accentForeground,
        // Responsive hero width: on mobile clamp so slats always have space to show
        "--sq-hero": "min(calc(var(--sq-h) * 16 / 9), calc(100cqi - 70px))",
        "--sq-room": `calc(100cqi - var(--sq-hero) - ${slats} * var(--sq-slat-gap) - 3 * var(--sq-gap) - ${slats} * ${slat})`,
    } as CSSProperties;

    const move = `translateX(calc(${slid} * (${slat} + var(--sq-gap))))`;

    return (
        <div
            className={cn("flex w-full flex-col select-none", className)}
            style={{
                containerType: "inline-size",
                fontFamily: '"Geist", ui-sans-serif, system-ui, sans-serif',
                ...vars,
                ...style,
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
                setPaused(false);
                setHover(-1);
            }}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            {...props}
        >
            <style>{GEIST}</style>

            {controls && count > 1 && (
                <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                        {label} • {open + 1} / {count}
                    </span>
                    <div className="flex items-center gap-2">
                        <Arrow back label="Previous slide" onClick={() => step(-1)} />
                        <Arrow label="Next slide" onClick={() => step(1)} />
                    </div>
                </div>
            )}

            <div className="w-full overflow-hidden" style={{ height: "var(--sq-h)" }}>
                <div
                    ref={strip}
                    role="tablist"
                    aria-label={label}
                    aria-orientation="horizontal"
                    onKeyDown={onKeyDown}
                    className="flex h-full w-max"
                    style={{
                        transform: move,
                        transition: still ? "none" : `transform var(--sq-ms) var(--sq-ease)`,
                    }}
                >
                    {cards.map((card, place) => {
                        const col = place + column;
                        const slide = slides[card.slide];
                        const front = col === 0;

                        return (
                            <button
                                key={card.key}
                                type="button"
                                role="tab"
                                id={`${ids}-tab-${card.key}`}
                                aria-selected={front}
                                aria-controls={`${ids}-panel`}
                                aria-label={slide.title}
                                tabIndex={front ? 0 : -1}
                                onMouseMove={() => hoverGrow && setHover(col)}
                                onClick={() => col > 0 && step(col)}
                                className={cn(
                                    "relative isolate h-full shrink-0 cursor-pointer overflow-hidden bg-zinc-900 p-0 border border-zinc-200/40 dark:border-zinc-800 shadow-sm",
                                    "outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                                    "focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 focus-visible:ring-offset-background",
                                    panelClassName,
                                )}
                                style={{
                                    width: widthOf(col),
                                    marginLeft:
                                        place === 0
                                            ? 0
                                            : col < 4
                                              ? "var(--sq-gap)"
                                              : "var(--sq-slat-gap)",
                                    borderRadius: `min(var(--sq-radius), calc(${widthOf(col)} / 2))`,
                                    transitionProperty: "width, margin-left",
                                    transitionDuration: still ? "0s" : "var(--sq-ms)",
                                    transitionTimingFunction: "var(--sq-ease)",
                                }}
                            >
                                <Picture slide={slide} isActive={front} />

                                {slide.overlay && (
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end p-3 pt-12 sm:p-5 sm:pt-16"
                                        style={{
                                            opacity: front ? 1 : 0,
                                            transition: `opacity var(--sq-ms) var(--sq-ease)`,
                                            backgroundImage:
                                                "linear-gradient(to top, rgb(0 0 0 / 0.75), transparent)",
                                        }}
                                    >
                                        {slide.overlay}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div id={`${ids}-panel`} role="tabpanel" aria-live="polite" className="mt-5 grid sm:mt-6">
                {slides.map((slide, i) => {
                    const shown = i === open;

                    return (
                        <div
                            key={slide.id ?? i}
                            aria-hidden={!shown}
                            className={cn(
                                "col-start-1 row-start-1 flex flex-col gap-4",
                                "sm:flex-row sm:items-start sm:justify-between sm:gap-8",
                            )}
                            style={{
                                opacity: shown ? 1 : 0,
                                visibility: shown ? "visible" : "hidden",
                                pointerEvents: shown ? "auto" : "none",
                                transition: `opacity var(--sq-ms) var(--sq-ease), visibility var(--sq-ms)`,
                            }}
                        >
                            <div className="max-w-[42rem] space-y-1">
                                <h4 className="font-harmond text-lg sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                                    {slide.title}
                                </h4>
                                {slide.description && (
                                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {slide.description}
                                    </p>
                                )}
                            </div>

                            {slide.action && <Action slide={slide} shown={shown} />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   pieces                                   */
/* -------------------------------------------------------------------------- */

function Picture({ slide, isActive }: { slide: SqueezeSlide; isActive: boolean }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const box = {
        width: "var(--sq-hero)",
        minWidth: "100%",
    } as const;

    useEffect(() => {
        if (!videoRef.current) return;
        if (isActive) {
            videoRef.current.play().catch(() => {});
        } else {
            videoRef.current.pause();
        }
    }, [isActive]);

    if (slide.video) {
        return (
            <video
                ref={videoRef}
                src={slide.video}
                poster={slide.poster}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute inset-y-0 left-1/2 h-full max-w-none -translate-x-1/2 object-cover pointer-events-none"
                style={box}
            />
        );
    }

    if (slide.image) {
        return (
            <img
                src={slide.image}
                alt={slide.imageAlt ?? ""}
                draggable={false}
                className="absolute inset-y-0 left-1/2 h-full max-w-none -translate-x-1/2 object-cover"
                style={box}
            />
        );
    }

    return (
        <span
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 -translate-x-1/2"
            style={{ background: slide.background || "linear-gradient(135deg, #18181b, #27272a)", ...box }}
        />
    );
}

function Arrow({
    back = false,
    label,
    onClick,
}: {
    back?: boolean;
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className={cn(
                "grid size-8 sm:size-9 cursor-pointer place-items-center rounded-full border border-zinc-200 dark:border-zinc-800",
                "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
                "transition-all duration-150 active:scale-95 outline-none",
                "focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100",
            )}
        >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path
                    d={
                        back
                            ? "M9.6 2.6 5.1 7.1h9.1v1.8H5.1l4.5 4.5-1.2 1.2-6-6L1.8 8l.6-.6 6-6 1.2 1.2Z"
                            : "M6.4 2.6l4.5 4.5H1.8v1.8h9.1l-4.5 4.5 1.2 1.2 6-6 .6-.6-.6-.6-6-6-1.2 1.2Z"
                    }
                />
            </svg>
        </button>
    );
}

function Action({ slide, shown }: { slide: SqueezeSlide; shown: boolean }) {
    const inside = (
        <>
            <span>{slide.action}</span>
            <svg
                width="6"
                height="9"
                viewBox="0 0 6 9"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/sq-action:translate-x-0.5"
            >
                <path
                    d="M1.2 1 4.7 4.5 1.2 8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    );

    const dress = cn(
        "group/sq-action inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full",
        "bg-zinc-900 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-95",
        "dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 outline-none shadow-xs",
        "focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100",
    );

    if (slide.href) {
        return (
            <a
                href={slide.href}
                target={slide.target}
                rel={slide.target === "_blank" ? "noreferrer" : undefined}
                tabIndex={shown ? 0 : -1}
                onClick={slide.onAction}
                className={dress}
            >
                {inside}
            </a>
        );
    }

    return (
        <button type="button" tabIndex={shown ? 0 : -1} onClick={slide.onAction} className={dress}>
            {inside}
        </button>
    );
}

export default SqueezeCarousel;
