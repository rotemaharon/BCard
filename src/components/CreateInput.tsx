import React from "react";
import type { FormikProps } from "formik";
import { useTheme } from "../context/ThemeContext";

interface CreateInputProps {
  name: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
  type?: string;
}

const CreateInput: React.FC<CreateInputProps> = ({
  name,
  placeholder,
  formik,
  type = "text",
}) => {
  const { darkMode } = useTheme();

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: darkMode ? "1px solid #555" : "1px solid #ccc",
          width: "100%",
          backgroundColor: darkMode ? "#333" : "white",
          color: darkMode ? "white" : "black",
          outline: "none",
        }}
      />
      {formik.touched[name] && formik.errors[name] && (
        <span
          style={{ color: "#ff6b6b", fontSize: "0.8rem", marginTop: "2px" }}
        >
          {String(formik.errors[name])}
        </span>
      )}
    </div>
  );
};

export default CreateInput;
