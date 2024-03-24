import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Authentication from './pages/Authentication';
import UserAuthContextProvider from './context/UserAuthContext';
import ProtectedRoute from './components/ProtectedRoute.js';

function App() {

  return (
    <>
      <Router>
        <UserAuthContextProvider>
          <Routes>
            <Route exact path='/*' element={<Authentication />} />
            <Route exact path='/home/*' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
          </Routes>
        </UserAuthContextProvider>
      </Router>
    </>
  );
}

export default App;
