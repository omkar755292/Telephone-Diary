import React, { useState } from 'react'

const AddContact = (props) => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const add =(e)=>{
    e.preventDefault();
    const newContact = { name, email, phone };
    props.addContactHandler(newContact)
    setName('');
    setEmail('');
    setPhone('');
  }
  return (
    <div className='container my-3'>
      <form onSubmit={add} >
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id='name'
            value={name}
            onChange={(e) => { setName(e.target.value) }}
            placeholder="Enter Your Name"
            required />
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id='email'
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            placeholder="Enter Your Email" 
            required/>
        </div>
        <div class="mb-3">
          <label class="form-label">Phone Number</label>
          <input
            type="phone"
            class="form-control"
            id='phone'
            value={phone}
            onChange={(e) => { setPhone(e.target.value) }}
            placeholder="Enter Phone number" 
            required/>
        </div>
        <button class="btn btn-primary" type="submit">Save</button>
      </form >
    </div>
  )
}

export default AddContact