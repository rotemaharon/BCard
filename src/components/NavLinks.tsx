import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/Navbar.css";

const NavLinks: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <NavLink to="/about" className="nav-link-item">
        About
      </NavLink>

      {user && (
        <NavLink to="/fav-cards" className="nav-link-item">
          Fav Cards
        </NavLink>
      )}

      {(user?.isBusiness || user?.isAdmin) && (
        <NavLink to="/my-cards" className="nav-link-item">
          My Cards
        </NavLink>
      )}

      {user?.isAdmin && (
        <NavLink to="/sandbox" className="nav-link-item">
          Sandbox
        </NavLink>
      )}
    </>
  );
};

export default NavLinks;
