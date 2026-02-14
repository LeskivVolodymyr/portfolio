'use client';

import { CarouselCard } from '@/app/_components/CarouselCard/CarouselCard';
import { useTheme } from '@/app/context/ThemeContext';
import technologies, { Technology } from './technologies';
import Slider, { SliderSettings } from '@/app/_components/Slider/Slider';

export default function SkillSection() {
    const { theme } = useTheme();

    const settings: SliderSettings = {
        infinite: true,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 3,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    speed: 1000
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 750,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                },
            },
        ],
    };

    return (
        <div className='w-full'>
            <div className='flex flex-col mb-4 px-4'>
                <h2 className='flex justify-center text-6xl'>
                    Technologies I Work With
                </h2>
            </div>
            <Slider settings={settings}>
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
