import React from "react";
import ProjectCard from "./ProjectCard";

// import your images
import calcImg from "../assets/calculator.png";
import calcImg2 from "../assets/calculator2.png";
import experiece4Img from "../assets/experience4/7.jpg";
import experiece3Img from "../assets/experience3/5.jpg";
import experiece2Img from "../assets/experience2/1.jpg";
import experiece1Img from "../assets/experience1/1.png";
import academicResearchImg from "../assets/AcademicResearch/5.jpg";

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Projects/Experiences</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard
            title="Electric Range Calculator"
            description="A web-based tool to aid electricians and engineers in calculating household electric range loads according to NEC Table 220.55."
            link="/electric-range-calculator"
            image={calcImg2}
          />
          <ProjectCard
            title="Residential Electrical Load Calculator"
            description="A web-based tool for computing residential electrical loads with demand factor logic, automatic breaker sizing, and PDF/CSV export."
            link="/residential-load-calculator"
            image={calcImg}
          />
          <ProjectCard
            title="Freelance Electrical Engineer"
            description="Designed and implemented residential electrical systems, performed wiring and troubleshooting, and prepared cost estimates for clients."
            link="/experience-4"
            image={experiece4Img}
          />
          <ProjectCard
            title="Draft Technician"
            description="Created detailed floor plans for 3D virtual tours, ensured accuracy in drafting, and supported quality assurance processes."
            link="/experience-3"
            image={experiece3Img}
          />
          <ProjectCard
            title="Safety Officer II"
            description="Supervised workplace safety at Texas Instruments (via Susalum Corp.), conducted safety checks, trained workers, and investigated incidents."
            link="/experience-2"
            image={experiece2Img}
          />
          <ProjectCard
            title="Electrical Engineering Intern"
            description="Assisted in site inspections, prepared electrical layouts, contributed to unit price analysis, and supported post-earthquake safety evaluations."
            link="/experience-1"
            image={experiece1Img}
          />
          <ProjectCard
            title="Academic Research"
            description="Developed and prototyped an Automated Greenhouse with online monitoring using Arduino IDE, focusing on crop growth optimization."
            link="/academic-research"
            image={academicResearchImg}
          />
          {/* Add more projects later */}
        </div>
      </div>
    </section>
  );
}
