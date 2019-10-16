import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class CashboxesList extends Component {
  componentDidMount() {
    this.props.fetchCashboxes();
  }

  renderCashboxes() {
    if (!this.props.cashboxes) {
      return <div>No Cashboxes</div>;
    }
    return this.props.cashboxes.map(cashbox => {
      return (
        <div key={cashbox._id} className="col-sm-6 col-lg-4 col-xl-3 mt-3">
          <MDBCard className="border-default p-3">
            <MDBCardTitle className="mb-0">{cashbox.companyName}</MDBCardTitle>
            <MDBCardBody className="p-3 mt-2" style={{ fontWeight: '300' }}>
              <h5 className="mb-2" style={{ fontWeight: '300' }}>
                {cashbox.cashboxName}
              </h5>
              <p className="mt-0 mb-0">
                <span className="mr-0">$</span>
                {parseFloat(cashbox.fundTotal).toFixed(2)} Total
              </p>
            </MDBCardBody>
          </MDBCard>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="d-flex mt-4" style={{ flexWrap: 'wrap' }}>
        {this.renderCashboxes()}
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
)(CashboxesList);
