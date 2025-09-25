import React from "react";
import myPhoto from "../assets/developer.svg"; // make sure to put your image in src/assets/

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row justify-center items-center text-center md:text-left px-6 gap-10">
      {/* Picture */}
      <div className="flex-shrink-0">
        <img
          src={myPhoto}
          alt="Raven Pascua"
          className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-lg"
        />
      </div>

      {/* Text */}
      <div>
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
          Hi, I’m <span className="text-blue-600">Raven</span> 👋
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
          A passionate Electrical Engineer with a love for solving technical problems,
          drafting electrical plans, and a passion for coding.
        </p>
        <div className="mt-6 flex gap-4 justify-center md:justify-start">
          <a
            href="#projects"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
