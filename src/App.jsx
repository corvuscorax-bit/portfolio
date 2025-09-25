import React from "react";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import AcademicResearch from "./pages/AcademicResearch";
import Experience1 from "./pages/Experience1";
import Experience2 from "./pages/Experience2";
import Experience3 from "./pages/Experience3";
import Experience4 from "./pages/Experience4";
import ResidentialLoadCalculator from "./projects/ResidentialLoadCalculator";
import ElectricRangeCalculator from "./projects/ElectricRangeCalculator";
import Resume from "./pages/Resume";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <><ScrollToTop />
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/gallery"
          element={
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
            >
              <Gallery />
            </motion.div>
          }
        />
        <Route
          path="/resume"
          element={
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <Resume />
            </motion.div>
          }
        />
        <Route
          path="/electric-range-calculator"
          element={
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <ElectricRangeCalculator />
            </motion.div>
          }
        />
        <Route
          path="/residential-load-calculator"
          element={
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <ResidentialLoadCalculator />
            </motion.div>
          }
        />
        <Route
          path="/experience-4"
          element={
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
            >
              <Experience4 />
            </motion.div>
          }
        />
        <Route
          path="/experience-3"
          element={
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
            >
              <Experience3 />
            </motion.div>
          }
        />
        <Route
          path="/experience-2"
          element={
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
            >
              <Experience2 />
            </motion.div>
          }
        />
        <Route
          path="/experience-1"
          element={
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
            >
              <Experience1 />
            </motion.div>
          }
        />
        <Route
          path="/academic-research"
          element={
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
            >
              <AcademicResearch />
            </motion.div>
          }
        />
         <Route
          path="/footer"
          element={
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
            >
              <Footer />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <Router>
      {/* Navbar always visible */}
      <Navbar />

      <div className="pt-16">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
