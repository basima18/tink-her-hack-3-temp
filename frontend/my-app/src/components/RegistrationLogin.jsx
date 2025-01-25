import React, { useState } from 'react';

const RegistrationLogin = ({ onComplete }) => {
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add authentication logic
    console.log('Logging in...');
    onComplete();
  };

  return (

    <div className="login-container">
        <center>
        <h2>
        Login / Register</h2>
      
      <li>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      /></li>
      <li>
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
    /></li>
      <li>
      <input
       type="username"
       placeholder="username"
       value={username}
       onChange={(e) => setusername( e.target.value)}
      /></li>

      <button onClick={handleLogin}>Login</button>
        </center>
      
    
    </div>
  );
  
};

export default RegistrationLogin;