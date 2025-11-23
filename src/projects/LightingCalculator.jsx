// LightingCalculator.jsx (with auto-updating illuminance)
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

const ROOM_DEFAULTS = {
  "Living / Lounge": 108,
  Bedroom: 215,
  "Kitchen-General": 215,
  "Kitchen-Preparing/Cooking": 538,
  Dining: 108,
  Bathroom: 200,
  Storage: 100,
  Hallways: 54,
  "Garage-Vehicle Bays": 200,
  "Garage-Workbench": 1000,
  Workshop: 807,
  "Laundry Room": 215,
  "Basement-Exercise and Recreation": 323,
  Porch: 150,
  Classroom: 300,
  Office: 500,
  "Outdoor (path)": 50,
};

// conversions
const LUX_TO_FC = (lux) => lux / 10.764;
const FC_TO_LUX = (fc) => fc * 10.764;
const M_TO_FT = (m) => m * 3.28084;
const FT_TO_M = (ft) => ft / 3.28084;

function round(n, d = 2) {
  if (!isFinite(n)) return 0;
  return Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
}

export default function LightingCalculator() {
  const [unit, setUnit] = useState("metric");
  const [rooms, setRooms] = useState([
    {
      id: 1,
      roomType: "Living / Lounge",
      width: 5.0,
      length: 4.0,
      illuminanceValue: ROOM_DEFAULTS["Living / Lounge"],
      fixtureLumens: 800,
      fixtureWatts: 12,
      manualIlluminance: false, // tracks if user manually edited illuminance
    },
  ]);

  const [hoursPerDay, setHoursPerDay] = useState(5);
  const [costPerKwh, setCostPerKwh] = useState(11);
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState(null);

  const toggleUnit = (newUnit) => {
    if (newUnit === unit) return;

    const updatedRooms = rooms.map((room) => {
      const newWidth = newUnit === "imperial" ? M_TO_FT(room.width) : FT_TO_M(room.width);
      const newLength = newUnit === "imperial" ? M_TO_FT(room.length) : FT_TO_M(room.length);
      const newIlluminance =
        newUnit === "imperial" ? LUX_TO_FC(room.illuminanceValue) : FC_TO_LUX(room.illuminanceValue);

      return {
        ...room,
        width: round(newWidth, 3),
        length: round(newLength, 3),
        illuminanceValue: round(newIlluminance, 2),
      };
    });

    setUnit(newUnit);
    setRooms(updatedRooms);
  };

  // Calculate results for each room
  useEffect(() => {
    let totalFixtures = 0;
    let totalPower = 0;
    let totalEnergy = 0;
    let totalCost = 0;

    const newResults = rooms.map((room) => {
      const illumLux = unit === "metric"
        ? Number(room.illuminanceValue)
        : FC_TO_LUX(Number(room.illuminanceValue));

      const w = Number(room.width) || 0;
      const l = Number(room.length) || 0;
      const area = w * l;
      const area_m2 = unit === "metric" ? area : area * 0.092903;

      const requiredLumens = illumLux * area_m2;
      const perFixtureLumens = Number(room.fixtureLumens) || 0;
      let numFixtures = perFixtureLumens > 0 ? Math.ceil(requiredLumens / perFixtureLumens) : 1;
      if (numFixtures < 1) numFixtures = 1;

      const totalWatts = numFixtures * Number(room.fixtureWatts || 0);
      const monthlyKWh = (totalWatts / 1000) * hoursPerDay * 30;
      const monthlyCost = monthlyKWh * costPerKwh;

      totalFixtures += numFixtures;
      totalPower += totalWatts;
      totalEnergy += monthlyKWh;
      totalCost += monthlyCost;

      return {
        id: room.id,
        roomType: room.roomType,
        area: round(area, 3),
        illumLux: round(illumLux, 1),
        numFixtures,
        totalWatts,
        monthlyKWh: round(monthlyKWh, 2),
        monthlyCost: round(monthlyCost, 2),
      };
    });

    setResults(newResults);
    setSummary({
      totalFixtures,
      totalPower,
      totalEnergy: round(totalEnergy, 2),
      totalCost: round(totalCost, 2),
    });
  }, [rooms, unit, hoursPerDay, costPerKwh]);

  const handleRoomChange = (id, key, value, manual = false) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              [key]: value,
              ...(key === "illuminanceValue" && manual ? { manualIlluminance: true } : {}),
            }
          : r
      )
    );
  };

  const handleRoomTypeChange = (id, value) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        // Only update illuminance if user hasn't manually edited it
        const newIlluminance =
          !r.manualIlluminance
            ? unit === "metric"
              ? ROOM_DEFAULTS[value] || 200
              : LUX_TO_FC(ROOM_DEFAULTS[value] || 200)
            : r.illuminanceValue;

        return { ...r, roomType: value, illuminanceValue: newIlluminance };
      })
    );
  };

  const addRoom = () => {
    const newId = rooms.length ? Math.max(...rooms.map((r) => r.id)) + 1 : 1;
    setRooms((prev) => [
      ...prev,
      {
        id: newId,
        roomType: "Living / Lounge",
        width: 5,
        length: 4,
        illuminanceValue: ROOM_DEFAULTS["Living / Lounge"],
        fixtureLumens: 800,
        fixtureWatts: 12,
        manualIlluminance: false,
      },
    ]);
  };

  const removeRoom = (id) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  const dim = unit === "metric" ? "m" : "ft";

  return (
    <main>
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow space-y-6">
      <h2 className="text-2xl font-bold">Lighting Calculator</h2>

      <label>
        Unit System
        <select
          value={unit}
          onChange={(e) => toggleUnit(e.target.value)}
          className="block w-full border p-2 rounded mt-1"
        >
          <option value="metric">Metric (m / lux)</option>
          <option value="imperial">Imperial (ft / fc)</option>
        </select>
      </label>

      {rooms.map((room) => (
        <div key={room.id} className="border p-4 rounded space-y-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Room {room.id}</h3>
            <button
              onClick={() => removeRoom(room.id)}
              className="text-red-500 text-sm"
            >
              ✕ Remove Room
            </button>
          </div>

          <label>
            Room Type
            <select
              value={room.roomType}
              onChange={(e) => handleRoomTypeChange(room.id, e.target.value)}
              className="block w-full border p-2 rounded mt-1"
            >
              {Object.keys(ROOM_DEFAULTS).map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label>
              Width ({dim})
              <input
                type="number"
                step="0.01"
                min="0"
                value={room.width}
                onChange={(e) =>
                  handleRoomChange(room.id, "width", e.target.value)
                }
                className="block w-full border p-2 rounded mt-1"
              />
            </label>

            <label>
              Length ({dim})
              <input
                type="number"
                min="0"
                step="0.01"
                value={room.length}
                onChange={(e) =>
                  handleRoomChange(room.id, "length", e.target.value)
                }
                className="block w-full border p-2 rounded mt-1"
              />
            </label>
          </div>

          <label>
            Recommended Illuminance ({unit === "metric" ? "lux" : "fc"})
            <input
              type="number"
              min="0"
              value={room.illuminanceValue}
              onChange={(e) =>
                handleRoomChange(room.id, "illuminanceValue", e.target.value, true)
              }
              className="block w-full border p-2 rounded mt-1"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label>
              Fixture Lumens
              <input
                type="number"
                min="0"
                value={room.fixtureLumens}
                onChange={(e) =>
                  handleRoomChange(room.id, "fixtureLumens", e.target.value)
                }
                className="block w-full border p-2 rounded mt-1"
              />
            </label>

            <label>
              Fixture Watts
              <input
                type="number"
                min="0"
                value={room.fixtureWatts}
                onChange={(e) =>
                  handleRoomChange(room.id, "fixtureWatts", e.target.value)
                }
                className="block w-full border p-2 rounded mt-1"
              />
            </label>
          </div>

          {results
            .filter((r) => r.id === room.id)
            .map((res) => (
              <div
                key={res.id}
                className="bg-gray-100 p-3 rounded border text-sm space-y-1"
              >
                <div>
                  Area: <strong>{res.area} {unit === "metric" ? "m²" : "ft²"}</strong>
                </div>
                <div>
                  Target Illuminance: <strong>{res.illumLux} lux</strong>
                </div>
                <div>
                  Fixtures Needed: <strong>{res.numFixtures}</strong>
                </div>
                <div>
                  Total Power: <strong>{res.totalWatts} W</strong>
                </div>
                <div>
                  Monthly Energy: <strong>{res.monthlyKWh} kWh</strong>
                </div>
                <div>
                  Monthly Cost: <strong>{res.monthlyCost}</strong>
                </div>
              </div>
            ))}
        </div>
      ))}

      <button
        onClick={addRoom}
        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm"
      >
        + Add Room
      </button>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <label>
          Hours Used per day
          <input
            type="number"
            min="0"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(e.target.value)}
            className="block w-full border p-2 rounded mt-1"
          />
        </label>

        <label>
          Electricity Cost (per kWh)
          <input
            type="number"
            value={costPerKwh}
            step="0.01"
            min="0"
            onChange={(e) => setCostPerKwh(e.target.value)}
            className="block w-full border p-2 rounded mt-1"
          />
        </label>
      </div>

      {summary && (
        <div className="bg-green-50 p-4 rounded border text-sm space-y-2 mt-6">
          <h3 className="font-semibold">Total Summary (All Rooms)</h3>
          <div>Total Fixtures: <strong>{summary.totalFixtures}</strong></div>
          <div>Total Power: <strong>{summary.totalPower} W</strong></div>
          <div>Total Monthly Energy: <strong>{summary.totalEnergy} kWh</strong></div>
          <div>Total Monthly Cost: <strong>₱{summary.totalCost}</strong></div>
        </div>
      )}

      <p className="text-xs text-gray-600 mt-2">
        Note: This tool is only a design aid. Always verify final calculations with the National Electrical Code (NEC) and a licensed electrical engineer.
      </p>
    </div>
      <Footer />
    </main>
  );
}
