import React, { Component } from 'react';
import { connect } from 'react-redux';
import CashboxesList from './CashboxesList';

class Cashboxes extends Component {
  render() {
    return (
      <div>
        <h2>Cashboxes</h2>
        <CashboxesList />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Cashboxes);
