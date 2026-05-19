import { NavLink } from "react-router-dom";
import pic from "../assets/cuate.png";

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-8 py-10 bg-[#FFEE93]">
      <div className="grid grid-cols-1 min-h-screen w-full max-w-4xl sm:grid-cols-2 overflow-hidden bg-white shadow-xl rounded-xl h-[85vh]">
        {/* Left Side: Content */}
        <div className="flex flex-col justify-between sm:p-12 p-6">
          <div>
            <NavLink to="/" className="flex items-center gap-3">
              <p className="text-clip text-transparent bg-linear-to-r bg-clip-text from-amber-400 to-[#46e59d] text-lg font-bold">
                Daily
                <span>Notes</span>
              </p>
            </NavLink>

            <div className="mt-5 sm:mt-20 ">
              <h1 className="font-medium text-gray-800 text-4xl sm:text-7xl">
                OOPS...
              </h1>
              <h3 className="mt-2 text-xl sm:text-2xl text-gray-600 font-medium">
                Page not found
              </h3>
              <p className="sm:mt-6 mt-3 text-sm leading-relaxed text-gray-400 max-w-xs">
                The page you are looking for doesn’t exist or another error
                occurred. Please go back to the home page.
              </p>
            </div>
          </div>

          <button className="px-8 py-3 font-semibold text-white transition-all bg-gray-900 rounded-lg w-fit hover:bg-black active:scale-95 sm:mt-3 mt-1">
            <NavLink to={"/"}>Go Home</NavLink>
          </button>
        </div>

        <div className="right-bg sm:p-10 p-5 w-full  ">
          <img
            src={pic}
            alt="Error Illustration"
            className="object-contain  w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
