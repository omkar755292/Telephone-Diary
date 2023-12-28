import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Authentication from './pages/Authentication';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/*' element={<Home />} />
          <Route exact path='/authentication/*' element={<Authentication />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
