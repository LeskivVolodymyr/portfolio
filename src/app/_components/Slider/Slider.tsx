'use client';

import { useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { getFromEnd, getFromStart } from '@/app/_components/Slider/slider-helpers';

export interface ResponsiveSettings {
    breakpoint: number;
    settings: {
        slidesToShow: number;
        slidesToScroll: number;
        speed?: number;
    };
}

export interface SliderSettings {
    infinite?: boolean;
    autoplay?: boolean;
    speed?: number;
    autoplaySpeed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    pauseOnHover?: boolean;
    responsive?: ResponsiveSettings[];
}

interface CustomSliderProps {
    settings: SliderSettings;
    children: ReactNode[];
}

export default function CustomSlider({ settings, children }: CustomSliderProps) {
    const [slidesToShowCount, setSlidesToShowCount] = useState(settings.slidesToShow || 1);
    const [slidesToScrollCount, setSlidesToScrollCount] = useState(settings.slidesToScroll || 1);
    const [currentSpeed, setCurrentSpeed] = useState(settings.speed ?? 3000);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const bufferSize = Math.max(slidesToScrollCount, slidesToShowCount) + 1;

    const [offset, setOffset] = useState<number>(bufferSize);
    const [sliderHeight, setSliderHeight] = useState<number | undefined>(undefined);

    const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const transitionGuardRef = useRef(false);

    const buildAllSlides = useCallback(() => {
        const allSlides: ReactNode[] = [];
        const preloadCount = 1;
        const calcBuffer = Math.max(slidesToScrollCount, slidesToShowCount) + preloadCount;

        allSlides.push(...getFromEnd(calcBuffer, children));
        allSlides.push(...children);
        allSlides.push(...getFromStart(calcBuffer, children));

        return allSlides;
    }, [children, slidesToShowCount, slidesToScrollCount]);

    const [allSlides, setAllSlides] = useState<ReactNode[]>(() => buildAllSlides());

    const currentIndexRef = useRef<number>(bufferSize);

    useEffect(() => {
        setAllSlides(buildAllSlides());
        currentIndexRef.current = bufferSize;
        setOffset(bufferSize);
        slideRefs.current = [];
    }, [buildAllSlides, slidesToShowCount, bufferSize]);

    const getAdjustedSpeed = useCallback(() => {
        return currentSpeed;
    }, [currentSpeed]);

    const handleNext = useCallback(() => {
        if (isTransitioning) return;
        if (children.length === 0) return;
        setIsTransitioning(true);
        transitionGuardRef.current = true;
        currentIndexRef.current += slidesToScrollCount;
        setOffset(currentIndexRef.current);
    }, [isTransitioning, slidesToScrollCount, children.length]);

    const handlePrev = useCallback(() => {
        if (isTransitioning) return;
        if (children.length === 0) return;
        setIsTransitioning(true);
        transitionGuardRef.current = true;
        currentIndexRef.current -= slidesToScrollCount;
        setOffset(currentIndexRef.current);
    }, [isTransitioning, slidesToScrollCount, children.length]);

    const transitionTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isTransitioning) return;
        if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
            transitionTimeoutRef.current = null;
        }
        const t = window.setTimeout(() => {
            if (transitionGuardRef.current) {
                transitionGuardRef.current = false;
                setIsTransitioning(false);
            }
        }, getAdjustedSpeed() + 120);

        transitionTimeoutRef.current = t;

        return () => {
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
                transitionTimeoutRef.current = null;
            }
        };
    }, [isTransitioning, getAdjustedSpeed]);

    const handleTransitionEnd = useCallback((e?: React.TransitionEvent<HTMLDivElement>) => {
        if (e && e.propertyName !== 'transform') return;

        if (children.length === 0) {
            transitionGuardRef.current = false;
            setIsTransitioning(false);
            return;
        }

        const bufferSizeLocal = Math.max(slidesToScrollCount, slidesToShowCount) + 1;

        if (currentIndexRef.current >= bufferSizeLocal + children.length) {
            requestAnimationFrame(() => {
                const positionInCycle = (currentIndexRef.current - bufferSizeLocal) % children.length;
                currentIndexRef.current = bufferSizeLocal + positionInCycle;
                setOffset(currentIndexRef.current);
            });
        }

        if (currentIndexRef.current < bufferSizeLocal) {
            requestAnimationFrame(() => {
                const raw = currentIndexRef.current - bufferSizeLocal;
                const positionInCycle = ((raw % children.length) + children.length) % children.length;
                currentIndexRef.current = bufferSizeLocal + positionInCycle;
                setOffset(currentIndexRef.current);
            });
        }

        transitionGuardRef.current = false;
        setIsTransitioning(false);
    }, [children.length, slidesToScrollCount, slidesToShowCount]);

    useEffect(() => {
        const measureHeight = () => {
            const heights = slideRefs.current
                .filter(Boolean)
                .map((el) => el!.getBoundingClientRect().height);

            if (heights.length > 0) {
                setSliderHeight(Math.max(...heights));
            }
        };

        const timer = setTimeout(measureHeight, 0);
        window.addEventListener('resize', measureHeight);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', measureHeight);
        };
    }, [allSlides]);

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

                // Find speed: use current breakpoint, or fallback to previous breakpoint, or root
                let speed = responsiveSettings.settings.speed;

                if (speed === undefined && sortedResponsive) {
                    // Find all breakpoints smaller than current
                    const smallerBreakpoints = sortedResponsive.filter(
                        (item) => item.breakpoint < responsiveSettings.breakpoint
                    );

                    // Search backwards for a speed setting
                    for (let i = smallerBreakpoints.length - 1; i >= 0; i--) {
                        if (smallerBreakpoints[i].settings.speed !== undefined) {
                            speed = smallerBreakpoints[i].settings.speed;
                            break;
                        }
                    }
                }

                // Final fallback to root setting
                setCurrentSpeed(speed ?? settings.speed ?? 3000);
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
        setAllSlides(buildAllSlides());
    }, [buildAllSlides]);

    useEffect(() => {
        if (!settings.autoplay || isPaused) return;

        const intervalMs = settings.autoplaySpeed ?? 3000;
        const id = setInterval(() => {
            handleNext();
        }, intervalMs);

        return () => clearInterval(id);
    }, [settings.autoplay, settings.autoplaySpeed, isPaused, handleNext]);

    const dragStartX = useRef<number | null>(null);
    const dragCurrentX = useRef<number | null>(null);
    const isDragging = useRef(false);

    const handleDragStart = useCallback((clientX: number) => {
        isDragging.current = true;
        dragStartX.current = clientX;
        dragCurrentX.current = clientX;
        setIsPaused(true);
    }, []);

    const handleDragMove = useCallback((clientX: number) => {
        if (!isDragging.current) return;
        dragCurrentX.current = clientX;
    }, []);

    const handleDragEnd = useCallback(() => {
        if (!isDragging.current) return;

        const start = dragStartX.current ?? 0;
        const end = dragCurrentX.current ?? start;
        const diff = start - end;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                handleNext();
            } else {
                handlePrev();
            }
        }

        isDragging.current = false;
        dragStartX.current = null;
        dragCurrentX.current = null;
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
            if (!isDragging.current) return;
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
            if (!isDragging.current) return;
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
            style={{ height: sliderHeight }}
            onMouseEnter={() => settings.pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => {
                if (settings.pauseOnHover) setIsPaused(false);
                handleDragEnd();
            }}
        >
            <div
                ref={(el) => { sliderRef.current = el; }}
                className="h-full flex"
                style={{
                    transform: `translateX(calc(-${(offset * 100) / slidesToShowCount}%))`,
                    transition: isTransitioning ? `transform ${getAdjustedSpeed()}ms ease-in-out` : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {allSlides.map((child, index) => (
                    <div
                        ref={(el) => { slideRefs.current[index] = el; }}
                        key={`slide-${index}`}
                        className="flex-shrink-0 h-full select-none"
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
