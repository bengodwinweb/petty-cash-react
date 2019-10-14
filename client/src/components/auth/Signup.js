import React, { Component } from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SigninForm from './SigninForm';
import * as actions from '../../actions';

class Signup extends Component {
  state = { showReview: false };

  render() {
    return (
      <div>
        <h3 className="mb-4">Register</h3>
        <div className="">
          <MDBBtn
            social="gplus"
            color="blue"
            href="/api/users/google"
            className="mb-4 ml-4"
          >
            <MDBIcon fab icon="google" className="mr-3" />
            Sign up with Google
          </MDBBtn>
          <SigninForm
            onSurveySubmit={values =>
              this.props.submitSignup(values, this.props.history)
            }
          />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(withRouter(Signup));
