import type { Metadata } from 'next';
import './globals.scss';
import Header from '@/app/_components/Header/Header';
import ThemeSwitch from '@/app/_components/ThemeSwitch/ThemeSwitch';
import { ThemeProvider } from '@/app/context/ThemeContext';

export const metadata: Metadata = {
    title: 'Volodymyr Leskiv',
    description: "Volodymyr Leskiv's personal website",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body>
                <ThemeProvider>
                    <Header />
                    <ThemeSwitch />
                    <div className='flex w-full justify-center'>
                        <main className='px-4'>{children}</main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
