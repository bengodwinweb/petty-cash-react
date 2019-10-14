import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.props.fetchUser();
    }

    // Navigate user away if not authenticated
    authenticateUser() {
      if (!this.props.auth) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = ({ auth }) => {
    return { auth };
  };

  return connect(
    mapStateToProps,
    actions
  )(ComposedComponent);
};
