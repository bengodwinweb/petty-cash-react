import React, { Component } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

class Login extends Component {
  state = {
    newUser: false
  };

  toggleNewUser = () => {
    this.setState({ newUser: !this.state.newUser });
  };

  renderCard() {
    if (this.state.newUser) {
      return <Signup toggle={this.toggleNewUser} />;
    }
    return <Signin toggle={this.toggleNewUser} />;
  }
  render() {
    return (
      <div className="d-flex flex-row">
        <div className="d-none d-md-flex align-items-center col-md-5 col-lg-6 col-xl-7">
          <div className="pl-3">
            <h1>Petty Cash</h1>
            <h4>Sign in or create an account</h4>
          </div>
        </div>

        <div className="col-12 col-md-7 col-lg-6 col-xl-5 p-0 p-sm-4">
          {this.renderCard()}
        </div>
      </div>
    );
  }
}

export default Login;
