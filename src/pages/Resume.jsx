import React from "react";
import Footer from "../components/Footer";

export default function Resume() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-20 bg-gray-50 flex-1">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-6">My Resume</h2>
          <p className="text-gray-600 mb-6">
            View my full resume below, or download it for easier reading.
          </p>

          {/* Embed PDF always visible (desktop + mobile) */}
          <object
            data="/pdfs/Resume_RPascua.pdf"
            type="application/pdf"
            className="w-full h-[75vh] border rounded mb-6"
          >
            <p className="text-gray-500">
              Your browser does not support PDF embedding.{" "}
              <a
                href="/pdfs/Resume_RPascua.pdf"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open my resume in a new tab
              </a>
              .
            </p>
          </object>

          {/* Download button below embed */}
          <a
            href="/pdfs/Resume_RPascua.pdf"
            download
            className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            📥 Download Resume
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
