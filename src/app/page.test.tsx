import '@testing-library/jest-dom';
import { render, screen } from './test-helpers/test-utils';
import Page from './page';
import { act } from '@testing-library/react';

describe('Page', () => {
    beforeAll(() => {
        mockMatchMedia();
    });

    it('renders the correct heading', async () => {
        await act(async () => render(<Page />, {}));
        const headingElement = screen.getByText(/HI, I AM VOLODYMYR LESKIV./i);
        expect(headingElement).toBeInTheDocument();
    });
});

const mockMatchMedia = () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: query === '(prefers-color-scheme: dark)',
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
};
