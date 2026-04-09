export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="inline-flex w-fit rounded-full border border-[var(--stroke)] bg-[rgba(201,168,76,0.08)] px-4 py-2 text-xs uppercase tracking-[0.28em] text-[var(--gold-light)]">
          Tavolè
        </div>

        <section className="rounded-[28px] border border-[var(--stroke)] bg-[rgba(17,17,26,0.88)] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.38)] md:p-12">
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[var(--gold)]">
                Foundation in progress
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                Tavolè sta prendendo forma, senza fare il fenomeno.
              </h1>
            </div>

            <p className="max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
              Base applicativa avviata per il prodotto multi-locale, con Amnesya come
              primo caso pilota. Da qui si costruiscono booking pubblico, dashboard venue
              e super admin.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-[var(--stroke)] bg-[rgba(255,255,255,0.03)] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--gold)]">Public</p>
                <h2 className="mt-3 text-xl font-medium">Esperienza cliente</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  Pagina evento, wizard pacchetto, bottiglie, invio richiesta.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--stroke)] bg-[rgba(255,255,255,0.03)] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--gold)]">Club</p>
                <h2 className="mt-3 text-xl font-medium">Dashboard venue</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  Lista prenotazioni, dettaglio, conferma o rifiuto, uso desktop e mobile.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--stroke)] bg-[rgba(255,255,255,0.03)] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--gold)]">Admin</p>
                <h2 className="mt-3 text-xl font-medium">Controllo Tavolè</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  Venue, eventi, pacchetti, bottiglie e analytics base.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
