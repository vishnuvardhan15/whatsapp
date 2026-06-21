import React,{useEffect} from 'react'
import { logout } from '../store/authSlice';
import { setContacts } from '../store/contactSlice';
import { showAlert } from '../store/alertSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedChat } from '../store/chatSlice';
import { setMessages } from '../store/messageSlice';
import css from './Contact.module.css'
import socket from '../utils/socket';

function Contact() {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.contacts.contacts);
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        try {
            const response = await fetch(
                'http://localhost:3000/api/contacts',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (!response.ok) {
                throw new Error('Failed to load contacts');
            }
            const data = await response.json();
            console.log(data);
            dispatch(setContacts(data));
        } catch (err) {
            dispatch(showAlert({ message: err.message, type: 'error' }));
        }
    };  

    const addContact = async () => {
        const email = prompt('Enter contact email');
        if (!email) return;
        try {
            const response = await fetch('http://localhost:3000/api/contact/add',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        email
                    })
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to add contact');
            }
            await loadContacts();
        } catch (err) {
            dispatch(showAlert({ message: err.message, type: 'error' }));
        }
    };

    const openChat = async (contactId, contactName) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/chat/${contactId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const data = await response.json();
            console.log(data);
            dispatch(setSelectedChat({
                chatId: data.chatId,
                contactId: contactId,
                contactName: contactName
            }));
            dispatch(setMessages(data.messages));
            socket.emit(
                "join-chat",
                data.chatId
            );
        } catch (err) {
            console.log(err);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };
    
  return (
    <div className={css.contactCtn}>
    <h1 className={css.userName}>{user.name}</h1>

    <button
        onClick={addContact}
        className={css.addContactBtn}
    >
            + Add Contact
        </button>

        <div className={css.myContacts}>
            {
                contacts.map(contact => (
                    <div
                        key={contact._id}
                        className={css.contact}
                        onClick={() =>
                            openChat(contact._id, contact.name)
                        }
                    >
                        {contact.name}
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Contact