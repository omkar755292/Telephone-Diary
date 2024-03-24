import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

const Register = () => {
  const { register } = useUserAuth();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const add = async (e) => {
    e.preventDefault();
    const user = { username, email, password };
    register(user);
    setUserName('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className='container mt-3'>
      <form onSubmit={add}>
        <div class="mb-3">
          <label class="form-label">Enter Your Full Name</label>
          <input type="name"
            class="form-control"
            id="name"
            value={username}
            onChange={(e) => { setUserName(e.target.value) }} />
        </div>
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input type="email"
            class="form-control"
            id="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button> &nbsp;<Link to="/login">Login</Link>
      </form>
    </div>
  )
}

export default Register