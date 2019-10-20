// SurveyField contains logic to render a single label and text input
import React from 'react';

export default ({
  input,
  label,
  type,
  currentVal,
  meta: { error, touched }
}) => {
  console.log(currentVal);
  return (
    <div>
      <label className="right mt-3 mb-1">{label}</label>
      <input
        {...input}
        type={type}
        placeholder={currentVal || ''}
        className="form-control"
      />
      <p className="red-text">{touched && error}</p>
    </div>
  );
};
