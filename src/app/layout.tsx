import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Gasosa Justa',
    description: 'Calcule o custo de gasolina por pessoa em viagens de forma divertida!',
    icons: {
        icon: '/icon.png',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-br">
            <body>{children}</body>
        </html>
    );
}
