import React, { Component } from 'react';
import {
  MDBCard,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle
} from 'mdbreact';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import transactionFields from './transactionFields';
import Form from '../../Form';
import * as actions from '../../../actions';

class TransactionList extends Component {
  state = {
    showForm: false
  };

  renderList() {
    if (!this.props.cashboxes.transactions) {
      return <div>Loading...</div>;
    }
    return this.props.cashboxes.transactions.map(
      ({ _id, group, category, amount, index, account, description = '' }) => {
        return (
          <MDBRow key={_id} className="">
            <div className="d-flex flex-row justify-content-start col-12">
              <div className="col-2">
                <p className="">{group}</p>
              </div>
              <div className="col-2">
                <p className="">{category}</p>
              </div>
              <div className="col-2 text-center">
                <p className="">${amount}</p>
              </div>
              <div className="col-2">
                <p className="">{index}</p>
              </div>
              <div className="col-1">
                <p className="">{account}</p>
              </div>
              <div className="col-2">
                <p className="">{description}</p>
              </div>
            </div>
            <div className="d-flex flex-row">
              <MDBBtn size="sm" outline color="default" className="">
                Edit
              </MDBBtn>
              <MDBBtn size="sm" outline color="danger" className="">
                Delete
              </MDBBtn>
            </div>
          </MDBRow>
        );
      }
    );
  }

  renderForm() {
    console.log(transactionFields);
    return (
      <MDBCard className="p-4 my-4" key="transactionForm">
        <Form
          FIELDS={transactionFields}
          onCancel={this.toggleForm}
          onTransactionSubmit={
            (values => {
              return this.props.submitTransaction(
                values,
                this.props.cashboxes._id,
                this.props.history
              );
            },
            this.toggleForm)
          }
        />
      </MDBCard>
    );
  }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  render() {
    return (
      <div>
        <MDBCard className="pt-4 px-4" key="transactionList">
          <MDBCardTitle>Transactions</MDBCardTitle>
          <MDBCardBody>
            <MDBRow className="mb-2">
              <div className="d-flex flex-row justify-content-start col-12">
                <div className="col-4 col-lg-3 col-xl-2">
                  <h6 className="">Group</h6>
                </div>
                <div className="col-2 d-none d-xl-inline">
                  <h6 className="">Category</h6>
                </div>
                <div className="col-4 col-lg-2 col-xl-1 m-auto m-lg-0">
                  <h6 className="">$</h6>
                </div>
                <div className="col-2 d-none d-lg-inline">
                  <h6 className="">Index</h6>
                </div>
                <div className="col-1 d-none d-lg-inline">
                  <h6 className="">Acc.</h6>
                </div>
                <div className="col-2 d-none d-lg-inline mr-auto">
                  <h6 className="">Description</h6>
                </div>
              </div>
            </MDBRow>
            {this.renderList()}
            <div className="d-flex flex-column-reverse flex-sm-row-reverse justify-content-start mt-4 mb-0 align-items-sm-end">
              <MDBBtn
                outline
                size="sm"
                color="default"
                onClick={this.toggleForm}
              >
                Add New
              </MDBBtn>
              <h5 className="mr-5">
                Total - $
                {parseFloat(this.props.cashboxes.currentSpent).toFixed(2)}
              </h5>
            </div>
          </MDBCardBody>
        </MDBCard>

        {this.state.showForm ? this.renderForm() : null}
      </div>
    );
  }
}

const mapStateToProps = ({ cashboxes }) => {
  return { cashboxes };
};

export default connect(
  mapStateToProps,
  actions
)(withRouter(TransactionList));
