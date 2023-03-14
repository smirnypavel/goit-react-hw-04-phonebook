import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { name, number } = this.state;
    this.props.onSubmit({ name, number });
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <label className={styles.label}>
          <input
            value={name}
            onChange={this.handleChange}
            type="text"
            name="name"
            required
            className={styles.input}
            placeholder="Enter name"
          />
        </label>
        <label className={styles.label}>
          <input
            value={number}
            onChange={this.handleChange}
            type="tel"
            name="number"
            required
            className={styles.input}
            placeholder="Enter phone number"
          />
        </label>
        <button type="submit" className={styles.button}>
          Add Contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
