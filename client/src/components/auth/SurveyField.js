// SurveyField contains logic to render a single label and text input
import React from "react";

export default ({ input, label, type, meta: { error, touched } }, FIELDS) => {
  return (
    <div>
      <label className="right mt-0">{label}</label>
      <input {...input} type={type} className="form-control" />
      <p className="red-text">{touched && error}</p>
    </div>
  );
};
