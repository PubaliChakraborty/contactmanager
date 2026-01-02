const Contact = require('../models/Contact');
const dns = require('dns').promises;

// Helper function to validate email format
const validateEmailFormat = (email) => {
  // Enhanced email validation: requires @ and valid domain with TLD
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Helper function to check MX records for domain with timeout
const checkMXRecords = async (domain) => {
  try {
    // Set a timeout for DNS lookup (5 seconds)
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('DNS lookup timeout')), 5000);
    });

    const mxPromise = dns.resolveMx(domain);
    
    // Race between DNS lookup and timeout
    const mxRecords = await Promise.race([mxPromise, timeoutPromise]);
    
    // If MX records exist and array is not empty, domain can receive emails
    return mxRecords && mxRecords.length > 0;
  } catch (error) {
    // DNS lookup failed - domain doesn't exist or has no MX records
    // Or timeout occurred
    return false;
  }
};

// @desc    Create a new contact
// @route   POST /api/contacts
// @access  Public
const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Controller-level validation before Mongoose
    const errors = {};

    // Validate name
    if (!name || !name.trim()) {
      errors.name = 'Name is required';
    }

    // Validate email
    if (!email || !email.trim()) {
      errors.email = 'Email is required';
    } else {
      const trimmedEmail = email.trim().toLowerCase();
      
      // Step 1: Validate email format
      if (!validateEmailFormat(trimmedEmail)) {
        errors.email = 'Invalid email format';
      } else {
        // Step 2: Extract domain and check MX records
        const domain = trimmedEmail.split('@')[1];
        
        try {
          const hasMXRecords = await checkMXRecords(domain);
          if (!hasMXRecords) {
            errors.email = 'Email domain cannot receive emails';
          }
        } catch (dnsError) {
          // DNS lookup failed - treat as invalid domain
          errors.email = 'Email domain cannot receive emails';
        }
      }
    }

    // Validate phone
    if (!phone || !phone.trim()) {
      errors.phone = 'Phone is required';
    } else {
      // Remove spaces, dashes, parentheses for validation
      const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '');
      // Must be exactly 10 digits
      if (!/^\d{10}$/.test(cleanedPhone)) {
        errors.phone = 'Phone number must be 10 digits';
      }
    }

    // If validation errors exist, return them
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        errors: errors
      });
    }

    // Clean phone number (remove spaces, dashes, parentheses) before saving
    const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '');

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanedPhone,
      message: message ? message.trim() : ''
    });

    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const mongooseErrors = {};
      Object.keys(error.errors).forEach(key => {
        mongooseErrors[key] = error.errors[key].message;
      });
      return res.status(400).json({
        success: false,
        errors: mongooseErrors
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete a contact
// @route   DELETE /api/contacts/:id
// @access  Public
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  createContact,
  getContacts,
  deleteContact
};

