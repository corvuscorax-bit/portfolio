import React from "react";
import Footer from "../components/Footer";

export default function Resume() {
  return (
    <div>
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-6">My Resume</h2>
        <p className="text-gray-600 mb-6">
          Here you can view or download my full resume.
        </p>

        <iframe
          src="/pdfs/Resume_RPascua.pdf"
          title="Resume"
          className="w-full h-[600px] border"
        />
      </div>
    </section>
        <Footer />
    </div>
  );
}
