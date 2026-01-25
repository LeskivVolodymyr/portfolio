'use client';

import { useEffect, useRef, useState } from 'react';
import { CarouselCard } from '@/app/_components/CarouselCard/CarouselCard';
import { useTheme } from '@/app/context/ThemeContext';
import technologies, { Technology } from './technologies';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';

export default function SkillSection() {
    const { theme } = useTheme();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const el = containerRef.current;
        let ro: ResizeObserver | null = null;

        const updateWidth = () => setContainerWidth(Math.round(el.getBoundingClientRect().width));

        if (typeof ResizeObserver !== 'undefined') {
            ro = new ResizeObserver(() => updateWidth());
            ro.observe(el);
        } else {
            updateWidth();
            window.addEventListener('resize', updateWidth);
        }
        updateWidth();

        return () => {
            if (ro) ro.disconnect();
            else window.removeEventListener('resize', updateWidth);
        };
    }, []);

    const settings: Settings = {
        infinite: true,
        autoplay: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 3,
        pauseOnHover: true,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className='w-full' ref={containerRef}>
            <div className='flex flex-col mb-4 px-4'>
                <h2 className='flex justify-center text-6xl'>
                    Technologies I Work With
                </h2>
            </div>
            <Slider key={containerWidth} {...settings}>
                {technologies.map((t: Technology, index: number) => (
                    <CarouselCard
                        image={t.imageName}
                        description={t.description}
                        title={t.title}
                        highlighted={theme === 'dark' && t.isHighlighted}
                        key={index + t.title}
                    />
                ))}
            </Slider>
            <div className='flex flex-col pt-4 px-4'>
                <span className='flex justify-center'>
                    The list is not full, ask what you need and we will figure
                    out what tech are the best for your requirements.
                </span>
            </div>
        </div>
    );
}
