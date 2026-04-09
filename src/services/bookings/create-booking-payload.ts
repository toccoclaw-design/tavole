import { AMNESYA_BOTTLES } from "@/lib/venues/amnesya-data";
import { estimateBookingTotal } from "@/lib/pricing/estimate-booking-total";
import type { BookingFormInput } from "@/lib/validation/booking";
import type { AmnesyaPackage } from "@/types/amnesya";

export type BookingPayload = {
  venueSlug: string;
  eventSlug: string;
  packageId: string;
  status: "pending";
  occasionType?: string;
  extraGuestCount: number;
  guestCountTotal: number;
  estimatedTotal: number;
  customer: {
    name: string;
    surname: string;
    email: string;
    phone: string;
  };
  notes?: string;
  includedBottles: { bottleId: string; slotIndex: number }[];
  extraBottles: { bottleId: string; quantity: number; unitPrice: number }[];
};

export function createBookingPayload(
  form: BookingFormInput,
  selectedPackage: AmnesyaPackage,
): BookingPayload {
  const extraBottles = Object.entries(form.extraBottleQuantities)
    .filter(([, quantity]) => quantity > 0)
    .map(([bottleId, quantity]) => {
      const bottle = AMNESYA_BOTTLES.find((item) => item.id === bottleId);
      return {
        bottleId,
        quantity,
        unitPrice: bottle?.extraPrice ?? 0,
      };
    });

  const estimatedTotal = estimateBookingTotal({
    packagePrice: selectedPackage.price,
    extraGuestPrice: selectedPackage.extraGuestPrice,
    extraGuestCount: form.extraGuests,
    extraBottleTotals: extraBottles.map((item) => item.unitPrice * item.quantity),
  });

  return {
    venueSlug: "amnesya",
    eventSlug: "que-clase-saturday",
    packageId: selectedPackage.id,
    status: "pending",
    occasionType: form.occasion,
    extraGuestCount: form.extraGuests,
    guestCountTotal: selectedPackage.paxIncluded + form.extraGuests,
    estimatedTotal,
    customer: {
      name: form.name.trim(),
      surname: form.surname.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    },
    notes: form.notes?.trim(),
    includedBottles: form.includedBottleIds.map((bottleId, slotIndex) => ({ bottleId, slotIndex })),
    extraBottles,
  };
}
