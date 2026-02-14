'use client';

import { useState, useEffect, useRef, ReactNode, useCallback, useMemo } from 'react';
import { getFromEnd, getFromStart } from '@/app/_components/Slider/slider-helpers';
import { SliderSettings } from '@/app/_components/Slider/SliderSettings';

interface CustomSliderProps {
    settings: SliderSettings;
    children: ReactNode[];
}

export function Slider({ settings, children }: CustomSliderProps) {
    const [slidesToShowCount, setSlidesToShowCount] = useState(settings.slidesToShow || 1);
    const [slidesToScrollCount, setSlidesToScrollCount] = useState(settings.slidesToScroll || 1);
    const [currentSpeed, setCurrentSpeed] = useState(settings.speed ?? 3000);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const bufferSize = Math.max(slidesToScrollCount, slidesToShowCount) + 1;

    const [offset, setOffset] = useState<number>(bufferSize);

    const sliderRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const currentIndexRef = useRef<number>(bufferSize);

    const dragState = useRef({
        isDragging: false,
        startX: null as number | null,
        currentX: null as number | null,
    });

    const allSlides = useMemo(() => {
        const slides: ReactNode[] = [];
        const preloadCount = 1;
        const calcBuffer = Math.max(slidesToScrollCount, slidesToShowCount) + preloadCount;

        slides.push(...getFromEnd(calcBuffer, children));
        slides.push(...children);
        slides.push(...getFromStart(calcBuffer, children));

        return slides;
    }, [children, slidesToShowCount, slidesToScrollCount]);

    useEffect(() => {
        currentIndexRef.current = bufferSize;
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

        const bufferSizeLocal = Math.max(slidesToScrollCount, slidesToShowCount) + 1;

        if (currentIndexRef.current >= bufferSizeLocal + children.length ||
            currentIndexRef.current < bufferSizeLocal) {
            requestAnimationFrame(() => {
                currentIndexRef.current = wrapIndex(currentIndexRef.current);
                setOffset(currentIndexRef.current);
            });
        }

        setIsTransitioning(false);
    }, [children.length, slidesToScrollCount, slidesToShowCount, wrapIndex]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const sortedResponsive = settings.responsive
                ?.slice()
                .sort((a, b) => a.breakpoint - b.breakpoint);

            const responsiveSettings = sortedResponsive?.find((item) => width <= item.breakpoint);

            if (responsiveSettings) {
                setSlidesToShowCount(responsiveSettings.settings.slidesToShow);
                setSlidesToScrollCount(responsiveSettings.settings.slidesToScroll);

                const speed = responsiveSettings.settings.speed ?? settings.speed ?? 3000;
                setCurrentSpeed(speed);
            } else {
                setSlidesToShowCount(settings.slidesToShow || 1);
                setSlidesToScrollCount(settings.slidesToScroll || 1);
                setCurrentSpeed(settings.speed ?? 3000);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [settings]);

    useEffect(() => {
        if (!settings.autoplay || isPaused) return;

        const intervalMs = settings.autoplaySpeed ?? 3000;
        const id = setInterval(() => {
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
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
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

        const onMouseDown = (e: MouseEvent) => {
            if (e.button !== 0) return;
            e.preventDefault();
            handleDragStart(e.clientX);
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!dragState.current.isDragging) return;
            e.preventDefault();
            handleDragMove(e.clientX);
        };

        const onMouseUp = (e: MouseEvent) => {
            e.preventDefault();
            handleDragEnd();
        };

        const onTouchStart = (e: TouchEvent) => {
            handleDragStart(e.touches[0].clientX);
        };

        const onTouchMove = (e: TouchEvent) => {
            if (!dragState.current.isDragging) return;
            handleDragMove(e.touches[0].clientX);
        };

        const onTouchEnd = () => {
            handleDragEnd();
        };

        container.addEventListener('mousedown', onMouseDown);
        container.addEventListener('touchstart', onTouchStart, { passive: true });
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchmove', onTouchMove, { passive: true });
        document.addEventListener('touchend', onTouchEnd);

        return () => {
            container.removeEventListener('mousedown', onMouseDown);
            container.removeEventListener('touchstart', onTouchStart);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
        };
    }, [handleDragStart, handleDragMove, handleDragEnd]);

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
            onMouseEnter={() => settings.pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => {
                if (settings.pauseOnHover) setIsPaused(false);
                handleDragEnd();
            }}
        >
            <div
                ref={(el) => { sliderRef.current = el; }}
                className="flex items-stretch"
                style={{
                    transform: `translateX(calc(-${(offset * 100) / slidesToShowCount}%))`,
                    transition: isTransitioning ? `transform ${currentSpeed}ms ease-in-out` : 'none',
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
