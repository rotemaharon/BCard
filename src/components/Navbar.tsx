import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import NavRightSide from "./NavRightSide";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isStackedLayout = isMobile;

  return (
    <nav
      style={{
        backgroundColor: darkMode ? "#333" : "#2196F3",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h2
            style={{ margin: 0, cursor: "pointer", fontSize: "1.5rem" }}
            onClick={() => navigate("/")}
          >
            BCard
          </h2>
          {!isStackedLayout && (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <NavLinks />
            </div>
          )}
        </div>
        <NavRightSide
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isMobile={isMobile}
        />
      </div>
      {isStackedLayout && (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            gap: "15px",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: "10px",
            overflowX: "auto",
          }}
        >
          <NavLinks />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
