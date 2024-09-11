import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error} = useSelector((state) => state.auth);

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = { email, password };
    
        // Dispatch the login action and wait for the result
        const result = await dispatch(login(user));
    
        // Check if login was successful before navigating
        if (login.fulfilled.match(result)) {
            navigate('/home');
        }
    
        setEmail('');
        setPassword('');
    };

    return (

        <div className='container mt-3'>
            <form onSubmit={handleLogin}>
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email"
                        name='email'
                        class="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input
                        type="password"
                        name='password'
                        class="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div>
                    {/* Display loading indicator */}
                    {loading && <p>Loading...</p>}

                    {/* Display error message */}
                    {error && <p className="text-danger">{error}</p>}

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button> &nbsp;
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login