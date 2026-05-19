import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div>
      {!isDashboard && <Navbar />}

      <main>
        <Outlet />
        <ScrollRestoration />
      </main>

      {!isDashboard && <Footer />}
    </div>
  );
}
