import React, { useState } from "react";
import CertificateModal from "../components/CertificateModal";

// Automatically import all images in folders
const categories = {
  nc: import.meta.glob("../assets/certificates/nc/*.{jpg,jpeg,png}", { eager: true, import: "default" }),
  training: import.meta.glob("../assets/certificates/training/*.{jpg,jpeg,png}", { eager: true, import: "default" }),
  webinars: import.meta.glob("../assets/certificates/webinars/*.{jpg,jpeg,png}", { eager: true, import: "default" }),
  others: import.meta.glob("../assets/certificates/others/*.{jpg,jpeg,png}", { eager: true, import: "default" }),
};

// Convert imported modules to array of { title, file, category }
const buildCertificates = () => {
  const all = [];
  for (const catName in categories) {
    const folder = categories[catName];
    for (const path in folder) {
      const fileUrl = folder[path];
      const title = path.split("/").pop().replace(/\.(jpg|jpeg|png)$/i, "");
      all.push({ title, category: catName, file: fileUrl });
    }
  }
  return all;
};

export default function Certificates() {
  const [certs] = useState(buildCertificates());
  const [selected, setSelected] = useState(null);

  return (
    <main className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10">
          Certificates & Training
        </h2>

        {/* Categories */}
        {["nc", "training", "webinars", "others"].map((cat) => (
          <section key={cat} className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 capitalize text-gray-700">
              {cat === "nc" ? "National Certificates" : cat}
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {certs
                .filter((c) => c.category === cat)
                .map((c, idx) => (
                  <div
                    key={idx}
                    className="bg-white shadow-lg rounded-xl p-4 cursor-pointer hover:shadow-xl transition"
                    onClick={() => setSelected(c)}
                  >
                    <img
                      src={c.file}
                      alt={c.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <p className="mt-3 text-center font-medium text-gray-700">
                      {c.title}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>

      {/* Modal Viewer */}
      {selected && (
        <CertificateModal file={selected.file} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
