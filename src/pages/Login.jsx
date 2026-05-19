import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/api.js";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/constant";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPasssword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess("");
    setError("");

    if (!username || !password) {
      setError("Fill the credentials!");
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post("token/", {
        username,
        password,
      });

      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      setSuccess("Login Successful! please wait");
      setPasssword("");
      setUsername("");

      setTimeout(() => {
        navigate("/dashboard/diary");
      }, 3000);
    } catch (error) {
      console.error("Invalid credentials", error);
      setError(error.response?.data?.detail || "invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen px-8 my-5">
        <div className="shadow-md border-gray-200 bg-linear-to-br from-[#f1f1f1] to-[#d2cbc0] max-w-sm   p-5 mx-auto rounded-sm">
          <div className="flex flex-col gap-1 items-center">
            <h2 className="text-2xl font-medium text-gray-800 mb-2">Login</h2>
            <p className="text-sm text-gray-600  text-center">
              Hey! welcome to DiaFamily, Enter your details below.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-start gap-5 flex-col  "
          >
            <div className="flex items-start gap-1 flex-col w-full mt-8 ">
              <label className="font-medium text-sm ">Username:</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-500  rounded-lg placeholder:text-sm text-sm focus:outline-none focus:ring-1 duration-200  transition-all"
                placeholder="@lancelot"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                name="username"
                autoComplete="username"
              />
            </div>

            <div className="flex items-start gap-1 flex-col w-full  ">
              <label className="font-medium text-sm ">Password:</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-500  rounded-lg placeholder:text-sm text-sm focus:outline-none focus:ring-1 duration-200  transition-all"
                placeholder="******"
                value={password}
                onChange={(e) => {
                  setPasssword(e.target.value);
                  setError("");
                }}
                name="password"
                autoComplete="current-password"
              />
            </div>

            <div className="flex flex-col gap-4 w-full">
              {error && <div className="text-red-500 text-sm ">{error}</div>}
              {isLoading && (
                <div className="flex items-center gap-2 ">
                  <p>Loading, Please Wait</p>

                  <span className="animate-bounce transition-all [animation-delay: 50ms] h-2 w-2 rounded-full bg-black"></span>
                  <span className="animate-bounce transition-all [animation-delay:200ms]  h-2 w-2 rounded-full bg-black"></span>
                  <span className="animate-bounce transition-all [animation-delay:400ms]  h-2 w-2 rounded-full bg-black"></span>
                </div>
              )}

              {success && (
                <div className="text-sm text-green-500">{success}</div>
              )}
              <button
                type="submit"
                className="w-full py-3 font-semibold text-white transition-all duration-200 bg-gray-900 rounded-xl hover:bg-black active:scale-105"
              >
                Login
              </button>

              <p className="text-sm text-center text-gray-600">
                Don't have an account?
                <NavLink
                  to="/register"
                  className="font-medium text-gray-900 underline underline-offset-3 hover:text-black"
                >
                  Register
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
