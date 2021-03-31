import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import './css/header.css';
import LoginButton from './LoginButton.js';
import { withAuth0 } from '@auth0/auth0-react';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <LoginButton />
        <AddBookButton />
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <Link to="/">Home</Link>
        {console.log(this.props.auth0)}
        {this.props.auth0.isAuthenticated &&
          <Link to="/profile">Profile</Link>
        }
      </Navbar>
    )
  }
}

export default withAuth0(Header);
