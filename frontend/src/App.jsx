import { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showContacts, setShowContacts] = useState(true);

  const handleContactAdded = () => {
    // Trigger refresh of contact list
    setRefreshTrigger(prev => prev + 1);
  };

  const toggleContacts = () => {
    setShowContacts(prev => !prev);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Contact Manager</h1>
        <p>Manage your contacts efficiently</p>
      </header>
      <main className="app-main-layout">
        <div className="form-section">
          <ContactForm onContactAdded={handleContactAdded} />
        </div>
        <div className={`contacts-section ${showContacts ? 'visible' : 'hidden'}`}>
          <button 
            className="toggle-contacts-btn"
            onClick={toggleContacts}
            aria-label={showContacts ? 'Hide contacts' : 'Show contacts'}
          >
            {showContacts ? '← Hide Contacts' : 'Show Contacts →'}
          </button>
          <ContactList refreshTrigger={refreshTrigger} />
        </div>
        {!showContacts && (
          <button 
            className="toggle-contacts-btn floating-toggle"
            onClick={toggleContacts}
            aria-label="Show contacts"
          >
            Show Contacts →
          </button>
        )}
      </main>
    </div>
  );
}

export default App;

