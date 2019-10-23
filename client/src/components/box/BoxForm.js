import React, { Component } from 'react';
import { MDBCardTitle, MDBRow, MDBCol, MDBCard, MDBBtn } from 'mdbreact';
import { reduxForm, Field } from 'redux-form';
import BoxField from './BoxField';
import boxFields from './boxFields';

class BoxForm extends Component {
  renderFieldsArr() {
    const fieldsArr = Object.keys(boxFields).map(key => {
      return {
        label: boxFields[key].string,
        name: key,
        type: 'number'
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
          type={field.type}
          name={field.name}
          key={field.name}
          component={BoxField}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <MDBCard className="pt-4 px-4" key="transactionList">
          <MDBCardTitle className="ml-3 mt-3 mb-4">
            {this.props.title}
          </MDBCardTitle>
          <MDBRow className="d-flex justify-content-center">
            <MDBCol className="">
              <form
                className=""
                style={{ flexWrap: 'wrap' }}
                onSubmit={this.props.handleSubmit(values =>
                  this.props.onFormSubmit(values)
                )}
              >
                <div className="col-12">{this.renderFields()}</div>
                <div className="mt-4 d-flex col-12 mb-4 p-0">
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
                  >
                    Submit
                  </MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </div>
    );
  }
}

export default reduxForm({ form: 'boxForm' })(BoxForm);
