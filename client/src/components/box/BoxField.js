import React from 'react';
import boxFields from './boxFields';

export default ({
  input,
  label,
  currentVal,
  multiplier,
  meta: { error, touched }
}) => {
  return (
    <div className="p-0 m-0 mt-1" style={{ fontWeight: '300' }}>
      <div className="d-flex flex-row justify-content-between align-items-start pb-0 mb-0">
        <div className="col-4 col-sm-5">
          <label htmlFor={input} className="right d-flex">
            {label}:
          </label>
        </div>
        <div className="col-4 d-flex justify-content-center">
          <input
            {...input}
            type="number"
            step=".5"
            min="0"
            className="form-control form-control-sm"
            style={{
              textAlign: 'center',
              width: '48px',
              fontWeight: '300',
              height: '25px'
            }}
          />
        </div>
        <div className="d-flex col-4 col-sm-3 justify-content-end">
          <span>
            {currentVal > 0
              ? `$${(Math.round(currentVal * multiplier * 100) / 100).toFixed(
                  2
                )}`
              : '-'}
          </span>
        </div>
      </div>
      <p className="red-text mb-0">{touched && error}</p>
    </div>
  );
};
