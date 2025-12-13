import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const { user, logout } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isStackedLayout = isMobile;

  const displaySearchOn = ["/", "/my-cards", "/fav-cards"];
  const showSearch = displaySearchOn.includes(location.pathname);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinksContent = (
    <>
      <NavLink
        to="/about"
        className="nav-link-small"
        style={{
          color: "white",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        About
      </NavLink>
      {user && (
        <NavLink
          to="/fav-cards"
          className="nav-link-small"
          style={{
            color: "white",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Fav Cards
        </NavLink>
      )}
      {(user?.isBusiness || user?.isAdmin) && (
        <NavLink
          to="/my-cards"
          className="nav-link-small"
          style={{
            color: "white",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          My Cards
        </NavLink>
      )}
      {user?.isAdmin && (
        <NavLink
          to="/sandbox"
          className="nav-link-small"
          style={{
            color: "white",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Sandbox
        </NavLink>
      )}
    </>
  );
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
              {navLinksContent}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          {showSearch && (
            <div
              style={{
                backgroundColor: darkMode ? "#555" : "white",
                padding: "5px 10px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                maxWidth: isMobile ? "120px" : "150px",
              }}
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: darkMode ? "white" : "black",
                  outline: "none",
                  width: "100%",
                  minWidth: "50px",
                }}
              />
              <FaSearch color={darkMode ? "white" : "gray"} />
            </div>
          )}

          <button
            onClick={toggleDarkMode}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "1.2rem",
              padding: "5px",
            }}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                onClick={() => navigate("/edit-profile")}
                style={{ cursor: "pointer" }}
                title="Edit Profile"
              >
                {user.image && user.image.url ? (
                  <img
                    src={user.image.url}
                    alt={user.image.alt || "User"}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <FaUserCircle style={{ fontSize: "30px" }} />
                )}
              </div>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  padding: 0,
                }}
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <NavLink
                to="/login"
                className="nav-link-small"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="nav-link-small"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Signup
              </NavLink>
            </div>
          )}
        </div>
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
          {navLinksContent}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
