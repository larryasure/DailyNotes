import { LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/api.js";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/constant";

export default function DashNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);

    navigate("/login");
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get("me/");

        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  const initials = (user?.first_name?.[0] || "") + (user?.last_name?.[0] || "");

  const displayInitials = initials || "U";

  return (
    <>
      <nav className="border-b border-gray-300 bg-white/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/dashboard/diary" className="flex items-center gap-2">
              <p className="text-clip text-transparent bg-linear-to-r bg-clip-text from-amber-400 to-[#46e59d] text-lg font-bold">
                Daily
                <span>Notes</span>
              </p>
            </NavLink>

            <div className="hidden md:flex items-center gap-8">
              <NavLink
                to="/dashboard/diary"
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? "text-amber-400"
                      : "text-gray-700 hover:text-amber-200"
                  }`
                }
              >
                All DiaNotes
              </NavLink>

              <NavLink
                to="/dashboard/create_diary"
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? "text-amber-400"
                      : "text-gray-700 hover:text-amber-200"
                  }`
                }
              >
                Create Note
              </NavLink>
            </div>

            <div className="flex items-center gap-4 ">
              <div className="w-8 h-8 flex text-sm   items-center justify-center rounded-full bg-amber-200 text-black font-bold">
                {displayInitials}
              </div>

              <div onClick={() => setIsModalOpen(true)}>
                <button className="px-3 py-1 text-gray-900 font-semibold hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
                  Logout
                </button>
              </div>

              {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm  flex items-center justify-center p-4 animate-fade-in ">
                  <div className="relative max-w-sm p-6 bg-linear-to-r from-[#f1f1f1] to-[#d2cbc0]  border border-neutral-800 rounded-xl  shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-500  cursor-pointer hover:bg-neutral-800 transition-colors duration-300 active:scale-95  "
                    >
                      <X className="w-4 h-4 " />
                    </button>

                    <div className="flex items-center flex-col mt-2 ">
                      <div className=" w-12 h-12 rounded-full bg-red-950/30 flex text-red-400 items-center justify-center shadow-2xs border-red-800/30">
                        <LogOut className="w-5 h-5 " />
                      </div>

                      <h3 className="text-lg  tracking-wide font-medium">
                        Leaving So Soon?
                      </h3>

                      <p className="max-w-60 text-sm leading-relaxed mt-2 text-center">
                        Are you sure you want to log out of your diary note??
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-10">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="w-full py-3 text-sm font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 cursor-pointer active:scale-95 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="bg-white px-4 py-1.5 rounded-xl hover:bg-white/80 transition-all duration-200  cursor-pointer hover:text-red-500 text-sm  active:scale-95 "
                      >
                        Yes, Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 transition-all duration-500"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
    </>
  );
}
