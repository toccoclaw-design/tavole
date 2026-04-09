export type PersistedBooking = {
  id: string;
  venueSlug: string;
  eventSlug: string;
  packageId: string;
  status: "pending" | "confirmed" | "rejected" | "cancelled";
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
  createdAt: string;
};

export type PersistedBookingStatusHistory = {
  bookingId: string;
  fromStatus: string | null;
  toStatus: string;
  note?: string;
  createdAt: string;
};
