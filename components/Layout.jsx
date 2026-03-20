import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Navbar />
      
      {/* тут будут рендериться страницы */}
      <div style={{ padding: "16px" }}>
        <Outlet />
      </div>
    </div>
  );
}