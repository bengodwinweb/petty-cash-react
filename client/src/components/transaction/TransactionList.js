import React, { Component } from 'react';
import { MDBCard, MDBBtn, MDBRow, MDBCardTitle, MDBIcon } from 'mdbreact';
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
        _cashbox,
        paidTo,
        expenseType,
        amount,
        index,
        account,
        description = ''
      }) => {
        return (
          <MDBRow key={_id} className="my-0">
            <div
              className="d-flex flex-row col-12 align-items-center"
              style={{ fontWeight: '300' }}
            >
              <div className="col-5 col-lg-3 col-xl-2 h-auto">
                <p className="m-0">{paidTo}</p>
              </div>
              <div className="col-2 d-none d-xl-inline">
                <p className="m-0">{expenseType}</p>
              </div>
              <div className="col-3 col-lg-2 col-xl-1 mx-auto m-lg-0 d-flex justify-content-between h-auto">
                <span className="">$</span>
                <span className="">{amount.toFixed(2)}</span>
              </div>
              <div className="col-2 d-none d-lg-inline">
                <p className="m-0">{index}</p>
              </div>
              <div className="col-1 d-none d-lg-inline">
                <p className="m-0">{account}</p>
              </div>
              <div className="col-2 d-none d-lg-inline">
                <p className="m-0">{description}</p>
              </div>
              <div
                className="d-none d-sm-flex ml-auto mr-2 align-items-center"
                style={{ fontWeight: '200' }}
              >
                <Link
                  to="#"
                  className="mr-3"
                  style={{ color: 'rgb(40, 175, 157)' }}
                >
                  Edit
                </Link>
                <MDBBtn
                  outline
                  size="sm"
                  color="danger"
                  className="px-2 py-1"
                  onClick={() => this.props.deleteTransaction(_cashbox, _id)}
                >
                  <MDBIcon icon="trash" />
                </MDBBtn>
              </div>
            </div>
          </MDBRow>
        );
      }
    );
  }

  renderForm() {
    return (
      <MDBCard className="p-4 my-4" key="transactionForm">
        <Form
          FIELDS={transactionFields}
          onCancel={this.toggleForm}
          onTransactionSubmit={values => {
            this.props.submitTransaction(
              values,
              this.props.cashboxes._id,
              this.props.history
            );
            this.toggleForm();
          }}
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
