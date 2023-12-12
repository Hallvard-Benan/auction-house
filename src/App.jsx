import "./App.css";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <ScrollRestoration />
      <div className="w-calc mx-auto grid gap-4">
        <div className="md:h-20">
          <NavBar className="w-full" />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
