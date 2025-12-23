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
import "../css/Navbar.css";

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
    <div className="nav-right">
      {showSearch && (
        <div
          className={`search-bar ${darkMode ? "dark" : "light"}`}
          style={{ maxWidth: isMobile ? "120px" : "150px" }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`search-input ${darkMode ? "dark" : "light"}`}
          />
          <FaSearch color={darkMode ? "white" : "gray"} />
        </div>
      )}
      <button onClick={toggleDarkMode} className="icon-btn">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            onClick={() => navigate("/edit-profile")}
            className="profile-area"
            title="Edit Profile"
          >
            {user.image && user.image.url ? (
              <img
                src={user.image.url}
                alt={user.image.alt || "User"}
                className="profile-img"
              />
            ) : (
              <FaUserCircle style={{ fontSize: "30px" }} />
            )}
          </div>
          <button
            onClick={handleLogout}
            className="icon-btn"
            style={{ padding: 0 }}
          >
            <FaSignOutAlt />
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "10px" }}>
          <NavLink to="/login" className="nav-link-item bold">
            Login
          </NavLink>
          <NavLink to="/register" className="nav-link-item bold">
            Signup
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default NavRightSide;
