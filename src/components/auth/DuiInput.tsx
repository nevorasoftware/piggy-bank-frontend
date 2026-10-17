'use client';

import React, { useState, useEffect } from 'react';
import { formatDUI, validateDUI } from '@/lib/dui';
import { CheckCircle2, AlertCircle, Fingerprint } from 'lucide-react';

interface DuiInputProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  required?: boolean;
}

export default function DuiInput({ value, onChange, required = true }: DuiInputProps) {
  const [touched, setTouched] = useState(false);
  const [validation, setValidation] = useState<{ isValid: boolean; message?: string }>({
    isValid: false,
  });

  useEffect(() => {
    if (value) {
      const res = validateDUI(value);
      setValidation(res);
      onChange(value, res.isValid);
    } else {
      setValidation({ isValid: false });
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const formatted = formatDUI(rawVal);
    const res = validateDUI(formatted);
    setValidation(res);
    onChange(formatted, res.isValid);
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Fingerprint className="w-3.5 h-3.5 text-amber-400" />
          DUI (El Salvador)
        </span>
        <span className="text-[10px] text-slate-500 font-normal">Formato: 00000000-0</span>
      </label>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          placeholder="01234567-8"
          maxLength={10}
          required={required}
          className={`w-full px-4 py-3 bg-slate-900/80 border rounded-xl font-mono text-base tracking-wider text-white placeholder-slate-600 focus:outline-none transition-all ${
            touched && value.length === 10
              ? validation.isValid
                ? 'border-emerald-500/60 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'
                : 'border-rose-500/60 focus:border-rose-400 focus:ring-1 focus:ring-rose-400'
              : 'border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
          }`}
        />

        {value.length === 10 && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center">
            {validation.isValid ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400" />
            )}
          </div>
        )}
      </div>

      {touched && value.length === 10 && !validation.isValid && (
        <p className="text-xs text-rose-400 flex items-center gap-1 mt-1 font-medium">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {validation.message}
        </p>
      )}

      {validation.isValid && (
        <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
          Dígito verificador de DUI válido
        </p>
      )}
    </div>
  );
}
