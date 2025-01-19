import {useEffect, useState} from 'react';
import {getCssVariable} from '@/app/helpers/getCssVariable';
import {useTheme} from '@/app/context/ThemeContext';

export function useIconColors() {
    const defaultIconColor = '#333333';
    const defaultIconHoverColor = '#282a36';

    const {theme} = useTheme();
    const [iconColor, setIconColor] = useState(defaultIconColor);
    const [iconHoverColor, setIconHoverColor] = useState(defaultIconHoverColor);

    useEffect(() => {
        setIconColor(getCssVariable('--font-color'));
        setIconHoverColor(getCssVariable('--background-color'));
    }, [theme]);

    return {iconColor, iconHoverColor};
}