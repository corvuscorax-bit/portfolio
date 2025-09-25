import React from "react";
import myPhoto from "../assets/me.jpg"; // <- put your photo in src/assets/

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center md:items-start gap-10">
        {/* Picture on the right */}
        <div className="flex-shrink-0">
          <img
            src={myPhoto}
            alt="Raven Pascua"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-lg"
          />
        </div>

        {/* Text on the left */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            About Me
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            I’m <span className="font-semibold text-blue-600">Raven Pascua</span>,
            a Registered Electrical Engineer with a strong foundation in{" "}
            <span className="font-medium">AutoCAD, Revit, C, C++, MATLAB, and Visual Studio</span>.
            I combine engineering principles with coding to design innovative tools
            and applications. My experience spans{" "}
            <span className="italic">
              electrical wiring, planning, drafting, safety protocols, and software development
            </span>
            , always with a focus on delivering solid, reliable work.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            I’m passionate about solving technical problems, creating efficient
            systems, and collaborating with teams to bring projects to life. Whether
            it’s designing electrical plans, wiring installations, developing embedded systems, or coding
            engineering applications, I strive to merge{" "}
            <span className="font-medium">innovation and practicality</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
