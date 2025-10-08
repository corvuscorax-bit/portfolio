import React, { useState } from "react";
import Footer from "../components/Footer";

export default function Resume() {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-20 bg-gray-50 flex-1">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">My Resume</h2>
          <p className="text-gray-600 mb-6">
            Tap or click the preview to view in fullscreen. You can also download the PDF below.
          </p>

          {/* Responsive PDF preview */}
          <div
            className="relative w-full cursor-pointer"
            style={{ paddingTop: "130%" }}
            onClick={() => setFullscreen(true)}
          >
            <iframe
              src="https://drive.google.com/file/d/1OqZTqvcej-2LTYWMyyquKZQUG3a_9YmK/preview"
              className="absolute top-0 left-0 w-full h-full border rounded shadow-md"
              title="Resume - Raven Pascua"
              allow="autoplay"
            ></iframe>
          </div>

          {/* Download button */}
          <a
            href="https://drive.google.com/uc?export=download&id=1OqZTqvcej-2LTYWMyyquKZQUG3a_9YmK"
            className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            📥 Download Resume
          </a>
        </div>
      </section>

      <Footer />

      {/* Fullscreen Modal */}
      {fullscreen && (
        <div
          className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
          onClick={() => setFullscreen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold z-10"
            onClick={() => setFullscreen(false)}
          >
            ✕
          </button>
          <iframe
            src="https://drive.google.com/file/d/1OqZTqvcej-2LTYWMyyquKZQUG3a_9YmK/preview"
            className="w-[95vw] h-[90vh] border rounded shadow-lg"
            title="Resume Fullscreen"
            allow="autoplay"
          ></iframe>
        </div>
      )}
    </div>
  );
}
