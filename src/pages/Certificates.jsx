import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import CertificateModal from "../components/CertificateModal";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const categories = {
    nc: import.meta.glob("../assets/certificates/nc/*.pdf", { eager: true }),
    training: import.meta.glob("../assets/certificates/training/*.pdf", { eager: true }),
    webinars: import.meta.glob("../assets/certificates/webinars/*.pdf", { eager: true }),
    others: import.meta.glob("../assets/certificates/others/*.pdf", { eager: true }),
  };

  // Generate a thumbnail from page 1 of a PDF
  const generateThumbnail = async (url) => {
    try {
      const pdf = await pdfjsLib.getDocument(url).promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 0.5 });
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;

      return canvas.toDataURL("image/png");
    } catch (error) {
      console.error("Thumbnail error:", error);
      return null;
    }
  };

  // Load PDFs and thumbnails
  useEffect(() => {
    async function loadCerts() {
      const all = [];

      for (const categoryName in categories) {
        const folder = categories[categoryName];

        for (const path in folder) {
          const module = folder[path];
          const fileUrl = module.default;

          const title = path.split("/").pop().replace(".pdf", "");

          const thumb = await generateThumbnail(fileUrl);

          all.push({
            title,
            category: categoryName,
            file: fileUrl,
            thumbnail: thumb,
          });
        }
      }

      setCerts(all);
    }

    loadCerts();
  }, []);

  return (
    <main className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10">
          Certificates & Training
        </h2>

        {/* Categories */}
        {["nc", "training", "webinars", "others"].map((cat) => (
          <section key={cat} className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 capitalize text-gray-800">
              {cat === "nc" ? "National Certificates" : cat}
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {certs
                .filter((c) => c.category === cat)
                .map((c, idx) => (
                  <div
                    key={idx}
                    className="bg-white shadow-lg rounded-xl p-4 cursor-pointer hover:shadow-xl transition"
                    onClick={() => setSelectedPdf(c.file)}
                  >
                    {c.thumbnail ? (
                      <img 
                        src={c.thumbnail}
                        alt={c.title}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                        Generating preview...
                      </div>
                    )}

                    <p className="mt-3 text-center font-medium text-gray-700">
                      {c.title}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>

      {selectedPdf && (
        <CertificateModal file={selectedPdf} onClose={() => setSelectedPdf(null)} />
      )}
    </main>
  );
}
