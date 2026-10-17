'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, Shield, User, LogOut, Ticket, Menu, X, Coins } from 'lucide-react';

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="text-2xl select-none">🐷</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white font-mono">
                  Piggy<span className="text-gold-gradient">Bank</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-400 rounded-md border border-amber-500/30">
                  SV
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Sorteos & Premios en Efectivo</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Coins className="w-4 h-4 text-amber-400" />
              Salas Activas
            </Link>

            {user && (
              <Link
                href="/profile"
                className="text-sm font-semibold text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <Ticket className="w-4 h-4 text-emerald-400" />
                Mis Pases
              </Link>
            )}

            {isAdmin && (
              <Link
                href="/admin"
                className="px-3.5 py-1.5 text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-xl hover:bg-purple-500/30 transition-colors flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                Panel Admin
              </Link>
            )}
          </div>

          {/* User Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-400/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white font-bold text-xs">
                    {user.fullName.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white leading-none">{user.fullName.split(' ')[0]}</p>
                    <p className="text-[10px] text-emerald-400 font-mono mt-0.5">DUI: {user.dui}</p>
                  </div>
                </Link>

                <button
                  onClick={logout}
                  title="Cerrar Sesión"
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="text-sm font-bold text-slate-300 hover:text-white px-4 py-2 transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/auth/register"
                  className="px-5 py-2.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-200"
          >
            Salas de Sorteo
          </Link>
          {user && (
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-200"
            >
              Mi Perfil y Cuentas
            </Link>
          )}
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-purple-300"
            >
              Panel Administrativo
            </Link>
          )}
          <div className="pt-4 border-t border-white/10">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 text-rose-400 font-semibold"
              >
                Cerrar Sesión
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl border border-white/20 font-semibold text-slate-200"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-bold"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
