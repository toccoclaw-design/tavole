export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-[28px] border border-[var(--stroke)] bg-[rgba(17,17,26,0.88)] p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--gold)]">Booking status</p>
        <h1 className="text-4xl font-semibold tracking-tight">Richiesta inviata</h1>
        <p className="text-base leading-8 text-[var(--muted)]">
          Questa pagina ospiterà la conferma finale di invio prenotazione, con riepilogo e prossimi passi.
        </p>
      </div>
    </main>
  );
}
