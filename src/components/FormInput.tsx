import React from "react";
import type { FormikProps } from "formik";

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
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values[name]}
    disabled={disabled}
    style={{
      padding: "10px",
      borderRadius: "5px",
      border: darkMode ? "1px solid #555" : "1px solid #ccc",
      width: "100%",
      backgroundColor: disabled
        ? darkMode
          ? "#444"
          : "#e9ecef"
        : darkMode
        ? "#333"
        : "white",
      color: darkMode ? "white" : "black",
      outline: "none",
    }}
  />
);

export default FormInput;
