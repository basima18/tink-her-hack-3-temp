import logo from './logo.svg';
import './App.css';
import WelcomeScreen from './components/WelcomeScreen';
import HomeScreen from './components/HomeScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
   <Router>
         <Routes>
           <Route path="/" element={<WelcomeScreen />} />
           <Route path="/home" element={<HomeScreen />} />
         </Routes>
       </Router>
  );
}

export default App;
