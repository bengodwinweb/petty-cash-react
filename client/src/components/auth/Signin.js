import React, { Component } from "react";
import { MDBBtn, MDBIcon, MDBCard, MDBCardBody } from "mdbreact";
import { connect } from "react-redux";
import SigninForm from "./SigninForm";
import * as actions from "../../actions";

class Signin extends Component {
  render() {
    return (
      <MDBCard className="p-4" color="blue-grey darken-3">
        <div className="ml-3 mt-3 mb-4">
          <h2>Sign in</h2>
          <div className="d-flex flex-row align-items-start">
            <div className="d-flex text-center">
              <p className="" style={{ verticalAlign: "middle" }}>
                New user?
              </p>
            </div>
            <button
              className="ml-1 py-0"
              onClick={this.props.toggle}
              style={{
                background: "none",
                border: "none",
                padding: "0!important",
                color: "rgb(91, 184, 173)"
              }}
            >
              Create an account
            </button>
          </div>
        </div>
        <MDBCardBody className="text-center pt-0">
          <SigninForm
            onSurveySubmit={values =>
              this.props.submitSignin(values, this.props.history)
            }
          />
          <div className="my-5">
            <hr className="mb-0" style={{ borderColor: "white" }} />
            <p className="mt-0 lead">Or</p>
          </div>
          <div>
            <MDBBtn
              social="gplus"
              color="blue"
              href="/api/users/google"
              className="mb-4"
            >
              <MDBIcon fab icon="google" className="mr-3" />
              Continue with Google
            </MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default connect(null, actions)(Signin);
