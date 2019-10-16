import React, { Component } from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CashboxForm from './CashboxForm';
import * as actions from '../../actions';

class Signup extends Component {
  render() {
    return (
      <div>
        <h3 className="mb-4">Register</h3>
        <div className="">
          <CashboxForm
            onSurveySubmit={values =>
              this.props.submitCashbox(values, this.props.history)
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
