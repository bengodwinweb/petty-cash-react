import React from 'react';
import boxFields from './boxFields';

export default ({ input, label, type, meta: { error, touched } }) => {
  return (
    <div className="p-0 m-0 mt-1" style={{ fontWeight: '300' }}>
      <div className="d-flex flex-row justify-content-between align-items-start pb-0 mb-0">
        <label htmlFor={input} className="right d-flex">
          {label}:
        </label>
        <input
          {...input}
          type={type}
          className="form-control form-control-sm"
          style={{
            textAlign: 'center',
            width: '50px',
            fontWeight: '300'
          }}
        />
      </div>
      <p className="red-text mb-0">{touched && error}</p>
    </div>
  );
};
