import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gasosa Justa',
  description: 'Calcule o custo de gasolina por pessoa em viagens',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body style={{ margin: 0, padding: 0, backgroundColor: 'orange', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
