import React, { useState } from "react";
import SingleLineDiagram from "../assets/experience1/1.png";
import PostEarthquakeInspection from "../assets/experience1/2.jpg";
import ExperiencePages from "../components/ExperiencePages";

export default function Experience1() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (src) => setSelectedImage(src);
  const closeImage = () => setSelectedImage(null);

  const images = [
    {
      src: SingleLineDiagram ,
      alt: "Single Line Diagram",
      title: "Single Line Diagram",
      desc: <p>
              Developed a complete electrical floor plan, ensuring compliance with the 
              Philippine Electrical Code and site constraints. I coordinated with architects 
              and project engineers to integrate lighting with existing structure, performed 
              load calculations and voltage drop checks, and delivered AutoCAD plans ready 
              for construction.
            </p>
    },
    {
      src: PostEarthquakeInspection ,
      alt: "Post Earthquake Inspection",
      title: "Post Earthquake Inspection",
      desc: <p>
              Assessment of government buildings in Benguet to identify structural and electrical hazards.
              Verification of electrical layouts and serviceability of systems for safety compliance.
              Documentation of findings to support repair planning and restoration efforts
            </p>,
    },
  ];

  return (
    <main>
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
            Electrical Engineering Intern Experience
          </h2>

          {/* Short description */}
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-12">
            During my internship, I assisted in site inspections, electrical layout planning, and 
            post-earthquake safety assessments for government buildings. I contributed to cost estimation, 
            plan drafting, and documentation, gaining hands-on experience in public infrastructure and 
            compliance with national standards.
          </p>

          {/* Images grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {images.map((img, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => openImage(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{img.title}</h3>
                  <p className="text-gray-600">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-12 text-center">
            <p className="text-gray-700">
              This experience strengthened my understanding of public infrastructure projects, 
              skills in site inspection and cost estimation, and ability to contribute effectively 
              to engineering teams in a government setting.
            </p>
          </div>
        </div>
      </section>

      {/* Fullscreen image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={closeImage}
        >
          <img
            src={selectedImage}
            alt="Expanded"
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
          />
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-gray-300"
            onClick={closeImage}
          >
            &times;
          </button>
        </div>
      )}

      <ExperiencePages />
    </main>
  );
}
