import React, { Component } from 'react';
import {
  MDBJumbotron,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle
} from 'mdbreact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import TransactionList from './transaction/TransactionList';
import Box from './Box';

class CashboxShow extends Component {
  componentDidMount() {
    const { cashboxId } = this.props.match.params;
    console.log(cashboxId);
    this.props.fetchCashbox(cashboxId);
  }

  render() {
    const {
      cashboxName,
      companyName,
      fundTotal,
      transactions,
      currentSpent,
      currentBox,
      changeBox
    } = this.props.cashboxes;

    if (!currentBox) {
      return <div>Loading</div>;
    }

    return (
      <MDBContainer className="mt-4 p-0">
        <MDBRow className="">
          <MDBCol className="">
            <MDBJumbotron fluid className="m-0 py-4">
              <MDBContainer className="px-5">
                <h2 className="h1-responsive mt-4">{companyName}</h2>
                <h2 className="h2-responsive mt-2 mb-4">{cashboxName}</h2>
                <p className="my-2 lead" style={{ fontWeight: '200' }}>
                  Fund Total: ${fundTotal}
                </p>
                <p className=" lead" style={{ fontWeight: '200' }}>
                  Remaining: ${currentBox.boxTotal}
                </p>
                <hr className="my-2" />
                <div className="mt-4 mb-3 d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-md-start">
                  <Link to="/cashboxes">
                    <MDBBtn outline color="default" className="">
                      Back
                    </MDBBtn>
                  </Link>
                  <MDBBtn outline color="default" className="">
                    Edit
                  </MDBBtn>
                  <MDBBtn outline color="danger" size="small" className="small">
                    Delete
                  </MDBBtn>
                </div>
              </MDBContainer>
            </MDBJumbotron>
          </MDBCol>
        </MDBRow>

        <div className="my-4">
          {/* Pass in transactions={transactions} after testing */}
          <TransactionList />
        </div>

        <div className="my-4">
          {/* Pass in transactions={transactions} after testing */}
          <Box box={currentBox} />
        </div>
      </MDBContainer>
    );
  }
}

const mapStateToProps = ({ cashboxes }) => {
  return { cashboxes };
};

export default connect(
  mapStateToProps,
  actions
)(CashboxShow);
