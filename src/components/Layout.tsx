import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../css/Layout.css";

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
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="main-content">{children}</main>

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Layout;
