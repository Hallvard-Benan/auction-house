import "./App.css";
import { Outlet } from "@tanstack/react-router";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
