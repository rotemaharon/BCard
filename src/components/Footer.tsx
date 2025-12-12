import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaInfoCircle, FaHeart, FaIdCard, FaUserCog } from "react-icons/fa";

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const { user } = useAuth();

  const navItemStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
    fontSize: "0.8rem",
    gap: "5px",
    cursor: "pointer",
    flex: 1,
    textAlign: "center" as const,
  };

  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "white" : "#555",
        borderTop: "1px solid #ccc",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
        padding: "10px 0",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <Link to="/about" style={navItemStyle}>
          <FaInfoCircle size={24} />
          <span>About</span>
        </Link>

        {user && (
          <Link to="/fav-cards" style={navItemStyle}>
            <FaHeart size={24} />
            <span>Favorites</span>
          </Link>
        )}

        {(user?.isBusiness || user?.isAdmin) && (
          <Link to="/my-cards" style={navItemStyle}>
            <FaIdCard size={24} />
            <span>My Cards</span>
          </Link>
        )}

        {user?.isAdmin && (
          <Link to="/sandbox" style={navItemStyle}>
            <FaUserCog size={24} />
            <span>Sandbox</span>
          </Link>
        )}
      </div>
    </footer>
  );
};

export default Footer;
