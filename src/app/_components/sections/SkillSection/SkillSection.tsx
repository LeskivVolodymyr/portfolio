// 'use client';

import Carousel from 'react-multi-carousel';
import { ResponsiveType } from 'react-multi-carousel/lib/types';
import 'react-multi-carousel/lib/styles.css';
import { CarouselCard } from '@/app/_components/CarouselCard/CarouselCard';
import { useTheme } from '@/app/context/ThemeContext';
import technologies, { Technology } from './technologies';

export default function SkillSection() {
    const { theme } = useTheme();
    const responsive: ResponsiveType = {
        desktop: {
            breakpoint: { max: 1920, min: 1024 },
            items: 4,
            slidesToSlide: 2,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 2,
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 2,
            slidesToSlide: 1,
        },
    };

    return (
        <div className='overflow-visible absolute left-0 w-full'>
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                deviceType={'desktop'}
                pauseOnHover={true}
                ssr={true}
            >
                {technologies.map((t: Technology, index: number) => {
                    return (
                        <CarouselCard
                            image={t.iconUrl}
                            description={t.description}
                            title={t.title}
                            highlighted={theme === 'dark' && t.highlighted}
                            key={index + t.title}
                        />
                    );
                })}
            </Carousel>
        </div>
    );
}
