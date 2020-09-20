import React from "react";

import { useField } from "formik";

const SelectField = ({ label, required, options, ...props }) => {
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
        <select
          {...field}
          {...props}
          style={{ width: "100%", fontSize: "1em", padding: "0.25em" }}
        >
          <option value="" label="Select an option" />
          {options.map((option) => (
            <option label={option} value={option} key={option}></option>
          ))}
        </select>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default SelectField;
