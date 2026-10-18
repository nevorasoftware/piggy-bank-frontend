import React from 'react';
import { ShieldCheck, HeartHandshake, Phone } from 'lucide-react';
import PaymentLogos from '@/components/ui/PaymentLogos';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🐷</span>
              <span className="text-xl font-black text-white">
                Piggy<span className="text-amber-400">Bank</span> El Salvador
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Plataforma digital de salas de sorteo comunitarias y premios instantáneos en efectivo.
              Transparencia total, selección criptográfica verificable y pagos directos a tu banco local.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Seguridad y Métodos de Pago
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>• Pagos con tarjeta de crédito o débito Visa y Mastercard 100% seguros.</li>
              <li>• Protección con autenticación bancaria 3D Secure y certificación PCI DSS.</li>
              <li>• Validación de identidad obligatoria con DUI salvadoreño.</li>
              <li>• Transferencias directas a cuentas bancarias nacionales.</li>
            </ul>
            <div className="pt-2">
              <PaymentLogos showLabel={false} className="items-start" />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-amber-400" />
              Juego Responsable
            </h4>
            <p className="text-xs leading-relaxed">
              Exclusivo para mayores de 18 años. La plataforma cuenta con límite de 6 participaciones y 3 victorias máximas por día para garantizar una experiencia sana y divertida.
            </p>
            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-md">
                +18 JUEGA CON MODERACIÓN
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PiggyBank El Salvador. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span>Zona Horaria: America/El_Salvador</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Phone className="w-3.5 h-3.5 text-emerald-400" /> Soporte WhatsApp 24/7
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
