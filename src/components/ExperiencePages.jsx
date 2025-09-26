import { Link, useLocation } from "react-router-dom";
import {
  Briefcase,
  PenTool,
  ShieldCheck,
  Wrench,
  Microscope,
} from "lucide-react"; // icons

export default function ExperiencePages() {
  const location = useLocation();

  const projects = [
    {
      id: 1,
      title: "Freelance Electrical Engineer",
      desc: "Designed and implemented residential electrical systems, performed wiring and troubleshooting, and prepared cost estimates for clients.",
      link: "/experience-4",
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
    },
    {
      id: 2,
      title: "Draft Technician",
      desc: "Created detailed floor plans for 3D virtual tours, ensured accuracy in drafting, and supported quality assurance processes.",
      link: "/experience-3",
      icon: <PenTool className="w-8 h-8 text-green-600" />,
    },
    {
      id: 3,
      title: "Safety Officer II",
      desc: "Supervised workplace safety at Texas Instruments (via Susalum Corp.), conducted safety checks, trained workers, and investigated incidents.",
      link: "/experience-2",
      icon: <ShieldCheck className="w-8 h-8 text-red-600" />,
    },
    {
      id: 4,
      title: "Electrical Engineering Intern",
      desc: "Assisted in site inspections, prepared electrical layouts, contributed to unit price analysis, and supported post-earthquake safety evaluations.",
      link: "/experience-1",
      icon: <Wrench className="w-8 h-8 text-yellow-600" />,
    },
    {
      id: 5,
      title: "Academic Research",
      desc: "Developed and prototyped an Automated Greenhouse with online monitoring using Arduino IDE, focusing on crop growth optimization.",
      link: "/academic-research",
      icon: <Microscope className="w-8 h-8 text-purple-600" />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 mt-12">
      {/* Section Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center relative">
        More Experiences
        <span className="block w-16 h-1 bg-blue-500 mx-auto mt-2 rounded"></span>
      </h1>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects
          .filter((proj) => proj.link !== location.pathname) // Hide current page
          .map((proj) => (
            <Link
              key={proj.id}
              to={proj.link}
              className="block bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-2xl hover:scale-105 transform transition duration-200 ease-in-out"
            >
              <div className="flex items-center gap-3 mb-3">
                {proj.icon}
                <h2 className="text-lg font-semibold text-gray-900">
                  {proj.title}
                </h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {proj.desc}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
}
