import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";

/**
 Notes:
 1. Over 12 kW through 27 kW ranges all of same rating. For ranges individually rated more than 12 kW but not more than 27 kW,
 the maximum demand in Column C shall be increased 5 percent for each additional kilowatt of rating or major fraction thereof
 by which the rating of individual ranges exceeds 12 kW.
 2. Over 8¾ kW through 27 kW ranges of unequal ratings. For ranges individually rated more than 8¾ kW and of different ratings,
 but none exceeding 27 kW, an average value of rating shall be calculated by adding together the ratings of all ranges to obtain
 the total connected load (using 12 kW for any range rated less than 12 kW) and dividing by the total number of ranges. Then the
 maximum demand in Column C shall be increased 5 percent for each kilowatt or major fraction thereof by which this average
 value exceeds 12 kW.
 3. Over 1¾ kW through 8¾ kW. In lieu of the method provided in Column C, it shall be permissible to add the nameplate ratings
 of all household cooking appliances rated more than 1¾ kW but not more than 8¾ kW and multiply the sum by the demand
 factors specified in Column A or Column B for the given number of appliances. Where the rating of cooking appliances falls
 under both Column A and Column B, the demand factors for each column shall be applied to the appliances for that column, and
 the results added together.
 4. Branch-Circuit Load. It shall be permissible to calculate the branch-circuit load for one range in accordance with Table 220.55.
 */

const COLUMN_C_KW = [
  0, 8.0, 11.0, 14.0, 17.0, 20.0, 21.0, 21.0, 22.0, 23.0, 24.0,
  25.0, 26.0, 27.0, 28.0, 29.0, 30.0, 31.0, 32.0, 33.0, 34.0,
  35.0, 36.0, 37.0, 38.0, 39.0, 40.0
];

function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export default function ElectricRangeCalculator() {
  
  const [ranges, setRanges] = useState([{ id: Date.now(), name: "Range 1", kw: 12 }]);
  const [voltage, setVoltage] = useState(230);
  const [useNote3, setUseNote3] = useState(false);
  const [note3FactorPercent, setNote3FactorPercent] = useState(80);
  const [result, setResult] = useState(null);

  const addRange = () =>
    setRanges([...ranges, { id: Date.now() + Math.random(), name: `Range ${ranges.length + 1}`, kw: 12 }]);
  const updateRange = (id, field, value) =>
    setRanges(ranges.map(r => (r.id === id ? { ...r, [field]: value } : r)));
  const removeRange = (id) => setRanges(ranges.filter(r => r.id !== id));

  function lookupColumnC(n) {
    if (n <= 0) return 0;
    if (n < COLUMN_C_KW.length) return COLUMN_C_KW[n];
    return COLUMN_C_KW[COLUMN_C_KW.length - 1] + (n - (COLUMN_C_KW.length - 1));
  }

  useEffect(() => {
    const ks = ranges.map(r => Number(r.kw) || 0).filter(k => k > 0);
    const n = ks.length;
    if (n === 0) {
      setResult({ error: "Add at least one appliance with a rating (> 0 kW)." });
      return;
    }

    if (ks.some(k => k > 27)) {
      setResult({ error: "Appliance ratings exceed 27 kW — not permitted by NEC." });
      return;
    }

    const allBetween_1p75_and_8p75 = ks.every(k => k > 1.75 && k <= 8.75);

    if (useNote3 && allBetween_1p75_and_8p75) {
      const totalKW = ks.reduce((s, k) => s + k, 0);
      const demandKW = totalKW * (note3FactorPercent / 100.0);
      const amps = (demandKW * 1000) / voltage;
      setResult({
        method: "Note 3 (Column A/B style)",
        n,
        totalKW,
        demandKW: round2(demandKW),
        amps: round2(amps),
        note: "Note 3 applied automatically.",
      });
      return;
    }

    const baseCkw = lookupColumnC(n);
    const allSameRating = ks.every(k => Math.abs(k - ks[0]) < 1e-6);
    const allBetweenOver12And27 = ks.every(k => k > 12 && k <= 27);
    const anyOver8p75 = ks.some(k => k > 8.75);

    let factor = 1.0;
    let noteApplied = "";

    if (allSameRating && allBetweenOver12And27) {
      const rating = ks[0];
      const increments = Math.ceil(rating - 12);
      factor = 1 + 0.05 * increments;
      noteApplied = `Note 1 applied: all ranges same rating ${rating} kW → increase Column C by ${increments * 5}%`;
    } else if (anyOver8p75 && !ks.some(k => k > 27)) {
      const adjustedSum = ks.reduce((s, k) => s + (k < 12 ? 12 : k), 0);
      const avg = adjustedSum / n;
      if (avg > 12) {
        const increments = Math.ceil(avg - 12);
        factor = 1 + 0.05 * increments;
        noteApplied = `Note 2 applied: unequal ratings average = ${round2(avg)} kW → increase Column C by ${increments * 5}%`;
      } else {
        noteApplied = `Note 2 considered: average = ${round2(avg)} kW (≤12), no increase applied`;
      }
    } else {
      noteApplied = "No Note 1/2 increase required";
    }

    const demandKW = baseCkw * factor;
    const totalConnectedKW = ks.reduce((s, k) => s + k, 0);
    const amps = (demandKW * 1000) / voltage;

    setResult({
      method: "Table 220.55 Column C",
      n,
      baseCkw,
      factor,
      demandKW: round2(demandKW),
      totalConnectedKW: round2(totalConnectedKW),
      amps: round2(amps),
      noteApplied,
      details: { ratings: ks },
    });
  }, [ranges, voltage, useNote3, note3FactorPercent]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
    <main className="flex-grow">
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold">Electric Range Calculator (NEC Table 220.55 — Column C)</h2>
      <p className="text-sm text-gray-600">
        Add household cooking appliances (ranges, ovens, cooktops). This tool calculates automatically using Column C and applies Notes 1 & 2.
      </p>

      <div className="space-y-2">
        {ranges.map((r) => (
          <div key={r.id} className="grid grid-cols-12 gap-2 items-center">
            <input
              type="text"
              value={r.name}
              onChange={(e) => updateRange(r.id, "name", e.target.value)}
              className="col-span-5 border rounded p-2"
            />
            <input
              type="number"
              min="0"
              step="0.5"
              value={r.kw}
              onChange={(e) => updateRange(r.id, "kw", parseFloat(e.target.value))}
              className="col-span-4 border rounded p-2"
              placeholder="kW"
            />
            <span className="col-span-2 text-sm text-gray-700">{r.kw} kW</span>
            <button onClick={() => removeRange(r.id)} className="col-span-1 text-red-500">✕</button>
          </div>
        ))}

        <div className="flex gap-2">
          <button onClick={addRange} className="px-3 py-1 bg-green-100 text-green-700 rounded">+ Add appliance</button>
          <button onClick={() => setRanges([{ id: Date.now(), name: "Range 1", kw: 12 }])} className="px-3 py-1 bg-gray-100 rounded">Reset</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-center">
        <label>
          Supply Voltage
          <select value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} className="block w-full border p-2 rounded">
            <option value={120}>120 V</option>
            <option value={208}>208 V</option>
            <option value={230}>230 V</option>
            <option value={240}>240 V</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={useNote3} onChange={(e) => setUseNote3(e.target.checked)} />
          <span className="text-sm">Use Note 3 (apply Column A/B factor for small appliances)</span>
        </label>
      </div>

      {useNote3 && (
        <div className="grid grid-cols-2 gap-4">
          <label>
            Note 3 demand factor (%) — apply to total kW
            <input type="number" value={note3FactorPercent} onChange={(e) => setNote3FactorPercent(Number(e.target.value))} className="w-full border p-2 rounded mt-1" />
          </label>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="bg-gray-50 p-4 rounded border">
          {result.error ? (
            <div className="text-red-600">{result.error}</div>
          ) : (
            <div className="text-sm space-y-1">
              <div><strong>Method:</strong> {result.method}</div>
              <div><strong>Appliances:</strong> {result.n}</div>
              <div><strong>Ratings (kW each):</strong> {result.details?.ratings?.join(", ")}</div>
              <div><strong>Total connected kW:</strong> {result.totalConnectedKW} kW</div>
              {result.baseCkw && <div><strong>Base Column C (kW):</strong> {result.baseCkw}</div>}
              <div><strong>Adjustment factor:</strong> {result.factor} ({result.noteApplied})</div>
              <div><strong>Calculated Demand:</strong> {result.demandKW} kW — {round2(result.demandKW * 1000)} VA</div>
              <div><strong>Estimated current:</strong> {result.amps} A @ {voltage} V</div>
              {result.note && <div className="mt-2 text-sm text-gray-600">{result.note}</div>}
            </div>
          )}
        </div>
      )}

      <div className="text-xs text-gray-500 mt-2">
        Notes:
        <ol className="list-decimal ml-5">
          <li>Uses Table 220.55 Column C by default. Note 3 (Column A/B) is optional and only permitted for appliances ≤ 8.75 kW.</li>
          <li>Note 1: For ranges individually rated &gt;12 kW (and all same rating), increase Column C by 5% per kW (or major fraction) above 12 kW.</li>
          <li>Note 2: For ranges &gt;8.75 kW of unequal ratings (none &gt;27 kW), average using 12 kW for any rating &lt;12, then increase Column C by 5% per kW average exceeds 12 kW.</li>
          <li>This tool is a design aid — always verify against the NEC table in your code edition and consult a licensed electrical engineer for final designs.</li>
        </ol>
      </div>
      
     
    </div>
    </main>
     <Footer />
    </div>
  );
}
