import React from 'react';
import PropTypes from 'prop-types';
import { TbTrash as TrashIcon } from 'react-icons/tb';
import styled from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={styled.ul}>
    {contacts.map(({ id, name, number }) => (
      <li key={id} className={styled.li}>
        <>
          {name}
          <br />
          {number}
        </>
        <button
          type="button"
          onClick={() => onDeleteContact(id)}
          className={styled.button}
        >
          <TrashIcon />
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
