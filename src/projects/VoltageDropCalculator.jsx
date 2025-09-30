import React, { useState } from "react";
import Footer from "../components/Footer";

// --- AWG ↔ mm² map (sorted order) ---
const WIRE_SIZES = [
  "14","12","10","8","6","4","3","2","1",
  "1/0","2/0","3/0","4/0","250","300","350",
  "400","500","600","750","1000"
];

const AWG_TO_MM2 = {
  "14": "2.0",
  "12": "3.5",
  "10": "5.5",
  "8": "8",
  "6": "14",
  "4": "22",
  "3": "26",
  "2": "30",
  "1": "38",
  "1/0": "50",
  "2/0": "60",
  "3/0": "80",
  "4/0": "100",
  "250": "125",
  "300": "150",
  "350": "175",
  "400": "200",
  "500": "250",
  "600": "300",
  "750": "375",
  "1000": "500",
};

// --- Reactance values ---
// PVC & Aluminum conduit (same reactance)
const TABLE9_PVC_Aluminum_X = {
  "14": { X1: 0.190, X2: 0.058 },
  "12": { X1: 0.177, X2: 0.054 },
  "10": { X1: 0.164, X2: 0.050 },
  "8": { X1: 0.171, X2: 0.052 },
  "6": { X1: 0.167, X2: 0.051 },
  "4": { X1: 0.157, X2: 0.048 },
  "3": { X1: 0.154, X2: 0.047 },
  "2": { X1: 0.148, X2: 0.045 },
  "1": { X1: 0.151, X2: 0.046 },
  "1/0": { X1: 0.144, X2: 0.044 },
  "2/0": { X1: 0.141, X2: 0.043 },
  "3/0": { X1: 0.138, X2: 0.042 },
  "4/0": { X1: 0.135, X2: 0.041 },
  "250": { X1: 0.135, X2: 0.041 },
  "300": { X1: 0.135, X2: 0.041 },
  "350": { X1: 0.131, X2: 0.040 },
  "400": { X1: 0.131, X2: 0.040 },
  "500": { X1: 0.128, X2: 0.039 },
  "600": { X1: 0.128, X2: 0.039 },
  "750": { X1: 0.125, X2: 0.038 },
  "1000": { X1: 0.121, X2: 0.037 },
};

// Steel conduit reactance
const TABLE9_Steel_X = {
  "14": { X1: 0.240, X2: 0.073 },
  "12": { X1: 0.223, X2: 0.068 },
  "10": { X1: 0.207, X2: 0.063 },
  "8": { X1: 0.213, X2: 0.065 },
  "6": { X1: 0.210, X2: 0.064 },
  "4": { X1: 0.197, X2: 0.060 },
  "3": { X1: 0.194, X2: 0.059 },
  "2": { X1: 0.187, X2: 0.057 },
  "1": { X1: 0.187, X2: 0.057 },
  "1/0": { X1: 0.180, X2: 0.055 },
  "2/0": { X1: 0.177, X2: 0.054 },
  "3/0": { X1: 0.171, X2: 0.052 },
  "4/0": { X1: 0.167, X2: 0.051 },
  "250": { X1: 0.171, X2: 0.052 },
  "300": { X1: 0.167, X2: 0.051 },
  "350": { X1: 0.164, X2: 0.050 },
  "400": { X1: 0.161, X2: 0.049 },
  "500": { X1: 0.157, X2: 0.048 },
  "600": { X1: 0.157, X2: 0.048 },
  "750": { X1: 0.157, X2: 0.048 },
  "1000": { X1: 0.151, X2: 0.046 },
};

// --- Resistances (R) ---
// R1 = Ω/km, R2 = Ω/1000ft
// NOTE: Table 9 gives resistance columns for copper and aluminum conductors.
// In many cases the copper resistance entries are identical across raceway types in the table,
// while aluminum conductor resistance entries may differ by conductor size as shown below.
// These objects list the R values from Table 9 exactly.

// Copper resistance (PVC conduit)
const TABLE9_Copper_PVC = {
  "14":   { R1: 10.2,  R2: 3.1   },
  "12":   { R1: 6.6,   R2: 2.0   },
  "10":   { R1: 3.9,   R2: 1.2   },
  "8":    { R1: 2.56,  R2: 0.78  },
  "6":    { R1: 1.61,  R2: 0.49  },
  "4":    { R1: 1.02,  R2: 0.31  },
  "3":    { R1: 0.82,  R2: 0.25  },
  "2":    { R1: 0.62,  R2: 0.19  },
  "1":    { R1: 0.49,  R2: 0.15  },
  "1/0":  { R1: 0.39,  R2: 0.12  },
  "2/0":  { R1: 0.33,  R2: 0.10  },
  "3/0":  { R1: 0.253, R2: 0.077 },
  "4/0":  { R1: 0.203, R2: 0.062 },
  "250":  { R1: 0.171, R2: 0.052 },
  "300":  { R1: 0.144, R2: 0.044 },
  "350":  { R1: 0.125, R2: 0.038 },
  "400":  { R1: 0.108, R2: 0.033 },
  "500":  { R1: 0.089, R2: 0.027 },
  "600":  { R1: 0.075, R2: 0.023 },
  "750":  { R1: 0.062, R2: 0.019 },
  "1000": { R1: 0.049, R2: 0.015 }
};

// Copper resistance (Aluminum conduit)
const TABLE9_Copper_Aluminum = {
  "14":   { R1: 10.2,  R2: 3.1   },
  "12":   { R1: 6.6,   R2: 2.0   },
  "10":   { R1: 3.9,   R2: 1.2   },
  "8":    { R1: 2.56,  R2: 0.78  },
  "6":    { R1: 1.61,  R2: 0.49  },
  "4":    { R1: 1.02,  R2: 0.31  },
  "3":    { R1: 0.82,  R2: 0.25  },
  "2":    { R1: 0.66,  R2: 0.20  },
  "1":    { R1: 0.52,  R2: 0.16  },
  "1/0":  { R1: 0.43,  R2: 0.13  },
  "2/0":  { R1: 0.33,  R2: 0.10  },
  "3/0":  { R1: 0.269, R2: 0.082 },
  "4/0":  { R1: 0.220, R2: 0.067 },
  "250":  { R1: 0.187, R2: 0.057 },
  "300":  { R1: 0.161, R2: 0.049 },
  "350":  { R1: 0.141, R2: 0.043 },
  "400":  { R1: 0.125, R2: 0.038 },
  "500":  { R1: 0.105, R2: 0.032 },
  "600":  { R1: 0.092, R2: 0.028 },
  "750":  { R1: 0.079, R2: 0.024 },
  "1000": { R1: 0.062, R2: 0.019 }
};

// Copper resistance (Steel conduit)
const TABLE9_Copper_Steel   = {
  "14":   { R1: 10.2,  R2: 3.1   },
  "12":   { R1: 6.6,   R2: 2.0   },
  "10":   { R1: 3.9,   R2: 1.2   },
  "8":    { R1: 2.56,  R2: 0.78  },
  "6":    { R1: 1.61,  R2: 0.49  },
  "4":    { R1: 1.02,  R2: 0.31  },
  "3":    { R1: 0.82,  R2: 0.25  },
  "2":    { R1: 0.66,  R2: 0.20  },
  "1":    { R1: 0.52,  R2: 0.16  },
  "1/0":  { R1: 0.39,  R2: 0.12  },
  "2/0":  { R1: 0.33,  R2: 0.10  },
  "3/0":  { R1: 0.259, R2: 0.079 },
  "4/0":  { R1: 0.207, R2: 0.063 },
  "250":  { R1: 0.177, R2: 0.054 },
  "300":  { R1: 0.148, R2: 0.045 },
  "350":  { R1: 0.128, R2: 0.039 },
  "400":  { R1: 0.115, R2: 0.035 },
  "500":  { R1: 0.095, R2: 0.029 },
  "600":  { R1: 0.082, R2: 0.025 },
  "750":  { R1: 0.069, R2: 0.021 },
  "1000": { R1: 0.059, R2: 0.018 }
};

// Aluminum resistance (PVC conduit)
const TABLE9_Aluminum_PVC = {
  "12":   { R1: 10.5,  R2: 3.2   },
  "10":   { R1: 6.6,   R2: 2.0   },
  "8":    { R1: 4.3,   R2: 1.3   },
  "6":    { R1: 2.66,  R2: 0.81  },
  "4":    { R1: 1.67,  R2: 0.51  },
  "3":    { R1: 1.31,  R2: 0.40  },
  "2":    { R1: 1.05,  R2: 0.32  },
  "1":    { R1: 0.82,  R2: 0.25  },
  "1/0":  { R1: 0.66,  R2: 0.20  },
  "2/0":  { R1: 0.52,  R2: 0.16  },
  "3/0":  { R1: 0.43,  R2: 0.13  },
  "4/0":  { R1: 0.33,  R2: 0.10  },
  "250":  { R1: 0.279, R2: 0.085 },
  "300":  { R1: 0.233, R2: 0.071 },
  "350":  { R1: 0.200, R2: 0.061 },
  "400":  { R1: 0.177, R2: 0.054 },
  "500":  { R1: 0.141, R2: 0.043 },
  "600":  { R1: 0.118, R2: 0.036 },
  "750":  { R1: 0.095, R2: 0.029 },
  "1000": { R1: 0.075, R2: 0.023 }
};

// Aluminum resistance (Aluminum conduit) — values in Table 9 for aluminum conductor in aluminum conduit
const TABLE9_Aluminum_Aluminum = {
  "12":   { R1: 10.5,  R2: 3.2   },
  "10":   { R1: 6.6,   R2: 2.0   },
  "8":    { R1: 4.3,   R2: 1.3   },
  "6":    { R1: 2.66,  R2: 0.81  },
  "4":    { R1: 1.67,  R2: 0.51  },
  "3":    { R1: 1.35,  R2: 0.41  },
  "2":    { R1: 1.05,  R2: 0.32  },
  "1":    { R1: 0.85,  R2: 0.26  },
  "1/0":  { R1: 0.69,  R2: 0.21  },
  "2/0":  { R1: 0.52,  R2: 0.16  },
  "3/0":  { R1: 0.43,  R2: 0.13  },
  "4/0":  { R1: 0.36,  R2: 0.11  },
  "250":  { R1: 0.295, R2: 0.090 },
  "300":  { R1: 0.249, R2: 0.076 },
  "350":  { R1: 0.217, R2: 0.066 },
  "400":  { R1: 0.194, R2: 0.059 },
  "500":  { R1: 0.157, R2: 0.048 },
  "600":  { R1: 0.135, R2: 0.041 },
  "750":  { R1: 0.112, R2: 0.034 },
  "1000": { R1: 0.089, R2: 0.027 }
};

// Aluminum resistance (Steel conduit)
const TABLE9_Aluminum_Steel = {
  "12":   { R1: 10.5,  R2: 3.2   },
  "10":   { R1: 6.6,   R2: 2.0   },
  "8":    { R1: 4.3,   R2: 1.3   },
  "6":    { R1: 2.66,  R2: 0.81  },
  "4":    { R1: 1.67,  R2: 0.51  },
  "3":    { R1: 1.31,  R2: 0.40  },
  "2":    { R1: 1.05,  R2: 0.32  },
  "1":    { R1: 0.82,  R2: 0.25  },
  "1/0":  { R1: 0.66,  R2: 0.20  },
  "2/0":  { R1: 0.52,  R2: 0.16  },
  "3/0":  { R1: 0.43,  R2: 0.13  },
  "4/0":  { R1: 0.33,  R2: 0.10  },
  "250":  { R1: 0.282, R2: 0.086 },
  "300":  { R1: 0.236, R2: 0.072 },
  "350":  { R1: 0.207, R2: 0.063 },
  "400":  { R1: 0.180, R2: 0.055 },
  "500":  { R1: 0.148, R2: 0.045 },
  "600":  { R1: 0.125, R2: 0.038 },
  "750":  { R1: 0.102, R2: 0.031 },
  "1000": { R1: 0.082, R2: 0.025 }
};

// Pick correct resistance table
function getResistanceTable(conductor, conduit) {
  if (conductor === "Copper" && conduit === "PVC") return TABLE9_Copper_PVC;
  if (conductor === "Copper" && conduit === "Aluminum") return TABLE9_Copper_Aluminum;
  if (conductor === "Copper" && conduit === "Steel") return TABLE9_Copper_Steel;
  if (conductor === "Aluminum" && conduit === "PVC") return TABLE9_Aluminum_PVC;
  if (conductor === "Aluminum" && conduit === "Aluminum") return TABLE9_Aluminum_Aluminum;
  if (conductor === "Aluminum" && conduit === "Steel") return TABLE9_Aluminum_Steel;
  return {};
}

// Pick reactance table
function getReactanceTable(conduit) {
  if (conduit === "Steel") return TABLE9_Steel_X;
  return TABLE9_PVC_Aluminum_X;
}

export default function VoltageDropCalculator() {
  const [unitSystem, setUnitSystem] = useState("Metric");
  const [circuits, setCircuits] = useState([
    { id: 1, wireSize: "12", conductor: "Copper", conduit: "PVC", length: 15, load: 1500, voltage: 230, pf: 0.85 }
  ]);

  const addCircuit = () => {
    const nextId = circuits.length ? Math.max(...circuits.map(c => c.id)) + 1 : 1;
    setCircuits([
      ...circuits,
      { id: nextId, wireSize: "12", conductor: "Copper", conduit: "PVC", length: 15, load: 1500, voltage: 230, pf: 0.85 }
    ]);
  };

  const removeCircuit = (id) => setCircuits(circuits.filter(c => c.id !== id));
  const updateCircuit = (id, field, value) => setCircuits(circuits.map(c => c.id === id ? { ...c, [field]: value } : c));

  // 🔹 Conversion when switching unit system
  const handleUnitChange = (newUnit) => {
    setCircuits(circuits.map(c => {
      let newLength = c.length;
      if (unitSystem === "Metric" && newUnit === "Imperial") {
        newLength = c.length * 3.28084; // m → ft
      } else if (unitSystem === "Imperial" && newUnit === "Metric") {
        newLength = c.length / 3.28084; // ft → m
      }
      return { ...c, length: parseFloat(newLength.toFixed(2)) };
    }));
    setUnitSystem(newUnit);
  };

  function compute(c) {
    const Rtable = getResistanceTable(c.conductor, c.conduit);
    const Xtable = getReactanceTable(c.conduit);

    const Rvals = Rtable[c.wireSize] || { R1: 0, R2: 0 };
    const Xvals = Xtable[c.wireSize] || { X1: 0, X2: 0 };

    // 🔹 Pick correct values depending on system
    const R = unitSystem === "Metric" ? Rvals.R1 : Rvals.R2;
    const X = unitSystem === "Metric" ? Xvals.X1 : Xvals.X2;

    const theta = Math.acos(Math.min(Math.max(c.pf, -1), 1));
    const Ze = R * c.pf + X * Math.sin(theta);

    const I = c.load / c.voltage;

    // 🔹 Normalize per correct base length (km or 1000 ft)
    const baseLength = unitSystem === "Metric" ? 1000 : 1000; 
    const Ze_per_unit = Ze / baseLength;
    const VD = 2 * Ze_per_unit * I * c.length;
    const percentVD = (VD / c.voltage) * 100;

    return { R, X, Ze, I, VD, percentVD };
  }

  return (
    <main>
    <div className="max-w-10xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">⚡ Voltage Drop Calculator (NEC Table 9)</h1>

      <div className="mb-4">
        <label>
          Unit System:
          <select value={unitSystem} onChange={e => handleUnitChange(e.target.value)} className="ml-2 border px-2 py-1">
            <option>Metric</option>
            <option>Imperial</option>
          </select>
        </label>
      </div>
      <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Wire Size</th>
            <th className="border px-2 py-1">Conductor</th>
            <th className="border px-2 py-1">Conduit</th>
            <th className="border px-2 py-1">Length ({unitSystem === "Metric" ? "m" : "ft"})</th>
            <th className="border px-2 py-1">Load (VA)</th>
            <th className="border px-2 py-1">Voltage (V)</th>
            <th className="border px-2 py-1">PF</th>
            <th className="border px-2 py-1">X</th>
            <th className="border px-2 py-1">R</th>
            <th className="border px-2 py-1">Ze</th>
            <th className="border px-2 py-1">I (A)</th>
            <th className="border px-2 py-1">VD (V)</th>
            <th className="border px-2 py-1">%VD</th>
            <th className="border px-2 py-1">Remove</th>
          </tr>
        </thead>
        <tbody>
          {circuits.map((c, idx) => {
            const { R, X, Ze, I, VD, percentVD } = compute(c);
            return (
              <tr key={c.id} className="text-center">
                <td className="border px-2 py-1">{idx + 1}</td>
                <td className="border px-2 py-1">
                  <select value={c.wireSize} onChange={e => updateCircuit(c.id, "wireSize", e.target.value)} className="border px-2 py-1">
                    {WIRE_SIZES.map(opt => (
                      <option key={opt} value={opt}>
                        {unitSystem === "Metric" ? `${AWG_TO_MM2[opt]} mm²` : `${opt} AWG`}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border px-2 py-1">
                  <select
                    value={c.conductor}
                    onChange={e => updateCircuit(c.id, "conductor", e.target.value)}
                    className="border px-2 py-1"
                  >
                    <option value="Copper">Copper</option>
                    {/* Only show Aluminum if wire size is NOT 14 */}
                    {c.wireSize !== "14" && <option value="Aluminum">Aluminum</option>}
                  </select>
                </td>
                <td className="border px-2 py-1">
                  <select value={c.conduit} onChange={e => updateCircuit(c.id, "conduit", e.target.value)} className="border px-2 py-1">
                    <option value="PVC">PVC</option>
                    <option value="Aluminum">Aluminum</option>
                    <option value="Steel">Steel</option>
                  </select>
                </td>
                <td className="border px-2 py-1">
                  <input type="number" min="0" value={c.length} onChange={e => updateCircuit(c.id, "length", parseFloat(e.target.value) || 0)} className="w-20 border px-1" />
                </td>
                <td className="border px-2 py-1">
                  <input type="number" min="0" value={c.load} onChange={e => updateCircuit(c.id, "load", parseFloat(e.target.value) || 0)} className="w-24 border px-1" />
                </td>
                <td className="border px-2 py-1">
                  <input type="number" min="0" value={c.voltage} onChange={e => updateCircuit(c.id, "voltage", parseFloat(e.target.value) || 0)} className="w-20 border px-1" />
                </td>
                <td className="border px-2 py-1">
                  <input type="number" step="0.01" min="0.01" max="1" value={c.pf} onChange={e => updateCircuit(c.id, "pf", parseFloat(e.target.value) || 0.01)} className="w-16 border px-1" />
                </td>
                <td className="border px-2 py-1">{X.toFixed(3)}</td>
                <td className="border px-2 py-1">{R.toFixed(3)}</td>
                <td className="border px-2 py-1">{Ze.toFixed(3)}</td>
                <td className="border px-2 py-1">{I.toFixed(2)}</td>
                <td className="border px-2 py-1">{VD.toFixed(2)}</td>
                <td className={`border px-2 py-1 ${percentVD > 3 ? "text-red-600" : "text-green-600"}`}>{percentVD.toFixed(2)}%</td>
                <td className="border px-2 py-1">
                  <button onClick={() => removeCircuit(c.id)} className="border px-4 rounded col-span-1 text-red-500 text-lg">✕</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

      <button onClick={addCircuit} className="px-3 py-1 bg-green-100 text-green-700 rounded">+ Add Circuit</button>
      <div className="text-xs text-gray-500 mt-2">
        Notes:
          <ol className="list-decimal ml-5">
            <p>1. These values are based on the following constants: UL-Type RHH wires with Class B stranding, in cradled configuration. Wire conductivities are
            100 percent IACS copper and 61 percent IACS aluminum, and aluminum conduit is 45 percent IACS. Capacitive reactance is ignored, since it is negli‐
            gible at these voltages. These resistance values are valid only at 75°C (167°F) and for the parameters as given, but are representative for 600-volt wire
            types operating at 60 Hz.</p>
            <p>2. Effective Z is defined as R cos(θ) + X sin(θ), where θ is the power factor angle of the circuit. Multiplying current by effective impedance gives a good
            approximation for line-to-neutral voltage drop. Effective impedance values shown in this table are valid only at 0.85 power factor. For another circuit
            power factor (PF), effective impedance (Ze) can be calculated from R and X L values given in this table as follows: Ze = R × PF + X L sin[arccos(PF)]</p>
          </ol>
        </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold mb-2">📘 NEC Table 9 Reference</h2>
        <iframe
          src="/pdfs/Table9.pdf"
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

