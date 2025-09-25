import React, { useState } from "react";
import Footer from "../components/Footer";

// Import all images inside gallery subfolders
const images = import.meta.glob("/src/assets/gallery/**/*.{jpg,jpeg,png,webp,svg}", {
  eager: true,
  import: "default",
});

// Group images by folder name
const grouped = Object.entries(images).reduce((acc, [path, src]) => {
  // Extract folder name → /public/gallery/trip1/img1.jpg → "trip1"
  const parts = path.split("/");
  const album = parts[parts.length - 2]; // folder name
  if (!acc[album]) acc[album] = [];
  acc[album].push(src);
  return acc;
}, {});

export default function Gallery() {
  const [selectedAlbum, setSelectedAlbum] = useState(Object.keys(grouped)[0]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const albumImages = grouped[selectedAlbum] || [];

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? albumImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === albumImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <main>
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          📸 Project Gallery
        </h2>

        {/* Album Tabs */}
        <div className="flex justify-center mb-6 space-x-4 flex-wrap">
          {Object.keys(grouped).map((album) => (
            <button
              key={album}
              onClick={() => {
                setSelectedAlbum(album);
                setSelectedIndex(null);
              }}
              className={`px-4 py-2 rounded-lg capitalize ${
                selectedAlbum === album
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {album}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {albumImages.map((src, idx) => (
            <div
              key={idx}
              className="cursor-pointer overflow-hidden rounded-lg shadow-md hover:scale-105 transform transition"
              onClick={() => setSelectedIndex(idx)}
            >
              <img
                src={src}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedIndex !== null && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-5 text-white text-4xl font-bold px-4 py-2 bg-black/50 rounded-full hover:bg-black/80"
            >
              ‹
            </button>

            {/* Selected Image */}
            <img
              src={albumImages[selectedIndex]}
              alt="Selected"
              className="max-h-[85vh] max-w-[90vw] rounded-lg shadow-lg"
            />

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-5 text-white text-4xl font-bold px-4 py-2 bg-black/50 rounded-full hover:bg-black/80"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
    <Footer />
    </main>
  );
}
