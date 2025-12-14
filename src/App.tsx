import React, { useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SearchProvider, useSearch } from "./context/SearchContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext"; 
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/HomePage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import MyCardsPage from "./pages/MyCardsPage";
import CreateCardPage from "./pages/CreateCardPage";
import EditCardPage from "./pages/EditCardPage";
import FavCardsPage from "./pages/FavCardsPage";
import AboutPage from "./pages/AboutPage";
import SandboxPage from "./pages/SandboxPage";
import CardDetailsPage from "./pages/CardDetailsPage";
import ErrorPage from "./pages/ErrorPage";
import EditProfilePage from "./pages/EditProfilePage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};
const BusinessRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isBusiness, isLoading } = useAuth();
  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (!user || !isBusiness) return <Navigate to="/" replace />;
  return <>{children}</>;
};
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, isLoading } = useAuth();
  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
};
const AppContent = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const { setSearchQuery } = useSearch();

  useEffect(() => {
    setSearchQuery("");
  }, [location.pathname, setSearchQuery]);

  return (
    <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={darkMode ? "dark" : "light"}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/card/:id" element={<CardDetailsPage />} />

        <Route
          path="/fav-cards"
          element={
            <ProtectedRoute>
              <FavCardsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-cards"
          element={
            <BusinessRoute>
              <MyCardsPage />
            </BusinessRoute>
          }
        />
        <Route
          path="/create-card"
          element={
            <BusinessRoute>
              <CreateCardPage />
            </BusinessRoute>
          }
        />
        <Route
          path="/edit-card/:id"
          element={
            <BusinessRoute>
              <EditCardPage />
            </BusinessRoute>
          }
        />
        <Route
          path="/sandbox"
          element={
            <AdminRoute>
              <SandboxPage />
            </AdminRoute>
          }
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <SearchProvider>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </SearchProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
