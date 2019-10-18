import React from 'react';
import { MDBCard, MDBCardTitle } from 'mdbreact';
import BOX_FIELDS from './boxFields';

const Box = ({ box }) => {
  const renderValues = () => {
    return Object.keys(BOX_FIELDS).map(key => (
      <div
        key={key}
        className="d-flex justify-content-between my-2"
        style={{ fontWeight: '300' }}
      >
        <div className="col-7 col-sm-8">{BOX_FIELDS[key].string}:</div>
        <div className="d-flex col-5 col-sm-4">
          <span className="mr-auto">$</span>
          <span>{(box[key] * BOX_FIELDS[key].value).toFixed(2)}</span>
        </div>
      </div>
    ));
  };

  return (
    <MDBCard className="pt-4 px-4">
      <MDBCardTitle className="ml-3 mt-3 mb-4">Remaining Cash</MDBCardTitle>
      <div className="">{renderValues()}</div>
      <div className="mt-2 mb-4 d-flex justify-content-between">
        <div className="col-7 col-sm-8">
          <h5>Total</h5>
        </div>
        <div className="d-flex col-5 col-sm-4">
          <span className="mr-auto">
            <h5>$</h5>
          </span>
          <span>
            <h5>{box.boxTotal}</h5>
          </span>
        </div>
      </div>
    </MDBCard>
  );
};

export default Box;
