import type { Config } from 'tailwindcss';

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'font-color': 'var(--font-color)',
                'interactive-element-color': 'var(--interactive-element-color)',
                'background-color': 'var(--background-color)',
                'form-error-color': 'var(--form-error-color)',
                'form-background-color': 'var(--form-background-color)',
                'navbar-background-color': 'var(--navbar-background-color)',
                'card-background-color': 'var(--card-background-color)',
            },
        },
    },
    plugins: [],
} satisfies Config;
