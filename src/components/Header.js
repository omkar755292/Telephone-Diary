import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo.svg";
import Navbar from './Navbar';

const Header = (props) => {
  return (
    <>
      <div className='container'>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/home">
              <img src={logo} alt="Logo" width="32" height="32" className="d-inline-block align-text-top" />
              &nbsp;{props.userName}.TelephoneDiary
            </Link>
          </div>
        </nav>
        <Navbar />
      </div>
    </>
  )
}

export default Header

Header.defaultProps = {
  userName: "userName"
}