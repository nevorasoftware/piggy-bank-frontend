'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="w-10 h-10 rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-center">
        <div className="glass-panel p-8 rounded-3xl max-w-md border border-rose-500/30">
          <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Acceso Restringido</h2>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Esta sección está reservada exclusivamente para administradores autorizados de PiggyBank El Salvador.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-[#05070E]">
      <AdminSidebar />
      <div className="flex-1 p-6 lg:p-10 overflow-y-auto max-w-7xl">
        {children}
      </div>
    </div>
  );
}
