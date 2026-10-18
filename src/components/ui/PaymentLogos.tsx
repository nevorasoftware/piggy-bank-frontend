'use client';

import React from 'react';

interface PaymentLogosProps {
  showLabel?: boolean;
  className?: string;
}

export default function PaymentLogos({ showLabel = false, className = '' }: PaymentLogosProps) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {/* Visa - Logo Oficial */}
        <div
          title="Visa Débito y Crédito"
          className="h-9 px-3 bg-white rounded-xl flex items-center justify-center shadow-md shadow-white/5 border border-white/20 hover:scale-105 transition-transform"
        >
          <img
            src="/payment-logos/visa.png"
            alt="Visa Oficial"
            className="h-5 w-auto object-contain"
          />
        </div>

        {/* Mastercard - Logo Oficial */}
        <div
          title="Mastercard Débito y Crédito"
          className="h-9 px-3 bg-white rounded-xl flex items-center justify-center shadow-md shadow-white/5 border border-white/20 hover:scale-105 transition-transform"
        >
          <img
            src="/payment-logos/mastercard.svg"
            alt="Mastercard Oficial"
            className="h-6 w-auto object-contain"
          />
        </div>

        {/* 3D Secure - Logo Oficial */}
        <div
          title="Autenticación Bancaria 3D Secure"
          className="h-9 px-2.5 bg-white rounded-xl flex items-center justify-center shadow-md shadow-white/5 border border-white/20 hover:scale-105 transition-transform"
        >
          <img
            src="/payment-logos/3d-secure.png"
            alt="3D Secure"
            className="h-6 w-auto object-contain"
          />
        </div>

        {/* PCI DSS - Logo Oficial */}
        <div
          title="PCI Security Standards Council - PCI DSS Compliant"
          className="h-9 px-2.5 bg-white rounded-xl flex items-center justify-center shadow-md shadow-white/5 border border-white/20 hover:scale-105 transition-transform"
        >
          <img
            src="/payment-logos/pci-dss.svg"
            alt="PCI Security Standards Council"
            className="h-6 w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
