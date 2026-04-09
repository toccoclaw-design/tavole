type EventPageProps = {
  params: Promise<{ eventSlug: string }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { eventSlug } = await params;

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--gold)]">Evento</p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">{eventSlug}</h1>
        <p className="max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
          Placeholder tecnico per la futura pagina evento con wizard prenotazione.
        </p>
      </div>
    </main>
  );
}
