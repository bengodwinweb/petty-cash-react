import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { reduxForm, Field } from 'redux-form';
import SurveyField from '../auth/SurveyField';
import cashboxFields from './cashboxFields';

class CashboxForm extends Component {
  state = {
    value: 500
  };

  decrease = () => {
    this.setState({ value: this.state.value - 1 });
  };

  increase = () => {
    this.setState({ value: this.state.value + 1 });
  };

  renderFields() {
    return cashboxFields.map(field => {
      return (
        <Field
          label={field.label}
          type={field.type}
          name={field.name}
          key={field.name}
          component={SurveyField}
          kentucky={field.value}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <MDBContainer className="">
          <MDBRow className="d-flex justify-content-center">
            <MDBCol className="col-lg-8">
              <form
                className=""
                style={{ flexWrap: 'wrap' }}
                onSubmit={this.props.handleSubmit(values =>
                  this.props.onSurveySubmit(values)
                )}
              >
                <div className="col-12">{this.renderFields()}</div>
                <div className="mt-4 d-flex col-12">
                  <MDBBtn color="primary" type="submit" className="ml-auto">
                    Submit
                  </MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  const validateFundTotal = num => {
    return num < 0 || num > 1000000 ? 'Number out of range' : '';
  };

  cashboxFields.forEach(({ name }) => {
    errors.fundTotal = validateFundTotal(values.fundTotal);

    if (!values[name]) {
      errors[name] = 'This field is required';
    }
  });

  return errors;
};

export default reduxForm({
  validate,
  form: 'cashboxForm'
})(CashboxForm);
