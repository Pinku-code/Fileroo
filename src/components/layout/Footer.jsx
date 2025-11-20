import { Link } from "react-router-dom";
import { Github, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              {/* <div className="w-10 h-10 rounded-xl bg-lime-400 flex items-center justify-center font-black text-xl">
                F
              </div> */}
              <img className="w-10 h-10" src="/logo.png" alt="" />
              <span className="font-extrabold text-xl text-gray-900">Fileroo</span>
            </Link>

            <p className="text-gray-600 text-sm leading-relaxed">
              Fast, private, and secure PDF tools powered by on-device processing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h4>

            <ul className="space-y-3 text-gray-700 list-none">
              {/* <li>
                <Link to="/" className="hover:text-lime-600 transition">Home</Link>
              </li> */}
              {/* <li>
                <Link to="/tools" className="hover:text-lime-600 transition">All Tools</Link>
              </li> */}
              <li>
                <Link to="/about" className="hover:text-lime-600 transition">About</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-lime-600 transition">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-lime-600 transition">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Get in Touch
            </h4>

            <p className="text-gray-600 text-sm">
              Have questions? We'd love to hear from you.
            </p>

            <div className="mt-4 flex items-center gap-4">
              {/* Email */}
              <a
                href="mailto:support@fileroo.com"
                className="flex items-center gap-2 hover:text-lime-600 transition"
              >
                <Mail size={20} />
                <span>support@fileroo.com</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://github.com/"
                target="_blank"
                className="hover:text-lime-600 transition"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-10 pt-6 text-center">
          <p className="text-sm text-gray-600">
            © {year} Fileroo — All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
