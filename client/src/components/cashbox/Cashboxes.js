import React, { Component } from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CashboxesList from './CashboxesList';

class Cashboxes extends Component {
  render() {
    return (
      <div>
        <h2>Cashboxes</h2>
        <CashboxesList />
        <Link to="/cashboxes/new">
          <MDBBtn
            href=""
            color="blue"
            className="p-0"
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '35px',
              width: '70px',
              height: '70px',
              borderRadius: '50%'
            }}
          >
            <MDBIcon icon="plus" size="2x" />
          </MDBBtn>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Cashboxes);
