import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-gray-50 text-black-100">
      <Hero />
      <About />
      <Projects />
      <Footer />
    </div>
  );
}
