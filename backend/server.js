// // Import the Express module
// const express = require('express');

// // Create an instance of an Express application
// const app = express();

// // Define a port number
// const PORT =8000;

// // Define a GET route
// app.get('/home', (req, res) => {
//   res.send("this is my backend")
// });


// Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  emergencyContacts: [{ type: String }]
});

const User = mongoose.model('User', UserSchema);

// Register user
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login user
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// Get user profile (Protected route)
app.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Emergency alert storage
app.post('/emergency', async (req, res) => {
  try {
    const { email, message, location } = req.body;
    console.log('Emergency alert received from ${email}: ${message} at ${location}');
    // app.get('/profile', async (req, res) => {
    //   try {
    //     const authHeader = req.headers.authorization;
    //     if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //       return res.status(401).json({ message: "Unauthorized: No token provided" });
    //     }
    
    //     const token = authHeader.split(" ")[1];
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     const user = await User.findById(decoded.id).select('-password');
        
    //     if (!user) {
    //       return res.status(404).json({ message: "User not found" });
    //     }
        
    //     res.status(200).json(user);
    //   } catch (error) {
    //     console.error(error);
    //     res.status(401).json({ message: "Unauthorized or invalid token" });
    //   }
    // });
    res.status(200).json({ message: "Emergency alert stored successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error storing alert" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));
// app.post('/emergency', async (req, res) => {
//   try {
//     const { email, message, location } = req.body;
    
//     if (!email || !message || !location) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     console.log('Emergency alert received from ${email}: ${message} at ${location}');
//     res.status(200).json({ message: "Emergency alert stored successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error storing alert" });
//   }
// });








































