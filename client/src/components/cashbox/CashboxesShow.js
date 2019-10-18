import React, { Component } from 'react';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import TransactionList from '../transaction/TransactionList';
import Box from '../box/Box';

class CashboxShow extends Component {
  componentDidMount() {
    const { cashboxId } = this.props.match.params;
    this.props.fetchCashbox(cashboxId);
  }

  render() {
    const {
      cashboxName,
      companyName,
      fundTotal,
      currentBox,
      changeBox
    } = this.props.cashboxes;

    if (!currentBox) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <h2 className="ml-3 pt-2 display-4 pb-2">{companyName}</h2>
        <MDBContainer className="mt-4 p-0">
          <MDBRow className="">
            <MDBCol className="">
              <MDBJumbotron fluid className="m-0 py-4">
                <MDBContainer className="px-5">
                  <h2 className="h1-responsive mt-4 mb-3 pb-2">
                    {cashboxName}
                  </h2>
                  <p className="my-2 lead" style={{ fontWeight: '200' }}>
                    Fund Total: ${fundTotal}
                  </p>
                  <p className="lead" style={{ fontWeight: '200' }}>
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
                    <MDBBtn
                      outline
                      color="danger"
                      size="small"
                      className="small"
                    >
                      Delete
                    </MDBBtn>
                  </div>
                </MDBContainer>
              </MDBJumbotron>
            </MDBCol>
          </MDBRow>

          <div className="my-4">
            <TransactionList />
          </div>

          <div className="my-4">
            <Box box={currentBox} />
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
)(CashboxShow);
