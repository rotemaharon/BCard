import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ fontSize: "6rem", margin: 0, color: "#dc3545" }}>404</h1>
      <h2 style={{ marginBottom: "20px" }}>Oops! Page Not Found</h2>
      <p style={{ fontSize: "1.2rem", color: "#666" }}>
        The page you are looking for does not exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1.2rem",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
