import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='container'>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to="/home/addcontact">Add Contact</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/home/contactlist">Contact list</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar