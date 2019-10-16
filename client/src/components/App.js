import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Signin from './auth/Sigin';
import Signup from './auth/Signup';
import Cashboxes from './cashbox/Cashboxes';
import CashboxesNew from './cashbox/CashboxesNew';
import CashboxesShow from './cashbox/CashboxesShow';
const Landing = () => <div>Landing</div>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  isAuthenticated() {
    return !!this.props.auth;
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <div className="container">
            <Route path="/" exact component={Landing} />
            <Route path="/users/signup" component={Signup} />
            <Route path="/users/signin" component={Signin} />
            <Route path="/users/login" component={Landing} />
            <Route
              path="/cashboxes"
              exact
              component={this.isAuthenticated() ? Cashboxes : Signin}
            />
            <Route
              path="/cashboxes/new"
              component={this.isAuthenticated() ? CashboxesNew : Signin}
            />
            <Route
              path="/cashboxes/show/:cashboxId"
              component={this.isAuthenticated() ? CashboxesShow : Signin}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, cashboxes }) => {
  return { auth, cashboxes };
};

export default connect(
  mapStateToProps,
  actions
)(App);
