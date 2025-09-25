import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="py-5 bg-gray-900">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="text-gray-300 mb-6">
          Have a project idea, want to collaborate, or a job opportunity? Let’s connect!
        </p>

        {/* Contact Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-50">
          <a
            href="mailto:raven.pascua45@gmail.com"
            className="px-6 py-3 rounded-lg hover:bg-blue-600/50"
          >
            📧 Email Me
          </a>
          <a
            href="tel:+639201069515"
            className="px-6 py-3 rounded-lg hover:bg-blue-600/50"
          >
            📞 +63 920 106 9515
          </a>
          <a
            href="https://www.linkedin.com/in/raven-pascua-corvuscorax99/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg hover:bg-blue-600/50"
          >
            💼 LinkedIn
          </a>
          <a
            href="https://www.instagram.com/ouranos9991/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg hover:bg-blue-600/50"
          >
            📷 Instagram
          </a>
          <a
            href="https://www.facebook.com/ravencorvusco/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg hover:bg-blue-600/50"
          >
            ⓕ Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
