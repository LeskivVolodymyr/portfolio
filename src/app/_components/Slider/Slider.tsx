'use client';

import { useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { getFromEnd, getFromStart } from '@/app/_components/Slider/slider-helpers';

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
    const [slidesToShowCount, setSlidesToShowCount] = useState(settings.slidesToShow || 1);
    const [slidesToScrollCount, setSlidesToScrollCount] = useState(settings.slidesToScroll || 1);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [offset, setOffset] = useState(0);
    const [sliderHeight, setSliderHeight] = useState<number | undefined>(undefined); // ?????

    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Build array with all unique children plus buffer for infinite scroll
    const buildAllSlides = useCallback(() => {
        const allSlides: ReactNode[] = [];
        const preloadCount = 1;
        const bufferSize = Math.max(slidesToScrollCount,  slidesToShowCount) + preloadCount;


        allSlides.push(...getFromEnd(bufferSize, children));

        // Add all original children
        allSlides.push(...children);

        allSlides.push(...getFromStart(bufferSize, children))

        console.log(allSlides);

        return allSlides;
    }, [children, slidesToShowCount, slidesToScrollCount]);

    const [allSlides, setAllSlides] = useState<ReactNode[]>(() => buildAllSlides());

    const currentIndexRef = useRef(slidesToShowCount); // Start after front buffer

    useEffect(() => {
        setAllSlides(buildAllSlides());
        currentIndexRef.current = slidesToShowCount; // Reset to first real slide
        setOffset(slidesToShowCount);
    }, [buildAllSlides]);

    const getAdjustedSpeed = () => {
        const baseSpeed = settings.speed || 3000;
        return baseSpeed / slidesToShowCount;
    };

    const handleNext = useCallback(() => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        currentIndexRef.current += slidesToScrollCount;
        setOffset(currentIndexRef.current);
    }, [isTransitioning, slidesToScrollCount]);

    const handleTransitionEnd = () => {
        if (!isTransitioning) return;

        setIsTransitioning(false);

        // Reset when we've used up the buffer (ensure we always have next slides ready)
        if (currentIndexRef.current >= slidesToShowCount + children.length) {
            requestAnimationFrame(() => {
                // Reset to the equivalent position in the original slides
                const positionInCycle = (currentIndexRef.current - slidesToShowCount) % children.length;
                currentIndexRef.current = slidesToShowCount + positionInCycle;
                setOffset(slidesToShowCount + positionInCycle);
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
                setSlidesToShowCount(responsiveSettings.settings.slidesToShow);
                setSlidesToScrollCount(responsiveSettings.settings.slidesToScroll);
            } else {
                setSlidesToShowCount(settings.slidesToShow || 1);
                setSlidesToScrollCount(settings.slidesToScroll || 1);
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

    return (
        <div
            className="relative overflow-hidden cursor-grab active:cursor-grabbing"
            style={{ height: sliderHeight }}
            onMouseEnter={() => settings.pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => settings.pauseOnHover && setIsPaused(false)}
        >
            <div
                ref={sliderRef}
                className="h-full flex"
                style={{
                    transform: `translateX(calc(-${(offset * 100) / slidesToShowCount}%))`,
                    transition: isTransitioning ? `transform ${getAdjustedSpeed()}ms ease-in-out` : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {allSlides.map((child, index) => (
                    <div
                        ref={el => { slideRefs.current[index] = el; }}
                        key={`slide-${index}`}
                        className="flex-shrink-0 h-full"
                        style={{ width: `${100 / slidesToShowCount}%` }}
                    >
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
}
