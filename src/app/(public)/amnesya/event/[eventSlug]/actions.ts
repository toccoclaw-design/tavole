"use server";

import { createBookingPayload } from "@/services/bookings/create-booking-payload";
import { validateBookingForm, type BookingFormInput } from "@/lib/validation/booking";
import { AMNESYA_PACKAGES } from "@/lib/venues/amnesya-data";

export type BookingActionState = {
  ok: boolean;
  message: string;
  errors?: string[];
  payload?: unknown;
};

export async function submitAmnesyaBooking(
  input: BookingFormInput & { packageId: string },
): Promise<BookingActionState> {
  const selectedPackage = AMNESYA_PACKAGES.find((pkg) => pkg.id === input.packageId);

  if (!selectedPackage) {
    return {
      ok: false,
      message: "Pacchetto non valido.",
      errors: ["Pacchetto non valido."],
    };
  }

  const validation = validateBookingForm(input, selectedPackage);

  if (!validation.valid) {
    return {
      ok: false,
      message: "Compilazione incompleta o incoerente.",
      errors: validation.errors,
    };
  }

  const payload = createBookingPayload(input, selectedPackage);

  return {
    ok: true,
    message: "Payload booking pronto. Prossimo step: salvataggio su database.",
    payload,
  };
}
