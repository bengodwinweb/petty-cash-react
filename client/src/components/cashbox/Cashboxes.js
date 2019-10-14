import React, { Component } from 'react';
import { connect } from 'react-redux';

class Cashboxes extends Component {
  render() {
    return <div>Cashboxes</div>;
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Cashboxes);
