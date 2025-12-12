import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#222" : "#f5f5f5",
        color: darkMode ? "white" : "black",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main
        style={{
          padding: "20px",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          flex: 1,
          boxSizing: "border-box",
          paddingBottom: "80px", 
        }}
      >
        {children}
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Layout;
