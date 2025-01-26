// TODO: bad idea. Remove when header will be fixed with tailwind media query classes

import { useState, useEffect } from 'react';

export function useWindowWidth() {
    const [width, setWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return width;
}
