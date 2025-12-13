import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavLinks: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <NavLink
        to="/about"
        className="nav-link-small"
        style={{ color: "white", textDecoration: "none", whiteSpace: "nowrap" }}
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
};

export default NavLinks;
