import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/images/logo.svg";
import avtar from '../assets/images/avatar.svg';
import Navbar from './Navbar';

const Header = (props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <div className='container'>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/home">
              <img src={logo} alt="Logo" width="32" height="32" className="d-inline-block align-text-top" />
              &nbsp;{props.user.firstName}.TelephoneDiary
            </Link>
          </div>

          <div class="dropdown position-absolute end-0">
            <button class="btn btn-link dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={avtar} alt="Logo" width="50" height="50" className="d-inline-block align-text-top" />
            </button>
            <ul class="dropdown-menu dropdown-menu-lg-end p-1">
              <li class="dropdown-item">User Name: {props.user.username}</li>
              <li class="dropdown-item">Email: {props.user.email}</li>
              {/* <li class="dropdown-item">User ID: {props.user.id}</li> */}
              <li><hr class="dropdown-divider"></hr></li>
              <li><button class="dropdown-item" onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        </nav>
        <Navbar />
      </div>
    </>
  )
}

export default Header