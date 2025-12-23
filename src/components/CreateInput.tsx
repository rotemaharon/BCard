import React from "react";
import type { FormikProps } from "formik";
import { useTheme } from "../context/ThemeContext";
import "../css/FormInputs.css";

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
    <div className="input-wrapper">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        className={`form-input ${darkMode ? "dark" : ""}`}
      />
      {formik.touched[name] && formik.errors[name] && (
        <span className="error-message-create">
          {String(formik.errors[name])}
        </span>
      )}
    </div>
  );
};

export default CreateInput;
