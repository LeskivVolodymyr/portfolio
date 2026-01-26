'use client';

import { useState, useEffect, useRef, ReactNode, useCallback } from 'react';

export interface ResponsiveSettings {
    breakpoint: number;
    settings: {
        slidesToShow: number;
        slidesToScroll: number;
    };
}

export interface SliderSettings {
    infinite?: boolean;
    autoplay?: boolean;
    speed?: number;
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
    const [slidesToShow, setSlidesToShow] = useState(settings.slidesToShow || 1);
    const [slidesToScroll, setSlidesToScroll] = useState(settings.slidesToScroll || 1);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [offset, setOffset] = useState(0);
    const [sliderHeight, setSliderHeight] = useState<number | undefined>(undefined);

    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Build array with all unique children plus buffer for infinite scroll
    const buildAllSlides = useCallback(() => {
        const allSlides: ReactNode[] = [];

        // Add last slidesToShow items at the beginning (for reset)
        for (let i = children.length - slidesToShow; i < children.length; i++) {
            allSlides.push(children[i % children.length]);
        }

        // Add all original children
        allSlides.push(...children);

        // Add buffer slides at the end - ensure at least slidesToShow + slidesToScroll
        const bufferSize = Math.max(slidesToShow, slidesToScroll + slidesToShow);
        for (let i = 0; i < bufferSize; i++) {
            allSlides.push(children[i % children.length]);
        }

        return allSlides;
    }, [children, slidesToShow, slidesToScroll]);


    const [allSlides, setAllSlides] = useState<ReactNode[]>(() => buildAllSlides());
    const currentIndexRef = useRef(slidesToShow); // Start after front buffer

    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const dragThreshold = 50; // Minimum pixels to trigger slide change

    useEffect(() => {
        setAllSlides(buildAllSlides());
        currentIndexRef.current = slidesToShow; // Reset to first real slide
        setOffset(slidesToShow);
    }, [buildAllSlides]);

    const getAdjustedSpeed = () => {
        const baseSpeed = settings.speed || 3000;
        return baseSpeed / slidesToShow;
    };

    const handleNext = useCallback(() => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        currentIndexRef.current += slidesToScroll;
        setOffset(currentIndexRef.current);
    }, [isTransitioning, slidesToScroll]);

    const handleTransitionEnd = () => {
        if (!isTransitioning) return;

        setIsTransitioning(false);

        // Reset when we've used up the buffer (ensure we always have next slides ready)
        if (currentIndexRef.current >= slidesToShow + children.length) {
            requestAnimationFrame(() => {
                // Reset to the equivalent position in the original slides
                const positionInCycle = (currentIndexRef.current - slidesToShow) % children.length;
                currentIndexRef.current = slidesToShow + positionInCycle;
                setOffset(slidesToShow + positionInCycle);
            });
        }
    };

    // Measure height based on all slides
    useEffect(() => {
        const measureHeight = () => {
            const heights = slideRefs.current
                .filter(Boolean)
                .map(el => el!.getBoundingClientRect().height);

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
            const responsiveSettings = settings.responsive
                ?.sort((a, b) => a.breakpoint - b.breakpoint)
                .find((item) => width <= item.breakpoint);

            if (responsiveSettings) {
                setSlidesToShow(responsiveSettings.settings.slidesToShow);
                setSlidesToScroll(responsiveSettings.settings.slidesToScroll);
            } else {
                setSlidesToShow(settings.slidesToShow || 1);
                setSlidesToScroll(settings.slidesToScroll || 1);
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

        const interval = setInterval(() => {
            handleNext();
        }, settings.speed || 3000);

        return () => clearInterval(interval);
    }, [settings.autoplay, settings.speed, isPaused, handleNext]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart(e.clientX);
        setDragOffset(0);
        if (settings.pauseOnHover) setIsPaused(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;

        const currentDragOffset = e.clientX - dragStart;
        setDragOffset(currentDragOffset);
    };

    const handleMouseUp = () => {
        if (!isDragging) return;

        setIsDragging(false);

        // Determine if we should slide based on drag distance
        if (Math.abs(dragOffset) > dragThreshold) {
            if (dragOffset < 0) {
                // Dragged left = next
                handleNext();
            }
            // You can add handlePrevious here if needed
        }

        setDragOffset(0);
        if (settings.pauseOnHover) setIsPaused(false);
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            handleMouseUp();
        }
        if (settings.pauseOnHover) setIsPaused(false);
    };


    return (
        <div
            className="relative overflow-hidden cursor-grab active:cursor-grabbing"
            style={{ height: sliderHeight }}
            onMouseEnter={() => settings.pauseOnHover && setIsPaused(true)}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div
                ref={sliderRef}
                className="h-full flex"
                style={{
                    transform: `translateX(calc(-${(offset * 100) / slidesToShow}% + ${dragOffset}px))`,
                    transition: isTransitioning && !isDragging ? `transform ${getAdjustedSpeed()}ms ease-in-out` : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {allSlides.map((child, index) => (
                    <div
                        ref={el => slideRefs.current[index] = el}
                        key={`slide-${index}`}
                        className="flex-shrink-0 h-full"
                        style={{ width: `${100 / slidesToShow}%` }}
                    >
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
}
