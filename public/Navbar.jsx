import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-gray-300/50 shadow z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-0 px-6">
        <header className="flex items-center justify-between p-6">
            {/* Left side: name/logo */}
            <button

                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-2xl font-bold text-blue-600"
            >
                    <div className="flex items-center space-x-3">
                    <img
                    src="/logo2.png"
                    alt="Logo"
                    className="h-10 w-auto"
                    />
                    <div className="text-3xl font-bold">
                        Raven Pascua
                    </div>
                </div>
                
            </button>
        </header>
        <div className="space-x-6 hidden md:flex">
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#projects" className="hover:text-blue-600">Projects</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
          <Link to="/resume" className="hover:text-blue-600">Resume</Link>
        </div>
      </div>
    </nav>
  );
}
