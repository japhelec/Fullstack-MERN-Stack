import React from "react";

export default ({ input, type, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} {...input} />
      <div className="red-text" style={{ marginBottom: "5px" }}>
        {touched && error}
      </div>
    </div>
  );
};
