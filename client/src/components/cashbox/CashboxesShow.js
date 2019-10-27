import React, { Component } from 'react';
import {
  MDBJumbotron,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBModal,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from 'mdbreact';
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
    cashboxEdit: false,
    currentBoxEdit: false,
    changeBoxEdit: false,
    idealBoxEdit: false
  };

  componentDidMount() {
    const { cashboxId } = this.props.match.params;
    this.props.fetchCashbox(cashboxId);
  }

  toggle = key => {
    this.setState({ [key]: !this.state[key] });
  };

  renderCashboxEdit() {
    return (
      <div>
        <MDBModal
          isOpen={this.state.cashboxEdit}
          toggle={() => this.toggle('cashboxEdit')}
          centered
        >
          <CashboxForm
            initialValues={this.props.cashboxes}
            idealBox={this.props.cashboxes.idealBox}
            onSurveySubmit={values => {
              this.props.updateCashbox(values);
              this.toggle('cashboxEdit');
            }}
            onCancel={() => this.toggle('cashboxEdit')}
          />
        </MDBModal>
      </div>
    );
  }

  renderEditIdealBoxForm() {
    return (
      <div className="my-4">
        <MDBModal
          isOpen={this.state.idealBoxEdit}
          toggle={() => this.toggle('idealBoxEdit')}
          centered
        >
          <BoxForm
            title="Ideal Change Configuration"
            initialValues={this.props.cashboxes.idealBox}
            boxTotal={this.props.cashboxes.fundTotal}
            onFormSubmit={values => {
              this.props.updateBox(values);
              this.toggle('idealBoxEdit');
            }}
            onCancel={() => this.toggle('idealBoxEdit')}
          />
        </MDBModal>
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
    if (this.state.currentBoxEdit) {
      return (
        <BoxForm
          title="Remaining Cash"
          initialValues={this.props.cashboxes.currentBox}
          boxTotal={this.props.cashboxes.currentBox.boxTotal}
          onFormSubmit={values => {
            this.props.updateBox(values);
            this.toggle('currentBoxEdit');
          }}
          onCancel={() => this.toggle('currentBoxEdit')}
        />
      );
    }
    return (
      <Box
        box={this.props.cashboxes.currentBox}
        title="Remaining Cash"
        action={() => this.toggle('currentBoxEdit')}
      />
    );
  }

  renderChangeBox() {
    if (this.state.changeBoxEdit) {
      return (
        <BoxForm
          title="Change"
          initialValues={this.props.cashboxes.changeBox}
          boxTotal={this.props.cashboxes.changeBox.boxTotal}
          onFormSubmit={values => {
            this.props.updateBox(values);
            this.toggle('changeBoxEdit');
          }}
          onCancel={() => this.toggle('changeBoxEdit')}
        />
      );
    }
    return (
      <Box
        box={this.props.cashboxes.changeBox}
        title="Change"
        action={() => this.toggle('changeBoxEdit')}
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
      return <div>Loading...</div>;
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
                  <div className="d-flex flex-row justify-content-between mb-3">
                    <h2 className="h1-responsive">{cashboxName}</h2>
                    <MDBDropdown>
                      <MDBDropdownToggle color="white" className="p-2">
                        <MDBIcon icon="ellipsis-v" />
                      </MDBDropdownToggle>
                      <MDBDropdownMenu basic>
                        <MDBDropdownItem
                          onClick={() => this.props.getPDF(fullCashbox)}
                        >
                          Download Form
                        </MDBDropdownItem>
                        <MDBDropdownItem
                          onClick={() => this.toggle('cashboxEdit')}
                        >
                          Edit
                        </MDBDropdownItem>
                        <MDBDropdownItem
                          onClick={() => this.toggle('idealBoxEdit')}
                        >
                          Configure Change
                        </MDBDropdownItem>
                        <MDBDropdownItem divider />
                        <MDBDropdownItem
                          onClick={() =>
                            this.props.resetBox(this.props.cashboxes._id)
                          }
                          className="orange-text"
                        >
                          Reset Box
                        </MDBDropdownItem>
                        <MDBDropdownItem
                          onClick={() =>
                            this.props.deleteCashbox(_id, this.props.history)
                          }
                          className="red-text"
                        >
                          Delete
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </div>
                  <p className="my-2 lead" style={{ fontWeight: '200' }}>
                    Fund Total: ${fundTotal.toFixed(2)}
                  </p>
                  <p className="lead" style={{ fontWeight: '200' }}>
                    Remaining: ${currentBox.boxTotal.toFixed(2)}
                  </p>
                </MDBContainer>
              </MDBJumbotron>
            </MDBCol>
          </MDBRow>

          {this.renderCashboxEdit()}
          {this.renderEditIdealBoxForm()}

          <div className="my-4">
            <TransactionList />
          </div>

          <div className="row justify-content-between mt-2 mb-2">
            <div className="col-md-6 mb-3">{this.renderCurrentBox()}</div>
            <div className="col-md-6">{this.renderChangeBox()}</div>
          </div>
        </MDBContainer>

        <Link to="/cashboxes">
          <MDBBtn
            href=""
            color=""
            className="p-0"
            style={{
              position: 'fixed',
              top: '55px',
              left: '10px',
              width: '50px',
              height: '50px',
              borderRadius: '50%'
            }}
          >
            <MDBIcon
              icon="angle-left"
              size="lg"
              style={{ color: 'black' }}
              size="2x"
            />
          </MDBBtn>
        </Link>
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
