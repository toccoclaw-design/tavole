export type BottleCategory = "base" | "premium" | "tequila" | "champagne" | "magnum";

export type PackageTier = "base" | "premium";

export type OccasionType =
  | "serata"
  | "compleanno"
  | "addio_celibato"
  | "addio_nubilato"
  | "anniversario"
  | "altro";

export type AmnesyaBottle = {
  id: string;
  name: string;
  category: BottleCategory;
  extraPrice: number;
  image: string;
};

export type AmnesyaPackage = {
  id: string;
  name: string;
  tier: PackageTier;
  paxIncluded: number;
  includedBottleCount: number;
  price: number;
  extraGuestPrice: number;
  maxExtraGuests: number;
  allowedIncludedCategories: BottleCategory[];
};

export type AmnesyaEvent = {
  slug: string;
  name: string;
  dateLabel: string;
  description: string;
  venueName: string;
  city: string;
};
