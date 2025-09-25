import React from "react";
import Contact from "./Contact";


export default function Footer() {
  return (
    <footer className="text-sm py-2 bg-gray-900 text-gray-400 text-center">
      <Contact />
      <p>© {new Date().getFullYear()} Raven Pascua. All Rights Reserved.</p>
    </footer>
  );
}
