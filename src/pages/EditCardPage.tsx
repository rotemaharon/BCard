import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { getCardById, updateCard } from "../services/cardService";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import FormInput from "../components/FormInput";
import "../css/FormLayout.css";
import "../css/FormButtons.css";

interface FormValues {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  url: string;
  alt: string;
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
}
const fields: { name: keyof FormValues; ph: string; type?: string }[] = [
  { name: "title", ph: "Title" },
  { name: "subtitle", ph: "Subtitle" },
  { name: "description", ph: "Description" },
  { name: "phone", ph: "Phone" },
  { name: "email", ph: "Email" },
  { name: "web", ph: "Web" },
  { name: "url", ph: "Image URL" },
  { name: "alt", ph: "Image description" },
  { name: "country", ph: "Country" },
  { name: "city", ph: "City" },
  { name: "street", ph: "Street" },
  { name: "houseNumber", ph: "House Number", type: "number" },
  { name: "state", ph: "State" },
];
const EditCardPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [initialValues, setInitialValues] = useState<FormValues | null>(null);
  useEffect(() => {
    if (!id) return;
    getCardById(id)
      .then((data) => {
        setInitialValues({
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          phone: data.phone,
          email: data.email,
          web: data.web || "",
          url: data.image.url,
          alt: data.image.alt,
          state: data.address.state || "",
          country: data.address.country,
          city: data.address.city,
          street: data.address.street,
          houseNumber: data.address.houseNumber,
        });
      })
      .catch(() => {
        toast.error("Failed to load card");
        navigate("/my-cards");
      });
  }, [id, navigate]);
  const formik = useFormik<FormValues>({
    initialValues: initialValues || {
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
    enableReinitialize: true,
    validationSchema: Yup.object(
      Object.fromEntries(
        fields.map((f) => [
          f.name,
          f.type === "number"
            ? Yup.number().required()
            : Yup.string().min(2).required(),
        ])
      )
    ),
    onSubmit: async (values) => {
      try {
        if (id) {
          await updateCard(id, {
            title: values.title,
            subtitle: values.subtitle,
            description: values.description,
            phone: values.phone,
            email: values.email,
            web: values.web,
            image: { url: values.url, alt: values.alt },
            address: {
              state: values.state,
              country: values.country,
              city: values.city,
              street: values.street,
              houseNumber: values.houseNumber,
            },
          });
          toast.success("Card updated");
          navigate("/my-cards");
        }
      } catch {
        toast.error("Update failed");
      }
    },
  });
  if (!initialValues) return <div className="text-center mt-5">Loading...</div>;
  return (
    <div className={`auth-container ${darkMode ? "dark" : ""}`}>
      <h2 className={`form-title ${darkMode ? "dark" : ""}`}>Edit Card</h2>{" "}
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
        }}
      >
        {fields.map((f) => (
          <FormInput
            key={f.name}
            name={f.name}
            placeholder={f.ph}
            type={f.type}
            formik={formik}
            darkMode={darkMode}
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditCardPage;
