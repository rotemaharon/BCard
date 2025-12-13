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

interface NavRightSideProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isMobile: boolean;
}

const NavRightSide: React.FC<NavRightSideProps> = ({
  darkMode,
  toggleDarkMode,
  isMobile,
}) => {
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
  );
};

export default NavRightSide;
