// Make something useful when/if tests for theme will be added.
import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@/app/context/ThemeContext';

const customRender = (
    ui: ReactElement,
    { ...renderOptions }: RenderOptions
) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>, renderOptions);
};

export * from '@testing-library/react';
export { customRender as render };
