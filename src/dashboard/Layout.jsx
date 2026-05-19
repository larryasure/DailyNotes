import { Outlet, ScrollRestoration } from "react-router-dom";
import DashNavbar from "../components/DashNavbar";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <>
      <div>
        <DashNavbar />

        <main className="min-h-screen px-8 my-7 ">
          <Outlet />
          <ScrollRestoration />
        </main>

        <Footer />
      </div>
    </>
  );
}
