import { Inter } from 'next/font/google';
import './globals.css';
import ComparisonBar from '@/components/ComparisonBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Viaggio Velogge',
  description: 'Portafolio de autos clásicos y modificados',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <ComparisonBar />
      </body>
    </html>
  );
}