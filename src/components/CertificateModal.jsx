// components/CertificateModal.jsx
import React from "react";

export default function CertificateModal({ file, onClose }) {
  // Close modal if user clicks the dark background
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500/50 z-50 flex items-center justify-center px-4"
      onClick={handleOverlayClick}   // <-- Click outside closes modal
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
        
        {/* Close Button */}
        <button onClick={onClose} className="close-button">
          ✕
        </button>


        {/* Image Wrapper */}
        <div className="overflow-y-auto max-h-[90vh]">
          <img
            src={file}
            alt="Certificate"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
