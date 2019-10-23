import React, { Component } from 'react';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import TransactionList from '../transaction/TransactionList';
import Box from '../box/Box';
import Message from '../../Message';
import CashboxForm from './CashboxForm';

// TODO - Cashbox Edit, Download Form, Reset

class CashboxShow extends Component {
  state = {
    showEditForm: false
  };

  componentDidMount() {
    const { cashboxId } = this.props.match.params;
    this.props.fetchCashbox(cashboxId);
  }

  toggleEditForm = () => {
    this.setState({ showEditForm: !this.state.showEditForm });
  };

  renderEditForm() {
    return (
      <div className="my-4">
        <CashboxForm
          initialValues={this.props.cashboxes}
          onSurveySubmit={values => {
            this.props.updateCashbox(values);
            this.toggleEditForm();
          }}
          onCancel={this.toggleEditForm}
        />
      </div>
    );
  }

  renderMessage(type, content) {
    return (
      <div className="my-4">
        <Message type={type} content={content} />
      </div>
    );
  }

  render() {
    const cashbox = this.props.cashboxes;
    const {
      cashboxName,
      companyName,
      fundTotal,
      currentBox,
      changeBox,
      currentSpent,
      transactions,
      _id
    } = cashbox;
    const fullCashbox = { cashbox, transactions, changeBox };

    if (!currentBox) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <h2 className="ml-3 pt-2 display-4 pb-2">{companyName}</h2>

        {currentSpent !== changeBox.boxTotal
          ? this.renderMessage(
              'danger',
              'Change total does not match transactions total'
            )
          : null}

        {currentBox.boxTotal !== fundTotal - currentSpent
          ? this.renderMessage(
              'danger',
              'Current cash does not match transactions'
            )
          : null}

        <MDBContainer className="mt-4 p-0">
          <MDBRow className="">
            <MDBCol className="">
              <MDBJumbotron fluid className="m-0 py-4">
                <MDBContainer className="px-5">
                  <h2 className="h1-responsive mt-4 mb-3 pb-2">
                    {cashboxName}
                  </h2>
                  <p className="my-2 lead" style={{ fontWeight: '200' }}>
                    Fund Total: ${fundTotal.toFixed(2)}
                  </p>
                  <p className="lead" style={{ fontWeight: '200' }}>
                    Remaining: ${currentBox.boxTotal.toFixed(2)}
                  </p>
                  <hr className="my-2" />
                  <div className="mt-4 mb-3 d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-md-start">
                    <Link to="/cashboxes">
                      <MDBBtn outline color="default" className="">
                        Back
                      </MDBBtn>
                    </Link>
                    <MDBBtn
                      outline
                      color="default"
                      onClick={this.toggleEditForm}
                    >
                      Edit
                    </MDBBtn>
                    <MDBBtn
                      outline
                      color="danger"
                      size="small"
                      className="small"
                      onClick={() =>
                        this.props.deleteCashbox(_id, this.props.history)
                      }
                    >
                      Delete
                    </MDBBtn>
                  </div>
                </MDBContainer>
              </MDBJumbotron>
            </MDBCol>
          </MDBRow>

          {this.state.showEditForm ? this.renderEditForm() : null}

          <div className="my-4">
            <TransactionList />
          </div>

          <div className="row justify-content-between mt-2 mb-2">
            <div className="col-md-6 mb-3">
              <Box box={currentBox} title="Remaining Cash" />
            </div>
            <div className="col-md-6">
              <Box box={changeBox} title="Change" />
            </div>
          </div>

          <div className="row justify-content-end mb-3 pr-2">
            <MDBBtn
              outline
              color="default"
              className=""
              onClick={() => this.props.getPDF(fullCashbox)}
            >
              Download Form
            </MDBBtn>
            <MDBBtn outline color="warning" className="ml-2">
              Reset Box
            </MDBBtn>
          </div>
        </MDBContainer>
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
)(withRouter(CashboxShow));
