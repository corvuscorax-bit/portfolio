import React from "react";
import ResidentialElectricalInstallation from "../assets/experience4/1.png";
import ElectricalPanelInstallation from "../assets/experience4/2.png";
import InstallationofServiceDropandServiceMeterBox from "../assets/experience4/3.png";
import ElectricalDocumentationandLoadScheduling from "../assets/experience4/4.png";
import PreConstructionElectricalPlanning from "../assets/experience4/5.png";
import CeilingLightingandFixtureLayout from "../assets/experience4/6.png";

export default function Experience4() {
  return (
    <section className="py-20 bg-gray-50">
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

        {/* Images section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={PreConstructionElectricalPlanning} // replace with your own image file
              alt="Pre Construction Electrical Planning"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Pre Construction Electrical Planning</h3>
              <p className="text-gray-600">
                Site coordination and planning for electrical systems during early construction stages. 
                Integration of conduit paths, panel locations, and load requirements.
              </p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={ElectricalDocumentationandLoadScheduling} // replace with your own image file
              alt="Electrical Documentation and Load Scheduling"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Electrical Documentation and Load Scheduling</h3>
              <p className="text-gray-600">
                Preparation of technical drawings, load schedules, and single-line diagrams for residential and 
                commercial projects. Compliance with PEC/NEC standards and coordination with contractors for implementation.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={CeilingLightingandFixtureLayout} // replace with your own image file
              alt="Ceiling Lighting and Fixture Layout"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Ceiling Lighting and Fixture Layout</h3>
              <p className="text-gray-600">
                Design and installation of layered ceiling lighting systems, including recessed fixtures and central luminaires. 
                Coordination with architectural finishes to ensure balanced illumination and aesthetic integration.
             </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={ResidentialElectricalInstallation} // replace with your own image file
              alt="Residential Electrical Installation"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Residential Electrical Installation</h3>
              <p className="text-gray-600">
                Installation of embedded conduits and junction boxes for residential power and lighting systems. 
                Wiring routed and secured in compliance with PEC standards, with provisions for future load expansion 
                and finish work
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={ElectricalPanelInstallation} // replace with your own image file
              alt="Electrical Panel Installation"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Electrical Panel Installation</h3>
              <p className="text-gray-600">
                Installation of a 20-way, 125-amp electrical panel for residential power distribution. Embedded 
                conduits routed to junction boxes, with circuit breakers configured for lighting, outlets, and 
                dedicated loads. Work performed in compliance with PEC standards and site-specific load requirements.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={InstallationofServiceDropandServiceMeterBox} // replace with your own image file
              alt="Installation of Service Drop and Service Meter Box"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Installation of ServiceD rop and Service Meter Box</h3>
              <p className="text-gray-600">Installed overhead service drop and mounted service meter base for residential 
                power connection. Routed conductors from utility pole to weatherhead, secured grounding system, and coordinated
                 with local utility for energization. Work performed in compliance with PEC/NEC standards and site-specific load
                  requirementsGuided workers on safe practices, supervised operations, and ensured tasks were completed under 
                  proper safety measures.
              </p>
            </div>
          </div>
        </div>

        {/* Extra section if you want more */}
        <div className="mt-12 text-center">
          <p className="text-gray-700">
            This experience strengthened my ability to apply technical knowledge in real-world settings, adapt to diverse client needs, 
            and deliver safe, code-compliant electrical solutions with efficiency and precision.
          </p>
        </div>
      </div>
    </section>
  );
}
