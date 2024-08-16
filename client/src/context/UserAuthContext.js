import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const UserAuthContext = createContext();

const UserAuthContextProvider = (props) => {

    const [userDetail, setUserDetail] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await api.get('/api/user/root');
                const { username, email, id } = response.data;
                const firstName = username.split(' ')[0];
                setUserDetail({ username, id, email, firstName });
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
    }, [isAuthenticated]);

    const login = async (user) => {
        try {
            const response = await api.post('/api/user/login', user);
            const accessToken = response.data.accessToken;
            setIsAuthenticated(true);
            localStorage.setItem('token', accessToken);
            navigate('/home');
        } catch (error) {
            console.error('Login failed:', error.response.data);
            alert('Login failed: ' + error.response.data.message);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    }

    const register = async (user) => {

        try {
            await api.post('/api/user/register', user);
            alert('Registration successful! Please log in.');
            navigate('/login');

        } catch (error) {
            alert('Registration failed: ' + error.response.data.message);
        }
    }

    const value = { login, logout, register, userDetail, isAuthenticated }
    return (
        <UserAuthContext.Provider value={value}>
            {props.children}
        </UserAuthContext.Provider>
    )
}

export default UserAuthContextProvider;
export const useUserAuth = () => useContext(UserAuthContext);