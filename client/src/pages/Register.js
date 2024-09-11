import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slices/authSlice';

const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = { username, email, password };

    // Dispatch the register action (thunk)
    dispatch(register(user));

    // Clear form fields
    setUsername('');
    setEmail('');
    setPassword('');

    navigate('/login');

    
  };

  return (
    <div className='container mt-3'>
      <form onSubmit={handleRegister}>
        <div class="mb-3">
          <label class="form-label">Enter Your Full Name</label>
          <input type="name"
            class="form-control"
            id="name"
            value={username}
            onChange={(e) => { setUsername(e.target.value) }} />
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
        {/* Display loading indicator */}
        {loading && <p>Loading...</p>}

        {/* Display error message */}
        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button> &nbsp;
        <Link to="/login">Login</Link>
      </form>
    </div>
  )
}

export default Register