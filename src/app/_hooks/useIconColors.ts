import { useEffect, useState } from 'react';
import { getCssVariable } from '@/app/utils/getCssVariable';
import { useTheme } from '@/app/context/ThemeContext';

const defaultColors = {
    iconColor: '#333333',
    iconHoverColor: '#282a36',
    iconInteractiveColor: '#50fa7b',
};

export function useIconColors() {
    const { theme } = useTheme();
    const [colors, setColors] = useState(defaultColors);

    useEffect(() => {
        const newColors = {
            iconColor: getCssVariable('--font-color'),
            iconHoverColor: getCssVariable('--background-color'),
            iconInteractiveColor: getCssVariable('--interactive-element-color'),
        };
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setColors(newColors);
    }, [theme]);

    return colors;
}
