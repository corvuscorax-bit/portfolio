import React, { useState } from "react";
import PreConstructionElectricalPlanning from "../assets/experience4/5.png";
import ElectricalDocumentationandLoadScheduling from "../assets/experience4/4.png";
import ResidentialElectricalInstallation from "../assets/experience4/1.png";
import ElectricalPanelInstallation from "../assets/experience4/2.png";
import InstallationofServiceDropandServiceMeterBox from "../assets/experience4/3.png";
import CeilingLightingandFixtureLayout from "../assets/experience4/6.png";
import ExperiencePages from "../components/ExperiencePages";
import Footer from "../components/Footer";

export default function Experience4() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (src) => setSelectedImage(src);
  const closeImage = () => setSelectedImage(null);

  const images = [
    {
      src: PreConstructionElectricalPlanning,
      alt: "Pre-Construction Electrical Planning",
      title: "Pre-Construction Electrical Planning",
      desc: <p className="text-gray-600">
              Site coordination and planning for electrical systems during early construction stages. 
              Integration of conduit paths, panel locations, and load requirements.
            </p>
    },
    {
      src: ElectricalDocumentationandLoadScheduling,
      alt: "Electrical Documentation and Load Scheduling",
      title: "Electrical Documentation and Load Scheduling",
      desc: <p className="text-gray-600">
              Preparation of technical drawings, load schedules, and single-line diagrams for residential and 
              commercial projects. Compliance with PEC/NEC standards and coordination with contractors for implementation.
            </p>
    },
    {
      src: ResidentialElectricalInstallation,
      alt: "Residential Electrical Installation",
      title: "Residential Electrical Installation",
      desc: <p className="text-gray-600">
              Installation of embedded conduits and junction boxes for residential power and lighting systems. 
              Wiring routed and secured in compliance with PEC standards, with provisions for future load expansion 
              and finish work
            </p>
    },
    {
      src: ElectricalPanelInstallation,
      alt: "Electrical Panel Installation",
      title: "Electrical Panel Installation",
      desc: <p className="text-gray-600">
              Installation of a 20-way, 125-amp electrical panel for residential power distribution. Embedded 
              conduits routed to junction boxes, with circuit breakers configured for lighting, outlets, and 
              dedicated loads. Work performed in compliance with PEC standards and site-specific load requirements.
            </p>
    },
    {
      src: InstallationofServiceDropandServiceMeterBox,
      alt: "Installation of Service Drop an Service Meter Box",
      title: "Installation of Service Drop and Service Meter Box",
      desc: <p className="text-gray-600">
              Installed overhead service drop and mounted service meter base for residential 
              power connection. Routed conductors from utility pole to weatherhead, secured grounding system, and coordinated
              with local utility for energization. Work performed in compliance with PEC/NEC standards and site-specific load
              requirements.
            </p>
    },
    {
      src: CeilingLightingandFixtureLayout,
      alt: "Ceiling Lighting and Fixture Layout",
      title: "Ceiling Lighting and Fixture Layout",
      desc: <p className="text-gray-600">
              Design and installation of layered ceiling lighting systems, including recessed fixtures and central luminaires. 
              Coordination with architectural finishes to ensure balanced illumination and aesthetic integration.
            </p>
    },
  ];

  return (
    <main className="py-auto bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
             Freelance Electrical Engineer Experience
          </h2>

          {/* Short description */}
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-12">
            During my role as a <span className="font-semibold text-blue-600">Freelance Electrical Engineer</span>, 
            I designed and installed residential electrical systems, carried out troubleshooting and repairs, and ensured 
            all work complied with the Philippine Electrical Code / National Electrical Code. I also prepared material estimates and worked directly 
            with clients to deliver safe and efficient solutions.
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
              This experience strengthened my ability to apply technical knowledge in real-world settings, 
              adapt to diverse client needs, and deliver safe, code-compliant electrical solutions with 
              efficiency and precision.
            </p>
          </div>
        </div>

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
      <Footer />
    </main>
  );
}
