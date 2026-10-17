'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Coins, Sliders, Users, Trophy, ArrowLeft } from 'lucide-react';

const LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/rooms', label: 'Gestión de Salas', icon: Coins },
  { href: '/admin/config', label: 'Reglas de Juego', icon: Sliders },
  { href: '/admin/users', label: 'Directorio Usuarios', icon: Users },
  { href: '/admin/sorteos', label: 'Historial & Pagos', icon: Trophy },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 glass-panel border-r border-white/10 p-6 flex flex-col justify-between min-h-[calc(100vh-5rem)]">
      <div className="space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-1">
            Módulo de Control
          </span>
          <h2 className="text-xl font-black text-white">Panel Admin</h2>
        </div>

        <nav className="space-y-1.5">
          {LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40 shadow-lg shadow-purple-600/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-300' : 'text-slate-500'}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-white/5">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a la Vista Jugador
        </Link>
      </div>
    </aside>
  );
}
