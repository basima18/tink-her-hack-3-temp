import React, { useState, useEffect } from 'react';

const ActivityPrompt = ({ onEmergency }) => {
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onEmergency();
    }
  }, [timeLeft, onEmergency]);

  return (
    <div className="activity-prompt">
      <p>Are you okay? What is your current activity?</p>
      <button onClick={() => console.log('Walking')}>Walking</button>
      <button onClick={() => console.log('Stopped')}>Stopped</button>
      <button onClick={onEmergency}>Need Help</button>
      <p>Time left to respond: {timeLeft}s</p>
    </div>
  );
};

export default ActivityPrompt;