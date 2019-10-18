import React from 'react';
import {
  MDBCard,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle
} from 'mdbreact';

const BOX_FIELDS = {
  twenties: { value: 20, string: 'Twenties' },
  tens: { value: 10, string: 'Tens' },
  fives: { value: 5, string: 'Fives' },
  ones: { value: 1, string: 'Ones' },
  qrolls: { value: 10, string: 'Quarter Rolls' },
  drolls: { value: 5, string: 'Dime Rolls' },
  nrolls: { value: 2, string: 'Nickel Rolls' },
  prolls: { value: 0.5, string: 'Penny Rolls' },
  quarters: { value: 0.25, string: 'Quarters' },
  dimes: { value: 0.1, string: 'Dimes' },
  nickels: { value: 0.05, string: 'Nickels' },
  pennies: { value: 0.01, string: 'Pennies' }
};

const Box = ({ box }) => {
  const renderValues = () => {
    return Object.keys(BOX_FIELDS).map(key => (
      <div key={BOX_FIELDS[key]} className="d-flex justify-content-between">
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
      <MDBCardTitle className="ml-3 mt-3 mb-2">Remaining Cash</MDBCardTitle>
      <div className="mt-0">{renderValues()}</div>
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
