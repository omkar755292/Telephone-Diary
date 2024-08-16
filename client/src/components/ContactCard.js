import React from 'react'

const ContactCard = (props) => {
    return (
        <>
            <li class="list-group-item d-flex justify-content-between align-items-start" key={props.contact._id}>
                <div class="ms-2 me-auto">
                    <div class="fw-bold">
                     Name: {props.contact.name}
                    </div>
                    <div >
                        Email: {props.contact.email}
                    </div>
                    <div >
                        Phone: {props.contact.phone}
                    </div>
                    <div >
                        Id: {props.contact._id}
                    </div>
                </div>
                <i class="fa-solid fa-trash-can" onClick={() => { props.deleteContact(props.contact._id) }}></i>
            </li>
        </>
    )
}

export default ContactCard