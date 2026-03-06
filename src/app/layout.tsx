import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';
import './globals.css';

const spaceMono = Space_Mono({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-retro',
});

export const metadata: Metadata = {
    title: 'Gasosa Justa',
    description: 'Calcule o custo de gasolina por pessoa em viagens de forma divertida!',
    icons: {
        icon: '/icon.png',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-br" className={spaceMono.variable}>
            <body>{children}</body>
        </html>
    );
}
