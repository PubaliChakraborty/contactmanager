const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        // Enhanced email validation: requires @ and valid domain with TLD
        return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: 'Please enter a valid email address'
    }
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true,
    validate: {
      validator: function(v) {
        // Remove spaces, dashes, parentheses for validation
        const cleaned = v.replace(/[\s\-\(\)]/g, '');
        // Must be exactly 10 digits
        return /^\d{10}$/.test(cleaned);
      },
      message: 'Phone number must be 10 digits'
    }
  },
  message: {
    type: String,
    trim: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema);

