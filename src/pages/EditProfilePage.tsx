import React, { useEffect, useState } from "react";
import { useFormik, type FormikProps } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserById, updateUser } from "../services/apiService";
import { useAuth } from "../context/AuthContext";

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

const MyInput = ({
  name,
  placeholder,
  formik,
  disabled,
}: {
  name: keyof FormValues;
  placeholder: string;
  formik: FormikProps<FormValues>;
  disabled?: boolean;
}) => (
  <input
    name={name}
    placeholder={placeholder}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values[name]}
    disabled={disabled}
    style={{
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "100%",
      backgroundColor: disabled ? "#e9ecef" : "white",
    }}
  />
);

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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
    <div
      style={{
        maxWidth: "800px",
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
        Edit Profile
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
        }}
      >
        <MyInput name="first" placeholder="First Name" formik={formik} />
        <MyInput name="last" placeholder="Last Name" formik={formik} />
        <MyInput name="phone" placeholder="Phone" formik={formik} />
        <MyInput name="email" placeholder="Email" formik={formik} disabled />
        <MyInput name="url" placeholder="Image URL" formik={formik} />
        <MyInput name="alt" placeholder="Image Alt" formik={formik} />
        <MyInput name="country" placeholder="Country" formik={formik} />
        <MyInput name="city" placeholder="City" formik={formik} />
        <MyInput name="street" placeholder="Street" formik={formik} />
        <MyInput
          name="houseNumber"
          placeholder="House Number"
          formik={formik}
        />
        <MyInput name="state" placeholder="State" formik={formik} />

        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              flex: 1,
              padding: "10px",
              background: "#ccc",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
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
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
