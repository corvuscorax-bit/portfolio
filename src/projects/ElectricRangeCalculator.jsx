import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

/*
 Electric Range Calculator (NEC Table 220.55)
 - Uses the constants you provided for Columns A, B and C
 - Applies Notes 1–6
 - Default behavior follows NEC: Note 3 may be applied to the small-appliance subset (<=8.75 kW).
 - Includes an OPTIONAL alternate Note-2 interpretation toggle (see below) so you can reproduce
   some calculators that average only the >12 kW machines when computing the Note-2 adjustment.
*/

// ---------------- NEC constants (from your message) ----------------
const COLUMN_C_KW = [
  8.0, 11.0, 14.0, 17.0, 20.0, 21.0, 22.0, 23.0, 24.0,
  25.0, 26.0, 27.0, 28.0, 29.0, 30.0, 31.0, 32.0, 33.0, 
  34.0, 35.0, 36.0, 37.0, 38.0, 39.0, 40.0,
];

const COLUMN_A_FACTORS = {
  1: 0.80, 2: 0.75, 3: 0.70, 4: 0.66, 5: 0.62,
  6: 0.59, 7: 0.56, 8: 0.53, 9: 0.51, 10: 0.49,
  11: 0.47, 12: 0.45, 13: 0.43, 14: 0.41, 15: 0.40,
  16: 0.39, 17: 0.38, 18: 0.37, 19: 0.36, 20: 0.35,
  21: 0.34, 22: 0.33, 23: 0.32, 24: 0.31, 25: 0.30,
};
const COLUMN_B_FACTORS = {
  1: 0.80, 2: 0.65, 3: 0.55, 4: 0.50, 5: 0.45,
  6: 0.43, 7: 0.40, 8: 0.36, 9: 0.35, 10: 0.34,
  11: 0.32, 12: 0.32, 13: 0.32, 14: 0.32, 15: 0.32,
  16: 0.28, 17: 0.28, 18: 0.28, 19: 0.28, 20: 0.28,
  21: 0.26, 22: 0.26, 23: 0.26, 24: 0.26, 25: 0.26,
};

// ---------------- lookup helpers ----------------
function lookupColumnC(n) {
  if (n <= 0) return 0;
  if (n <= COLUMN_C_KW.length) return COLUMN_C_KW[n - 1];
  if (n >= 26 && n <= 40) return 15 + n * 1.0; // specified rule you gave
  if (n >= 41) return 25 + n * 0.75;
  return 0;
}
function lookupColumnA(n) {
  if (n <= 0) return 0;
  if (COLUMN_A_FACTORS[n]) return COLUMN_A_FACTORS[n];
  // fallback for very large n: last known / or 0.30 for >=26 per your notes
  if (n >= 26) return 0.30;
  // otherwise return closest lower (defensive)
  const keys = Object.keys(COLUMN_A_FACTORS).map(Number).sort((a,b)=>a-b);
  for (let i = keys.length - 1; i >= 0; --i) {
    if (keys[i] <= n) return COLUMN_A_FACTORS[keys[i]];
  }
  return Object.values(COLUMN_A_FACTORS)[0];
}
function lookupColumnB(n) {
  if (n <= 0) return 0;
  if (COLUMN_B_FACTORS[n]) return COLUMN_B_FACTORS[n];
  if (n >= 26 && n <= 30) return 0.24;
  if (n >= 31 && n <= 40) return 0.22;
  if (n >= 41 && n <= 50) return 0.20;
  if (n >= 51 && n <= 60) return 0.18;
  if (n >= 61) return 0.16;
  const keys = Object.keys(COLUMN_B_FACTORS).map(Number).sort((a,b)=>a-b);
  for (let i = keys.length - 1; i >= 0; --i) {
    if (keys[i] <= n) return COLUMN_B_FACTORS[keys[i]];
  }
  return Object.values(COLUMN_B_FACTORS)[0];
}
function round2(n) { return Math.round((n + Number.EPSILON) * 100) / 100; }

// ---------------- component ----------------
export default function ElectricRangeCalculator() {
  const [appliances, setAppliances] = useState([
    { id: Date.now(), type: "Range", kw: 12, qty: 1 },
  ]);
  const [voltage, setVoltage] = useState(240);

  // controls
  const [applyNote3ToSmall, setApplyNote3ToSmall] = useState(true);
  const [combineCooktopAndOvens, setCombineCooktopAndOvens] = useState(true);
  // optional alternate interpretation of Note 2 (some calculators average only >=12 kW machines)
  const [note2AlternateAvg12PlusOnly, setNote2AlternateAvg12PlusOnly] = useState(true);

  const [result, setResult] = useState(null);

  // add / update / remove helpers
  const addAppliance = () =>
    setAppliances([...appliances, { id: Date.now() + Math.random(), type: "Range", kw: 12, qty: 1 }]);
  const updateAppliance = (id, field, value) =>
    setAppliances(appliances.map(a => a.id === id ? { ...a, [field]: value } : a));
  const removeAppliance = id => setAppliances(appliances.filter(a => a.id !== id));
  const reset = () => setAppliances([{ id: Date.now(), type: "Range", kw: 12, qty: 1 }]);

  useEffect(() => {
    // Expand by qty
    const expanded = appliances.flatMap(a => {
      const q = Number(a.qty) || 0;
      if (q <= 0) return [];
      return Array.from({ length: q }, () => ({ type: a.type, kw: Number(a.kw) || 0 }));
    });

    if (expanded.length === 0) {
      setResult({ error: "No appliances with quantity > 0. Add at least one." });
      return;
    }

    // Check sizes
    if (expanded.some(a => a.kw > 27)) {
      setResult({ error: "One or more appliances exceed 27 kW — not permitted by NEC Table 220.55." });
      return;
    }

    // Note 5: single wall oven or single cooktop -> branch-circuit load is nameplate rating
    if (expanded.length === 1 && (expanded[0].type === "Wall Oven" || expanded[0].type === "Cooktop")) {
      const kW = expanded[0].kw;
      const amps = (kW * 1000) / voltage;
      setResult({
        method: "Note 5 — single wall-mounted oven or single counter-mounted cooktop: nameplate rating",
        demandKW: round2(kW),
        details: { ratings: expanded.map(x => x.kw) },
        amps: round2(amps),
      });
      return;
    }

    // Note 6 (optional): combine 1 cooktop + <=2 wall ovens on same branch -> treat as one range
    // (we don't model rooms; we offer checkbox to enable this behavior)
    let working = [...expanded];
    if (combineCooktopAndOvens) {
      const cooktops = working.filter(a => a.type === "Cooktop");
      const wallOvens = working.filter(a => a.type === "Wall Oven");
      if (cooktops.length >= 1 && wallOvens.length <= 2 && (cooktops.length + wallOvens.length) > 0) {
        // combine ALL cooktops + wallovens into a single synthetic "Range" per Note 6
        // (NEC: counter-mounted cooking unit + <=2 wall-mounted ovens on same branch treated as one range)
        const toCombine = [...cooktops, ...wallOvens];
        const combinedKW = toCombine.reduce((s, it) => s + it.kw, 0);
        // remove those items & add one synthetic Range
        working = working.filter(a => a.type !== "Cooktop" && a.type !== "Wall Oven");
        working.push({ type: "Range", kw: combinedKW });
      }
    }

    // Partition into "small appliances" (1.75 < kw <= 8.75) and "large" (> 8.75)
    const smallItems = working.filter(a => a.kw > 1.75 && a.kw <= 8.75);
    const largeItems = working.filter(a => a.kw > 8.75);

    // CASE A: If all are small and applyNote3ToSmall is false -> user can still require Column C for all
    // But by default, we'll apply Note3 to small group if applyNote3ToSmall=true.
    // If ALL are small, we MUST use Note3 (it's permitted) — that's how NEC lets you do it.
    const allSmall = working.length > 0 && working.every(a => a.kw > 1.75 && a.kw <= 8.75);

    // ---- compute demand for small group (Note 3 / Columns A & B) if user chose to ##
    let smallDemandKW = 0;
    let smallDetails = null;
    if ((applyNote3ToSmall && smallItems.length > 0) || allSmall) {
      // split small into <=3.5 (Column A) and >3.5<=8.75 (Column B)
      const colAitems = smallItems.filter(a => a.kw < 3.5);
      const colBitems = smallItems.filter(a => a.kw >= 3.5);

      const sumA = colAitems.reduce((s, it) => s + it.kw, 0);
      const sumB = colBitems.reduce((s, it) => s + it.kw, 0);
      const countA = colAitems.length;
      const countB = colBitems.length;
      const factorA = lookupColumnA(countA);
      const factorB = lookupColumnB(countB);

      const demandA = sumA * factorA;
      const demandB = sumB * factorB;
      smallDemandKW = demandA + demandB;

      smallDetails = {
        colA: { count: countA, sum: round2(sumA), factor: round2(factorA), demand: round2(demandA) },
        colB: { count: countB, sum: round2(sumB), factor: round2(factorB), demand: round2(demandB) },
        smallTotalKW: round2(sumA + sumB),
        demandSmall: round2(smallDemandKW),
      };
    }

    // ---- compute demand for "large" group (Column C logic with Note 1 & 2) ----
    // NOTE: if applyNote3ToSmall is true we removed small group from Column C computation;
    // if not, the columnCCount = working.length (all appliances).
    const columnCItems = (applyNote3ToSmall && !allSmall) ? largeItems : working.slice(); // what goes into Column C calc
    const nC = columnCItems.length;

    let columnCBase = lookupColumnC(nC);
    let columnCFactor = 1.0;
    let columnCNote = "Column C (no adjustment)";

    if (nC === 0) {
      // nothing to do
    } else {
      const ratings = columnCItems.map(a => a.kw);
      const allSameRating = ratings.every(r => Math.abs(r - ratings[0]) < 1e-6);

      // Note 1: if all same rating and rating > 12 and <=27 => increase 5% per kW (or major fraction) above 12
      if (allSameRating && ratings[0] > 12) {
        const increments = Math.ceil(ratings[0] - 12);
        columnCFactor = 1 + 0.05 * increments;
        columnCNote = `Note 1: all same rating ${ratings[0]} kW → +${increments * 5}%`;
      } else {
        // Note 2: for unequal ratings (and at least one > 8.75), compute average using 12 kW for any rating < 12 kW,
        // then increase 5% per kW (or major fraction) that average exceeds 12.
        const anyOver8p75 = ratings.some(r => r > 8.75);
        if (anyOver8p75) {
          // Two alternatives supported:
          // - standard NEC: adjustedSum uses 12 for any rating < 12, divide by nC
          // - alternate (toggle): some calculators average only the >=12 kW appliances (user requested earlier)
          let avg = 0;
          if (!note2AlternateAvg12PlusOnly) {
            const adjustedSum = ratings.reduce((s, r) => s + (r < 12 ? 12 : r), 0);
            avg = adjustedSum / nC;
            const increments = Math.max(0, Math.ceil(avg - 12));
            if (increments > 0) {
              columnCFactor = 1 + 0.05 * increments;
              columnCNote = `Note 2 (NEC): adjusted avg ${round2(avg)} kW → +${increments * 5}%`;
            } else {
              columnCNote = `Note 2 considered: adjusted avg ${round2(avg)} kW → no increase`;
            }
          } else {
            // ALTERNATE: average only appliances >= 12 kW (non-standard)
            const ge12 = ratings.filter(r => r >= 12);
            if (ge12.length === 0) {
              columnCNote = "Alternate Note 2: no appliances >=12 kW → no increase";
            } else {
              const avg12plus = ge12.reduce((s, r) => s + r, 0) / ge12.length;
              const increments = Math.max(0, Math.ceil(avg12plus - 12));
              if (increments > 0) {
                columnCFactor = 1 + 0.05 * increments;
                columnCNote = `Note 2 (ALT): avg of >=12 kW items = ${round2(avg12plus)} kW → +${increments * 5}%`;
              } else {
                columnCNote = `Note 2 (ALT): avg ${round2(avg12plus)} kW → no increase`;
              }
            }
          }
        }
      }
    }

    const columnCDemandKW = round2(columnCBase * columnCFactor);
    const totalDemandKW = round2(columnCDemandKW + smallDemandKW);

    const amps = round2((totalDemandKW * 1000) / voltage);

    setResult({
      method: [
        allSmall ? "All appliances small — Note 3 applied to all (Columns A/B)" :
        (applyNote3ToSmall ? "Small appliances → Columns A/B; others → Column C" : "All appliances → Column C (no Note 3)"),
      ].join(" "),
      details: {
        expandedCount: working.length,
        ratings: working.map(a => a.kw),
        small: smallDetails,
        columnC: { n: nC, baseC: columnCBase, factor: round2(columnCFactor), note: columnCNote, demand: columnCDemandKW },
      },
      demandKW: totalDemandKW,
      amps,
    });
  }, [appliances, voltage, applyNote3ToSmall, combineCooktopAndOvens, note2AlternateAvg12PlusOnly]);

  // UI
  return (
    <main>
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold">Electric Range Calculator (NEC Table 220.55)</h2>
      <p className="text-sm text-gray-600">
        Add appliances (Range, Wall Oven, Cooktop). Qty and kW per appliance accepted.
        Notes 1–6 are implemented; by default small appliances (1.75–8.75 kW) are handled with Columns A/B
        (Note 3) and the remainder with Column C (Notes 1 & 2). Toggle the alternate Note-2 behavior below if desired.
      </p>

      <div className="space-y-2">
        {appliances.map((a, idx) => (
          <div key={a.id} className="grid grid-cols-12 gap-2 items-center">
            <select
              value={a.type}
              onChange={(e) => updateAppliance(a.id, "type", e.target.value)}
              className="col-span-3 border rounded p-2"
            >
              <option value="Range">Range</option>
              <option value="Wall Oven">Wall Oven</option>
              <option value="Cooktop">Cooktop</option>
            </select>

            <input
              type="number"
              min="0"
              step="0.5"
              value={a.kw}
              onChange={(e) => updateAppliance(a.id, "kw", parseFloat(e.target.value || 0))}
              className="col-span-3 border rounded p-2"
              placeholder="kW"
            />
            <input
              type="number"
              min="0"
              value={a.qty}
              onChange={(e) => updateAppliance(a.id, "qty", parseInt(e.target.value || 0))}
              className="col-span-2 border rounded p-2"
              placeholder="Qty"
            />
            <span className="col-span-3 text-sm">{a.kw} kW × {a.qty}</span>
            <button onClick={() => removeAppliance(a.id)} className="col-span-1 text-red-500">✕</button>
          </div>
        ))}

        <div className="flex gap-2">
          <button onClick={addAppliance} className="px-3 py-1 bg-green-100 text-green-700 rounded">+ Add appliance</button>
          <button onClick={reset} className="px-3 py-1 bg-gray-100 rounded">Reset</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-center">
        <label>
          Supply Voltage
          <select value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} className="block w-full border p-2 rounded mt-1">
            <option value={120}>120 V</option>
            <option value={208}>208 V</option>
            <option value={230}>230 V</option>
            <option value={240}>240 V</option>
          </select>
        </label>

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={applyNote3ToSmall} onChange={(e) => setApplyNote3ToSmall(e.target.checked)} />
            <span className="text-sm">Apply Note 3 (Columns A/B) to small appliances (1.75–8.75 kW)</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={combineCooktopAndOvens} onChange={(e) => setCombineCooktopAndOvens(e.target.checked)} />
            <span className="text-sm">Combine cooktop + ≤2 wall ovens (Note 6)</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={note2AlternateAvg12PlusOnly} onChange={(e) => setNote2AlternateAvg12PlusOnly(e.target.checked)} />
            <span className="text-sm">(OPTIONAL) Alternate Note 2: average only appliances ≥ 12 kW (non-standard)</span>
          </label>
        </div>
      </div>

      {result && (
        <div className="bg-gray-50 p-4 rounded border text-sm space-y-2">
          {result.error ? (
            <div className="text-red-600">{result.error}</div>
          ) : (
            <>
              <div><strong>Method:</strong> {result.method}</div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <strong>Total demand:</strong> {result.demandKW} kW ({round2(result.demandKW * 1000)} VA)
                </div>
                <div>
                  <strong>Estimated current:</strong> {result.amps} A @ {voltage} V
                </div>
              </div>

              <div className="mt-2">
                <strong>Details:</strong>
                <pre className="text-xs bg-white p-2 rounded border mt-1 overflow-auto">
{JSON.stringify(result.details, null, 2)}
                </pre>
              </div>

              <div className="text-xs text-gray-600">
                Notes:
                <ol className="list-decimal ml-5">
                  <li>Small appliances (1.75–8.75 kW) may be handled using Column A/B (Note 3) — this is optionally applied to the small subset above.</li>
                  <li>Column C is used for ranges &gt; 8.75 kW with Note 1 & Note 2 adjustments applied as implemented above.</li>
                  <li>The alternate Note-2 toggle uses a non-standard averaging (average only ≥12 kW items) so you can match some older calculators — leave it OFF for the standard NEC behavior.</li>
                </ol>
              </div>
            </>
          )}
        </div>
      )}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-2">📘 NEC Table 220.55 Reference</h2>
        <iframe
          src="/pdfs/NEC_table220.55.pdf"
          width="100%"
          height="800px"
          style={{ border: "1px solid #ccc" }}
          title="NEC Table 9 PDF"
        />
      </div>
    </div>
    <Footer />
    </main>
    
  );
}
