import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import type { PersistedBooking, PersistedBookingStatusHistory } from "@/types/booking";
import type { BookingPayload } from "@/services/bookings/create-booking-payload";

const DATA_DIR = path.join(process.cwd(), "tmp-data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");
const HISTORY_FILE = path.join(DATA_DIR, "booking-status-history.json");

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  for (const file of [BOOKINGS_FILE, HISTORY_FILE]) {
    try {
      await fs.access(file);
    } catch {
      await fs.writeFile(file, "[]", "utf8");
    }
  }
}

async function readJsonFile<T>(filePath: string): Promise<T[]> {
  await ensureStore();
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T[];
}

async function writeJsonFile<T>(filePath: string, data: T[]) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

export async function saveBooking(payload: BookingPayload): Promise<PersistedBooking> {
  const bookings = await readJsonFile<PersistedBooking>(BOOKINGS_FILE);
  const history = await readJsonFile<PersistedBookingStatusHistory>(HISTORY_FILE);

  const persisted: PersistedBooking = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  bookings.unshift(persisted);
  history.unshift({
    bookingId: persisted.id,
    fromStatus: null,
    toStatus: "pending",
    note: "Booking creato da flow pubblico Amnesya",
    createdAt: persisted.createdAt,
  });

  await writeJsonFile(BOOKINGS_FILE, bookings);
  await writeJsonFile(HISTORY_FILE, history);

  return persisted;
}

export async function listBookings(): Promise<PersistedBooking[]> {
  return readJsonFile<PersistedBooking>(BOOKINGS_FILE);
}

export async function listBookingStatusHistory(): Promise<PersistedBookingStatusHistory[]> {
  return readJsonFile<PersistedBookingStatusHistory>(HISTORY_FILE);
}
