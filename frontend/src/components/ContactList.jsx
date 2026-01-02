import { useState, useEffect } from 'react';
import { getContacts } from '../api';
import ContactItem from './ContactItem';

const ContactList = ({ refreshTrigger }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      setError('Failed to load contacts. Please try again.');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [refreshTrigger]);

  const handleContactDeleted = () => {
    fetchContacts();
  };

  if (loading) {
    return (
      <div className="contact-list-container">
        <h2>Contacts</h2>
        <div className="loading-state">Loading contacts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contact-list-container">
        <h2>Contacts</h2>
        <div className="error-state">{error}</div>
      </div>
    );
  }

  return (
    <div className="contact-list-container">
      <div className="contact-list-header">
        <h2>Contacts</h2>
        <span className="contact-count-badge">{contacts.length}</span>
      </div>
      {contacts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📇</div>
          <p>No contacts yet. Add your first contact above!</p>
        </div>
      ) : (
        <div className="contacts-grid">
          {contacts.map((contact, index) => (
            <ContactItem
              key={contact._id}
              contact={contact}
              onContactDeleted={handleContactDeleted}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;

