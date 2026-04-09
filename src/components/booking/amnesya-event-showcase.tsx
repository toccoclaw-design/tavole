"use client";

import { useMemo, useState } from "react";
import { AMNESYA_BOTTLES, AMNESYA_EVENT, AMNESYA_PACKAGES } from "@/lib/venues/amnesya-data";
import { estimateBookingTotal } from "@/lib/pricing/estimate-booking-total";

const OCCASIONS = [
  { id: "serata", label: "Serata" },
  { id: "compleanno", label: "Compleanno" },
  { id: "addio_celibato", label: "Addio celibato" },
  { id: "addio_nubilato", label: "Addio nubilato" },
  { id: "anniversario", label: "Anniversario" },
  { id: "altro", label: "Altro" },
] as const;

export function AmnesyaEventShowcase() {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(AMNESYA_PACKAGES[0].id);
  const [extraGuests, setExtraGuests] = useState(0);
  const [occasion, setOccasion] = useState<string>("serata");
  const [includedSelection, setIncludedSelection] = useState<Record<number, string>>({ 0: "absolut" });
  const [extraBottleQuantities, setExtraBottleQuantities] = useState<Record<string, number>>({});

  const selectedPackage = useMemo(
    () => AMNESYA_PACKAGES.find((pkg) => pkg.id === selectedPackageId) ?? AMNESYA_PACKAGES[0],
    [selectedPackageId],
  );

  const allowedIncludedBottles = useMemo(
    () => AMNESYA_BOTTLES.filter((bottle) => selectedPackage.allowedIncludedCategories.includes(bottle.category)),
    [selectedPackage],
  );

  const includedBottleIds = useMemo(() => {
    const ids: string[] = [];

    for (let slot = 0; slot < selectedPackage.includedBottleCount; slot += 1) {
      const current = includedSelection[slot];
      if (current && allowedIncludedBottles.some((bottle) => bottle.id === current)) {
        ids.push(current);
      } else if (allowedIncludedBottles[0]) {
        ids.push(allowedIncludedBottles[0].id);
      }
    }

    return ids;
  }, [allowedIncludedBottles, includedSelection, selectedPackage.includedBottleCount]);

  const extraBottles = useMemo(
    () =>
      AMNESYA_BOTTLES.filter((bottle) => (extraBottleQuantities[bottle.id] ?? 0) > 0).map((bottle) => ({
        ...bottle,
        quantity: extraBottleQuantities[bottle.id],
      })),
    [extraBottleQuantities],
  );

  const total = useMemo(
    () =>
      estimateBookingTotal({
        packagePrice: selectedPackage.price,
        extraGuestPrice: selectedPackage.extraGuestPrice,
        extraGuestCount: extraGuests,
        extraBottleTotals: extraBottles.map((bottle) => bottle.extraPrice * bottle.quantity),
      }),
    [extraBottles, extraGuests, selectedPackage],
  );

  const selectedIncludedBottles = includedBottleIds
    .map((id) => AMNESYA_BOTTLES.find((bottle) => bottle.id === id))
    .filter(Boolean);

  function handlePackageChange(packageId: string) {
    const nextPackage = AMNESYA_PACKAGES.find((pkg) => pkg.id === packageId);
    if (!nextPackage) return;

    const nextAllowed = AMNESYA_BOTTLES.filter((bottle) =>
      nextPackage.allowedIncludedCategories.includes(bottle.category),
    );

    const nextSelection: Record<number, string> = {};
    for (let slot = 0; slot < nextPackage.includedBottleCount; slot += 1) {
      nextSelection[slot] = nextAllowed[0]?.id ?? "";
    }

    setSelectedPackageId(packageId);
    setExtraGuests(0);
    setIncludedSelection(nextSelection);
  }

  function updateIncludedBottle(slotIndex: number, bottleId: string) {
    setIncludedSelection((current) => ({ ...current, [slotIndex]: bottleId }));
  }

  function updateExtraBottle(bottleId: string, delta: number) {
    setExtraBottleQuantities((current) => {
      const nextValue = Math.max(0, (current[bottleId] ?? 0) + delta);
      return { ...current, [bottleId]: nextValue };
    });
  }

  const totalVisibleBottleCount = selectedIncludedBottles.length + extraBottles.reduce((sum, bottle) => sum + bottle.quantity, 0);

  return (
    <main className="min-h-screen px-6 py-12 md:px-8 md:py-16">
      <div className="mx-auto grid w-full max-w-7xl gap-8 xl:grid-cols-[1.3fr_0.9fr]">
        <section className="flex flex-col gap-8">
          <div className="rounded-[32px] border border-[var(--stroke)] bg-[rgba(17,17,26,0.92)] p-8 shadow-[0_24px_100px_rgba(0,0,0,0.42)] md:p-10">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">
              {AMNESYA_EVENT.city} · {AMNESYA_EVENT.venueName}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
              {AMNESYA_EVENT.name}
            </h1>
            <p className="mt-3 text-sm uppercase tracking-[0.28em] text-[var(--gold-light)]">
              {AMNESYA_EVENT.dateLabel}
            </p>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)] md:text-lg">
              {AMNESYA_EVENT.description}
            </p>
          </div>

          <div className="rounded-[32px] border border-[var(--stroke)] bg-[rgba(17,17,26,0.92)] p-8 shadow-[0_24px_100px_rgba(0,0,0,0.32)] md:p-10">
            <div className="mb-8 flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">Wizard preview</p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Configura la tua serata</h2>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
                Questa è la prima versione visibile del flow Tavolè: selezioni pacchetto, incluse, extra e dettagli.
              </p>
            </div>

            <div className="grid gap-8">
              <section className="grid gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Step 1</p>
                  <h3 className="mt-2 text-2xl font-medium">Scegli il pacchetto</h3>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {AMNESYA_PACKAGES.map((pkg) => {
                    const active = pkg.id === selectedPackage.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => handlePackageChange(pkg.id)}
                        className={`rounded-[24px] border p-5 text-left transition ${
                          active
                            ? "border-[var(--gold)] bg-[rgba(201,168,76,0.08)]"
                            : "border-[var(--stroke)] bg-[rgba(255,255,255,0.03)] hover:border-[rgba(201,168,76,0.45)]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm uppercase tracking-[0.28em] text-[var(--gold)]">{pkg.tier}</p>
                            <h4 className="mt-2 text-2xl font-semibold">{pkg.name}</h4>
                          </div>
                          <p className="text-3xl font-semibold">€ {pkg.price}</p>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                          {pkg.paxIncluded} persone incluse, {pkg.includedBottleCount} bottiglia/e inclusa/e, ospite extra € {pkg.extraGuestPrice}.
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="grid gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Step 2</p>
                  <h3 className="mt-2 text-2xl font-medium">Bottiglie incluse</h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {Array.from({ length: selectedPackage.includedBottleCount }).map((_, slotIndex) => (
                    <div
                      key={slotIndex}
                      className="rounded-[24px] border border-[var(--stroke)] bg-[rgba(255,255,255,0.03)] p-5"
                    >
                      <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">
                        Bottiglia inclusa {slotIndex + 1}
                      </p>
                      <div className="mt-4 grid gap-3">
                        {allowedIncludedBottles.map((bottle) => {
                          const active = includedBottleIds[slotIndex] === bottle.id;
                          return (
                            <button
                              key={`${slotIndex}-${bottle.id}`}
                              type="button"
                              onClick={() => updateIncludedBottle(slotIndex, bottle.id)}
                              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                                active
                                  ? "border-[var(--gold)] bg-[rgba(201,168,76,0.08)]"
                                  : "border-[var(--stroke)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(201,168,76,0.45)]"
                              }`}
                            >
                              <span className="flex items-center gap-3">
                                <span className="text-2xl">{bottle.image}</span>
                                <span>
                                  <span className="block text-base font-medium">{bottle.name}</span>
                                  <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                                    {bottle.category}
                                  </span>
                                </span>
                              </span>
                              <span className="text-sm text-[var(--gold-light)]">Inclusa</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="grid gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Step 3</p>
                  <h3 className="mt-2 text-2xl font-medium">Extra</h3>
                </div>

                <div className="grid gap-4 xl:grid-cols-[0.45fr_1fr]">
                  <div className="rounded-[24px] border border-[var(--stroke)] bg-[rgba(255,255,255,0.03)] p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-[var(--gold)]">Ospiti extra</p>
                    <div className="mt-6 flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setExtraGuests((value) => Math.max(0, value - 1))}
                        className="h-11 w-11 rounded-full border border-[var(--stroke)] text-xl"
                      >
                        −
                      </button>
                      <div className="min-w-14 text-center text-3xl font-semibold">{extraGuests}</div>
                      <button
                        type="button"
                        onClick={() =>
                          setExtraGuests((value) => Math.min(selectedPackage.maxExtraGuests, value + 1))
                        }
                        className="h-11 w-11 rounded-full border border-[var(--stroke)] text-xl"
                      >
                        +
                      </button>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                      € {selectedPackage.extraGuestPrice} a persona, massimo {selectedPackage.maxExtraGuests}.
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-[var(--stroke)] bg-[rgba(255,255,255,0.03)] p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-[var(--gold)]">Bottiglie extra</p>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {AMNESYA_BOTTLES.map((bottle) => {
                        const quantity = extraBottleQuantities[bottle.id] ?? 0;
                        return (
                          <div
                            key={bottle.id}
                            className="rounded-2xl border border-[var(--stroke)] bg-[rgba(0,0,0,0.16)] p-4"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{bottle.image}</span>
                                <div>
                                  <p className="font-medium">{bottle.name}</p>
                                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                                    {bottle.category}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">€ {bottle.extraPrice}</p>
                                <p className="text-xs text-[var(--muted)]">extra</p>
                              </div>
                            </div>
                            <div className="mt-4 flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => updateExtraBottle(bottle.id, -1)}
                                className="h-9 w-9 rounded-full border border-[var(--stroke)]"
                              >
                                −
                              </button>
                              <span className="min-w-8 text-center text-lg font-semibold">{quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateExtraBottle(bottle.id, 1)}
                                className="h-9 w-9 rounded-full border border-[var(--stroke)]"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>

              <section className="grid gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Step 4</p>
                  <h3 className="mt-2 text-2xl font-medium">Dettagli cliente</h3>
                </div>

                <div className="grid gap-4 rounded-[24px] border border-[var(--stroke)] bg-[rgba(255,255,255,0.03)] p-5 md:grid-cols-2">
                  {[
                    "Nome",
                    "Cognome",
                    "Email",
                    "Telefono",
                  ].map((field) => (
                    <label key={field} className="grid gap-2 text-sm text-[var(--muted)]">
                      {field}
                      <input
                        placeholder={field}
                        className="rounded-2xl border border-[var(--stroke)] bg-[rgba(0,0,0,0.2)] px-4 py-3 text-[var(--foreground)] outline-none"
                      />
                    </label>
                  ))}

                  <div className="md:col-span-2">
                    <p className="mb-2 text-sm text-[var(--muted)]">Occasione</p>
                    <div className="flex flex-wrap gap-2">
                      {OCCASIONS.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setOccasion(item.id)}
                          className={`rounded-full border px-4 py-2 text-sm transition ${
                            occasion === item.id
                              ? "border-[var(--gold)] bg-[rgba(201,168,76,0.08)] text-[var(--gold-light)]"
                              : "border-[var(--stroke)] text-[var(--muted)]"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="grid gap-2 text-sm text-[var(--muted)] md:col-span-2">
                    Note
                    <textarea
                      placeholder="Richieste particolari, dettagli gruppo, note utili"
                      rows={5}
                      className="rounded-2xl border border-[var(--stroke)] bg-[rgba(0,0,0,0.2)] px-4 py-3 text-[var(--foreground)] outline-none"
                    />
                  </label>
                </div>
              </section>
            </div>
          </div>
        </section>

        <aside className="flex flex-col gap-6 xl:sticky xl:top-6 xl:self-start">
          <div className="rounded-[32px] border border-[var(--stroke)] bg-[rgba(17,17,26,0.92)] p-8 shadow-[0_24px_100px_rgba(0,0,0,0.32)]">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">Preview tavolo</p>
            <div className="relative mt-8 flex aspect-square items-center justify-center overflow-hidden rounded-[28px] border border-[var(--stroke)] bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.12),rgba(8,8,15,0.96)_60%)]">
              <div className="absolute h-52 w-52 rounded-full border border-[rgba(255,255,255,0.08)] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),rgba(30,30,40,0.98)_75%)] shadow-[0_20px_60px_rgba(0,0,0,0.4)]" />
              {Array.from({ length: selectedPackage.paxIncluded + extraGuests }).map((_, index) => {
                const totalSeats = selectedPackage.paxIncluded + extraGuests;
                const angle = (index / totalSeats) * Math.PI * 2;
                const radius = 132;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <div
                    key={index}
                    className="absolute h-10 w-10 rounded-full border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(201,168,76,0.45),rgba(201,168,76,0.12))]"
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  />
                );
              })}

              <div className="absolute flex flex-wrap items-center justify-center gap-3 px-10">
                {[...selectedIncludedBottles, ...extraBottles.flatMap((bottle) => Array.from({ length: bottle.quantity }).map(() => bottle))]
                  .slice(0, 8)
                  .map((bottle, index) => (
                    <div
                      key={`${bottle.id}-${index}`}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--stroke)] bg-[rgba(255,255,255,0.04)] text-2xl"
                    >
                      {bottle.image}
                    </div>
                  ))}
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Sedute visibili: {selectedPackage.paxIncluded + extraGuests} · Bottiglie visibili: {totalVisibleBottleCount}
            </p>
          </div>

          <div className="rounded-[32px] border border-[var(--stroke)] bg-[rgba(17,17,26,0.92)] p-8 shadow-[0_24px_100px_rgba(0,0,0,0.32)]">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">Riepilogo</p>
            <div className="mt-6 grid gap-4 text-sm">
              <div className="flex items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-3">
                <span>{selectedPackage.name}</span>
                <span>€ {selectedPackage.price}</span>
              </div>

              {selectedIncludedBottles.map((bottle, index) => (
                <div key={`${bottle?.id}-${index}`} className="flex items-center justify-between gap-4 text-[var(--muted)]">
                  <span>↳ Inclusa {index + 1}: {bottle?.name}</span>
                  <span>incl.</span>
                </div>
              ))}

              {extraGuests > 0 ? (
                <div className="flex items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-3">
                  <span>Ospiti extra × {extraGuests}</span>
                  <span>€ {extraGuests * selectedPackage.extraGuestPrice}</span>
                </div>
              ) : null}

              {extraBottles.map((bottle) => (
                <div key={bottle.id} className="flex items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-3">
                  <span>{bottle.name} × {bottle.quantity}</span>
                  <span>€ {bottle.extraPrice * bottle.quantity}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Totale stimato</p>
                <p className="mt-2 text-4xl font-semibold text-[var(--gold-light)]">€ {total}</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-[var(--gold)] px-5 py-3 text-sm uppercase tracking-[0.24em] text-[var(--gold-light)] transition hover:bg-[rgba(201,168,76,0.08)]"
              >
                Invia richiesta
              </button>
            </div>

            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Occasione: {OCCASIONS.find((item) => item.id === occasion)?.label}. Questa è una preview interattiva del primo flusso UI, non ancora collegata al database.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
