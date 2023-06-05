import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';


// API URL for the POST request
const API_URL = 'https://run.mocky.io/v3/0b14a8da-5fc7-4443-8511-53d687399bc9';

// Array of form fields with their configurations
const formFields = [
  { id: 'name', label: 'Name:', type: 'text', validate: (value) => value.length <= 50, errorMessage: 'The name should be less than 50 characters' },
  { id: 'cardNo', label: 'Card Number:', type: 'number', validate: (value) => value.length === 16, errorMessage: 'Please enter a valid Credit Card Number (16 digits)' },
  { id: 'cvv', label: 'CVV:', type: 'number', validate: (value) => value.length === 3, errorMessage: 'Please enter a valid CVV (3 digits)' },
  { id: 'expiryMonth', label: 'Expiry Month:', type: 'number', validate: (value) => parseInt(value) >= 1 && parseInt(value) <= 12, errorMessage: 'Please enter a valid Expiry Month (1-12)' },
  { id: 'expiryYear', label: 'Expiry Year:', type: 'number', validate: (value) => value.length === 4 && parseInt(value) >= new Date().getFullYear(), errorMessage: 'Please enter a valid Expiry Year (current year or future year)' }
];

const Home = () => {
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate the form data before submitting
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // Send a POST request with the form data
      const res = await axios.post(API_URL, formData);
      localStorage.setItem('response', JSON.stringify(res.data));
      localStorage.setItem('name', formData.name);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validate each form field based on its configuration
    formFields.forEach(field => {
      if (!field.validate(formData[field.id])) {
        errors[field.id] = field.errorMessage;
        isValid = false;
      }
    });

    // Update the validation errors state
    setValidationErrors(errors);
    return isValid;
  };

  // Update the form data state when input values change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  return (
    <div className="container">
      <h1>Submit Credit/Debit Card Details</h1>
      <form onSubmit={handleSubmit} className="form">
        {formFields.map(field => (
          <div key={field.id}>
          <div className="form-group">
            <label htmlFor={field.id}>{field.label}</label>
            <input
              type={field.type}
              id={field.id}
              value={formData[field.id] || ''}
              onChange={handleChange}
              required
            />
          </div>
            {validationErrors[field.id] && <p className="error">{validationErrors[field.id]}</p>}
            </div>
        ))}
        <button className={`button ${isLoading ? 'disabled' : ''}`} type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Home;
