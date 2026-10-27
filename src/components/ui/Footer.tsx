import { ShieldCheck, HeartHandshake, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/95 text-slate-400 py-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Columna 1: Marca e info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🐷</span>
              <span className="text-xl font-black text-white">
                Piggy<span className="text-amber-400">Bank</span> <span className="text-xs px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">SV</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Plataforma digital de salas de sorteos comunitarios y premios instantáneos en efectivo en la República de El Salvador. Transparencia algorítmica verificable y pagos directos.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-black bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-lg">
                🔞 +18 AÑOS
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg">
                🔒 SSL 256-Bit
              </span>
            </div>
          </div>

          {/* Columna 2: Seguridad y Pagos */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Seguridad y Pagos
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>• Pasarela oficial <strong>Wompi El Salvador</strong> (Banco Agrícola).</li>
              <li>• Tarjetas Visa y Mastercard de crédito y débito.</li>
              <li>• Protocolos bancarios 3D Secure y certificación PCI-DSS.</li>
              <li>• Verificación de identidad con DUI salvadoreño.</li>
            </ul>
          </div>

          {/* Columna 3: Legal y Términos */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="text-amber-400 text-sm">⚖️</span>
              Legal y Transparencia
            </h4>
            <ul className="text-xs space-y-2.5 text-slate-400">
              <li>
                <a
                  href="/terms"
                  className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 flex items-center gap-1 transition-colors"
                >
                  📜 Términos y Condiciones
                </a>
              </li>
              <li>
                <a
                  href="/terms#politica-privacidad"
                  className="hover:text-slate-200 transition-colors"
                >
                  🛡️ Política de Privacidad y Datos
                </a>
              </li>
              <li>
                <a
                  href="/terms#reglamento-sorteos"
                  className="hover:text-slate-200 transition-colors"
                >
                  🎲 Reglamento Oficial de Sorteos
                </a>
              </li>
              <li>
                <span className="text-[11px] text-slate-500">Jurisdicción: Leyes de la República de El Salvador</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Juego Responsable y Soporte */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-amber-400" />
              Juego Responsable
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Juega con moderación. El servicio cuenta con un límite de seguridad diario de 6 participaciones y 3 premios por usuario.
            </p>
            <div className="pt-1">
              <a
                href="mailto:piggybanksv@gmail.com"
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                piggybanksv@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Fila Inferior con Derechos y Link Directo */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PiggyBank El Salvador. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/terms"
              className="text-slate-400 hover:text-amber-400 transition-colors font-medium"
            >
              Términos y Condiciones
            </a>
            <span>•</span>
            <span className="text-slate-400">Zona Horaria: America/El_Salvador</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Phone className="w-3.5 h-3.5 text-emerald-400" /> Soporte Oficial
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
