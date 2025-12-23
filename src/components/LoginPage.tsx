import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/apiService";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import "../css/FormLayout.css";
import "../css/FormInputs.css";
import "../css/FormButtons.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { darkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const token = await loginUser(values);
        login(token);
        toast.success("Welcome back!");
        navigate("/");
      } catch {
        toast.error("Login failed. Check your credentials.");
      }
    },
  });

  return (
    <div className={`auth-container small ${darkMode ? "dark" : ""}`}>
      <h2 className={`form-title ${darkMode ? "dark" : ""}`}>Login</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="form-buttons-container login-layout"
      >
        <input
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className={`form-input ${darkMode ? "dark" : ""}`}
        />
        <div className="password-wrapper">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className={`form-input ${darkMode ? "dark" : ""}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`password-toggle-btn ${darkMode ? "dark" : ""}`}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>

        <button
          type="submit"
          disabled={!formik.isValid}
          className="btn btn-submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
