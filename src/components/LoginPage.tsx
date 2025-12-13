import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/apiService";
import { toast } from "react-toastify";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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
    <div
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        backgroundColor: "white",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: "20px", color: "#2196F3" }}
      >
        Login
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.2rem",
            }}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>

        <button
          type="submit"
          disabled={!formik.isValid}
          style={{
            padding: "10px",
            background: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
