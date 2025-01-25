import React, { useState, useEffect } from 'react';

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Load saved contacts from localStorage on component mount
  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('emergencyContacts')) || [];
    setContacts(savedContacts);
  }, []);

  // Save contacts to localStorage whenever contacts change
  useEffect(() => {
    localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = () => {
    if (name && phone) {
      const newContact = { id: Date.now(), name, phone };
      setContacts([...contacts, newContact]);
      setName('');
      setPhone('');
    } else {
      alert('Please enter both name and phone number.');
    }
  };

  const removeContact = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  return (
    <div style={styles.container}>
      <h2>Emergency Contacts</h2>

      <div style={styles.form}>
        <input 
          type="text" 
          placeholder="Contact Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={styles.input}
        />
        
        <input 
          type="tel" 
          placeholder="Phone Number" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          style={styles.input}
        />

        <button onClick={addContact} style={styles.button}>
          Add Contact
        </button>
      </div>

      <ul style={styles.list}>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <li key={contact.id} style={styles.listItem}>
              {contact.name} - {contact.phone}
              <button onClick={() => removeContact(contact.id)} style={styles.deleteButton}>
                Remove
              </button>
            </li>
          ))
        ) : (
          <p>No emergency contacts added.</p>
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    width: '80%',
    padding: '10px',
    margin: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '5px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default EmergencyContacts;