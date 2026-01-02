import { deleteContact } from '../api';

const ContactItem = ({ contact, onContactDeleted, index = 0 }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(contact._id);
        if (onContactDeleted) {
          onContactDeleted();
        }
      } catch (error) {
        alert('Failed to delete contact. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Color accents for cards (cycling through vibrant colors)
  const accentColors = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#30cfd0', '#a8edea'];
  const accentColor = accentColors[index % accentColors.length];

  return (
    <div className="contact-item" style={{ '--accent-color': accentColor }}>
      <div className="contact-accent-bar"></div>
      <div className="contact-info">
        <h3 className="contact-name">{contact.name}</h3>
        <p className="contact-email">{contact.email}</p>
        <p className="contact-phone">{contact.phone}</p>
        {contact.message && (
          <p className="contact-message">{contact.message}</p>
        )}
        <p className="contact-date">Added: {formatDate(contact.createdAt)}</p>
      </div>
      <button 
        className="delete-btn"
        onClick={handleDelete}
        aria-label="Delete contact"
      >
        🗑️ Delete
      </button>
    </div>
  );
};

export default ContactItem;

