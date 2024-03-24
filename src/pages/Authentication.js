import React from 'react'
import Login from './Login'
import Register from './Register'
import { Routes, Route } from 'react-router-dom';
import Avatar from '../components/Avatar';

const Authentication = () => {

  return (
      <div className="container p-5 my-5 d-flex justify-content-center">
        <Avatar />
        <Routes >
          <Route exact path='/' element={<Login />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
        </Routes>

      </div>
  )
}

export default Authentication