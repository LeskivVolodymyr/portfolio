'use client';

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

type Theme = 'light' | 'dark';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as Theme;
        const systemPrefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;

        if (storedTheme) {
            setTheme(storedTheme);
            if (storedTheme === 'light')
                document.documentElement.classList.add('light');
        } else if (systemPrefersDark) {
            setTheme('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.add('light');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
