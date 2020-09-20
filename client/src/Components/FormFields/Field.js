import React from "react";

import { useField } from "formik";

const Field = ({ label, required, ...props }) => {
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
        <input {...field} {...props} className="form-field" />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : (
          <div className="error"></div>
        )}
      </div>
    </div>
  );
};

export default Field;
