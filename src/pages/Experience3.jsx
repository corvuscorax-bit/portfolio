import React from "react";
import CommercialDrafts from "../assets/experience3/1.png";
import ResidentialDrafts from "../assets/experience3/2.png";
import RestorationDrafts from "../assets/experience3/3.png";
import PreConstructionDrafts from "../assets/experience3/4.png";
import ExperiencePages from "../components/ExperiencePages";

export default function Experience3() {
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

        {/* Images section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={CommercialDrafts} // replace with your own image file
              alt="Commercial Drafts"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Commercial Drafts</h3>
              <p className="text-gray-600">
                Prepared drafts for commercial spaces, including floor plans and virtual tour layouts.
                Executed quality checks and error reporting to ensure accuracy and consistency.
              </p>

            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={ResidentialDrafts} // replace with your own image file
              alt="Residential Drafts"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Residential Drafts</h3>
              <p className="text-gray-600">
                Drafted detailed floor plans for residential properties, 
                highlighting architectural features, room arrangements, and interior finishes. 
                Integrated visual cues and navigation tools to support virtual tours and enhance client presentation.
              </p>
            </div>
          </div>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={RestorationDrafts} // replace with your own image file
              alt="Restoration Drafts"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Restoration Drafts</h3>
              <p className="text-gray-600">
                Created virtual layouts for damaged properties, documenting structural conditions and room configurations. 
                Captured post-incident visuals to assist in insurance, restoration, and safety assessments.
              </p>

            </div>
          </div>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={PreConstructionDrafts} // replace with your own image file
              alt="Pre Construction Drafts"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Pre Construction Drafts</h3>
              <p className="text-gray-600">
                Prepared structural and spatial drafts for properties in early construction stages. 
                Mapped framing, room divisions, and elevation details based on site progress and a
                rchitectural plans. Supported planning, inspection, and client walkthroughs with accurate 
                digital overlays.
              </p>

            </div>
          </div>
        </div>

        {/* Extra section if you want more */}
        <div className="mt-12 text-center">
          <p className="text-gray-700">
            This experience strengthened my attention to detail, proficiency in technical drafting, and ability to 
            maintain accuracy under tight deadlines while collaborating with cross-functional teams.
          </p>
        </div>
      </div>
    </section>
    <ExperiencePages />
    </main>
  );
}
