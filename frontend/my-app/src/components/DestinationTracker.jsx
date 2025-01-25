import React, { useState, useEffect } from 'react';

const DestinationTracker = () => {
  const [destination, setDestination] = useState({ lat: '', lon: '' });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [status, setStatus] = useState('');
  const [emergencyTriggered, setEmergencyTriggered] = useState(false);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lon: longitude });
        checkProximity(latitude, longitude);
      },
      (error) => console.error('Error getting location', error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [destination]);

  const checkProximity = (lat, lon) => {
    if (!destination.lat || !destination.lon) return;

    const distance = getDistanceFromLatLonInKm(lat, lon, destination.lat, destination.lon);
    
    if (distance < 0.1) {
      setStatus('You have reached your destination.');
      setEmergencyTriggered(false);
    } else {
      setStatus('You are ${distance.toFixed(2)} km away from the destination.');
      if (!emergencyTriggered && distance > 0.5) {
        alertEmergencyContacts();
        setEmergencyTriggered(true);
      }
    }
  };

  const alertEmergencyContacts = () => {
    const contacts = JSON.parse(localStorage.getItem('emergencyContacts')) || [];
    if (contacts.length > 0) {
      alert('ALERT: You are deviating from your destination. Notifying emergency contacts.');
      console.log('Notifying emergency contacts:', contacts);
    } else {
      alert('No emergency contacts found.');
    }
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const deg2rad = (deg) => deg * (Math.PI / 180);
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleSetDestination = () => {
    if (destination.lat && destination.lon) {
      localStorage.setItem('destination', JSON.stringify(destination));
      setStatus('Destination set successfully.');
    } else {
      alert('Please enter valid coordinates.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Destination Tracker</h2>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Destination Latitude"
          value={destination.lat}
          onChange={(e) => setDestination({ ...destination, lat: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Destination Longitude"
          value={destination.lon}
          onChange={(e) => setDestination({ ...destination, lon: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleSetDestination} style={styles.button}>
          Set Destination
        </button>
      </div>

      <div style={styles.info}>
        <h3>Status: {status}</h3>
        {currentLocation && (
          <p>
            Current Location: {currentLocation.lat}, {currentLocation.lon}
          </p>
        )}
      </div>
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
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  info: {
    marginTop: '20px',
  },
};

export default DestinationTracker;