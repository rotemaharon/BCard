import React from "react";
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
  const displaySearchOn = ["/", "/my-cards", "/fav-cards"];
  const showSearch = displaySearchOn.includes(location.pathname);
const handleLogout = () => {
  logout();
navigate("/login");
};

  return (
    <nav
      style={{
        backgroundColor: darkMode ? "#333" : "#2196F3",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <h2
          style={{ margin: 0, cursor: "pointer", fontSize: "1.5rem" }}
          onClick={() => navigate("/")}
        >
          BCard
        </h2>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <NavLink
            to="/about"
            style={{ color: "white", textDecoration: "none" }}
          >
            About
          </NavLink>
          {user && (
            <NavLink
              to="/fav-cards"
              style={{ color: "white", textDecoration: "none" }}
            >
              Fav Cards
            </NavLink>
          )}
          {(user?.isBusiness || user?.isAdmin) && (
            <NavLink
              to="/my-cards"
              style={{ color: "white", textDecoration: "none" }}
            >
              My Cards
            </NavLink>
          )}
          {user?.isAdmin && (
            <NavLink
              to="/sandbox"
              style={{ color: "white", textDecoration: "none" }}
            >
              Sandbox
            </NavLink>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          flexGrow: 1,
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
              maxWidth: "200px",
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
              style={{ background: "none", border: "none", color: "white" }}
            >
              <FaSignOutAlt />
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "10px" }}>
            <NavLink
              to="/login"
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
    </nav>
  );
};
export default Navbar;
