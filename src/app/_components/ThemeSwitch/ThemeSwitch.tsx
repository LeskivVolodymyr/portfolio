'use client';

import { useTheme } from '@/app/context/ThemeContext';

export interface IThemeSwitchProps {
    onThemeChange?: () => void;
}

export default function ThemeSwitch({ onThemeChange }: IThemeSwitchProps) {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        if (theme === 'light') {
            document.documentElement.classList.remove('light');
            setTheme('dark');
        } else {
            document.documentElement.classList.add('light');
            setTheme('light');
        }
        if (onThemeChange) onThemeChange();
    };

    return (
        <button onClick={toggleTheme}>
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
    );
}
