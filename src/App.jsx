import "./App.css";
import { Outlet } from "@tanstack/react-router";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="w-calc mx-auto grid gap-4">
      <div className="h-16">
        <NavBar className="w-full" />
      </div>
      <Outlet />
    </div>
  );
}

export default App;
