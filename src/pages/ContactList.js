import React from 'react'
import ContactCard from '../components/ContactCard'

const ContactList = (props) => {
  const deleteContact = (id) => {
    props.removeContactHandler(id);
  };
  const renderContactList = props.contactlist.map((contact) => {
    return <ContactCard key={contact._id} deleteContact={deleteContact} contact={contact} />
  });
  return (
    <div className='container my-3'>
      <ol class="list-group list-group-numbered ">
        {renderContactList}
      </ol>
    </div>

  )
}

export default ContactList