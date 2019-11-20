import React, { Component } from "react";
import { connect } from "react-redux";
import { MDBCardTitle, MDBRow, MDBCol, MDBCard, MDBBtn } from "mdbreact";
import { reduxForm, Field, formValueSelector } from "redux-form";
import BoxField from "./BoxField";
import boxFields from "./boxFields";
import sumBox from "../../utils/sumBox";
import Message from "../Message";

class BoxForm extends Component {
  state = {
    error: null
  };

  validate(values) {
    if (sumBox(values) !== this.props.boxTotal) {
      return false;
    }
    return true;
  }

  renderErrorMessage() {
    return (
      <Message
        type="warning"
        content={`Total must equal ${this.props.boxTotal}`}
      />
    );
  }

  renderFieldsArr() {
    const fieldsArr = Object.keys(boxFields).map(key => {
      return {
        label: boxFields[key].string,
        name: key,
        type: "number",
        multiplier: boxFields[key].value
      };
    });
    return fieldsArr;
  }

  renderFields() {
    const fieldsArr = this.renderFieldsArr();
    return fieldsArr.map(field => {
      return (
        <Field
          label={field.label}
          name={field.name}
          key={field.name}
          component={BoxField}
          currentVal={this.props.values[field.name]}
          multiplier={field.multiplier}
        />
      );
    });
  }

  render() {
    const isEnabled = this.validate(this.props.values);
    return (
      <div>
        <MDBCard
          className="pt-4 px-4"
          key="transactionList"
          color="blue-grey darken-3"
        >
          <MDBCardTitle className="ml-3 mt-3 mb-4">
            {this.props.title}
          </MDBCardTitle>
          {isEnabled ? null : this.renderErrorMessage()}
          <MDBRow className="d-flex justify-content-center">
            <MDBCol className="">
              <form
                className=""
                style={{ flexWrap: "wrap" }}
                onSubmit={this.props.handleSubmit(values => {
                  this.props.onFormSubmit(values);
                })}
              >
                <div className="col-12">{this.renderFields()}</div>
                <div className="my-1 d-flex justify-content-between">
                  <div className="col-7 col-sm-8">
                    <h5>Total</h5>
                  </div>
                  <div className="d-flex col-5 col-sm-4">
                    <span className="mr-auto">
                      <h5>$</h5>
                    </span>
                    <span>
                      <h5>{sumBox(this.props.values).toFixed(2)}</h5>
                    </span>
                  </div>
                </div>
                <div className="mt-0 d-flex col-12 mb-4 p-0">
                  <MDBBtn
                    outline
                    size="sm"
                    color="danger"
                    className="ml-auto"
                    onClick={this.props.onCancel}
                  >
                    Cancel
                  </MDBBtn>
                  <MDBBtn
                    outline
                    size="sm"
                    color="default"
                    type="submit"
                    className="ml-2"
                    disabled={!isEnabled}
                  >
                    Submit
                  </MDBBtn>
                </div>
                <div></div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </div>
    );
  }
}

const selector = formValueSelector("boxForm");
const fields = Object.keys(boxFields);

// use connect to map form values to props
BoxForm = connect(state => {
  const values = selector(state, ...fields);
  return { values, ...state };
})(BoxForm);

export default reduxForm({ form: "boxForm" })(BoxForm);
