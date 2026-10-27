/**
 * Utilidades de validación y formato para números de teléfono de El Salvador (+503 ####-####)
 * Formateo puramente visual en Frontend, con normalización limpia para Backend (+503########).
 */

export function formatPhone(value: string): string {
  if (!value) return '';

  // Extraer sólo los dígitos
  let digits = value.replace(/\D/g, '');

  // Si el usuario borró los números locales y sólo queda el 503 con espacio
  if (digits === '503' && value.trim().length <= 5) {
    return '';
  }

  // Si empieza con 503, remover el prefijo para formatear los 8 dígitos locales
  if (digits.startsWith('503')) {
    digits = digits.slice(3);
  }

  // Limitar a los 8 dígitos estándar de El Salvador
  digits = digits.slice(0, 8);

  if (digits.length === 0) {
    return '';
  }

  if (digits.length <= 4) {
    return `+503 ${digits}`;
  }

  return `+503 ${digits.slice(0, 4)}-${digits.slice(4)}`;
}

export function validatePhone(phone: string): { isValid: boolean; message?: string } {
  if (!phone || !phone.trim()) {
    return { isValid: false, message: 'El número de teléfono es obligatorio' };
  }

  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('503')) {
    digits = digits.slice(3);
  }

  if (digits.length < 8) {
    return {
      isValid: false,
      message: `Faltan dígitos: ${digits.length}/8 requeridos (Ej: +503 7123-4567)`,
    };
  }

  if (digits.length > 8) {
    return {
      isValid: false,
      message: 'El número telefónico debe tener exactamente 8 dígitos',
    };
  }

  const firstDigit = digits[0];
  if (!['2', '6', '7'].includes(firstDigit)) {
    return {
      isValid: false,
      message: 'Un número salvadoreño generalmente inicia con 2, 6 o 7',
    };
  }

  return { isValid: true };
}

/**
 * Convierte el número visual (+503 ####-####) a formato estándar para backend (+503########)
 */
export function toBackendPhone(phone: string): string {
  if (!phone) return '';
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('503')) {
    digits = digits.slice(3);
  }
  return `+503${digits.slice(0, 8)}`;
}

/**
 * Formatea un número guardado en backend (+50371234567) para visualización en frontend (+503 7123-4567)
 */
export function formatPhoneDisplay(phone?: string | null): string {
  if (!phone) return 'N/D';
  return formatPhone(phone);
}
