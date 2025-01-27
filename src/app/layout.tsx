import type { Metadata } from 'next';
import './globals.scss';
import { ThemeProvider } from '@/app/context/ThemeContext';
import { ReactNode } from 'react';
import Header from '@/app/_components/Header/Header';

export const metadata: Metadata = {
    title: 'Volodymyr Leskiv',
    description: "Volodymyr Leskiv's personal website",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang='en'>
            <body>
                <ThemeProvider>
                    <Header />
                    <div className='flex w-full justify-center'>
                        <main className='px-4'>{children}</main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
