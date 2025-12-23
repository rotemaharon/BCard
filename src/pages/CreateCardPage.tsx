import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { createCard } from "../services/cardService";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import CreateInput from "../components/CreateInput";
import "../css/FormLayout.css";
import "../css/FormButtons.css";

const CreateCardPage: React.FC = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const inputsConfig = [
    { name: "title", placeholder: "Title *" },
    { name: "subtitle", placeholder: "Subtitle *" },
    { name: "description", placeholder: "Description *" },
    { name: "phone", placeholder: "Phone *" },
    { name: "email", placeholder: "Email *" },
    { name: "web", placeholder: "Web" },
    { name: "url", placeholder: "Image URL *" },
    { name: "alt", placeholder: "Image Alt" },
    { name: "country", placeholder: "Country *" },
    { name: "city", placeholder: "City *" },
    { name: "street", placeholder: "Street *" },
    { name: "houseNumber", placeholder: "House Number *", type: "number" },
    { name: "state", placeholder: "State" },
  ];

  const formik = useFormik({
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      url: "",
      alt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 0,
    },
    validationSchema: Yup.object({
      title: Yup.string().min(2).required("Required"),
      subtitle: Yup.string().min(2).required("Required"),
      description: Yup.string().min(2).required("Required"),
      phone: Yup.string().min(9).required("Required"),
      email: Yup.string().email().required("Required"),
      url: Yup.string().min(2).required("Required"),
      country: Yup.string().min(2).required("Required"),
      city: Yup.string().min(2).required("Required"),
      street: Yup.string().min(2).required("Required"),
      houseNumber: Yup.number().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await createCard({
          title: values.title,
          subtitle: values.subtitle,
          description: values.description,
          phone: values.phone,
          email: values.email,
          web: values.web || "",
          image: { url: values.url, alt: values.alt || "Business card image" },
          address: {
            state: values.state || "",
            country: values.country,
            city: values.city,
            street: values.street,
            houseNumber: Number(values.houseNumber),
            zip: 0,
          },
        });
        toast.success("A new business card has been created");
        navigate("/my-cards");
      } catch (error) {
        console.error(error);
        toast.error("Failed to create card");
      }
    },
  });

  return (
    <div className={`auth-container ${darkMode ? "dark" : ""}`}>
      <h2 className={`form-title ${darkMode ? "dark" : ""}`}>
        Create New Card
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px",
        }}
      >
        {inputsConfig.map((input) => (
          <CreateInput
            key={input.name}
            name={input.name}
            placeholder={input.placeholder}
            type={input.type || "text"}
            formik={formik}
          />
        ))}

        <div className="form-buttons-container">
          <button
            type="button"
            onClick={() => navigate("/my-cards")}
            className={`btn btn-cancel ${darkMode ? "dark" : ""}`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!formik.isValid}
            className="btn btn-submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateCardPage;
