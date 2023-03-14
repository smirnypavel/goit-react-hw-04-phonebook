import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactFilter.module.css';

const ContactFilter = ({ filter, onChange }) => {
  return (
    <input
      type="text"
      name="filter"
      value={filter}
      onChange={({ target }) => onChange(target.value)}
      placeholder="..to find"
      className={styles.input}
    />
  );
};

ContactFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ContactFilter;
