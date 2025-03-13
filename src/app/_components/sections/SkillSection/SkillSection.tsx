'use client';

import { CarouselCard } from '@/app/_components/CarouselCard/CarouselCard';
import { useTheme } from '@/app/context/ThemeContext';
import technologies, { Technology } from './technologies';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';
import styles from './SkillSection.module.scss';

export default function SkillSection() {
    const { theme } = useTheme();

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
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
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
        <div className={styles.wrapper}>
            <div className='w-screen'>
                <Slider {...settings}>
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
            </div>
        </div>
    );
}
