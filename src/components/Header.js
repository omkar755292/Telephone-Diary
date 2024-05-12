import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo.svg";
import avtar from '../assets/images/avatar.png';
import Navbar from './Navbar';
import { useUserAuth } from '../context/UserAuthContext';

const Header = () => {
  const { userDetail, logout } = useUserAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className='container'>
        <nav className="navbar bg-body-tertiary">

          <div className="container-fluid">
            <Link className="navbar-brand" to="/home">
              <img src={logo} alt="Logo" width="32" height="32" className="d-inline-block align-text-top" />
              &nbsp;{userDetail.firstName}.TelephoneDiary
            </Link>
          </div>

          <div class="dropdown position-absolute end-0">

            <button class="btn btn-link dropdown dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={avtar} alt="Logo" width="50" height="50" className="d-inline-block align-text-top" />
            </button>

            <ul class="dropdown-menu dropdown-menu-lg-end p-1">
              <li class="dropdown-item">User Name: {userDetail.username}</li>
              <li class="dropdown-item">Email: {userDetail.email}</li>
              {/* <li class="dropdown-item">User ID: {userDetail.id}</li> */}
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