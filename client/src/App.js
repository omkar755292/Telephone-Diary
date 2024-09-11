import React, { useEffect } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Authentication from './pages/Authentication';
import ProtectedRoute from './components/ProtectedRoute.js';
import { useDispatch } from 'react-redux';
import { verifyToken } from './redux/slices/authSlice.js';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Dispatch token verification
      dispatch(verifyToken()).unwrap()
    }
  }, [dispatch]);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/*' element={<Authentication />} />
          <Route exact path='/home/*' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
