import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

const COLUMN_C_KW = [
  8.0, 11.0, 14.0, 17.0, 20.0, 21.0, 22.0, 23.0, 24.0,
  25.0, 26.0, 27.0, 28.0, 29.0, 30.0, 31.0, 32.0, 33.0,
  34.0, 35.0, 36.0, 37.0, 38.0, 39.0, 40.0,
];
const COLUMN_A_FACTORS = {
  1: 0.8, 2: 0.75, 3: 0.7, 4: 0.66, 5: 0.62,
  6: 0.59, 7: 0.56, 8: 0.53, 9: 0.51, 10: 0.49,
  11: 0.47, 12: 0.45, 13: 0.43, 14: 0.41, 15: 0.4,
  16: 0.39, 17: 0.38, 18: 0.37, 19: 0.36, 20: 0.35,
  21: 0.34, 22: 0.33, 23: 0.32, 24: 0.31, 25: 0.3,
};
const COLUMN_B_FACTORS = {
  1: 0.8, 2: 0.65, 3: 0.55, 4: 0.5, 5: 0.45,
  6: 0.43, 7: 0.4, 8: 0.36, 9: 0.35, 10: 0.34,
  11: 0.32, 12: 0.32, 13: 0.32, 14: 0.32, 15: 0.32,
  16: 0.28, 17: 0.28, 18: 0.28, 19: 0.28, 20: 0.28,
  21: 0.26, 22: 0.26, 23: 0.26, 24: 0.26, 25: 0.26,
};

function lookupColumnC(n) {
  if (n <= 0) return 0;
  if (n <= COLUMN_C_KW.length) return COLUMN_C_KW[n - 1];
  if (n >= 26 && n <= 40) return 15 + n;
  if (n >= 41) return 25 + n * 0.75;
  return 0;
}
function lookupColumnA(n) {
  if (COLUMN_A_FACTORS[n]) return COLUMN_A_FACTORS[n];
  return 0.3;
}
function lookupColumnB(n) {
  if (COLUMN_B_FACTORS[n]) return COLUMN_B_FACTORS[n];
  if (n >= 26 && n <= 30) return 0.24;
  if (n >= 31 && n <= 40) return 0.22;
  if (n >= 41 && n <= 50) return 0.2;
  if (n >= 51 && n <= 60) return 0.18;
  if (n >= 61) return 0.16;
  return 0.26;
}
function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export default function ElectricRangeCalculator() {
  const [rooms, setRooms] = useState([
    {
      id: Date.now(),
      name: "Room 1",
      appliances: [{ id: Math.random(), type: "Range", kw: 12, qty: 1 }],
    },
  ]);
  const [voltage, setVoltage] = useState(230);
  const [result, setResult] = useState(null);

  const addRoom = () =>
    setRooms([
      ...rooms,
      {
        id: Date.now() + Math.random(),
        name: `Room ${rooms.length + 1}`,
        appliances: [{ id: Math.random(), type: "Range", kw: 12, qty: 1 }],
      },
    ]);

  const removeRoom = (id) => setRooms(rooms.filter((r) => r.id !== id));

  const addAppliance = (roomId) =>
    setRooms(
      rooms.map((r) =>
        r.id === roomId
          ? {
              ...r,
              appliances: [
                ...r.appliances,
                { id: Math.random(), type: "Range", kw: 12, qty: 1 },
              ],
            }
          : r
      )
    );

  const updateAppliance = (roomId, appId, field, value) =>
    setRooms(
      rooms.map((r) =>
        r.id === roomId
          ? {
              ...r,
              appliances: r.appliances.map((a) =>
                a.id === appId ? { ...a, [field]: value } : a
              ),
            }
          : r
      )
    );

  const removeAppliance = (roomId, appId) =>
    setRooms(
      rooms.map((r) =>
        r.id === roomId
          ? { ...r, appliances: r.appliances.filter((a) => a.id !== appId) }
          : r
      )
    );

  const reset = () =>
    setRooms([
      {
        id: Date.now(),
        name: "Room 1",
        appliances: [{ id: Math.random(), type: "Range", kw: 12, qty: 1 }],
      },
    ]);

  useEffect(() => {
    const working = [];
    const roomSummaries = [];

    for (const room of rooms) {
      let expanded = room.appliances.flatMap((a) =>
        Array.from({ length: Number(a.qty) || 0 }, () => ({
          type: a.type,
          kw: Number(a.kw) || 0,
          room: room.name,
        }))
      );

      // --- Note 6 combination logic per room ---
      const cooktops = expanded.filter((a) => a.type === "Cooktop");
      const ovens = expanded.filter((a) => a.type === "Wall Oven");
      const combinedGroups = [];

      if (cooktops.length >= 1 && ovens.length > 0) {
        const maxGroups = Math.min(cooktops.length, Math.ceil(ovens.length / 2));
        const usedCooktops = cooktops.slice(0, maxGroups);
        const usedOvens = ovens.slice(0, maxGroups * 2);
        const remaining = expanded.filter(
          (a) => !usedCooktops.includes(a) && !usedOvens.includes(a)
        );

        for (let i = 0; i < maxGroups; i++) {
          const ckw = usedCooktops[i]?.kw || 0;
          const ovensForThis = usedOvens.slice(i * 2, i * 2 + 2);
          const okw = ovensForThis.reduce((s, o) => s + o.kw, 0);
          const total = round2(ckw + okw);
          combinedGroups.push({
            room: room.name,
            combinedKW: total,
            components: [
              `Cooktop ${ckw} kW`,
              ...ovensForThis.map((o) => `Oven ${o.kw} kW`),
            ],
          });
        }

        expanded = [
          ...remaining,
          ...combinedGroups.map((g) => ({
            type: "Range",
            kw: g.combinedKW,
            room: room.name,
          })),
        ];
      }

      roomSummaries.push({
        room: room.name,
        applianceCount: expanded.length,
        note6Applied: combinedGroups.length > 0,
        combined: combinedGroups,
      });

      working.push(...expanded);
    }

    if (working.length === 0) {
      setResult({ error: "No appliances added." });
      return;
    }

    if (working.some((a) => a.kw <= 1.75)) {
      setResult({
        error:
          "One or more appliances ≤1.75 kW — NEC Table 220.55 applies only to >1.75 kW.",
      });
      return;
    }

    if (working.some((a) => a.kw > 27)) {
      setResult({
        error:
          "One or more appliances exceed 27 kW — not permitted by NEC Table 220.55.",
      });
      return;
    }

    // --- Note 5 ---
    if (
      working.length === 1 &&
      ["Wall Oven", "Cooktop"].includes(working[0].type)
    ) {
      const kW = working[0].kw;
      setResult({
        method: "Note 5 — single wall oven or single cooktop = nameplate rating",
        demandKW: kW,
        amps: round2((kW * 1000) / voltage),
        details: { ratings: [kW], roomSummaries },
      });
      return;
    }

    // Split small/large
    const small = working.filter((a) => a.kw > 1.75 && a.kw <= 8.75);
    const large = working.filter((a) => a.kw > 8.75);
    const allSmall = working.every((a) => a.kw <= 8.75);

    // --- Note 3 ---
    let smallDemandKW = 0;
    let smallFactorsUsed = {};
    if (small.length > 0 || allSmall) {
      const columnA = small.filter((a) => a.kw < 3.5);
      const columnB = small.filter((a) => a.kw >= 3.5);
      const sumA = columnA.reduce((s, it) => s + it.kw, 0);
      const sumB = columnB.reduce((s, it) => s + it.kw, 0);
      const fA = lookupColumnA(columnA.length);
      const fB = lookupColumnB(columnB.length);
      smallDemandKW = sumA * fA + sumB * fB;
      smallFactorsUsed = {
        columnA: { n: columnA.length, sumKW: round2(sumA), factor: fA , demand: round2(sumA * fA)},
        columnB: { n: columnB.length, sumKW: round2(sumB), factor: fB, demand: round2(sumB * fB)},
      };
    }

    // --- Notes 1–2 ---
    const nC = large.length;
    let baseC = 0;
    let factorC = 1;
    let noteC = "Column C (no adj.)";
    if (nC > 0) {
      baseC = lookupColumnC(nC);
      const ratings = large.map((a) => a.kw);
      const allSame = ratings.every((r) => Math.abs(r - ratings[0]) < 1e-6);
      if (allSame && ratings[0] > 12) {
        const inc = Math.ceil(ratings[0] - 12);
        factorC = 1 + 0.05 * inc;
        noteC = `Note 1: ${ratings[0]} kW (+${inc * 5}%)`;
      } else {
        const ge12 = ratings.filter((r) => r >= 12);
        const avg = ge12.length
          ? ge12.reduce((s, r) => s + r, 0) / ge12.length
          : 12;
        const inc = Math.max(0, Math.ceil(avg - 12));
        factorC = 1 + 0.05 * inc;
        noteC =
          inc > 0
            ? `Note 2: avg ${round2(avg)} kW (+${inc * 5}%)`
            : "Note 2 (no increase)";
      }
    }

    const colCDemand = round2(baseC * factorC);
    const totalKW = round2(colCDemand + smallDemandKW);
    const amps = round2((totalKW * 1000) / voltage);

    setResult({
      method: allSmall
        ? "All small → Note 3 (Columns A/B)"
        : "Small → Columns A/B; Large → Column C (Notes 1–2)",
      demandKW: totalKW,
      amps,
      details: {
        expandedCount: working.length,
        roomSummaries,
        "≥1.75 through ≤8.75 kW ": smallFactorsUsed, // ✅ now includes count, sumKW, factor
        subTotal: round2(smallDemandKW),
        "Column C": { n: nC, baseC, factor: factorC, note: noteC, demand: colCDemand },
        netTotal : round2(totalKW),
      },
    });
  }, [rooms, voltage]);

  return (
    <main>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow space-y-6">
        <h2 className="text-2xl font-bold">Electric Range Calculator (NEC Table 220.55)</h2>

        {rooms.map((room) => (
          <div key={room.id} className="border rounded p-4 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{room.name}</h3>
              {rooms.length > 1 && (
                <button
                  className="text-red-500 text-sm"
                  onClick={() => removeRoom(room.id)}
                >
                  ✕ Remove Room
                </button>
              )}
            </div>

            {room.appliances.length > 0 && (
              <div className="grid grid-cols-12 gap-2 text-xs font-semibold border-b pb-1">
                <div className="col-span-3">Name</div>
                <div className="col-span-3">kW</div>
                <div className="col-span-2">Qty</div>
                <div className="col-span-3">Total kW</div>
                <div className="col-span-1">Remove</div>
              </div>
            )}

            {room.appliances.map((a) => (
              <div key={a.id} className="grid grid-cols-12 gap-2 items-center mb-1">
                <select
                  value={a.type}
                  onChange={(e) =>
                    updateAppliance(room.id, a.id, "type", e.target.value)
                  }
                  className="col-span-3 border rounded p-2"
                >
                  <option value="Range">Range</option>
                  <option value="Cooktop">Cooktop</option>
                  <option value="Wall Oven">Wall Oven</option>
                </select>

                <input
                  type="number"
                  step="0.25"
                  value={a.kw}
                  onChange={(e) =>
                    updateAppliance(room.id, a.id, "kw", parseFloat(e.target.value || 0))
                  }
                  className="col-span-3 border rounded p-2"
                  placeholder="kW"
                />

                <input
                  type="number"
                  min="0"
                  value={a.qty}
                  onChange={(e) =>
                    updateAppliance(room.id, a.id, "qty", parseInt(e.target.value || 0))
                  }
                  className="col-span-2 border rounded p-2"
                  placeholder="Qty"
                />

                <span className="col-span-3 text-sm">
                  {a.kw} kW × {a.qty}
                </span>
                <button
                  onClick={() => removeAppliance(room.id, a.id)}
                  className="col-span-1 text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              onClick={() => addAppliance(room.id)}
              className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm"
            >
              + Add Appliance
            </button>
          </div>
        ))}

        <div className="flex gap-2">
          <button
            onClick={addRoom}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm"
          >
            + Add Room
          </button>
          <button
            onClick={reset}
            className="px-3 py-1 bg-gray-100 rounded text-sm"
          >
            Reset
          </button>
        </div>

        <label className="block mt-4">
          Supply Voltage
          <select
            value={voltage}
            onChange={(e) => setVoltage(Number(e.target.value))}
            className="block w-full border p-2 rounded mt-1"
          >
            <option value={120}>120 V</option>
            <option value={208}>208 V</option>
            <option value={230}>230 V</option>
            <option value={240}>240 V</option>
          </select>
        </label>

        {result && (
          <div className="bg-gray-50 p-4 rounded border text-sm space-y-3">
            {result.error ? (
              <div className="text-red-600">{result.error}</div>
            ) : (
              <>
                <div><strong>Method:</strong> {result.method}</div>
                <div><strong>Calculated Load:</strong> {result.demandKW} kW ({round2(result.demandKW * 1000)} VA)</div>
                <div><strong>Estimated Current:</strong> {result.amps} A @ {voltage} V</div>

                <div className="mt-3">
                  <strong>Combined Cooktop and Wall Oven (Note 6):</strong>
                  <table className="w-full text-xs mt-1 border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-2 py-1">Room</th>
                        <th className="border px-2 py-1">Appliances (after Note 6)</th>
                        <th className="border px-2 py-1">Combined (kW)</th>
                        <th className="border px-2 py-1">Note 6 Applied</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.details.roomSummaries.map((r, i) => (
                        <tr key={i}>
                          <td className="border px-2 py-1 align-top">{r.room}</td>
                          <td className="border px-2 py-1">
                            {r.combined.length > 0
                              ? r.combined.map((g, j) => (
                                  <div key={j}>{g.components.join(" + ")}</div>
                                ))
                              : "—"}
                          </td>
                          <td className="border px-2 py-1 text-center">
                            {r.combined.map((g) => g.combinedKW).join(", ") || "—"}
                          </td>
                          <td className="border px-2 py-1 text-center">
                            {r.note6Applied ? "✅" : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3">
                  <strong>Details:</strong>
                  <pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-80">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </div>
              </>
            )}
          </div>
        )}
        <p className="text-xs text-gray-600">
            Note: This tool is only a design aid. Always verify final calculations with the National Electrical Code (NEC) and a licensed electrical engineer.
        </p>
        <div className="mt-10">
          <h2 className="text-lg font-bold mb-2">📘 NEC Table 220.55 Reference</h2>
          <iframe
            src="/pdfs/NEC_table220.55.pdf"
            width="100%"
            height="800px"
            style={{ border: "1px solid #ccc" }}
            title="NEC Table 220.55"
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
