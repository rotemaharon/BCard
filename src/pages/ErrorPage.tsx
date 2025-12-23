import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/ContentPages.css";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <h1 className="error-code">404</h1>
      <h2 className="error-subtitle">Oops! Page Not Found</h2>
      <p className="error-text">
        The page you are looking for does not exist or has been moved.
      </p>

      <button onClick={() => navigate("/")} className="home-btn">
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
