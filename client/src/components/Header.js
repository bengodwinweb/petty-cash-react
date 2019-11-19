import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBIcon
} from 'mdbreact';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  renderContent() {
    console.log(!this.props.auth)
    switch (this.props.auth) {
      case null:
        console.log("auth = null")
        return;
      case false:
        console.log("user not signed in")
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
        console.log("user logged in")
        return (
          <div className="d-flex flex-column flex-md-row">
            <MDBNavItem key="1">
              <Link to="/cashboxes" className="nav-link">
                {this.props.auth.email}
              </Link>
            </MDBNavItem>
            <MDBNavItem key="2">
              <a href="/api/users/logout" className="nav-link">
                Logout
              </a>
            </MDBNavItem>
          </div>
        );
    }
  }

  render() {
    return (
      <MDBNavbar color="default-color" dark expand="md" className="mb-4">
        <MDBNavbarBrand href={this.props.auth ? '/cashboxes' : '/'}>
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
