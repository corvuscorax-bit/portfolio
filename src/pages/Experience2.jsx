import React from "react";
import ScaffoldSafetyInspection from "../assets/experience2/1.jpg";
import TeamSafetySnapshot from "../assets/experience2/2.jpg";
import HeavyPipeInstallation from "../assets/experience2/3.jpg";
import CeilingWork from "../assets/experience2/4.jpg";

export default function Experience2() {
  return (
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

        {/* Images section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={ScaffoldSafetyInspection} // replace with your own image file
              alt="Scaffold Safety Inspection"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Scaffold Safety Inspection</h3>
              <p className="text-gray-600">
                Documentation of scaffold assembly during an indoor construction project. Workers equipped with full PPE, hazard signage in place, and scaffold structure properly configured. Responsibilities included inspection of structural integrity, enforcement of access control, and verification of compliance with safety protocols.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={TeamSafetySnapshot}// replace with your own image file
              alt="Team Safety Snapshot"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Team Safety Snapshot</h3>
              <p className="text-gray-600">
                Group photo taken during routine inspection at an outdoor industrial site. All personnel outfitted with appropriate PPE, demonstrating adherence to safety standards and fostering a culture of teamwork. Duties involved monitoring of safety compliance, coordination of inspection activities, and promotion of a positive work environment.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={HeavyPipeInstallation} // replace with your own image file
              alt="Heavy Pipe Installation"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Heavy Pipe Installation</h3>
              <p className="text-gray-600">
                Installation of a large flanged pipe elbow using a chain hoist system within an active industrial facility. Workers equipped with full PPE including hard hats, gloves, safety goggles, and harnesses. Scaffold structure used for overhead support, with clear floor markings and caution tape in place. Task involved coordinated lifting, positioning, and alignment of mechanical components, emphasizing teamwork and safe handling of heavy equipment.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={CeilingWork} // replace with your own image file
              alt="Ceiling Work"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Ceiling Work</h3>
              <p className="text-gray-600">
                Execution of overhead maintenance tasks involving exposed ceiling structures and ductwork. Workers outfitted with safety harnesses, helmets, and protective gear. One worker positioned on a ladder performing ceiling-related work, while another provides ground support. Environment includes construction materials, wiring, and protective coverings, with clear attention to fall protection and safe ladder use.
              </p>
            </div>
          </div>
          
        </div>        
        {/* Extra section if you want more */}
        <div className="mt-12 text-center">
          <p className="text-gray-700">
            This experience strengthened my ability to manage safety, collaborate with teams, 
            and uphold strict compliance standards in high-pressure environments.
          </p>
        </div>
      </div>
    </section>
  );
}
