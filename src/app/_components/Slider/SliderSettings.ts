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
