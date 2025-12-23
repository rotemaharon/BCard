import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import NavRightSide from "./NavRightSide";
import "../css/Navbar.css";

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
    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
      <div className="navbar-top">
        <div className="navbar-brand-area">
          <h2 className="navbar-brand" onClick={() => navigate("/")}>
            BCard
          </h2>
          {!isStackedLayout && (
            <div className="navbar-links-desktop">
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
        <div className="navbar-links-mobile">
          <NavLinks />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
