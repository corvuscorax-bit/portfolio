import React, { useState } from "react";
import ScaffoldSafetyInspection from "../assets/experience2/1.jpg";
import TeamSafetySnapshot from "../assets/experience2/2.jpg";
import HeavyPipeInstallation from "../assets/experience2/3.jpg";
import CeilingWork from "../assets/experience2/4.jpg";
import ExperiencePages from "../components/ExperiencePages";

export default function Experience2() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (src) => setSelectedImage(src);
  const closeImage = () => setSelectedImage(null);

  const images = [
    {
      src: ScaffoldSafetyInspection,
      alt: "Scaffold Safety Inspection",
      title: "Scaffold Safety Inspection",
      desc: <p>
              Documentation of scaffold assembly during an indoor construction project. 
              Workers equipped with full PPE, hazard signage in place, and scaffold structure 
              properly configured. Responsibilities included inspection of structural integrity, 
              enforcement of access control, and verification of compliance with safety protocols.
            </p>
    },
    {
      src: TeamSafetySnapshot,
      alt: "Team Safety Snapshot",
      title: "Team Safety Snapshot",
      desc: <p>
              Group photo taken during routine inspection at an outdoor industrial site. All personnel 
              outfitted with appropriate PPE, demonstrating adherence to safety standards and fostering 
              a culture of teamwork. Duties involved monitoring of safety compliance, coordination of 
              inspection activities, and promotion of a positive work environment.
            </p>
    },
    {
      src: HeavyPipeInstallation,
      alt: "Heavy Pipe Installation",
      title: "Heavy Pipe Installation",
      desc: <p>
              Installation of a large flanged pipe elbow using a chain hoist system within an active 
              industrial facility. Workers equipped with full PPE including hard hats, gloves, safety 
              goggles, and harnesses. Scaffold structure used for overhead support, with clear floor markings 
              and caution tape in place. Task involved coordinated lifting, positioning, and alignment of 
              mechanical components, emphasizing teamwork and safe handling of heavy equipment.
            </p>
    },
    {
      src: CeilingWork,
      alt: "Ceiling Work",
      title: "Ceiling Work",
      desc: <p>
              Execution of overhead maintenance tasks involving exposed ceiling structures and ductwork. Workers 
              outfitted with safety harnesses, helmets, and protective gear. One worker positioned on a ladder 
              performing ceiling-related work, while another provides ground support. Environment includes 
              construction materials, wiring, and protective coverings, with clear attention to fall protection 
              and safe ladder use.
            </p>
    },
  ];

  return (
    <main>
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
            Safety Officer II Experience
          </h2>

          {/* Short description */}
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-12">
            During my role as a <span className="font-semibold text-blue-600">Safety Officer II </span> 
            at <span className="italic">Texas Instruments, Baguio City (via Susalum Corporation)</span>, 
            I ensured compliance with safety protocols, supervised team members, and implemented 
            safety measures across multiple operations. My work included conducting inspections, 
            managing safety procedures, and investigating incidents to maintain a safe and efficient workplace.
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
              This experience strengthened my ability to manage safety, collaborate with teams, 
              and uphold strict compliance standards in high-pressure environments.
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
