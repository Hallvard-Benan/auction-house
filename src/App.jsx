import "./App.css";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import NavBar from "./components/NavBar";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <ScrollRestoration />
      <Toaster richColors />
      <div className="w-calc mx-auto grid gap-4">
        <div className="md:h-20">
          <NavBar className="w-full" />
        </div>
        <Outlet />
        <div className="h-20"></div>
      </div>
    </>
  );
}

export default App;
