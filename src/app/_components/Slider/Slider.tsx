'use client';

import { useState, useEffect, useRef, ReactNode, useCallback, useMemo } from 'react';
import { getFromEnd, getFromStart } from '@/app/_components/Slider/slider-helpers';
import { SliderSettings } from '@/app/_components/Slider/SliderSettings';

interface CustomSliderProps {
    settings: SliderSettings;
    children: ReactNode[];
}

const DEFAULT_SPEED = 2000;
const DEFAULT_SLIDE_TO_SHOW = 1;
const DEFAULT_SLIDE_TO_SCROLL = 1;
    const DRAG_THRESHOLD = 50;

function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
    let timeoutId: NodeJS.Timeout;
    return ((...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    }) as T;
}

export function Slider({ settings, children }: CustomSliderProps) {
    const mountedRef = useRef(false);

    // Lazy initialize responsive settings
    const getInitialResponsiveSettings = useCallback(() => {
        const sorted = settings.responsive
            ?.slice()
            .sort((a, b) => a.breakpoint - b.breakpoint);

        const responsive = sorted?.find((item) => typeof window !== 'undefined' && window.innerWidth <= item.breakpoint);

        if (responsive) {
            return {
                slidesToShow: responsive.settings.slidesToShow,
                slidesToScroll: responsive.settings.slidesToScroll,
                speed: responsive.settings.speed ?? settings.speed ?? DEFAULT_SPEED,
            };
        }

        return {
            slidesToShow: settings.slidesToShow || DEFAULT_SLIDE_TO_SHOW,
            slidesToScroll: settings.slidesToScroll || DEFAULT_SLIDE_TO_SCROLL,
            speed: settings.speed ?? DEFAULT_SPEED,
        };
    }, [settings.responsive, settings.slidesToShow, settings.slidesToScroll, settings.speed]);

    const [slidesToShowCount, setSlidesToShowCount] = useState(() => getInitialResponsiveSettings().slidesToShow);
    const [slidesToScrollCount, setSlidesToScrollCount] = useState(() => getInitialResponsiveSettings().slidesToScroll);
    const [currentSpeed, setCurrentSpeed] = useState(() => getInitialResponsiveSettings().speed);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const bufferSize = Math.max(slidesToScrollCount, slidesToShowCount) + 1;
    const [offset, setOffset] = useState<number>(() => bufferSize);

    useEffect(() => {
        mountedRef.current = true;
        return () => { mountedRef.current = false; };
    }, []);

    const dragState = useRef({
        isDragging: false,
        startX: null as number | null,
        currentX: null as number | null,
    });

    const setPauseState = useCallback((paused: boolean) => {
        if (settings.pauseOnHover)
            setIsPaused(paused);
    }, [settings.pauseOnHover]);

    const sliderRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const currentIndexRef = useRef<number>(bufferSize);

    const allSlides = useMemo(() => {
        const slides: ReactNode[] = getFromEnd(bufferSize, children); // prev buffer
        slides.push(...children);
        slides.push(...getFromStart(bufferSize, children)); // next buffer

        return slides;
    }, [children, bufferSize]);

    useEffect(() => {
        // reset to initial position when children or buffer size changes
        currentIndexRef.current = bufferSize;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOffset(bufferSize);
    }, [allSlides, bufferSize]);

    const handleNext = useCallback(() => {
        if (isTransitioning || children.length === 0) return;
        setIsTransitioning(true);
        currentIndexRef.current += slidesToScrollCount;
        setOffset(currentIndexRef.current);
    }, [isTransitioning, slidesToScrollCount, children.length]);

    const handlePrev = useCallback(() => {
        if (isTransitioning || children.length === 0) return;
        setIsTransitioning(true);
        currentIndexRef.current -= slidesToScrollCount;
        setOffset(currentIndexRef.current);
    }, [isTransitioning, slidesToScrollCount, children.length]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handlePrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleNext();
            }
        };

        container.addEventListener('keydown', handleKeyDown);
        return () => container.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev]);

    const wrapIndex = useCallback((index: number) => {
        const cycle = children.length;
        const normalized = ((index - bufferSize) % cycle + cycle) % cycle;
        return bufferSize + normalized;
    }, [children.length, bufferSize]);

    const handleTransitionEnd = useCallback((e?: React.TransitionEvent<HTMLDivElement>) => {
        if (e && e.propertyName !== 'transform') return;

        if (children.length === 0) {
            setIsTransitioning(false);
            return;
        }

        if (currentIndexRef.current >= bufferSize + children.length ||
            currentIndexRef.current < bufferSize) {
            requestAnimationFrame(() => {
                currentIndexRef.current = wrapIndex(currentIndexRef.current);
                setOffset(currentIndexRef.current);
            });
        }

        setIsTransitioning(false);
    },[children.length, bufferSize, wrapIndex]);

    const getResponsiveSettings = useCallback((width: number) => {
        const sorted = settings.responsive
            ?.slice()
            .sort((a, b) => a.breakpoint - b.breakpoint);

        return sorted?.find((item) => width <= item.breakpoint);
    }, [settings.responsive]);

    const handleResize = useCallback(() => {
        const responsive = getResponsiveSettings(window.innerWidth);

        if (responsive) {
            setSlidesToShowCount(responsive.settings.slidesToShow);
            setSlidesToScrollCount(responsive.settings.slidesToScroll);
            setCurrentSpeed(responsive.settings.speed ?? settings.speed ?? DEFAULT_SPEED);
        } else {
            setSlidesToShowCount(settings.slidesToShow || 1);
            setSlidesToScrollCount(settings.slidesToScroll || 1);
            setCurrentSpeed(settings.speed ?? DEFAULT_SPEED);
        }
    }, [getResponsiveSettings, settings.slidesToShow, settings.slidesToScroll, settings.speed]);

    const debouncedResize = useMemo(() => debounce(handleResize, 50), [handleResize]);

    useEffect(() => {
        window.addEventListener('resize', debouncedResize);
        return () => window.removeEventListener('resize', debouncedResize);
    }, [debouncedResize]);

    useEffect(() => {
        if (!settings.autoplay || isPaused) return;

        const intervalMs = settings.autoplaySpeed ?? DEFAULT_SPEED;
        const id = setInterval(() => {
            if (!mountedRef.current) return;
            handleNext();
        }, intervalMs);

        return () => clearInterval(id);
    }, [settings.autoplay, settings.autoplaySpeed, isPaused, handleNext]);

    const handleDragStart = useCallback((clientX: number) => {
        dragState.current.isDragging = true;
        dragState.current.startX = clientX;
        dragState.current.currentX = clientX;
        setIsPaused(true);
    }, []);

    const handleDragMove = useCallback((clientX: number) => {
        if (!dragState.current.isDragging) return;
        dragState.current.currentX = clientX;
    }, []);

    const handleDragEnd = useCallback(() => {
        if (!dragState.current.isDragging) return;

        const start = dragState.current.startX ?? 0;
        const end = dragState.current.currentX ?? start;
        const diff = start - end;

        if (Math.abs(diff) > DRAG_THRESHOLD) {
            if (diff > 0) {
                handleNext();
            } else {
                handlePrev();
            }
        }

        dragState.current.isDragging = false;
        dragState.current.startX = null;
        dragState.current.currentX = null;
        setIsPaused(false);
    }, [handleNext, handlePrev]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const controller = new AbortController();
        const { signal } = controller;
        let activePointerId: number | null = null;

        const onPointerDown = (e: PointerEvent) => {
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            activePointerId = e.pointerId;
            (e.target as Element).setPointerCapture?.(e.pointerId);
            handleDragStart(e.clientX);
        };

        const onPointerMove = (e: PointerEvent) => {
            if (activePointerId !== e.pointerId) return;
            if (dragState.current.isDragging) e.preventDefault();
            handleDragMove(e.clientX);
        };

        const onPointerUp = (e: PointerEvent) => {
            if (activePointerId !== e.pointerId) return;
            (e.target as Element).releasePointerCapture?.(e.pointerId);
            activePointerId = null;
            handleDragEnd();
        };

        container.addEventListener('pointerdown', onPointerDown, { signal });
        document.addEventListener('pointermove', onPointerMove, { passive: false, signal });
        document.addEventListener('pointerup', onPointerUp, { signal });

        return () => controller.abort();
    }, [handleDragStart, handleDragMove, handleDragEnd]);

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
            tabIndex={0}
            onMouseEnter={() => setPauseState(true)}
            onMouseLeave={() => {
                setPauseState(false);
                handleDragEnd(); // drag cleanup
            }}
        >
            <div
                ref={(el) => { sliderRef.current = el; }}
                className="flex items-stretch"
                style={{
                    transform: `translateX(calc(-${(offset * 100) / slidesToShowCount}%))`,
                    transition: isTransitioning ? `transform ${currentSpeed}ms ease-in-out` : 'none',
                    willChange: 'transform'
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {allSlides.map((child, index) => (
                    <div
                        key={`slide-${index}`}
                        className="flex-shrink-0 select-none flex"
                        style={{
                            width: `${100 / slidesToShowCount}%`,
                        }}
                    >
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
}
