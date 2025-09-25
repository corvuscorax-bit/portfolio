import React from "react";
import SingleLineDiagram from "../assets/experience1/1.png";
import PostEarthquakeInspection from "../assets/experience1/2.jpg";

export default function Experience1() {
  return (
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

        {/* Images section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={SingleLineDiagram}// replace with your own image file
              alt="Single Line Diagram"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Single Line Diagram</h3>
              <p className="text-gray-600">
                Developed a complete electrical floor plan, ensuring compliance with the 
                Philippine Electrical Code and site constraints. I coordinated with architects 
                and project engineers to integrate lighting with existing structure, performed 
                load calculations and voltage drop checks, and delivered AutoCAD plans ready 
                for construction.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={PostEarthquakeInspection} // replace with your own image file
              alt="Post Earthquake Inspection"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Post Earthquake Inspection</h3>
              <p className="text-gray-600">
                Assessment of government buildings in Benguet to identify structural and electrical hazards.
                Verification of electrical layouts and serviceability of systems for safety compliance.
                Documentation of findings to support repair planning and restoration efforts
              </p>
            </div>
          </div>
        </div>

        {/* Extra section if you want more */}
        <div className="mt-12 text-center">
          <p className="text-gray-700">
            This experience strengthened my understanding of public infrastructure projects, skills in site inspection and cost estimation, 
            and ability to contribute effectively to engineering teams in a government setting.
          </p>
        </div>
      </div>
    </section>
  );
}
