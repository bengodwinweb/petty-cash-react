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
  twenties: 20,
  tens: 10,
  fives: 5,
  ones: 1,
  qrolls: 10,
  drolls: 5,
  nrolls: 2,
  prolls: 0.5,
  quarters: 0.25,
  dimes: 0.1,
  nickels: 0.05,
  pennies: 0.01
};

const Box = ({ box }) => {
  const renderValues = () => {
    return Object.keys(BOX_FIELDS).map(key => (
      <div key={key} className="d-flex justify-content-between">
        <div>{key}:</div>
        <div>${BOX_FIELDS[key]}</div>
      </div>
    ));
  };

  return (
    <MDBCard className="pt-4 px-4">
      <MDBCardTitle>Remaining Cash</MDBCardTitle>
      <div className="mb-4">{renderValues()}</div>
    </MDBCard>
  );
};

export default Box;
