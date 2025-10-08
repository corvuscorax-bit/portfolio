import React, { useState } from "react";
import CommercialDrafts from "../assets/experience3/1.png";
import ResidentialDrafts from "../assets/experience3/2.png";
import RestorationDrafts from "../assets/experience3/3.png";
import PreConstructionDrafts from "../assets/experience3/4.png";
import ExperiencePages from "../components/ExperiencePages";

export default function Experience3() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (src) => setSelectedImage(src);
  const closeImage = () => setSelectedImage(null);

  const images = [
    {
      src: CommercialDrafts,
      alt: "Commercial Drafts",
      title: "Commercial Drafts",
      desc: <p>
              Prepared drafts for commercial spaces, including floor plans and virtual tour layouts.
              Executed quality checks and error reporting to ensure accuracy and consistency.
            </p>
    },
    {
      src: ResidentialDrafts,
      alt: "Residential Drafts",
      title: "Residential Drafts",
      desc: <p>
              Drafted detailed floor plans for residential properties, 
              highlighting architectural features, room arrangements, and interior finishes. 
              Integrated visual cues and navigation tools to support virtual tours and enhance client presentation.
            </p>
    },
    {
      src: RestorationDrafts,
      alt: "Restoration Drafts",
      title: "Restoration Drafts",
      desc: <p>
              Created virtual layouts for damaged properties, documenting structural conditions and room configurations. 
              Captured post-incident visuals to assist in insurance, restoration, and safety assessments.
            </p>
  },
    {
      src: PreConstructionDrafts,
      alt: "Pre-Construction Drafts",
      title: "Pre-Construction Drafts",
      desc: <p>
              Prepared structural and spatial drafts for properties in early construction stages. 
              Mapped framing, room divisions, and elevation details based on site progress and 
              architectural plans. Supported planning, inspection, and client walkthroughs with accurate 
              digital overlays.
            </p>
    },
  ];

  return (
    <main>
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
            Draft Technician Experience
          </h2>

          {/* Short description */}
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-12">
            During my role as a <span className="font-semibold text-blue-600">Draft Technician and Quality Assurance</span>,
            I created detailed 2D floor plans for 3D virtual tours, while performing quality 
            checks to maintain accuracy. I identified errors early, reported issues, and supported project teams 
            in meeting both technical and visual standards.
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
              This experience strengthened my attention to detail, proficiency in technical drafting, and ability to 
              maintain accuracy under tight deadlines while collaborating with cross-functional teams.
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
