'use client';

import { useTheme } from '@/app/context/ThemeContext';

// TODO: replace with normal code... maybe storage and/or sys preferences
export default function ThemeSwitch() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        if (theme === 'light') {
            document.documentElement.classList.remove('light');
            setTheme('dark');
        } else {
            document.documentElement.classList.add('light');
            setTheme('light');
        }
    };

    return (
        <button onClick={toggleTheme}>
            {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </button>
    );
}
