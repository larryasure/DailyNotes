import { ArrowBigRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import Facebook from "../assets/Facebook.png";
import Instagram from "../assets/Instagram.png";
import LinkedIn from "../assets/linkedIn.png";
import Twitter from "../assets/Twitter.png";

export default function Footer() {
  return (
    <>
      <div className="min-h-40 px-8 py-6  bg-[#FAF6E2] text-black grid md:grid-cols-3 sm:grid-cols-2 gap-7 grid-cols-1 ">
        <div className="flex items-start flex-col gap-3  grid-cols-1">
          <NavLink to="/" className="flex items-center gap-2 mb-2">
            <p className="text-clip text-transparent bg-linear-to-r bg-clip-text from-amber-400 to-[#46e59d] text-lg font-bold">
              Daily
              <span>Notes</span>
            </p>
          </NavLink>

          <p className="text-sm font-normal leading-relaxed  ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Accusantium, qui eius nesciunt soluta ipsam maxime,
          </p>
          <h3 className="font-semibold  ">Social Media</h3>

          <ul className="flex items-center gap-3">
            <li className="flex items-center justify-center h-7 w-7 bg-[#EBE5C9] rounded-full shadow ">
              <span>
                <img src={Twitter} alt="Twitter Image" />
              </span>
            </li>

            <li className="flex items-center justify-center h-7 w-7 bg-[#EBE5C9] rounded-full shadow ">
              <span>
                <img src={Facebook} alt="Facebook Image" />
              </span>
            </li>

            <li className="flex items-center justify-center h-7 w-7 bg-[#EBE5C9] rounded-full shadow ">
              <span>
                <img src={Instagram} alt="Instagram Image" />
              </span>
            </li>

            <li className="flex items-center justify-center h-7 w-7 bg-[#EBE5C9] rounded-full shadow ">
              <span>
                <img src={LinkedIn} alt="LinkedIn Image" />
              </span>
            </li>
          </ul>
        </div>

        <div className="flex items-center flex-col gap-3  grid-cols-1">
          <h3 className="uppercase font-semibold  ">Pages</h3>

          <ul className="flex items-start flex-col gap-2 ">
            <li className="text-sm opacity-80 hover:opacity-100 transition-all duration-200 hover:font-medium">
              <NavLink to="/">Home Page</NavLink>
            </li>

            <li className="text-sm  opacity-80 hover:opacity-100 transition-all duration-200 hover:font-medium">
              <NavLink to="/about">About</NavLink>
            </li>

            <li className="text-sm opacity-80 hover:opacity-100 transition-all duration-200 hover:font-medium ">
              <NavLink to="/feature">Feature</NavLink>
            </li>

            <li className="text-sm opacity-80 hover:opacity-100 transition-all duration-200 hover:font-medium">
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div>
            <h3 className="font-semibold tracking-wider uppercase text-gray-900 mb-2">
              Subscribe to our Newsletter
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              <span className="font-bold text-red-500">*</span> Only valuable
              resources and information are sent to you.
            </p>
          </div>

          <div className="flex items-center w-full max-w-md gap-3">
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-full placeholder:text-sm focus:outline-none focus:border-black"
            />

            <button className="flex items-center justify-center bg-black border border-transparent rounded-full shrink-0 w-13 h-13 hover:bg-gray-800 transition-colors">
              <ArrowBigRight className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
