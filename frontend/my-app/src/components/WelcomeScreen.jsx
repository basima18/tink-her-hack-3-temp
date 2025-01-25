

import React, { useState } from 'react';
import RegistrationLogin from './RegistrationLogin';
import "./styles.css"

const WelcomeScreen = ({ onNext }) => {
 return (
   <div className="Welcome-container">
    <center>
     <h1>Welcome to SafeWalk</h1>
     <p>Your personal safety companion with real-time tracking and alerts.</p>
     <ul style={{listStyleType:"none"}}>
       <li>Monitor heart rate and voice tremors</li>
       <li>Set emergency contacts</li>
       <li>Receive alerts for abnormal activity</li>
     </ul></center>
     
     <RegistrationLogin/>

   </div>
 );
};

export default WelcomeScreen;

// import React, { useState } from 'react';

// const WelcomeScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isRegistered, setIsRegistered] = useState(false);

//   const handleLogin = () => {
//     if (email && password) {
//       alert(isRegistered ? 'Login Successful' : 'Registration Successful');
//     } else {
//       alert('Please enter valid credentials.');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1>Welcome to MySafeApp</h1>
//       <p>Your personal safety companion with real-time tracking and alerts.</p>

//       <div style={styles.form}>
//         <h2>{isRegistered ? 'Login' : 'Register'}</h2>
        
//         <input 
//           type="email" 
//           placeholder="Enter your email" 
//           value={email} 
//           onChange={(e) => setEmail(e.target.value)} 
//           style={styles.input}
//         />
        
//         <input 
//           type="password" 
//           placeholder="Enter your password" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//           style={styles.input}
//         />

//         <button onClick={handleLogin} style={styles.button}>
//           {isRegistered ? 'Login' : 'Register'}
//         </button>

//         <p style={styles.toggleText}>
//           {isRegistered 
//             ? "Don't have an account? " 
//             : 'Already have an account? '}
//           <span 
//             onClick={() => setIsRegistered(!isRegistered)} 
//             style={styles.toggleLink}
//           >
//             {isRegistered ? 'Register' : 'Login'}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     textAlign: 'center',
//     padding: '50px',
//     fontFamily: 'Arial, sans-serif',
//   },
//   form: {
//     maxWidth: '400px',
//     margin: 'auto',
//     padding: '20px',
//     border: '1px solid #ddd',
//     borderRadius: '8px',
//     backgroundColor: '#f9f9f9',
//   },
//   input: {
//     width: '100%',
//     padding: '10px',
//     margin: '10px 0',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//   },
//   button: {
//     width: '100%',
//     padding: '10px',
//     backgroundColor: '#007BFF',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
//   toggleText: {
//     marginTop: '15px',
//   },
//   toggleLink: {
//     color: '#007BFF',
//     cursor: 'pointer',
//     textDecoration: 'underline',
//   },
// };

// export default WelcomeScreen;