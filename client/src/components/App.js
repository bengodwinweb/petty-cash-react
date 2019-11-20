import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Cashboxes from "./cashbox/Cashboxes";
import CashboxesNew from "./cashbox/CashboxesNew";
import CashboxesShow from "./cashbox/CashboxesShow";

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
          <div
            className=""
            style={{
              backgroundImage: "url('city-2.jpg')",
              height: "100vh",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundAttachment: "fixed"
            }}
          >
            <div
              className=""
              style={{
                zIndex: "1",
                height: "100vh",
                width: "100vw",
                position: "fixed",
                overflow: "auto",
                top: "0px",
                left: "0px",
                background: "rgba(0, 43, 54, 0.45)",
                color: "white"
              }}
            >
              <Header />
              <div className="px-4 pt-3" style={{ color: "" }}>
                <Route
                  path="/"
                  exact
                  component={this.isAuthenticated() ? Cashboxes : Login}
                />
                <Route path="/users/signup" component={Signup} />
                <Route path="/users/signin" component={Signin} />
                <Route
                  path="/cashboxes/new"
                  component={this.isAuthenticated() ? CashboxesNew : Login}
                />
                <Route
                  path="/cashboxes/show/:cashboxId"
                  component={this.isAuthenticated() ? CashboxesShow : Login}
                />
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, cashboxes }) => {
  return { auth, cashboxes };
};

export default connect(mapStateToProps, actions)(App);
