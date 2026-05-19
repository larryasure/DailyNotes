import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== ConfirmPassword) {
      setError("passwords do not match!");
      setIsLoading(false);
      setSuccess("");
      return;
    }

    const formData = {
      username,
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    };

    if (
      !username ||
      !email ||
      !password ||
      !ConfirmPassword ||
      !firstName ||
      !lastName
    ) {
      setIsLoading(false);
      setError("All fields must be filled!");
      return;
    }

    try {
      await api.post("register/", formData);
      setSuccess("Account created Successfully");
      setUsername("");
      setEmail("");
      setFirstName("");
      setLastName("");
      setPasssword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (error) {
      console.error(error);
      console.log(error.response.data);

      const data = error.response?.data;

      if (data) {
        const firstKey = Object.keys(data)[0];
        const firstMessage = data[firstKey][0];

        setError(firstMessage);
      } else {
        setError("Unable to complete registration. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen  my-7 px-8">
        <div className=" shadow-md border-gray-200 bg-linear-to-br from-[#f1f1f1] to-[#d2cbc0] max-w-sm   p-5 mx-auto rounded-sm ">
          <div className="flex flex-col gap-1 items-center">
            <h2 className="text-2xl font-medium text-gray-800 mb-2">
              Register{" "}
            </h2>
            <p className="text-sm text-gray-600  text-center">
              Join DiaFamily, And enjoy protection on your deep secrets!
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex items-start flex-col gap-3 my-4  ">
              <div className="flex-col flex w-full  ">
                <label htmlFor="" className="mb-1 text-sm font-medium">
                  Username:{" "}
                </label>
                <input
                  type="text"
                  placeholder="@lancelot"
                  className="w-full px-4 py-2 border border-gray-500  rounded-lg placeholder:text-sm text-sm focus:outline-none focus:ring-1 duration-200  transition-all "
                  value={username}
                  name="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                />
              </div>

              <div className="flex-col flex  w-full ">
                <label htmlFor="" className="mb-1 text-sm font-medium">
                  Email:
                </label>
                <input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  className="w-full px-4 py-2 border border-gray-500  rounded-lg placeholder:text-sm text-sm focus:outline-none focus:ring-1 duration-200  transition-all "
                  value={email}
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4  ">
                <div className="grid-cols-1">
                  <label htmlFor="" className="mb-1 text-sm font-medium">
                    First Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Michael"
                    className="w-full px-4 py-2 border border-gray-500  rounded-lg placeholder:text-sm text-sm focus:outline-none focus:ring-1 duration-200  transition-all "
                    value={firstName}
                    name="firstName"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setError("");
                    }}
                  />
                </div>

                <div className="grid-cols-1">
                  <label htmlFor="" className="mb-1 text-sm font-medium">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Ross"
                    className="w-full px-4 py-2 border border-gray-500  rounded-lg placeholder:text-sm text-sm focus:outline-none focus:ring-1 duration-200  transition-all "
                    value={lastName}
                    name="lastName"
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setError("");
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col w-full ">
                <label htmlFor="" className="mb-1 text-sm font-medium">
                  Password:
                </label>
                <input
                  type="password"
                  placeholder="*********"
                  className="w-full px-4 py-2 border border-gray-500  rounded-lg placeholder:text-sm text-sm focus:outline-none focus:ring-1 duration-200  transition-all "
                  value={password}
                  name="password"
                  onChange={(e) => {
                    setPasssword(e.target.value);
                    setError("");
                  }}
                />
              </div>

              <div className="flex flex-col w-full ">
                <label htmlFor="" className="mb-1 text-sm font-medium">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full px-4 py-2 border border-gray-500  rounded-lg placeholder:text-sm text-sm focus:outline-none focus:ring-1 duration-200  transition-all "
                  value={ConfirmPassword}
                  name="confirm password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                />
              </div>

              <div className="flex flex-col gap-4 w-full">
                {error && <div className="text-red-500 text-sm ">{error}</div>}
                {success && (
                  <div className="text-green-500 text-sm ">{success}</div>
                )}
                {isLoading && (
                  <div className="flex items-center gap-2 ">
                    <p>Loading, Please Wait</p>

                    <span className="animate-bounce transition-all [animation-delay: 50ms] h-2 w-2 rounded-full bg-black"></span>
                    <span className="animate-bounce transition-all [animation-delay:200ms]  h-2 w-2 rounded-full bg-black"></span>
                    <span className="animate-bounce transition-all [animation-delay:400ms]  h-2 w-2 rounded-full bg-black"></span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 font-semibold text-white transition-all duration-200 bg-gray-900 rounded-xl hover:bg-black active:scale-105"
                >
                  Register
                </button>

                <p className="text-sm text-center text-gray-600">
                  Already have an account?{" "}
                  <NavLink
                    to="/login"
                    className="font-medium text-gray-900 underline underline-offset-3 hover:text-black"
                  >
                    Login!
                  </NavLink>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
