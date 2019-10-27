import React, { Component } from 'react';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import TransactionList from '../transaction/TransactionList';
import Box from '../box/Box';
import Message from '../Message';
import CashboxForm from './CashboxForm';
import BoxForm from '../box/BoxForm';

// TODO - Cashbox Edit, Download Form, Reset

class CashboxShow extends Component {
  state = {
    showEditForm: false,
    editIdealBox: false,
    editCurrentBox: false,
    editChangeBox: false
  };

  componentDidMount() {
    const { cashboxId } = this.props.match.params;
    this.props.fetchCashbox(cashboxId);
  }

  toggleEditForm = () => {
    this.setState({ showEditForm: !this.state.showEditForm });
  };

  toggleEditIdealBox = () => {
    this.setState({ editIdealBox: !this.state.editIdealBox });
  };

  toggleEditCurrentBox = () => {
    this.setState({ editCurrentBox: !this.state.editCurrentBox });
  };

  toggleEditChangeBox = () => {
    this.setState({ editChangeBox: !this.state.editChangeBox });
  };

  renderEditForm() {
    return (
      <div className="my-4">
        <CashboxForm
          initialValues={this.props.cashboxes}
          idealBox={this.props.cashboxes.idealBox}
          onSurveySubmit={values => {
            this.props.updateCashbox(values);
            this.toggleEditForm();
          }}
          onCancel={this.toggleEditForm}
        />
      </div>
    );
  }

  renderEditIdealBoxForm() {
    return (
      <div className="my-4">
        <BoxForm
          title="Ideal Change Configuration"
          initialValues={this.props.cashboxes.idealBox}
          boxTotal={this.props.cashboxes.fundTotal}
          onFormSubmit={values => {
            this.props.updateBox(values);
            this.toggleEditIdealBox();
          }}
          onCancel={this.toggleEditIdealBox}
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

  renderCurrentBox() {
    if (this.state.editCurrentBox) {
      return (
        <BoxForm
          title="Remaining Cash"
          initialValues={this.props.cashboxes.currentBox}
          boxTotal={this.props.cashboxes.currentBox.boxTotal}
          onFormSubmit={values => {
            this.props.updateBox(values);
            this.toggleEditCurrentBox();
          }}
          onCancel={this.toggleEditCurrentBox}
        />
      );
    }
    return (
      <Box
        box={this.props.cashboxes.currentBox}
        title="Remaining Cash"
        action={this.toggleEditCurrentBox}
      />
    );
  }

  renderChangeBox() {
    if (this.state.editChangeBox) {
      return (
        <BoxForm
          title="Change"
          initialValues={this.props.cashboxes.changeBox}
          boxTotal={this.props.cashboxes.changeBox.boxTotal}
          onFormSubmit={values => {
            this.props.updateBox(values);
            this.toggleEditChangeBox();
          }}
          onCancel={this.toggleEditChangeBox}
        />
      );
    }
    return (
      <Box
        box={this.props.cashboxes.changeBox}
        title="Change"
        action={this.toggleEditChangeBox}
      />
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
              'Change does not match transactions total'
            )
          : null}

        {currentBox.boxTotal !== fundTotal - currentSpent
          ? this.renderMessage('danger', 'Incorrect amount of remaining cash')
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
                      color="default"
                      onClick={this.toggleEditIdealBox}
                    >
                      Edit Change
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
          {this.state.editIdealBox ? this.renderEditIdealBoxForm() : null}

          <div className="my-4">
            <TransactionList />
          </div>

          <div className="row justify-content-between mt-2 mb-2">
            <div className="col-md-6 mb-3">{this.renderCurrentBox()}</div>
            <div className="col-md-6">{this.renderChangeBox()}</div>
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
            <MDBBtn
              outline
              color="warning"
              className="ml-2"
              onClick={() => this.props.resetBox(this.props.cashboxes._id)}
            >
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
