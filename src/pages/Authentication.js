import React from 'react'
import Login from './Login'
import Register from './Register'
import { Routes, Route } from 'react-router-dom';
import Avatar from '../components/Avatar';

const Index = () => {
  return (
    <div className='index'>
      <div className='container'>
        <Avatar />
        <Routes >
          <Route exact path='/' element={<Login />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
        </Routes>

      </div>
    </div>
  )
}

export default Index