import Link from "next/link";
import { AMNESYA_EVENT } from "@/lib/venues/amnesya-data";

export default function AmnesyaLandingPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 rounded-[32px] border border-[var(--stroke)] bg-[rgba(17,17,26,0.92)] p-8 shadow-[0_24px_100px_rgba(0,0,0,0.42)] md:p-12">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">Venue pilot</p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Amnesya Essence Club</h1>
        <p className="max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
          Prima istanza reale di Tavolè. Da qui parte l&apos;esperienza cliente per prenotare un pacchetto evento.
        </p>

        <div className="rounded-[28px] border border-[var(--stroke)] bg-[rgba(255,255,255,0.03)] p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Evento attivo demo</p>
          <h2 className="mt-3 text-3xl font-semibold">{AMNESYA_EVENT.name}</h2>
          <p className="mt-2 text-sm uppercase tracking-[0.22em] text-[var(--gold-light)]">
            {AMNESYA_EVENT.dateLabel}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted)]">
            {AMNESYA_EVENT.description}
          </p>
          <Link
            href={`/amnesya/event/${AMNESYA_EVENT.slug}`}
            className="mt-6 inline-flex w-fit rounded-full border border-[var(--gold)] px-5 py-3 text-sm uppercase tracking-[0.24em] text-[var(--gold-light)] transition hover:bg-[rgba(201,168,76,0.08)]"
          >
            Apri wizard evento
          </Link>
        </div>
      </div>
    </main>
  );
}
