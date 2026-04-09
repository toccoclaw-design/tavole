import type { AmnesyaBottle, AmnesyaEvent, AmnesyaPackage } from "@/types/amnesya";

export const AMNESYA_EVENT: AmnesyaEvent = {
  slug: "que-clase-saturday",
  name: "Que Clase Saturday",
  dateLabel: "Sabato 12 Aprile 2026",
  description:
    "Una prima demo reale del flusso Tavolè per Amnesya, costruita su prenotazione pacchetti evento con bottiglie incluse ed extra.",
  venueName: "Amnesya Essence Club",
  city: "Cagliari",
};

export const AMNESYA_PACKAGES: AmnesyaPackage[] = [
  {
    id: "6b",
    name: "6 Base",
    tier: "base",
    paxIncluded: 6,
    includedBottleCount: 1,
    price: 150,
    extraGuestPrice: 25,
    maxExtraGuests: 5,
    allowedIncludedCategories: ["base"],
  },
  {
    id: "6p",
    name: "6 Premium",
    tier: "premium",
    paxIncluded: 6,
    includedBottleCount: 1,
    price: 180,
    extraGuestPrice: 25,
    maxExtraGuests: 5,
    allowedIncludedCategories: ["premium"],
  },
  {
    id: "8b",
    name: "8 Base",
    tier: "base",
    paxIncluded: 8,
    includedBottleCount: 2,
    price: 250,
    extraGuestPrice: 25,
    maxExtraGuests: 5,
    allowedIncludedCategories: ["base"],
  },
  {
    id: "8p",
    name: "8 Premium",
    tier: "premium",
    paxIncluded: 8,
    includedBottleCount: 2,
    price: 300,
    extraGuestPrice: 25,
    maxExtraGuests: 5,
    allowedIncludedCategories: ["base", "premium"],
  },
];

export const AMNESYA_BOTTLES: AmnesyaBottle[] = [
  { id: "absolut", name: "Absolut Vodka", category: "base", extraPrice: 125, image: "🍸" },
  { id: "bombay", name: "Bombay Gin", category: "base", extraPrice: 125, image: "🍸" },
  { id: "disaronno", name: "Disaronno", category: "base", extraPrice: 125, image: "🥃" },
  { id: "jager", name: "Jägermeister", category: "base", extraPrice: 125, image: "🥃" },
  { id: "belvedere", name: "Belvedere", category: "premium", extraPrice: 150, image: "🍾" },
  { id: "grey-goose", name: "Grey Goose", category: "premium", extraPrice: 150, image: "🍾" },
  { id: "gin-mare", name: "Gin Mare", category: "premium", extraPrice: 150, image: "🍾" },
  { id: "malfy", name: "Malfy Gin", category: "premium", extraPrice: 150, image: "🍾" },
  { id: "tequila-azul", name: "Tequila Azul", category: "tequila", extraPrice: 550, image: "🥂" },
  { id: "azul-plata", name: "Azul Plata", category: "tequila", extraPrice: 450, image: "🥂" },
  { id: "don-julio-1974", name: "Don Julio 1974", category: "tequila", extraPrice: 550, image: "🥂" },
  { id: "casamigos", name: "Casamigos Blanco", category: "tequila", extraPrice: 130, image: "🥂" },
  { id: "grey-goose-3l", name: "Grey Goose 3L", category: "magnum", extraPrice: 500, image: "🍾" },
  { id: "moet-imperial", name: "Moët Imperial", category: "champagne", extraPrice: 150, image: "🍾" },
  { id: "moet-nir", name: "Moët N.I.R.", category: "champagne", extraPrice: 200, image: "🍾" },
  { id: "dom-perignon", name: "Dom Pérignon", category: "champagne", extraPrice: 500, image: "🍾" },
];
