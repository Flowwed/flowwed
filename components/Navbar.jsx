// components/Navbar.jsx

import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={styles.navbar}>
      
      {/* Back button */}
      <button onClick={() => navigate(-1)} style={styles.back}>
        ← Back
      </button>

      {/* Menu */}
      <div style={styles.menu}>
        <span onClick={() => navigate("/")}>Home</span>
        <span onClick={() => navigate("/guests")}>Guests</span>
        <span onClick={() => navigate("/date")}>Save the Date</span>
        <span onClick={() => navigate("/rsvp")}>RSVP</span>
        <span onClick={() => navigate("/budget")}>Budget</span>
        <span onClick={() => navigate("/memories")}>Memories</span>
        <span onClick={() => navigate("/gifts")}>Gifts</span>
        <span onClick={() => navigate("/seating")}>Seating</span>
        <span onClick={() => navigate("/album")}>Album</span>
      </div>

    </div>
  );
}

const styles = {
  navbar: {
    position: "sticky",
    top: 0,
    background: "#fff",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #eee",
  },
  back: {
    fontSize: "14px",
  },
  menu: {
    display: "flex",
    gap: "12px",
    fontSize: "14px",
  },
};