type EstimateBookingTotalInput = {
  packagePrice: number;
  extraGuestPrice: number;
  extraGuestCount: number;
  extraBottleTotals?: number[];
};

export function estimateBookingTotal({
  packagePrice,
  extraGuestPrice,
  extraGuestCount,
  extraBottleTotals = [],
}: EstimateBookingTotalInput) {
  const guestsTotal = extraGuestPrice * extraGuestCount;
  const bottlesTotal = extraBottleTotals.reduce((sum, value) => sum + value, 0);

  return packagePrice + guestsTotal + bottlesTotal;
}
