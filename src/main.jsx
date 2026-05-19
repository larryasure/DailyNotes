import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateDiary from "./dashboard/CreateDiary.jsx";
import Diary from "./dashboard/Diary.jsx";
import Layout from "./dashboard/Layout.jsx";
import "./index.css";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ProtectedRoutes from "./pages/context/ProtectedRoutes.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Feature from "./pages/Feature.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import RootLayout from "./root/RootLayout.jsx";
import DiaryDetails from "./dashboard/DiaryDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <ErrorPage /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "feature", element: <Feature /> },
      { path: "Reset_password", element: <ResetPassword /> },
      { path: "verify_email", element: <VerifyEmail /> },

      {
        path: "dashboard",

        element: (
          <ProtectedRoutes>
            <Layout />
          </ProtectedRoutes>
        ),

        children: [
          { index: true, element: <Diary /> },
          { path: "diary", element: <Diary /> },
          { path: "create_diary", element: <CreateDiary /> },
          { path: "diary/:id", element: <DiaryDetails /> },

        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
