import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import transactionFields from './cashbox/transaction/transactionFields';
import Field from './Field';

class Form extends Component {
  componentDidMount() {
    console.log(this.props);
    if (this.props.cashboxes) {
      // this.props.values.cashboxId = this.props.cashboxes._id;
      // console.log('updated values with cashboxes._id');
    }
  }

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
          component={Field}
          FIELDS={this.props.FIELDS}
        />
      );
    });
  }

  render() {
    if (!this.props.cashboxes) {
      return <div>Loading...</div>;
    }
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

  // this.props.FIELDS.forEach(({ name }) => {
  //   if (!values[name]) {
  //     errors[name] = 'This field is required';
  //   }
  // });

  return errors;
};

const mapStateToProps = ({ cashboxes, form }) => {
  return { cashboxes, form };
};

Form = connect(mapStateToProps)(Form);

export default reduxForm({
  validate,
  form: 'transactionForm'
})(Form);

// Pass in "form" and pass in to reduxForm
// Pass in FIELDS
