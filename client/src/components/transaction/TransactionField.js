// SurveyField contains logic to render a single label and text input
import React from 'react';

export default ({ input, label, type, meta: { error, touched } }) => {
  if (type === 'dropdown') {
    return (
    <div>
      <label className="right mt-3 mb-1">{label}</label>
      <select {...input} className="form-control">
        <option value="">--Select--</option>
        <option value="Transportation">Transportation</option>
        <option value="Office Supplies">Office Supplies</option>
        <option value="Postage/Delivery">Postage/Delivery</option>
        <option value="Refreshments">Refreshments</option>
        <option value="Other (Specify)">Other (Specify)</option>
      </select>
      <p className="red-text">{touched && error}</p>
    </div>
    )
  }
  return (
    <div>
      <label className="right mt-3 mb-1">{label}</label>
      <input {...input} type={type} className="form-control" />
      <p className="red-text">{touched && error}</p>
    </div>
  );
};
