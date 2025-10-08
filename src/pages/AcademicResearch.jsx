import React, { useState } from "react";
import ArduinoIDE from "../assets/AcademicResearch/1.png";
import GreenhouseModel from "../assets/AcademicResearch/2.png";
import SchematicDiagram from "../assets/AcademicResearch/3.png";
import InstallationofControlCabinet from "../assets/AcademicResearch/4.jpg";
import FieldTesting from "../assets/AcademicResearch/6.jpg";
import SmartFarmingInterface from "../assets/AcademicResearch/7.jpg";
import ExperiencePages from "../components/ExperiencePages";

export default function AcademicResearch() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (src) => setSelectedImage(src);
  const closeImage = () => setSelectedImage(null);

  const images = [
    {
      src: ArduinoIDE,
      alt: "Arduino IDE",
      title: "Programming using Arduino IDE",
      desc: "Programmed control logic, assigned I/O pins, tested system functions, and debugged embedded hardware for stable operation.",
    },
    {
      src: GreenhouseModel,
      alt: "Greenhouse Model",
      title: "3D Greenhouse Model",
      desc: "Designed greenhouse layout, positioned control systems, and visualized plant rows for spatial planning and automation.",
    },
    {
      src: SchematicDiagram,
      alt: "Schematic Diagram",
      title: "Schematic Diagram",
      desc: "Created wiring diagram showing connections between sensors, actuators, microcontroller, and power supply for system integration.",
    },
    {
      src: InstallationofControlCabinet,
      alt: "Installation of Control Cabinet",
      title: "Installation of Control Cabinet",
      desc: "Assembled control cabinet housing microcontroller, power supply, relays, and terminal blocks for organized system control.",
    },
    {
      src: FieldTesting,
      alt: "Field Testing",
      title: "Field Testing",
      desc: "Conducted field testing of automated greenhouse system, monitored sensor data, and evaluated performance for optimization.",
    },
    {
      src: SmartFarmingInterface,
      alt: "Smart Farming Interface",
      title: "Smart Farming Interface",
      desc: "Developed user interface for real-time monitoring and control of greenhouse parameters via web or mobile application.",
    },
  ];

  return (
    <main>
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
            Academic Research
          </h2>

          {/* Short description */}
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-12">
            During my role in{" "}
            <span className="font-semibold text-blue-600">
              Academic Research
            </span>{" "}
            at <span className="italic">Saint Louis University</span>, I
            developed an automated greenhouse prototype with online crop
            monitoring. I programmed embedded systems using Arduino IDE,
            configured sensors and actuators, and documented the process,
            integrating engineering innovation with practical agricultural
            applications.
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
              This experience strengthened my problem-solving skills, technical
              expertise in embedded systems, and capacity to innovate by
              integrating engineering principles with practical applications in
              agriculture.
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
