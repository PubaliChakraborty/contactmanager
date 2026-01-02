const API_BASE_URL = 'http://localhost:5000/api/contacts';

// Fetch all contacts
export const getContacts = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    throw new Error(data.message || 'Failed to fetch contacts');
  } catch (error) {
    throw error;
  }
};

// Create a new contact
export const createContact = async (contactData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    
    // Check if response is OK (status 200-299)
    if (!response.ok) {
      // Try to parse JSON error response
      try {
        const errorData = await response.json();
        
        // Handle validation errors from backend
        if (errorData.errors) {
          const error = new Error('Validation failed');
          error.errors = errorData.errors;
          throw error;
        }
        
        // Handle single error message
        throw new Error(errorData.message || 'Failed to create contact');
      } catch (parseError) {
        // If JSON parsing fails, throw generic error
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
    }
    
    const data = await response.json();
    
    if (data.success) {
      return data.data;
    }
    
    // Handle validation errors from backend
    if (data.errors) {
      const error = new Error('Validation failed');
      error.errors = data.errors;
      throw error;
    }
    
    // Handle single error message
    throw new Error(data.message || 'Failed to create contact');
  } catch (error) {
    // Re-throw to preserve error structure
    throw error;
  }
};

// Delete a contact
export const deleteContact = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (data.success) {
      return true;
    }
    throw new Error(data.message || 'Failed to delete contact');
  } catch (error) {
    throw error;
  }
};

