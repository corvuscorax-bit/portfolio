import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollLink from "./ScrollLink";

const referencePDFs = [
  { id: 1, name: "ARTICLE 220 Branch-Circuit, Feeder, and Service Calculations", file: "/pdfs/reference-tables.pdf" },
  { id: 2, name: "Alternating-Current Motors Full-Load Currents", file: "/pdfs/reference-tables2.pdf" },
  { id: 3, name: "PEC 2017 Tables", file: "/pdfs/reference-tables3.pdf" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // mobile main menu
  const [desktopOpen, setDesktopOpen] = useState(false); // desktop calculators hover menu
  const [mobileCalcOpen, setMobileCalcOpen] = useState(false); // mobile calculators submenu
  const [showTables, setShowTables] = useState(false); // PDF modal
  const [selectedPDF, setSelectedPDF] = useState(null);

  const closeTimeoutRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const modalRef = useRef(null);

  const calculators = [
    { name: "Residential Load Calculator", link: "/residential-load-calculator" },
    { name: "Electric Range Calculator", link: "/electric-range-calculator" },
    { name: "Voltage Drop Calculator", link: "/voltage-drop-calculator" },
    // Future calculators can be added here
  ];

  // Clear any pending close timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Close on escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setDesktopOpen(false);
        setMobileCalcOpen(false);
        setIsOpen(false);
        setShowTables(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Close mobile menu if clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (isOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsOpen(false);
        setMobileCalcOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Close modal if clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (showTables && modalRef.current && !modalRef.current.contains(e.target)) {
        setShowTables(false);
      }
    }
    if (showTables) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showTables]);

  // Desktop hover handlers
  const handleDesktopMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setDesktopOpen(true);
  };
  const handleDesktopMouseLeave = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setDesktopOpen(false);
      closeTimeoutRef.current = null;
    }, 150);
  };

  return (
    <nav className="bg-gray-50/90 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Brand / Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-bold text-blue-600 flex items-center space-x-3"
        >
          <img src="/logo2.png" alt="Logo" className="h-10 w-auto" />
          <div className="text-3xl font-bold">Raven Pascua</div>
        </Link>

        {/* Hamburger button (mobile) */}
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="md:hidden p-2 rounded text-gray-700 hover:bg-gray-200 focus:outline-none"
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600">Home</Link>
          <ScrollLink to="#about" className="hover:text-blue-600">About</ScrollLink>
          <ScrollLink to="#projects" className="hover:text-blue-600">Projects</ScrollLink>
          <ScrollLink to="#contact" className="hover:text-blue-600">Contact</ScrollLink>
          <Link to="/resume" className="hover:text-blue-600">Resume</Link>
          <Link to="/gallery" className="hover:text-blue-600">Gallery</Link>


          {/* Calculators dropdown (desktop) */}
          <div
            className="relative"
            onMouseEnter={handleDesktopMouseEnter}
            onMouseLeave={handleDesktopMouseLeave}
          >
            <button
              className="hover:text-blue-600 flex items-center gap-1 px-2 py-1 rounded"
              aria-expanded={desktopOpen}
              aria-haspopup="menu"
            >
              Calculators ▾
            </button>

            {desktopOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white/95 shadow-lg rounded z-50"
                role="menu"
                onMouseEnter={handleDesktopMouseEnter}
                onMouseLeave={handleDesktopMouseLeave}
              >
                <button
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left hover:text-blue-600"
                  onClick={() => {
                    setShowTables(true);
                    setDesktopOpen(false);
                  }}
                >
                  📑 Reference Tables
                </button>

                <div className="border-t" />

                {calculators.map((calc, idx) => (
                  <Link
                    key={idx}
                    to={calc.link}
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-600"
                    onClick={() => setDesktopOpen(false)}
                    role="menuitem"
                  >
                    {calc.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div ref={mobileMenuRef} className="md:hidden bg-gray-50/60 shadow-lg border-t">
          <div className="flex flex-col space-y-4 p-4">
            <Link to="/" onClick={() => {window.scrollTo({ top: 0, behavior: "smooth" });setIsOpen(false);}} className="hover:text-blue-600">Home</Link>
            <ScrollLink to="#about" className="hover:text-blue-600" closeMenu={() => setIsOpen(false)}>About</ScrollLink>
            <ScrollLink to="#projects" className="hover:text-blue-600" closeMenu={() => setIsOpen(false)}>Projects</ScrollLink>
            <ScrollLink to="#contact" className="hover:text-blue-600" closeMenu={() => setIsOpen(false)}>Contact</ScrollLink>
            <Link to="/resume" onClick={() => {window.scrollTo({ top: 0, behavior: "smooth" });setIsOpen(false);}} className="hover:text-blue-600">Resume</Link>
            <Link to="/gallery" onClick={() => {window.scrollTo({ top: 0, behavior: "smooth" });setIsOpen(false);}} className="hover:text-blue-600">Gallery</Link>

            {/* Mobile Calculators dropdown */}
            <div className="relative">
              <button
                onClick={() => setMobileCalcOpen(prev => !prev)}
                className="w-full text-left px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-between"
                aria-expanded={mobileCalcOpen}
              >
                <span>Calculators</span>
                <span>{mobileCalcOpen ? "▲" : "▼"}</span>
              </button>

              {mobileCalcOpen && (
                <div className="flex flex-col ml-2 mt-2 space-y-1">
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left rounded hover:text-blue-600"
                    onClick={() => {
                      setShowTables(true);
                      setIsOpen(false);
                      setMobileCalcOpen(false);
                    }}
                  >
                    📑 Reference Tables
                  </button>

                  {calculators.map((calc, idx) => (
                    <Link
                      key={idx}
                      to={calc.link}
                      className="px-4 py-2 hover:bg-gray-100 rounded hover:text-blue-600"
                      onClick={() => {
                        setIsOpen(false);
                        setMobileCalcOpen(false);
                      }}
                    >
                      {calc.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reference Tables Modal */}
      {showTables && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg max-w-5xl w-full p-6 relative overflow-hidden max-h-[90vh] flex"
          >
            <button
              onClick={() => setShowTables(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black z-10"
            >
              ✕
            </button>

            {/* Sidebar with PDFs */}
            <div className="w-1/4 border-r p-2 overflow-y-auto text-black">
              <h2 className="font-semibold mb-4">Reference Tables</h2>
              {referencePDFs.map((pdf) => (
                <button
                  key={pdf.id}
                  onClick={() => setSelectedPDF(pdf.file)}
                  className={`block w-full text-left px-2 py-1 rounded mb-1 text-black bg-gray-200/50 hover:bg-gray-100 ${
                    selectedPDF === pdf.file ? "bg-gray-200 font-bold" : ""
                  }`}
                >
                  {pdf.name}
                </button>
              ))}
            </div>

            {/* PDF viewer */}
            <div className="flex-1 p-2 overflow-auto">
              {selectedPDF ? (
                <iframe
                  src={selectedPDF}
                  title="Reference PDF"
                  className="w-full h-[80vh] border rounded"
                />
              ) : (
                <p className="text-gray-500">Select a PDF from the left to view.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
