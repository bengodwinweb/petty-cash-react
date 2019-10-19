import React, { Component } from 'react';
import { MDBCard, MDBBtn, MDBRow, MDBCardTitle } from 'mdbreact';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import transactionFields from './transactionFields';
import Form from '../Form';
import * as actions from '../../actions';

// TODO - Transaction Edit

class TransactionList extends Component {
  state = {
    showForm: false
  };

  renderList() {
    if (!this.props.cashboxes.transactions) {
      return <div>Loading...</div>;
    }
    return this.props.cashboxes.transactions.map(
      ({
        _id,
        paidTo,
        expenseType,
        amount,
        index,
        account,
        description = ''
      }) => {
        return (
          <MDBRow key={_id} className="mb-2">
            <div
              className="d-flex flex-row col-12 align-items-start"
              style={{ fontWeight: '300' }}
            >
              <div className="col-5 col-lg-3 col-xl-2 h-auto">
                <p className="h-auto m-0">{paidTo}</p>
              </div>
              <div className="col-2 d-none d-xl-inline">
                <p className="">{expenseType}</p>
              </div>
              <div className="col-3 col-lg-2 col-xl-1 mx-auto m-lg-0 d-flex justify-content-between h-auto">
                <span className="">$</span>
                <span className="">{amount.toFixed(2)}</span>
              </div>
              <div className="col-2 d-none d-lg-inline">
                <p className="">{index}</p>
              </div>
              <div className="col-1 d-none d-lg-inline">
                <p className="">{account}</p>
              </div>
              <div className="col-2 d-none d-lg-inline">
                <p className="">{description}</p>
              </div>
              <div
                className="d-none d-sm-flex ml-auto mr-2"
                style={{ fontWeight: '200' }}
              >
                <Link
                  to="#"
                  className="mr-3"
                  style={{ color: 'rgb(40, 175, 157)' }}
                >
                  Edit
                </Link>
                <Link to="#" className="red-text mr-0">
                  Delete
                </Link>
              </div>
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
          <MDBCardTitle className="ml-3 mt-3 mb-4">Transactions</MDBCardTitle>
          <MDBRow key="headers" className="">
            <div className="d-flex flex-row justify-content-start col-12">
              <div className="col-5 col-lg-3 col-xl-2">
                <p className="lead">Group</p>
              </div>
              <div className="col-2 d-none d-xl-inline">
                <p className="lead">Category</p>
              </div>
              <div className="col-3 col-lg-2 col-xl-1 m-auto m-lg-0 text-lg-right">
                <p className="lead pr-lg-3">$</p>
              </div>
              <div className="col-2 d-none d-lg-inline">
                <p className="lead">Index</p>
              </div>
              <div className="col-1 d-none d-lg-inline">
                <p className="lead">Acc.</p>
              </div>
              <div className="col-2 d-none d-lg-inline mr-auto">
                <p className="lead">Description</p>
              </div>
            </div>
          </MDBRow>
          {this.renderList()}
          <div className="d-flex flex-column-reverse flex-sm-row-reverse justify-content-start mt-2 mb-3 align-items-sm-end">
            <MDBBtn
              outline
              size="sm"
              color="default"
              onClick={this.toggleForm}
              className="mr-0"
            >
              Add New
            </MDBBtn>
            <h5 className="mr-5">
              <span className="mr-4">Total</span>$
              {parseFloat(this.props.cashboxes.currentSpent).toFixed(2)}
            </h5>
          </div>
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
