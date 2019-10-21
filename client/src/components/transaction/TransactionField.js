// SurveyField contains logic to render a single label and text input
import React from 'react';

export default ({ input, label, type, meta: { error, touched } }) => {
  return (
    <div>
      <label className="right mt-3 mb-1">{label}</label>
      <input {...input} type={type} className="form-control" />
      <p className="red-text">{touched && error}</p>
    </div>
  );
};
