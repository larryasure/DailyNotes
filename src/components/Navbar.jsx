import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {



  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-gray-300 bg-white/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <p className="text-clip text-transparent bg-linear-to-r bg-clip-text from-amber-400 to-[#46e59d] text-lg font-bold">
              Daily
              <span>Notes</span>
            </p>
          </NavLink>

          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-amber-400"
                    : "text-gray-700 hover:text-amber-200"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-amber-400"
                    : "text-gray-700 hover:text-amber-200"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/feature"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-amber-400"
                    : "text-gray-700 hover:text-amber-200"
                }`
              }
            >
              Feature
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-amber-400"
                    : "text-gray-700 hover:text-amber-200"
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <NavLink
              to={"/login"}
              className="px-3 py-1 text-gray-900 font-semibold hover:bg-gray-50 rounded-xl transition-all cursor-pointer"
            >
              Login
            </NavLink>

            <NavLink
              to={"/register"}
              className="px-3 py-1 text-gray-800  font-semibold rounded-xl cursor-pointer hover:opacity-90 transition-all"
            >
              Register
            </NavLink>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 transition-all duration-500"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-4 border-t border-gray-300 pt-4">
            <NavLink
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              About
            </NavLink>

            <NavLink
              to="/feature"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Feature
            </NavLink>

            <NavLink
              to="/contact"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Contact
            </NavLink>

            <NavLink
              to={"/register"}
              className="w-full px-4 py-2 z-20 bg-amber-500 text-white font-semibold rounded-3xl"
            >
              Get Started
            </NavLink>

            <NavLink
              to={"/login"}
              className="w-full px-3 py-2 z-10 text-amber-400 font-semibold border border-amber-200 rounded-3xl"
            >
              Sign In
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
