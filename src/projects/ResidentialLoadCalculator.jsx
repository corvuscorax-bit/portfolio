import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import Footer from "../components/Footer";

/**
 * ResidentialLoadCalculator - single-file React component
 * - supports Standard (Part III) and Optional (Part IV) methods
 * - HVAC heating/cooling split (larger used)
 * - EV loads excluded from demand-factor application
 * - add/remove loads for Other, HVAC heating, HVAC cooling, EV
 * - breaker suggestion + CSV & PDF export
 *
 * Styling uses simple Tailwind utility classes (white bg / black text).
 */

function LabelFields() {
  return (
    <section className="grid grid-cols-4 gap-4 text-center">
      <div className="text-sm font-semibold text-gray-700">Name</div>
      <div className="text-sm font-semibold text-gray-700">VA</div>
      <div className="text-sm font-semibold text-gray-700">Qty.</div>
    </section>
  );
}



function LoadSection({ title, loads, setLoads }) {
  const updateField = (id, field, value) =>
    setLoads(loads.map((l) => (l.id === id ? { ...l, [field]: value } : l)));

  const addLoad = () =>
    setLoads([...loads, { id: Date.now(), name: "New Load", va: 0, qty: 0 }]);

  const removeLoad = (id) => setLoads(loads.filter((l) => l.id !== id));

  const total = loads.reduce(
    (s, l) => s + (Number(l.va) || 0) * (Number(l.qty) || 0),
    0
  );

  return (
    <section className="border p-4 rounded mb-6 bg-white">
      <h3 className="font-semibold mb-3">{title}</h3>
      <LabelFields/>

      {loads.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-12 gap-2 items-center mb-2"
          aria-label={`${title} row ${item.name}`}
        >
          <input
            type="text"
            value={item.name}
            onChange={(e) => updateField(item.id, "name", e.target.value)}
            className="col-span-4 border p-1 rounded"
          />
          <input
            type="number"
            min={0}
            value={item.va}
            onChange={(e) => updateField(item.id, "va", +e.target.value)}
            className="col-span-3 border p-1 rounded"
            placeholder="VA"
          />
          <input
            type="number"
            min={0}
            value={item.qty}
            onChange={(e) => updateField(item.id, "qty", +e.target.value)}
            className="col-span-2 border p-1 rounded"
            placeholder="qty"
          />
          <span className="col-span-2 text-right">
            {((Number(item.va) || 0) * (Number(item.qty) || 0)).toLocaleString()} VA
          </span>
          <button
            onClick={() => removeLoad(item.id)}
            className="col-span-1 text-red-500 text-lg"
            title="Remove"
          >
            ✕
          </button>
        </div>
      ))}

      <div className="flex justify-between items-center mt-2">
        <button
          onClick={addLoad}
          className="px-3 py-1 rounded bg-green-100 text-green-700 border border-green-500 hover:bg-green-200"
        >
          + Add equipment
        </button>
        <span className="font-medium">Total: {total.toLocaleString()} VA</span>
      </div>
    </section>
  );
}

function roundBreaker(amps) {
  // Round up amps to next standard breaker size
  const a = Math.ceil(Number(amps) || 0);
  const sizes = [
    6, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200, 225, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000,
  1200, 1600, 2000, 2500, 3000, 4000, 5000, 6000
  ];
  const found = sizes.find((s) => s >= a);
  return found ? `${found} A` : `> ${sizes[sizes.length - 1]} A (special)`;
}

function buildCSV({
  meta,
  generalBaseVA,
  otherVA,
  heatingVA,
  coolingVA,
  hvacVA,
  evVA,
  demandAppliedVA,
  amps,
  method,
  demand,
  loadsAll,
}) {
  const rows = [];
  rows.push(["Report", "Residential Electrical Load Calculation"]);
  rows.push([]);
  rows.push(["Method", method === "standard" ? "NEC 220 Part III (Standard)" : "NEC 220 Part IV (Optional)"]);
  rows.push(["System Voltage (V)", meta.voltage]);
  rows.push(["Unit", meta.unit === "sqm" ? "m²" : "ft²"]);
  rows.push(["Floor Area", meta.floorArea]);
  rows.push(["VA per unit", meta.vaPerUnit]);
  rows.push([]);
  rows.push(["General group (lighting + small appliance + laundry)", generalBaseVA]);
  rows.push(["Other fixed loads (sum)", otherVA]);
  rows.push(["Heating total", heatingVA]);
  rows.push(["Cooling total", coolingVA]);
  rows.push(["HVAC used (larger)", hvacVA]);
  rows.push(["EV loads (excluded from demand)", evVA]);
  rows.push([]);
  rows.push(["Demand settings", `firstVA=${demand.firstVA}, firstPct=${demand.firstPct}, remainderPct=${demand.remainderPct}`]);
  rows.push(["Total Demand Load (VA)", Math.round(demandAppliedVA)]);
  rows.push(["Calculated Current (A)", amps.toFixed(2)]);
  rows.push(["Recommended Breaker", roundBreaker(amps)]);
  rows.push([]);
  rows.push(["--- Detailed Loads ---"]);
  rows.push(["Category", "Name", "VA", "Qty", "Total (VA)"]);

  // append loads
  Object.entries(loadsAll).forEach(([cat, arr]) => {
    if (arr.length === 0) return;
    rows.push([cat.toUpperCase()]);
    arr.forEach((l) => {
      rows.push([cat, l.name, l.va, l.qty, (Number(l.va) || 0) * (Number(l.qty) || 0)]);
    });
  });

  // Convert to CSV string
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  return csv;
}

export default function ResidentialLoadCalculator() {
    
    const [menuOpen, setMenuOpen] = useState(false);

  // Units & basic settings
  const [unit, setUnit] = useState("sqm"); // "sqm" or "sqft"
  const [general, setGeneral] = useState({
    floorArea: 0,
    vaPerSqm: 33,
    vaPerSqft: 3,
    smallApplianceCircuits: 2,
    laundryCircuits: 1,
  });
  const [voltage, setVoltage] = useState(230);

  // Method select
  const [method, setMethod] = useState("standard"); // "standard" or "optional"

  // Loads
  const [heating, setHeating] = useState([
    { id: 1, name: "Electric space heater", va: 1500, qty: 0 },
    { id: 2, name: "Heat pump / Furnace", va: 6000, qty: 0 },
  ]);
  const [cooling, setCooling] = useState([{ id: 1, name: "Air conditioner", va: 4000, qty: 0 }]);
  const [otherLoads, setOtherLoads] = useState([
    { id: 1, name: "Range", va: 8000, qty: 1 },
    { id: 2, name: "Dryer", va: 5000, qty: 1 },
    { id: 3, name: "Dishwasher", va: 1200, qty: 1 },
    { id: 4, name: "Microwave", va: 900, qty: 1 },
    { id: 5, name: "Range hood", va: 600, qty: 1 },
  ]);
  const [evLoads, setEvLoads] = useState([{ id: 1, name: "EV Charger", va: 9600, qty: 0 }]);

  // Demand factor settings (editable; defaults depend on method)
  const [demand, setDemand] = useState({
    firstVA: 10000,
    firstPct: 100,
    remainderPct: 40,
  });
  
  const [showTables, setShowTables] = useState(false);

  // When method changes, pre-fill sensible defaults but keep editable
  useEffect(() => {
    if (method === "standard") {
      setDemand({ firstVA: 3000, firstPct: 100, remainderPct: 35 }); // remainderPct used as 35% for the middle block (NEC special handling applied in calc)
    } else {
      setDemand({ firstVA: 10000, firstPct: 100, remainderPct: 40 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method]);

  // --- CALCULATIONS ---
  const perAreaVA = unit === "sqm" ? general.vaPerSqm : general.vaPerSqft;
  const floorVA = (Number(general.floorArea) || 0) * (Number(perAreaVA) || 0);

  // general group = lighting + small appliance circuits + laundry circuits
  const generalBaseVA =
    floorVA +
    (Number(general.smallApplianceCircuits) || 0) * 1500 +
    (Number(general.laundryCircuits) || 0) * 1500;

  // other fixed loads (these are treated as fixed appliances / other loads)
  const otherVA = otherLoads.reduce((s, l) => s + (Number(l.va) || 0) * (Number(l.qty) || 0), 0);

  // HVAC: use larger of heating or cooling (NEC)
  const heatingVA = heating.reduce((s, l) => s + (Number(l.va) || 0) * (Number(l.qty) || 0), 0);
  const coolingVA = cooling.reduce((s, l) => s + (Number(l.va) || 0) * (Number(l.qty) || 0), 0);
  const hvacVA = Math.max(heatingVA, coolingVA);

  // EV loads are excluded from demand factors and added separately
  const evVA = evLoads.reduce((s, l) => s + (Number(l.va) || 0) * (Number(l.qty) || 0), 0);

  // Final demand calculation depending on method
  let demandAppliedVA = 0;
  let breakdown = {};

  if (method === "standard") {
    // NEC 220 Part III (Standard)
    // Apply NEC lighting demand table ONLY to generalBaseVA
    const g = generalBaseVA;
    const first3000 = Math.min(3000, g);
    const between3001and120000 = Math.max(0, Math.min(120000, g) - 3000);
    const above120000 = Math.max(0, g - 120000);

    const generalDemand =
      first3000 * 1.0 +
      between3001and120000 * 0.35 +
      above120000 * 0.25;

    // After demand applied to general group, add fixed appliances (otherVA), HVAC (hvacVA), and EV loads (evVA)
    demandAppliedVA = generalDemand + otherVA + hvacVA + evVA;

    breakdown = {
      method: "NEC 220 Part III (Standard)",
      generalBaseVA: g,
      generalDemand,
      first3000,
      between3001and120000,
      above120000,
      otherVA,
      hvacVA,
      evVA,
    };
  } else {
    // NEC 220 Part IV (Optional)
    // Treat generalBaseVA + otherVA together (exclude EV and HVAC), apply firstVA @ firstPct, remainder @ remainderPct
    const baseLoad = generalBaseVA + otherVA;
    const first = Number(demand.firstVA) || 10000;
    const firstPct = Number(demand.firstPct) || 100;
    const remPct = Number(demand.remainderPct) || 40;

    let demandBase = 0;
    if (baseLoad <= first) {
      demandBase = baseLoad * (firstPct / 100);
    } else {
      demandBase = first * (firstPct / 100) + (baseLoad - first) * (remPct / 100);
    }

    // Add HVAC and EV (both added after demandBase)
    demandAppliedVA = demandBase + hvacVA + evVA;

    breakdown = {
      method: "NEC 220 Part IV (Optional)",
      baseLoad,
      demandBase,
      hvacVA,
      evVA,
      firstVA: first,
      firstPct,
      remainderPct: remPct,
    };
  }

  const amps = demandAppliedVA / (Number(voltage) || 230);
  const suggestedBreaker = roundBreaker(amps/0.8); // 80% rule

  // For CSV export include all loads grouped
  const loadsAll = {
    general: [
      { name: "Floor Area", va: floorVA, qty: 1 },
      { name: "Small Appliance Circuits", va: (Number(general.smallApplianceCircuits) || 0) * 1500, qty: 1 },
      { name: "Laundry Circuits", va: (Number(general.laundryCircuits) || 0) * 1500, qty: 1 },
    ],
    other: otherLoads,
    heating,
    cooling,
    ev: evLoads,
  };

  const meta = {
    unit,
    floorArea: general.floorArea,
    vaPerUnit: perAreaVA,
    voltage,
    method,
  };

  function handleExportCSV() {
    const csv = buildCSV({
      meta,
      generalBaseVA,
      otherVA,
      heatingVA,
      coolingVA,
      hvacVA,
      evVA,
      demandAppliedVA,
      amps,
      method,
      demand,
      loadsAll,
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `electrical-load-${method}-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleExportPDF() {
    try {
      const doc = new jsPDF({ unit: "pt" });
      doc.setFontSize(14);
      doc.text("Electrical Load Calculation Report", 40, 40);
      doc.setFontSize(10);

      let y = 70;
      const push = (label, value) => {
        doc.text(`${label}: ${value}`, 40, y);
        y += 14;
        if (y > 760) {
          doc.addPage();
          y = 40;
        }
      };

      push("Method", breakdown.method || method);
      push("Voltage (V)", voltage);
      push("Unit", unit === "sqm" ? "m²" : "ft²");
      push("Floor area", general.floorArea);
      push("VA per unit", perAreaVA);

      doc.text("---- Subtotals ----", 40, y);
      y += 16;
      push("General Loads (General Lighting & Receptacles + Small Appliance + Laundry) VA", Math.round(generalBaseVA));
      push("Other fixed loads (VA)", Math.round(otherVA));
      push("Heating (VA)", Math.round(heatingVA));
      push("Cooling (VA)", Math.round(coolingVA));
      push("HVAC used (VA)", Math.round(hvacVA));
      push("EV loads (VA)", Math.round(evVA));

      doc.text("---- Demand application ----", 40, y);
      y += 16;
      if (method === "standard") {
        push("General demand (after table)", Math.round(breakdown.generalDemand));
        push("Added other loads", Math.round(breakdown.otherVA));
      } else {
        push("Base load for demand", Math.round(breakdown.baseLoad));
        push(`Demand result (first ${breakdown.firstVA} @ ${demand.firstPct}%, remainder @ ${demand.remainderPct}%)`, Math.round(breakdown.demandBase));
      }

      push("Total Demand Load (VA)", Math.round(demandAppliedVA));
      push("Calculated Current (A)", amps.toFixed(2));
      push("Suggested Breaker", suggestedBreaker);

      doc.save(`electrical-load-${method}-${Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF export failed", err);
      alert("PDF export failed. Make sure jsPDF is installed.");
    }
  }

  const fmt = (n) => (Number.isFinite(n) ? n.toLocaleString() : "0");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        <main className="flex-grow">
            <div className="bg-white text-black max-w-auto mx-auto p-6 space-y-6">
            {/* Header with Logo + Title + Hamburger Menu */}
                <div className="flex items-center justify-between mb-6 relative">
                <div className="flex items-center space-x-3">
                    <div>
                    <h2 className="text-3xl font-bold">Residential Load Calculator</h2>
                    </div>
                </div>
                </div>

            {/* Settings */}
            <section className="border p-4 rounded">
                <h2 className="font-semibold mb-3">Settings</h2>
                <div className="grid grid-cols-2 gap-4">
                <label>
                    Calculation Method
                    <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full border p-2 rounded"
                    >
                    <option value="standard">NEC 220 Part III (Standard)</option>
                    <option value="optional">NEC 220 Part IV (Optional)</option>
                    </select>
                </label>

                <label>
                    Floor Area Unit
                    <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full border p-2 rounded"
                    >
                    <option value="sqm">Square meters (33 VA/m²)</option>
                    <option value="sqft">Square feet (3 VA/ft²)</option>
                    </select>
                </label>

                <label>
                    System Voltage
                    <select
                    value={voltage}
                    onChange={(e) => setVoltage(+e.target.value)}
                    className="w-full border p-2 rounded"
                    >
                    <option value={120}>120 V</option>
                    <option value={230}>230 V</option>
                    <option value={240}>240 V</option>
                    </select>
                </label>

                <label>
                    Base demand setting
                    <div className="flex gap-2 mt-2">
                    <input
                        type="number"
                        min={0}
                        value={demand.firstVA}
                        onChange={(e) => setDemand({ ...demand, firstVA: +e.target.value })}
                        className="w-1/2 border p-2 rounded"
                    />
                    <input
                        type="number"
                        min={0}
                        value={demand.remainderPct}
                        onChange={(e) => setDemand({ ...demand, remainderPct: +e.target.value })}
                        className="w-1/2 border p-2 rounded"
                    />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">(first VA & remainder % — defaults set by method)</div>
                </label>
                </div>
            </section>

            {/* General Load */}
            <section className="border p-4 rounded">
                <h2 className="font-semibold mb-3">General Load</h2>
                <div className="grid grid-cols-2 gap-3">
                <label>
                    Floor Area ({unit === "sqm" ? "m²" : "ft²"})
                    <input
                    type="number"
                    min={0}
                    value={general.floorArea}
                    onChange={(e) => setGeneral({ ...general, floorArea: +e.target.value })}
                    className="w-full border p-2 rounded"
                    />
                </label>
                <label>
                    VA per {unit === "sqm" ? "m²" : "ft²"}
                    <input
                    type="number"
                    min={0}
                    value={unit === "sqm" ? general.vaPerSqm : general.vaPerSqft}
                    onChange={(e) =>
                        setGeneral(
                        unit === "sqm"
                            ? { ...general, vaPerSqm: +e.target.value }
                            : { ...general, vaPerSqft: +e.target.value }
                        )
                    }
                    className="w-full border p-2 rounded"
                    />
                </label>
                <label>
                    Small Appliance Circuits
                    <input
                    type="number"
                    min={0}
                    value={general.smallApplianceCircuits}
                    onChange={(e) => setGeneral({ ...general, smallApplianceCircuits: +e.target.value })}
                    className="w-full border p-2 rounded"
                    />
                    <div className="text-xs text-gray-600 mt-1">(minimum 2 required)</div>
                </label>
                <label>
                    Laundry Circuits
                    <input
                    type="number"
                    min={0}
                    value={general.laundryCircuits}
                    onChange={(e) => setGeneral({ ...general, laundryCircuits: +e.target.value })}
                    className="w-full border p-2 rounded"
                    />
                    <div className="text-xs text-gray-600 mt-1">(minimum 1 required)</div>
                </label>
                </div>

                <p className="mt-2 font-medium">General Loads (General Lighting & Receptacles + Small Appliance + Laundry): {fmt(generalBaseVA)} VA</p>
            </section>

            {/* Other Loads (before HVAC) */}
            <LoadSection title="Other Electrical Loads" loads={otherLoads} setLoads={setOtherLoads} />

            {/* HVAC */}
            <section className="border p-4 rounded bg-gray-50">
                <h2 className="text-xl font-semibold mb-4">HVAC Loads</h2>
                <LoadSection title="🔥 Heating" loads={heating} setLoads={setHeating} />
                <LoadSection title="❄️ Cooling" loads={cooling} setLoads={setCooling} />
                <p className="mt-2 font-medium">Heating: {fmt(heatingVA)} VA • Cooling: {fmt(coolingVA)} VA</p>
                <p className="font-medium">HVAC used (larger): {fmt(hvacVA)} VA</p>
            </section>

            {/* EV Charging */}
            <LoadSection title="EV Charging (excluded from demand factors)" loads={evLoads} setLoads={setEvLoads} />

            {/* Final Calculation + Explanations */}
            <section className="border p-4 rounded bg-gray-50">
                <h2 className="font-semibold mb-3">Final Calculation</h2>

                {method === "standard" ? (
                <>
                    <p>NEC Standard (Part III): demand applied only to general group (lighting + SA + laundry)</p>
                    <p>First 3,000 VA = {fmt(breakdown.first3000)} VA</p>
                    <p>3001–120,000 portion = {fmt(breakdown.between3001and120000)} VA @ 35%</p>
                    {breakdown.above120000 > 0 && <p>Above 120,000 portion = {fmt(breakdown.above120000)} VA @ 25%</p>}
                    <p>General demand result = {fmt(breakdown.generalDemand)} VA</p>
                    <p>Other fixed loads (added after) = {fmt(breakdown.otherVA)} VA</p>
                    <p>HVAC added (larger of heat/cool) = {fmt(breakdown.hvacVA)} VA</p>
                    <p>EV loads (excluded from demand) = {fmt(breakdown.evVA)} VA</p>
                </>
                ) : (
                <>
                    <p>NEC Optional (Part IV): general + fixed loads combined for demand factor</p>
                    <p>Base (general + other fixed) = {fmt(breakdown.baseLoad)}</p>
                    <p>Demand rule: first {fmt(breakdown.firstVA)} VA @ {demand.firstPct}%, remainder @ {demand.remainderPct}% → demand result = {fmt(breakdown.demandBase)}</p>
                    <p>HVAC added (larger of heat/cool) = {fmt(breakdown.hvacVA)} VA</p>
                    <p>EV loads (excluded from demand) = {fmt(breakdown.evVA)} VA</p>
                </>
                )}

                <hr className="my-3" />

                <h3 className="font-bold">Total Demand Load: {fmt(Math.round(demandAppliedVA))} VA</h3>
                <h3 className="font-bold">Estimated Current: { (demandAppliedVA / voltage).toFixed(1) } A (at {voltage} V)</h3>
                <h3 className="font-bold text-blue-600">Suggested Breaker: {suggestedBreaker}</h3>

                <div className="mt-4 flex gap-3 text-gray-700">
                <button onClick={handleExportCSV} className="px-3 py-1 rounded bg-green-100 border border-green-500 hover:bg-green-200">
                    Export CSV
                </button>
                <button onClick={handleExportPDF} className="px-3 py-1 rounded bg-blue-100 border border-blue-500 hover:bg-blue-200">
                    Export PDF
                </button>
                </div>
            </section>

            <p className="text-xs text-gray-600">
                Note: This tool is only a design aid. Always verify final designs with the National Electrical Code (NEC) and a licensed electrical engineer.
            </p>
            </div>
        </main>
        <Footer />
    </div>
  );
}