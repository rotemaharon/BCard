import React from "react";
import type { FormikProps } from "formik";
import "../css/FormInputs.css";

interface FormInputProps {
  name: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
  type?: string;
  disabled?: boolean;
  darkMode: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  placeholder,
  formik,
  type = "text",
  disabled,
  darkMode,
}) => (
  <div className="input-wrapper">
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      disabled={disabled}
      className={`form-input ${darkMode ? "dark" : ""} ${
        formik.touched[name] && formik.errors[name] ? "error" : ""
      }`}
    />
    {formik.touched[name] && formik.errors[name] && (
      <span className="error-message">{String(formik.errors[name])}</span>
    )}
  </div>
);

export default FormInput;
