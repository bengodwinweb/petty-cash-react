import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class CashboxShow extends Component {
  componentDidMount() {
    const { cashboxId } = this.props.match.params;
    console.log(cashboxId);
    this.props.fetchCashbox(cashboxId);
  }

  render() {
    return <div>{this.props.cashboxes.companyName}</div>;
  }
}

const mapStateToProps = ({ cashboxes }) => {
  return { cashboxes };
};

export default connect(
  mapStateToProps,
  actions
)(CashboxShow);
