/**
 * Validación y formato de DUI salvadoreño para el Frontend
 */

export function formatDUI(value: string): string {
  // Limpiar caracteres no numéricos
  const cleaned = value.replace(/\D/g, '').slice(0, 9);
  
  if (cleaned.length > 8) {
    return `${cleaned.slice(0, 8)}-${cleaned.slice(8)}`;
  }
  return cleaned;
}

export function validateDUI(dui: string): { isValid: boolean; message?: string } {
  if (!dui) {
    return { isValid: false, message: 'El DUI es obligatorio' };
  }

  const cleanDui = dui.trim();
  const duiRegex = /^\d{8}-\d{1}$/;

  if (!duiRegex.test(cleanDui)) {
    return {
      isValid: false,
      message: 'Debe contener 8 dígitos seguidos de guion y 1 dígito (Ej: 01234567-8)',
    };
  }

  const [digitsPart, verifierPart] = cleanDui.split('-');
  const digits = digitsPart.split('').map(Number);
  const checkDigit = parseInt(verifierPart, 10);

  // Algoritmo de ponderación: 9, 8, 7, 6, 5, 4, 3, 2
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += digits[i] * (9 - i);
  }

  const mod = sum % 10;
  const computedCheckDigit = (10 - mod) % 10;

  if (computedCheckDigit !== checkDigit) {
    return {
      isValid: false,
      message: 'Dígito verificador incorrecto. Revisa tu número de DUI.',
    };
  }

  return { isValid: true };
}
