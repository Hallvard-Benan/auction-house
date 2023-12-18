import "./App.css";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="grid gap-6">
      <ScrollRestoration />
      <Toaster richColors />
      <div className="w-calc mx-auto grid gap-4">
        <div className="md:h-20">
          <NavBar className="w-full" />
        </div>
        <Outlet />
      </div>
      <Footer />
      <div className="h-20 md:hidden"></div>
    </div>
  );
}

export default App;
