import "./App.css";
import { Outlet } from "@tanstack/react-router";

function App() {
  return (
    <div className="w-calc mx-auto">
      <a href="/" className="border">
        home
      </a>
      <a href="/listing" className="border">
        listing
      </a>
      <a href="/profile" className="border">
        profile
      </a>
      <a href="/create" className="border">
        create
      </a>
      <Outlet />
    </div>
  );
}

export default App;
