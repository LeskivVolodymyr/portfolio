import { useEffect, useState } from 'react';
import { getCssVariable } from '@/app/helpers/getCssVariable';
import { useTheme } from '@/app/context/ThemeContext';

export function useIconColors() {
    const defaultIconColor = '#333333';
    const defaultIconHoverColor = '#282a36';
    const defaultInitialIconColor = '#50fa7b';

    const { theme } = useTheme();
    const [iconColor, setIconColor] = useState(defaultIconColor);
    const [iconHoverColor, setIconHoverColor] = useState(defaultIconHoverColor);
    const [iconInteractiveColor, setIconInteractiveColor] = useState(
        defaultInitialIconColor
    );

    useEffect(() => {
        setIconColor(getCssVariable('--font-color'));
        setIconHoverColor(getCssVariable('--background-color'));
        setIconInteractiveColor(getCssVariable('--interactive-element-color'));
    }, [theme]);

    return { iconColor, iconHoverColor, iconInteractiveColor };
}
