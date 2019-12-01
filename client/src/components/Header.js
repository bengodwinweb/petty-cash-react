import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import { connect } from "react-redux";

class Header extends Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div className="d-flex flex-column flex-md-row">
            <MDBNavItem key="0">
              <a href="/users/signin" className="nav-link">
                Sign In
              </a>
            </MDBNavItem>
            <MDBNavItem key="1">
              <a href="/users/signup" className="nav-link">
                Sign Up
              </a>
            </MDBNavItem>
          </div>
        );
      default:
        return (
          <div className="d-flex flex-column flex-md-row">
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <span className="mr-2" style={{ color: "white" }}>
                  {this.props.auth.email}
                </span>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem>
                  <Link to="/users/account">Account</Link>
                </MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>
                  <a
                    href="/api/users/logout"
                    className="nav-link"
                    style={{ color: "black" }}
                  >
                    Logout
                  </a>
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
        );
    }
  }

  render() {
    return (
      <MDBNavbar color="default-color" dark expand="md" className="mb-0">
        <MDBNavbarBrand href="/">
          <MDBIcon icon="cash-register" className="mr-2" />
          Petty Cash
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>{this.renderContent()}</MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
