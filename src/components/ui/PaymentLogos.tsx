'use client';

import React from 'react';

interface PaymentLogosProps {
  showLabel?: boolean;
  className?: string;
}

export function VisaLogo({ className = 'h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="50" height="32" rx="4" fill="#FFFFFF" />
      <g transform="translate(4, 8)">
        <path d="M16.5 13.5H14L15.6 3.5H18.1L16.5 13.5Z" fill="#1434CB" />
        <path d="M24 3.7C23.4 3.5 22.5 3.3 21.4 3.3C18.6 3.3 16.6 4.8 16.6 6.9C16.6 8.5 18 9.3 19.1 9.8C20.2 10.3 20.6 10.7 20.6 11.2C20.6 12 19.7 12.4 18.7 12.4C17.6 12.4 16.9 12.2 16.1 11.8L15.7 11.6L15.3 14.1C16.1 14.5 17.5 14.8 18.9 14.8C21.9 14.8 23.9 13.3 23.9 11C23.9 9.7 23.1 8.7 21.4 7.9C20.4 7.4 19.8 7 19.8 6.4C19.8 5.8 20.5 5.3 21.6 5.3C22.5 5.3 23.2 5.5 23.8 5.7L24 3.7Z" fill="#1434CB" />
        <path d="M28.4 10.8L29.5 5.6C29.7 4.6 29.5 4.4 28.8 4.1C28.2 3.8 26.8 3.5 25.5 3.5L25.1 4.2L27.3 14H30.1L32.6 3.5H29.8L28.4 10.8Z" fill="#1434CB" />
        <path d="M12.4 3.5H9.6L5.8 12.5L5.5 11C4.9 9.2 3.3 7.2 1.5 6.3L3.8 14H6.7L12.4 3.5Z" fill="#1434CB" />
        <path d="M3.5 3.5H0.2L0.1 3.8C3.2 4.6 6 6.7 7.2 11L6 4.9C5.8 3.9 5 3.5 4.2 3.5H3.5Z" fill="#F7B600" />
      </g>
    </svg>
  );
}

export function MastercardLogo({ className = 'h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="50" height="32" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="1" />
      <circle cx="20" cy="16" r="8.5" fill="#EB001B" />
      <circle cx="30" cy="16" r="8.5" fill="#F79E1B" />
      <path d="M25 10.1C26.7 11.6 27.8 13.7 27.8 16C27.8 18.3 26.7 20.4 25 21.9C23.3 20.4 22.2 18.3 22.2 16C22.2 13.7 23.3 11.6 25 10.1Z" fill="#FF5F00" />
    </svg>
  );
}

export function ThreeDSecureLogo({ className = 'h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 62 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="62" height="32" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="1" />
      <g transform="translate(6, 6)">
        {/* Escudo de seguridad */}
        <path d="M2 3L8 1L14 3V8C14 13 8 16.5 8 16.5C8 16.5 2 13 2 8V3Z" fill="#0284C7" />
        <path d="M5.5 8.5L7.2 10.2L10.5 6.8" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <text x="32" y="9" fontSize="7.5" fontWeight="900" fontFamily="system-ui, sans-serif" fill="#38BDF8" textAnchor="middle">
          3D
        </text>
        <text x="32" y="16.5" fontSize="6" fontWeight="800" fontFamily="system-ui, sans-serif" fill="#E2E8F0" textAnchor="middle">
          SECURE
        </text>
      </g>
    </svg>
  );
}

export function PciDssLogo({ className = 'h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 68 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="68" height="32" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="1" />
      <g transform="translate(6, 6)">
        {/* Candado de seguridad */}
        <rect x="1" y="7" width="10" height="9" rx="1.5" fill="#10B981" />
        <path d="M3 7V4.5C3 3 4.3 1.8 6 1.8C7.7 1.8 9 3 9 4.5V7" stroke="#10B981" strokeWidth="1.5" fill="none" />
        <circle cx="6" cy="11.5" r="1.2" fill="#0F172A" />
        <text x="35" y="8.5" fontSize="6.5" fontWeight="900" fontFamily="system-ui, sans-serif" fill="#F8FAFC" textAnchor="middle">
          PCI DSS
        </text>
        <text x="35" y="16" fontSize="5" fontWeight="800" fontFamily="system-ui, sans-serif" fill="#10B981" textAnchor="middle">
          COMPLIANT
        </text>
      </g>
    </svg>
  );
}

export default function PaymentLogos({ showLabel = true, className = '' }: PaymentLogosProps) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {showLabel && (
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <span>💳</span> Pagos 100% Seguros con Tarjeta de Crédito o Débito
        </span>
      )}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <div title="Aceptamos tarjetas Visa Débito y Crédito" className="hover:scale-105 transition-transform">
          <VisaLogo className="h-7 w-auto drop-shadow-sm" />
        </div>
        <div title="Aceptamos tarjetas Mastercard Débito y Crédito" className="hover:scale-105 transition-transform">
          <MastercardLogo className="h-7 w-auto drop-shadow-sm" />
        </div>
        <div title="Protección con autenticación bancaria 3D Secure" className="hover:scale-105 transition-transform">
          <ThreeDSecureLogo className="h-7 w-auto drop-shadow-sm" />
        </div>
        <div title="Certificación de seguridad internacional PCI DSS" className="hover:scale-105 transition-transform">
          <PciDssLogo className="h-7 w-auto drop-shadow-sm" />
        </div>
      </div>
    </div>
  );
}
