import React, { useState } from 'react';

// Function to play a beep sound
function beep() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // The wave form
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Beep sound at 1000 Hz
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5); // Plays for 0.5 seconds
}

const SafeWalkApp = () => {
    const [silentMode, setSilentMode] = useState(false);

    // Trigger beep when a button is clicked
    const handleBeep = () => {
        beep();
    };

    return (
        <div className="app-container">
            <h1>SafeWalk App</h1>
            <button onClick={handleBeep}>Beep if Silent</button>
            <p>Click the button to test the beep sound.</p>
        </div>
    );
};

export default SafeWalkApp;