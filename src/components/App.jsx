import React, { useState, useEffect, useRef } from 'react';
import Notiflix from 'notiflix';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';
import ContactFilter from './ContactFilter';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const contactsRef = useRef(null);

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
      contactsRef.current = parsedContacts;
    }
  }, []);

  useEffect(() => {
    if (contactsRef.current !== null) {
      localStorage.setItem('contacts', JSON.stringify(contactsRef.current));
    }
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() ||
          contacts.find(contact => contact.number === number)
      )
    ) {
      return Notiflix.Notify.failure(
        `${name} ${number} is already in contacts`
      );
    }
    setContacts(prevContacts => [...prevContacts, newContact]);
    contactsRef.current = [...contactsRef.current, newContact];
    Notiflix.Notify.success(`${name} is added to contacts`);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
    contactsRef.current = contactsRef.current.filter(
      contact => contact.id !== contactId
    );
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <ContactFilter filter={filter} onChange={handleFilterChange} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
}
