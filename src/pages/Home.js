import React, { useEffect, useState } from 'react'
import AddContact from './AddContact';
import ContactList from './ContactList';
import api from '../api/api'
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => {

    const [contactlist, setContactlist] = useState([]);

    const retrieveContacts = async () => {
        const response = await api.get('/api/contact');
        return response.data;
    }

    const removeContactHandler = async (id) => {
        await api.delete(`/api/contact/${id}`);
        const updateContactList = contactlist.filter((existingContact) => {
            return existingContact !== existingContact.id;
        });
        setContactlist(updateContactList)
    }
    const addContactHandler = async (newContact) => {
        const request = { ...newContact }
        const response = await api.post('/api/contact', request);
        const updateContactList = [...contactlist, response.data]
        setContactlist(updateContactList);

    }

    useEffect(() => {
        const getAllContacts = async () => {
            const storedContact = await retrieveContacts();
            if (storedContact) {
                setContactlist(storedContact);
            }
        }
        getAllContacts();

    }, [contactlist]);

    return (
        <div className='container'>
            <Header />
            <Routes>
                <Route exact path='/' element={<AddContact addContactHandler={addContactHandler} />} />
                <Route exact path='/addcontact' element={<AddContact addContactHandler={addContactHandler} />} />
                <Route exact path='/contactlist' element={<ContactList removeContactHandler={removeContactHandler} contactlist={contactlist} />} />
            </Routes>
        </div>
    )
}

export default Home