import React from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';

const Signin = () => {
  return (
    <div>
      <div className="d-flex flex-column col-md-6">
        <MDBBtn social="gplus" color="indigo" href="/api/users/google">
          <MDBIcon fab icon="google" className="mr-3" />
          Sign in with Google
        </MDBBtn>
        <MDBBtn social="email" color="mdb-color" href="">
          <MDBIcon far icon="envelope" className="mr-3" />
          Sign in with Email
        </MDBBtn>
      </div>
    </div>
  );
};

export default Signin;
