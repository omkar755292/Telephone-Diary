// src/counterSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Async thunks for login, register, and fetch user details
export const fetchUserDetails = createAsyncThunk('auth/fetchUserDetails', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/api/user/root');
        const { username, email, id } = response.data;
        const firstName = username.split(' ')[0];
        return { username, email, id, firstName };
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const verifyToken = createAsyncThunk(
    'auth/verifyToken',
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
  
        const response = await api.get('/api/user/root', {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
        
        const { username, email, id } = response.data;
        const firstName = username.split(' ')[0];
        return { username, email, id, firstName };
      } catch (error) {
        localStorage.removeItem('token'); // Remove invalid token
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );

export const login = createAsyncThunk('auth/login', async (user, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.post('/api/user/login', user);
        const { accessToken } = response.data;
        localStorage.setItem('token', accessToken);
        console.log(accessToken);
        await dispatch(fetchUserDetails());
        return accessToken;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const register = createAsyncThunk('auth/register', async (user, { rejectWithValue }) => {
    try {
        await api.post('/api/user/register', user);
        return 'Registration successful!';
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const token = localStorage.getItem('token');

export const authSlice = createSlice({

    name: 'auth',
    initialState: {
        userDetail: {},
        isAuthenticated: !!token,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.isAuthenticated = false;
            state.userDetail = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetail = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetail = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(verifyToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                localStorage.removeItem('token');
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                alert(action.payload);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },


});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
