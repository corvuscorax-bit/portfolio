import React from "react";
import Footer from "../components/Footer";

export default function Resume() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-auto bg-gray-50 flex-1">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-6">My Resume</h2>
          <p className="text-gray-600 mb-6">
            View my full resume below, or download it for easier reading.
          </p>

          {/* Responsive PDF Embed */}
          <div className="relative w-full" style={{ paddingTop: "130%" }}>
            <iframe
              src="https://drive.google.com/file/d/1OqZTqvcej-2LTYWMyyquKZQUG3a_9YmK/preview"
              className="absolute top-0 left-0 w-full h-full border rounded"
              allow="autoplay"
              title="Resume - Raven Pascua"
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
    </div>
  );
}
