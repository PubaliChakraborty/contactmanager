import { useState, useEffect } from 'react';
import { createContact } from '../api';

const ContactForm = ({ onContactAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Enhanced email validation - must contain @ and valid domain (.com, .in, etc.)
  const validateEmail = (email) => {
    if (!email || !email.trim()) return false;
    // Regex: requires @ symbol and domain with TLD (at least 2 chars after dot)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Phone validation - must be exactly 10 digits
  const validatePhone = (phone) => {
    if (!phone || !phone.trim()) return false;
    // Remove any spaces, dashes, or parentheses for validation
    const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '');
    // Must be exactly 10 digits
    return /^\d{10}$/.test(cleanedPhone);
  };

  // Validate a single field
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value || !value.trim()) {
          return 'Name is required';
        }
        return '';
      case 'email':
        if (!value || !value.trim()) {
          return 'Email is required';
        }
        if (!validateEmail(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      case 'phone':
        if (!value || !value.trim()) {
          return 'Phone is required';
        }
        if (!validatePhone(value)) {
          return 'Phone number must be 10 digits';
        }
        return '';
      default:
        return '';
    }
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};

    newErrors.name = validateField('name', formData.name);
    newErrors.email = validateField('email', formData.email);
    newErrors.phone = validateField('phone', formData.phone);

    // Remove empty error messages
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) delete newErrors[key];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change with real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation on change
    const fieldError = validateField(name, value);
    if (fieldError) {
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    } else {
      // Clear error if field becomes valid
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Clear success message when user starts typing
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  // Handle blur event for validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);
    if (fieldError) {
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage('');
    setErrors({}); // Clear previous errors

    try {
      await createContact(formData);
      setSuccessMessage('Contact added successfully!');
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      // Notify parent component to refresh contact list
      if (onContactAdded) {
        onContactAdded();
      }
    } catch (error) {
      // Handle backend validation errors
      if (error.errors) {
        // Multiple field errors from backend
        setErrors(error.errors);
      } else if (error.message) {
        // Single error message
        setErrors({ submit: error.message });
      } else {
        setErrors({ submit: 'Failed to add contact. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid (no errors and all required fields filled)
  const isFormValid = formData.name.trim() && 
                     formData.email.trim() && 
                     validateEmail(formData.email) && 
                     formData.phone.trim() &&
                     validatePhone(formData.phone) &&
                     Object.keys(errors).length === 0;

  return (
    <div className="contact-form-container">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name ? 'error' : ''}
            placeholder="Enter full name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? 'error' : ''}
            placeholder="Enter email address"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.phone ? 'error' : ''}
            placeholder="Enter 10-digit phone number"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Enter optional message"
          />
        </div>

        {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <button 
          type="submit" 
          className="submit-btn"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting && <span className="spinner"></span>}
          {isSubmitting ? 'Submitting...' : 'Add Contact'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

