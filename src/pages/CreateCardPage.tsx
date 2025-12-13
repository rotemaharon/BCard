import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { createCard } from "../services/cardService";
import { toast } from "react-toastify";
const CreateCardPage: React.FC = () => {
  const navigate = useNavigate();
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
    <div
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "20px",
        backgroundColor: "white",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#2196F3" }}>Create New Card</h2>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px",
        }}
      >
        <input
          name="title"
          placeholder="Title *"
          onChange={formik.handleChange}
          value={formik.values.title}
          style={{ padding: "10px" }}
        />
        <input
          name="subtitle"
          placeholder="Subtitle *"
          onChange={formik.handleChange}
          value={formik.values.subtitle}
          style={{ padding: "10px" }}
        />
        <input
          name="description"
          placeholder="Description *"
          onChange={formik.handleChange}
          value={formik.values.description}
          style={{ padding: "10px" }}
        />
        <input
          name="phone"
          placeholder="Phone *"
          onChange={formik.handleChange}
          value={formik.values.phone}
          style={{ padding: "10px" }}
        />
        <input
          name="email"
          placeholder="Email *"
          onChange={formik.handleChange}
          value={formik.values.email}
          style={{ padding: "10px" }}
        />
        <input
          name="web"
          placeholder="Web"
          onChange={formik.handleChange}
          value={formik.values.web}
          style={{ padding: "10px" }}
        />
        <input
          name="url"
          placeholder="Image URL *"
          onChange={formik.handleChange}
          value={formik.values.url}
          style={{ padding: "10px" }}
        />
        <input
          name="alt"
          placeholder="Image Alt"
          onChange={formik.handleChange}
          value={formik.values.alt}
          style={{ padding: "10px" }}
        />
        <input
          name="country"
          placeholder="Country *"
          onChange={formik.handleChange}
          value={formik.values.country}
          style={{ padding: "10px" }}
        />
        <input
          name="city"
          placeholder="City *"
          onChange={formik.handleChange}
          value={formik.values.city}
          style={{ padding: "10px" }}
        />
        <input
          name="street"
          placeholder="Street *"
          onChange={formik.handleChange}
          value={formik.values.street}
          style={{ padding: "10px" }}
        />
        <input
          name="houseNumber"
          type="number"
          placeholder="House Number *"
          onChange={formik.handleChange}
          value={formik.values.houseNumber}
          style={{ padding: "10px" }}
        />
        <input
          name="state"
          placeholder="State"
          onChange={formik.handleChange}
          value={formik.values.state}
          style={{ padding: "10px" }}
        />
        <div
          style={{
            gridColumn: "1/-1",
            display: "flex",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/my-cards")}
            style={{
              flex: 1,
              padding: "10px",
              background: "#ccc",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!formik.isValid}
            style={{
              flex: 1,
              padding: "10px",
              background: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateCardPage;
