import { saveBooking } from "@/lib/db/mock-bookings-store";
import type { BookingPayload } from "@/services/bookings/create-booking-payload";

export async function persistBooking(payload: BookingPayload) {
  return saveBooking(payload);
}
