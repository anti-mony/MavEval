import React from "react";

import { useField } from "formik";

const TextAreaField = ({ label, required, ...props }) => {
  const [field, meta] = useField({ ...props });

  return (
    <div className="form-field-container">
      <div className="form-label">
        <label htmlFor={props.id || props.name}>
          {label}
          {required ? <span style={{ color: "red" }}>*</span> : null}
        </label>
      </div>
      <div>
        <textarea {...field} {...props} className="form-field" />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default TextAreaField;
