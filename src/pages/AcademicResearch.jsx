import React from "react";
import ArduinoIDE from "../assets/AcademicResearch/1.png";
import GreenhouseModel from "../assets/AcademicResearch/2.png";
import SchematicDiagram  from "../assets/AcademicResearch/3.png";
import InstallationofControlCabinet  from "../assets/AcademicResearch/4.jpg";
import FieldTesting from "../assets/AcademicResearch/6.jpg";
import SmartFarmingInterface from "../assets/AcademicResearch/7.jpg";

export default function AcademicResearch() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Academic Research
        </h2>

        {/* Short description */}
        <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-12">
          During my role in <span className="font-semibold text-blue-600">Academic Research </span> 
          at <span className="italic">Saint Louis University</span>, 
          I developed an automated greenhouse prototype with online crop monitoring. I programmed 
          embedded systems using Arduino IDE, configured sensors and actuators, and documented the process, 
          integrating engineering innovation with practical agricultural applications.
        </p>

        {/* Images section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={ArduinoIDE} // replace with your own image file
              alt="Arduino IDE"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Programming using Arduino IDE</h3>
              <p className="text-gray-600">
                Programmed control logic, assigned I/O pins, tested system functions, and debugged embedded hardware for stable operation.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={GreenhouseModel} // replace with your own image file
              alt="Greenhouse Model"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">3D Greenhouse Model</h3>
              <p className="text-gray-600">
                Designed greenhouse layout, positioned control systems, and visualized plant rows for spatial planning and automation.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={SchematicDiagram } // replace with your own image file
              alt="Schematic Diagram "
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Schematic Diagram</h3>
              <p className="text-gray-600">
                Created wiring diagram showing connections between sensors, actuators, microcontroller, and power supply for system integration.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={InstallationofControlCabinet} // replace with your own image file
              alt="Installation of Control Cabinet"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Installation of Control Cabinet</h3>
              <p className="text-gray-600">
                Assembled control cabinet housing microcontroller, power supply, relays, and terminal blocks for organized system control.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={FieldTesting} // replace with your own image file
              alt="Field Testing"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Field Testing</h3>
              <p className="text-gray-600">
                Conducted field testing of automated greenhouse system, monitored sensor data, and evaluated performance for optimization.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={SmartFarmingInterface} // replace with your own image file
              alt="Smart Farming Interface"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Smart Farming Interface</h3>
              <p className="text-gray-600">
                Developed user interface for real-time monitoring and control of greenhouse parameters via web or mobile application.
              </p>
            </div>
          </div>
        </div>

        {/* Extra section if you want more */}
        <div className="mt-12 text-center">
          <p className="text-gray-700">
            This experience strengthened my problem-solving skills, technical expertise in embedded systems, and capacity to innovate 
            by integrating engineering principles with practical applications in agriculture.
          </p>
        </div>
      </div>
    </section>
  );
}
