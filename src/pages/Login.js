import React, { useState } from 'react'
import api from '../api/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const add = async (e) => {
        e.preventDefault();
        const user = { email, password };
        try {
            const response = await api.post('/api/user/login', user);
            const accessToken = response.data.accessToken;
            localStorage.setItem('token', accessToken);
            navigate('/home');
            setEmail('');
            setPassword('');

        } catch (error) {
            console.error('Login failed:', error.response.data);
            alert('Login failed: ' + error.response.data.message);
        }
    }

    return (

        <div className='container mt-3'>
            <form onSubmit={add}>
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
                <div>
                    <button type="submit" class="btn btn-primary">Submit</button>&nbsp;<Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login