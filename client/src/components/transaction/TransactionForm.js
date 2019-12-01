import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import transactionFields from "./transactionFields";
import TransactionField from "./TransactionField";

class Form extends Component {
  decrease = () => {
    this.setState({ value: this.state.value - 1 });
  };

  increase = () => {
    this.setState({ value: this.state.value + 1 });
  };

  renderFields() {
    return this.props.FIELDS.map(field => {
      return (
        <Field
          label={field.label}
          type={field.type}
          name={field.name}
          key={field.name}
          component={TransactionField}
          FIELDS={this.props.FIELDS}
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
                style={{ flexWrap: "wrap" }}
                onSubmit={this.props.handleSubmit(values =>
                  this.props.onTransactionSubmit(values)
                )}
              >
                <div className="col-12">{this.renderFields()}</div>
                <div className="text-center mt-4">
                  <MDBBtn
                    outline
                    color="danger"
                    className=""
                    onClick={this.props.onCancel}
                  >
                    Cancel
                  </MDBBtn>
                  <MDBBtn outline color="default" type="submit" className="">
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

  transactionFields.forEach(({ name, required, min, max }) => {
    if (min) {
      if (values[name] < min || values[name] > max) {
        errors[name] = `Value must be between ${min} and ${max}`;
      }
    }

    if (!values[name] && required) {
      errors[name] = "This field is required";
    }
  });

  return errors;
};

const mapStateToProps = ({ cashboxes }) => {
  return { cashboxes };
};

Form = connect(mapStateToProps)(Form);

export default reduxForm({
  validate,
  form: "transactionForm",
  enableReinitialize: true
})(Form);
