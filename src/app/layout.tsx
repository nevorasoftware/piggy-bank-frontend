import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { SocketProvider } from '@/context/SocketContext';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import PiggyCursorTrail from '@/components/ui/PiggyCursorTrail';
import FloatingCoins from '@/components/ui/FloatingCoins';

export const metadata: Metadata = {
  title: 'PiggyBank El Salvador | Sorteos y Premios en Efectivo',
  description: 'Participa en salas de sorteo comunitarias y gana premios directos a tu cuenta bancaria. Pagos seguros con Wompi El Salvador y verificación de DUI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen flex flex-col bg-[#070A12] text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950 relative overflow-x-hidden">
        <AuthProvider>
          <SocketProvider>
            {/* Animaciones globales: Monedas flotantes y cursor interactivo */}
            <FloatingCoins />
            <PiggyCursorTrail />

            <Navbar />
            <main className="flex-1 flex flex-col relative z-10">
              {children}
            </main>
            <Footer />
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
