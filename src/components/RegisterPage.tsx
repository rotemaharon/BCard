import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/apiService";
import type { RegisterUserDto } from "../interfaces/UserType";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const validationSchema = Yup.object({
    first: Yup.string().min(2).required("Required"),
    last: Yup.string().min(2).required("Required"),
    phone: Yup.string().min(9).required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){4})(?=.*[!@#$%^*-])/,
        "Must contain: 1 uppercase, 1 lowercase, 4 digits, 1 special char (!@#$%^*-)"
      )
      .required("Required"),
    url: Yup.string().min(2).required("Required"),
    alt: Yup.string().min(2).required("Required"),
    country: Yup.string().min(2).required("Required"),
    city: Yup.string().min(2).required("Required"),
    street: Yup.string().min(2).required("Required"),
    houseNumber: Yup.string().required("Required"),
    isBusiness: Yup.boolean().required(),
  });
  const formik = useFormik({
    initialValues: {
      first: "",
      last: "",
      phone: "",
      email: "",
      password: "",
      url: "",
      alt: "",
      country: "",
      state: "",
      city: "",
      street: "",
      houseNumber: "",
      isBusiness: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userToSend: RegisterUserDto = {
          name: { first: values.first, last: values.last },
          phone: values.phone,
          email: values.email,
          password: values.password,
          image: { url: values.url, alt: values.alt },
          address: {
            state: values.state || "",
            country: values.country,
            city: values.city,
            street: values.street,
            houseNumber: values.houseNumber,
          },
          isBusiness: values.isBusiness,
        };
        await registerUser(userToSend);
        toast.success("Registration successful");
        navigate("/login");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data)
          toast.error(error.response.data);
        else toast.error("Registration Error");
      }
    },
  });
  const renderInput = (
    name: keyof typeof formik.values,
    placeholder: string,
    type = "text"
  ) => {
    const value = formik.values[name];
    const inputValue =
      value === undefined || value === null ? "" : String(value);
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={inputValue}
          style={{
            padding: "10px",
            border:
              formik.touched[name] && formik.errors[name]
                ? "1px solid red"
                : darkMode
                ? "1px solid #555"
                : "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: darkMode ? "#333" : "white",
            color: darkMode ? "white" : "black",
            outline: "none",
          }}
        />
        {formik.touched[name] && formik.errors[name] && (
          <span style={{ color: "red", fontSize: "0.8rem", marginTop: "2px" }}>
            {formik.errors[name]}
          </span>
        )}
      </div>
    );
  };
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        backgroundColor: darkMode ? "#222" : "white",
        borderRadius: "10px",
        color: darkMode ? "white" : "black",
        border: darkMode ? "1px solid #444" : "none",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: darkMode ? "#64b5f6" : "#2196F3",
        }}
      >
        Register
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px",
        }}
      >
        {renderInput("first", "First Name *")}
        {renderInput("last", "Last Name *")}
        {renderInput("phone", "Phone *")}
        {renderInput("email", "Email *", "email")}
        {renderInput("password", "Password *", "password")}
        {renderInput("url", "Link to image *")}
        {renderInput("alt", "Image description *")}
        {renderInput("country", "Country *")}
        {renderInput("state", "State")}
        {renderInput("city", "City *")}
        {renderInput("street", "Street *")}
        {renderInput("houseNumber", "House Number *")}

        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            type="checkbox"
            name="isBusiness"
            onChange={formik.handleChange}
            checked={formik.values.isBusiness}
            id="isBusiness"
            style={{
              accentColor: darkMode ? "#64b5f6" : "#2196F3",
            }}
          />
          <label htmlFor="isBusiness">Signup as Business</label>
        </div>
        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              flex: 1,
              padding: "10px",
              background: "transparent",
              color: "#2196F3",
              border: "1px solid #2196F3",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            style={{
              flex: 1,
              padding: "10px",
              background: !formik.isValid
                ? darkMode
                  ? "#555"
                  : "#ccc"
                : "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default RegisterPage;
