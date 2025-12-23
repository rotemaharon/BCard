import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserById, updateUser } from "../services/apiService";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import FormInput from "../components/FormInput";
import "../css/FormLayout.css";
import "../css/FormButtons.css";

interface FormValues {
  first: string;
  last: string;
  phone: string;
  email: string;
  url: string;
  alt: string;
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
}
const profileFields: {
  name: keyof FormValues;
  ph: string;
  disabled?: boolean;
}[] = [
  { name: "first", ph: "First Name" },
  { name: "last", ph: "Last Name" },
  { name: "phone", ph: "Phone" },
  { name: "email", ph: "Email", disabled: true },
  { name: "url", ph: "Image URL" },
  { name: "alt", ph: "Image description" },
  { name: "country", ph: "Country" },
  { name: "city", ph: "City" },
  { name: "street", ph: "Street" },
  { name: "houseNumber", ph: "House Number" },
  { name: "state", ph: "State" },
];
const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [initialValues, setInitialValues] = useState<FormValues | null>(null);
  useEffect(() => {
    if (!user?._id) return;
    getUserById(user._id)
      .then((data) => {
        setInitialValues({
          first: data.name.first,
          last: data.name.last,
          phone: data.phone,
          email: data.email,
          url: data.image.url,
          alt: data.image.alt,
          state: data.address.state || "",
          country: data.address.country,
          city: data.address.city,
          street: data.address.street,
          houseNumber: String(data.address.houseNumber || ""),
        });
      })
      .catch(() => toast.error("Failed to load data"));
  }, [user]);
  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: initialValues || {
      first: "",
      last: "",
      phone: "",
      email: "",
      url: "",
      alt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
    },
    validationSchema: Yup.object({
      first: Yup.string().min(2).required(),
      last: Yup.string().min(2).required(),
      phone: Yup.string().min(9).required(),
      url: Yup.string().min(2).required(),
      country: Yup.string().min(2).required(),
      city: Yup.string().min(2).required(),
      street: Yup.string().min(2).required(),
      houseNumber: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      if (!user?._id) return;
      const body = {
        name: { first: values.first, last: values.last },
        phone: values.phone,
        image: { url: values.url, alt: values.alt },
        address: {
          state: values.state,
          country: values.country,
          city: values.city,
          street: values.street,
          houseNumber: String(values.houseNumber),
          zip: "0",
        },
      };
      try {
        await updateUser(user._id, body);
        toast.success("Profile updated successfully");
        navigate("/");
      } catch (err) {
        const error = err as { response?: { data?: string } };
        toast.error(error.response?.data || "Update failed");
      }
    },
  });
  if (!user) return <div className="text-center mt-5">Please login</div>;
  if (!initialValues) return <div className="text-center mt-5">Loading...</div>;
  return (
    <div className={`auth-container ${darkMode ? "dark" : ""}`}>
      <h2 className={`form-title ${darkMode ? "dark" : ""}`}>Edit Profile</h2>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
        }}
      >
        {profileFields.map((f) => (
          <FormInput
            key={f.name}
            name={f.name}
            placeholder={f.ph}
            formik={formik}
            darkMode={darkMode}
            disabled={f.disabled}
          />
        ))}

        <div className="form-buttons-container">
          <button
            type="button"
            onClick={() => navigate("/")}
            className={`btn btn-cancel ${darkMode ? "dark" : ""}`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!formik.isValid}
            className={`btn btn-submit ${darkMode ? "dark" : ""}`}
            style={{ opacity: !formik.isValid ? 0.7 : 1 }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditProfilePage;
