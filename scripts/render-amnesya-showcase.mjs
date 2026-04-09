import fs from "fs/promises";
import path from "path";

const html = `<!doctype html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tavolè · Amnesya showcase</title>
  <style>
    :root {
      --bg: #08080f;
      --fg: #f0ece0;
      --muted: #b8b1a0;
      --surface: rgba(17,17,26,0.92);
      --surface-soft: rgba(255,255,255,0.03);
      --stroke: rgba(201,168,76,0.18);
      --gold: #c9a84c;
      --gold-light: #e8d49a;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      color: var(--fg);
      background:
        radial-gradient(circle at top, rgba(201,168,76,0.08), transparent 30%),
        linear-gradient(180deg, #05050a 0%, #08080f 45%, #05050a 100%);
    }
    .wrap {
      max-width: 1400px;
      margin: 0 auto;
      padding: 48px 24px 64px;
      display: grid;
      gap: 28px;
      grid-template-columns: 1.3fr 0.9fr;
    }
    .card {
      border: 1px solid var(--stroke);
      border-radius: 32px;
      background: var(--surface);
      box-shadow: 0 24px 100px rgba(0,0,0,0.34);
    }
    .hero, .wizard { padding: 32px; }
    .eyebrow {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: .35em;
      color: var(--gold);
    }
    h1 { margin: 16px 0 8px; font-size: 56px; line-height: 1.02; }
    h2 { margin: 0; font-size: 38px; }
    h3 { margin: 0; font-size: 26px; }
    p { line-height: 1.7; }
    .muted { color: var(--muted); }
    .grid-2 { display: grid; gap: 16px; grid-template-columns: repeat(2, minmax(0,1fr)); }
    .package, .slot, .extra, .summary, .visual, .formbox {
      border: 1px solid var(--stroke);
      border-radius: 24px;
      background: var(--surface-soft);
      padding: 20px;
    }
    .package.active, .slot.active {
      border-color: var(--gold);
      background: rgba(201,168,76,0.08);
    }
    .step {
      margin-bottom: 28px;
      display: grid;
      gap: 16px;
    }
    .meta {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: start;
    }
    .price { font-size: 34px; font-weight: 700; }
    .options { display: grid; gap: 12px; }
    .option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      border: 1px solid var(--stroke);
      border-radius: 18px;
      padding: 14px 16px;
      background: rgba(255,255,255,0.02);
    }
    .tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .tag {
      padding: 10px 14px;
      border-radius: 999px;
      border: 1px solid var(--stroke);
      color: var(--muted);
    }
    .tag.active {
      border-color: var(--gold);
      background: rgba(201,168,76,0.08);
      color: var(--gold-light);
    }
    .side {
      display: grid;
      gap: 24px;
      align-self: start;
      position: sticky;
      top: 24px;
    }
    .visual-stage {
      height: 420px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      background: radial-gradient(circle at center, rgba(201,168,76,0.12), rgba(8,8,15,0.96) 60%);
    }
    .table {
      width: 220px;
      height: 220px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), rgba(30,30,40,0.98) 75%);
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
      border: 1px solid rgba(255,255,255,0.08);
      position: absolute;
    }
    .seat {
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(180deg, rgba(201,168,76,0.45), rgba(201,168,76,0.12));
      border: 1px solid rgba(255,255,255,0.08);
    }
    .bottles {
      position: absolute;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      max-width: 240px;
      z-index: 2;
    }
    .bottle {
      width: 52px;
      height: 52px;
      border-radius: 18px;
      border: 1px solid var(--stroke);
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255,255,255,0.04);
      font-size: 26px;
    }
    .line { display: flex; justify-content: space-between; gap: 16px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .line.mutedline { color: var(--muted); }
    .cta {
      display: inline-flex;
      width: fit-content;
      padding: 14px 20px;
      border-radius: 999px;
      border: 1px solid var(--gold);
      color: var(--gold-light);
      text-transform: uppercase;
      letter-spacing: .24em;
      font-size: 12px;
      margin-top: 16px;
    }
    @media (max-width: 1080px) {
      .wrap { grid-template-columns: 1fr; }
      .side { position: static; }
    }
    @media (max-width: 720px) {
      h1 { font-size: 38px; }
      h2 { font-size: 30px; }
      .grid-2 { grid-template-columns: 1fr; }
      .hero, .wizard { padding: 24px; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div style="display:grid;gap:28px;">
      <section class="card hero">
        <div class="eyebrow">Cagliari · Amnesya Essence Club</div>
        <h1>Que Clase Saturday</h1>
        <p style="text-transform:uppercase; letter-spacing:.28em; color:var(--gold-light);">Sabato 12 Aprile 2026</p>
        <p class="muted">Prima preview visibile del flow Tavolè: booking evento, pacchetti, bottiglie incluse, extra e riepilogo dinamico.</p>
        <div style="margin-top:24px; display:flex; flex-wrap:wrap; gap:12px;">
          <div class="tag active">Luxury nightclub</div>
          <div class="tag">Pacchetti evento</div>
          <div class="tag">Conferma manuale locale</div>
        </div>
      </section>

      <section class="card wizard">
        <div style="margin-bottom:28px; display:grid; gap:12px;">
          <div class="eyebrow">Wizard preview</div>
          <h2>Configura la tua serata</h2>
          <p class="muted">Qui stiamo trasformando il progetto in una vera esperienza prenotazione, non più in una demo buttata lì.</p>
        </div>

        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:26px;">
          <div class="tag active">1 · Pacchetto</div>
          <div class="tag active">2 · Bottiglie incluse</div>
          <div class="tag active">3 · Extra</div>
          <div class="tag active">4 · Dettagli</div>
        </div>

        <div class="step">
          <div>
            <div class="eyebrow">Step 1</div>
            <h3>Scegli il pacchetto</h3>
          </div>
          <div class="grid-2">
            <div class="package active">
              <div class="meta"><div><div class="eyebrow">base</div><h3>6 Base</h3></div><div class="price">€ 150</div></div>
              <p class="muted">6 persone, 1 bottiglia inclusa, ospite extra € 25.</p>
              <div style="margin-top:16px; display:flex; gap:8px; flex-wrap:wrap;">
                <span class="tag active">Pacchetto attivo</span>
                <span class="tag">1 bottiglia inclusa</span>
              </div>
            </div>
            <div class="package"><div class="meta"><div><div class="eyebrow">premium</div><h3>6 Premium</h3></div><div class="price">€ 180</div></div><p class="muted">6 persone, 1 bottiglia premium inclusa.</p></div>
            <div class="package"><div class="meta"><div><div class="eyebrow">base</div><h3>8 Base</h3></div><div class="price">€ 250</div></div><p class="muted">8 persone, 2 bottiglie base incluse.</p></div>
            <div class="package"><div class="meta"><div><div class="eyebrow">premium</div><h3>8 Premium</h3></div><div class="price">€ 300</div></div><p class="muted">8 persone, 2 bottiglie tra base e premium.</p></div>
          </div>
        </div>

        <div class="step">
          <div><div class="eyebrow">Step 2</div><h3>Bottiglie incluse</h3></div>
          <div class="grid-2">
            <div class="slot active">
              <div class="eyebrow">Bottiglia inclusa 1</div>
              <p class="muted" style="margin:10px 0 0;">Scelta obbligatoria in base al package selezionato.</p>
              <div class="options" style="margin-top:16px;">
                <div class="option"><span>🍸 Absolut Vodka</span><span class="muted">Inclusa</span></div>
                <div class="option"><span>🍸 Bombay Gin</span><span class="muted">Inclusa</span></div>
                <div class="option"><span>🥃 Disaronno</span><span class="muted">Inclusa</span></div>
                <div class="option"><span>🥃 Jägermeister</span><span class="muted">Inclusa</span></div>
              </div>
            </div>
            <div class="slot">
              <div class="eyebrow">Preview regole</div>
              <p class="muted" style="margin-top:16px;">Per il package attivo si possono scegliere solo bottiglie categoria base. Le regole cambiano quando cambi package.</p>
            </div>
          </div>
        </div>

        <div class="step">
          <div><div class="eyebrow">Step 3</div><h3>Extra</h3></div>
          <div class="grid-2">
            <div class="extra">
              <div class="eyebrow">Ospiti extra</div>
              <p style="font-size:40px; margin:20px 0 8px;">2</p>
              <p class="muted">€ 25 a persona, massimo 5.</p>
            </div>
            <div class="extra">
              <div class="eyebrow">Bottiglie extra</div>
              <p class="muted" style="margin-top:10px;">Le bottiglie premium speciali stanno qui, fuori dalle incluse.</p>
              <div class="options" style="margin-top:16px;">
                <div class="option"><span>🍾 Moët Imperial × 1</span><span>€ 150</span></div>
                <div class="option"><span>🍾 Dom Pérignon × 1</span><span>€ 500</span></div>
              </div>
            </div>
          </div>
        </div>

        <div class="step">
          <div><div class="eyebrow">Step 4</div><h3>Dettagli cliente</h3></div>
          <div class="formbox">
            <div class="grid-2">
              <div class="option"><span>Nome</span><span class="muted">placeholder</span></div>
              <div class="option"><span>Cognome</span><span class="muted">placeholder</span></div>
              <div class="option"><span>Email</span><span class="muted">placeholder</span></div>
              <div class="option"><span>Telefono</span><span class="muted">placeholder</span></div>
            </div>
            <div style="margin-top:20px;">
              <div class="eyebrow">Occasione</div>
              <div class="tags" style="margin-top:12px;">
                <div class="tag active">Serata</div>
                <div class="tag">Compleanno</div>
                <div class="tag">Addio celibato</div>
                <div class="tag">Addio nubilato</div>
                <div class="tag">Anniversario</div>
                <div class="tag">Altro</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <aside class="side">
      <section class="card visual">
        <div class="eyebrow">Preview tavolo</div>
        <div class="visual-stage" style="margin-top:20px; border-radius:28px; border:1px solid var(--stroke);">
          <div class="table"></div>
          <div class="seat" style="transform:translate(0,-140px);"></div>
          <div class="seat" style="transform:translate(95px,-95px);"></div>
          <div class="seat" style="transform:translate(140px,0);"></div>
          <div class="seat" style="transform:translate(95px,95px);"></div>
          <div class="seat" style="transform:translate(0,140px);"></div>
          <div class="seat" style="transform:translate(-95px,95px);"></div>
          <div class="seat" style="transform:translate(-140px,0);"></div>
          <div class="seat" style="transform:translate(-95px,-95px);"></div>
          <div class="bottles">
            <div class="bottle">🍸</div>
            <div class="bottle">🍾</div>
            <div class="bottle">🍾</div>
          </div>
        </div>
        <p class="muted">Sedute visibili: 8 · Bottiglie visibili: 3</p>
      </section>

      <section class="card summary">
        <div class="eyebrow">Riepilogo</div>
        <p class="muted" style="margin-top:14px;">Questa colonna deve diventare il cervello visivo della prenotazione: chiara, veloce e sempre leggibile.</p>
        <div style="margin-top:20px;">
          <div class="line"><span>6 Base</span><strong>€ 150</strong></div>
          <div class="line mutedline"><span>↳ Inclusa 1: Absolut Vodka</span><span>incl.</span></div>
          <div class="line"><span>Ospiti extra × 2</span><strong>€ 50</strong></div>
          <div class="line"><span>Moët Imperial × 1</span><strong>€ 150</strong></div>
          <div class="line"><span>Dom Pérignon × 1</span><strong>€ 500</strong></div>
        </div>
        <div style="margin-top:28px; display:flex; justify-content:space-between; align-items:end; gap:16px;">
          <div>
            <div class="eyebrow" style="color:var(--muted);">Totale stimato</div>
            <div style="margin-top:10px; font-size:44px; font-weight:700; color:var(--gold-light);">€ 850</div>
          </div>
        </div>
        <div class="cta">Invia richiesta</div>
        <p class="muted">Questa è una preview statica esportata per farti vedere subito la direzione visiva mentre sistemo il runtime applicativo.</p>
      </section>
    </aside>
  </div>
</body>
</html>`;

const outDir = path.resolve("dist/tavole-preview");
await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(path.join(outDir, "index.html"), html, "utf8");
console.log(`Written ${path.join(outDir, "index.html")}`);
