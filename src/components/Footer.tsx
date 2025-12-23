import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaInfoCircle, FaHeart, FaIdCard, FaUserCog } from "react-icons/fa";
import "../css/Footer.css";

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const { user } = useAuth();

  return (
    <footer className={`footer ${darkMode ? "dark" : "light"}`}>
      <div className="footer-content">
        <Link to="/about" className="footer-link">
          <FaInfoCircle size={24} />
          <span>About</span>
        </Link>

        {user && (
          <Link to="/fav-cards" className="footer-link">
            <FaHeart size={24} />
            <span>Favorites</span>
          </Link>
        )}

        {(user?.isBusiness || user?.isAdmin) && (
          <Link to="/my-cards" className="footer-link">
            <FaIdCard size={24} />
            <span>My Cards</span>
          </Link>
        )}

        {user?.isAdmin && (
          <Link to="/sandbox" className="footer-link">
            <FaUserCog size={24} />
            <span>Sandbox</span>
          </Link>
        )}
      </div>
    </footer>
  );
};

export default Footer;
