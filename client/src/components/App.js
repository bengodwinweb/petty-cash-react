import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Signin from './auth/Sigin';
import Signup from './auth/Signup';
import Cashboxes from './cashbox/Cashboxes';
const Landing = () => <div>Landing</div>;
const CashboxesNew = () => <div>New Cashbox</div>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
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
            <Route path="/cashboxes" exact component={Cashboxes} />
            <Route path="/cashboxes/new" component={CashboxesNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
