import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { reduxForm, Field } from "redux-form";
import signinFields from "./signinFields";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";

class SigninForm extends Component {
  renderFields() {
    return signinFields.map(field => {
      return (
        <Field
          label={field.label}
          type={field.type}
          name={field.name}
          key={field.name}
          component={SurveyField}
        />
      );
    });
  }

  render() {
    return (
      <div className="">
        <MDBContainer className="">
          <MDBRow className="d-flex justify-content-center">
            <MDBCol className="col-lg-8">
              <form
                className=""
                style={{ flexWrap: "wrap" }}
                onSubmit={this.props.handleSubmit(values =>
                  this.props.onSurveySubmit(values)
                )}
              >
                <div className="col-12">{this.renderFields()}</div>
                <div className="mt-2 d-flex justify-content-center col-12">
                  <MDBBtn
                    style={{ borderRadius: "125px" }}
                    social="email"
                    color="default"
                    size="small"
                    type="submit"
                    className="mb-4"
                  >
                    Continue
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

  signinFields.forEach(({ name }) => {
    errors.email = validateEmails(values.email || "");
    errors.password = values.password
      ? values.password.length < 6
        ? "Password must be at least 6 characters long"
        : ""
      : "";

    if (!values[name]) {
      errors[name] = "This field is required";
    }
  });

  return errors;
};

export default reduxForm({
  validate,
  form: "signinForm"
})(SigninForm);
