import type { AmnesyaPackage } from "@/types/amnesya";

export type BookingFormInput = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  occasion?: string;
  notes?: string;
  extraGuests: number;
  includedBottleIds: string[];
  extraBottleQuantities: Record<string, number>;
};

export type BookingValidationResult = {
  valid: boolean;
  errors: string[];
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateBookingForm(
  input: BookingFormInput,
  selectedPackage: AmnesyaPackage,
): BookingValidationResult {
  const errors: string[] = [];

  if (!input.name.trim()) errors.push("Il nome è obbligatorio.");
  if (!input.surname.trim()) errors.push("Il cognome è obbligatorio.");
  if (!input.email.trim() || !EMAIL_REGEX.test(input.email)) {
    errors.push("Inserisci un'email valida.");
  }
  if (!input.phone.trim()) errors.push("Il telefono è obbligatorio.");
  if (input.extraGuests < 0) errors.push("Gli ospiti extra non possono essere negativi.");
  if (input.extraGuests > selectedPackage.maxExtraGuests) {
    errors.push("Hai superato il massimo di ospiti extra consentiti.");
  }
  if (input.includedBottleIds.length !== selectedPackage.includedBottleCount) {
    errors.push("Devi selezionare tutte le bottiglie incluse richieste dal pacchetto.");
  }

  const totalExtraBottleCount = Object.values(input.extraBottleQuantities).reduce(
    (sum, value) => sum + Math.max(0, value),
    0,
  );

  if (totalExtraBottleCount > 5) {
    errors.push("Hai superato il massimo di 5 bottiglie extra.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
